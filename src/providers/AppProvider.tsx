import React, {useEffect, useState, useCallback} from 'react';
import {Wallet} from 'ethers';
import Toast from 'react-native-toast-message';
import {useStorage, useSecureStorage} from 'hooks';
import useInitialization from 'hooks/useInitialization';

// =========================
import {getSdkError} from '@walletconnect/utils';
import {SessionTypes} from '@walletconnect/types';
import {SignClientTypes} from '@walletconnect/types';
import {EIP155_SIGNING_METHODS} from '../data/EIP155';
import {handleDeepLinkRedirect} from '../utils/LinkingUtils';
import {currentETHAddress, web3wallet, _pair} from '../utils/Web3WalletClient';

export default function AppProvider(props: AppProviderProps) {
  const [avatar, updateAvatar] = useStorage<string>('avatar');
  const [isAddingWallet, setIsAddingWallet] = useState(false);
  const [account, setAccount] = useSecureStorage<Wallet>('account');

  const initialized = useInitialization();

  useEffect(() => {
    console.log('Web3WalletSDK initialized:', initialized);
  }, [initialized]);

  // Create a new wallet
  const createSmartWallet = ({
    type,
    mnemonic,
    privateKey,
  }: CreateWalletProps) => {
    setIsAddingWallet(true);
    try {
      const wallet =
        type === 'new'
          ? Wallet.createRandom()
          : type === 'mnemonic'
          ? Wallet.fromMnemonic(mnemonic!)
          : new Wallet(privateKey!);
      setAccount(wallet);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1:
          type === 'new'
            ? 'Error creating wallet'
            : type === 'mnemonic'
            ? 'Invalid Mnemonic Phrase'
            : 'Invalid Private Key',
        text2:
          type === 'new'
            ? 'Please try again'
            : type === 'mnemonic'
            ? 'Please enter a valid Mnemonic'
            : 'Please enter a valid Private Key',
      });
    } finally {
      setIsAddingWallet(false);
    }
  };

  // ==================================================================

  // Modal Visible State
  const [approvalModal, setApprovalModal] = useState(false);
  const [signModal, setSignModal] = useState(false);
  const [signTypedDataModal, setSignTypedDataModal] = useState(false);
  const [sendTransactionModal, setSendTransactionModal] = useState(false);
  const [copyDialog, setCopyDialog] = useState(false);
  const [successPair, setSuccessPair] = useState(false);

  // Pairing State
  const [pairedProposal, setPairedProposal] =
    useState<SignClientTypes.EventArguments['session_proposal']>();

  const [requestEventData, setRequestEventData] = useState();
  const [requestSession, setRequestSession] = useState();

  async function pair(uri: string) {
    const pairing = await _pair({uri});
    setCopyDialog(false);

    // @notice iOS has an issue with modals, so we need to delay the approval modal
    setTimeout(() => {
      setApprovalModal(true);
    }, 1200);
    return pairing;
  }

  async function handleAccept() {
    const {id, params} = pairedProposal;
    const {requiredNamespaces, relays} = params;

    if (pairedProposal) {
      const namespaces: SessionTypes.Namespaces = {};
      Object.keys(requiredNamespaces).forEach(key => {
        const accounts: string[] = [];
        requiredNamespaces[key].chains.map(chain => {
          [currentETHAddress].map(acc => accounts.push(`${chain}:${acc}`));
        });

        namespaces[key] = {
          accounts,
          methods: requiredNamespaces[key].methods,
          events: requiredNamespaces[key].events,
        };
      });

      const session = await web3wallet.approveSession({
        id,
        relayProtocol: relays[0].protocol,
        namespaces,
      });

      setApprovalModal(false);
      setSuccessPair(true);

      const sessionMetadata = session?.peer?.metadata;
      handleDeepLinkRedirect(sessionMetadata?.redirect);
    }
  }

  const handleCancel = () => {
    setCopyDialog(false);
  };

  async function handleDecline() {
    setApprovalModal(false);

    if (!pairedProposal) {
      return;
    }

    web3wallet.rejectSession({
      id: pairedProposal.id,
      reason: getSdkError('USER_REJECTED_METHODS'),
    });
  }

  const onSessionProposal = useCallback(
    (proposal: SignClientTypes.EventArguments['session_proposal']) => {
      setPairedProposal(proposal);
    },
    [],
  );

  const onSessionRequest = useCallback(
    async (requestEvent: SignClientTypes.EventArguments['session_request']) => {
      const {topic, params} = requestEvent;
      const {request} = params;
      const requestSessionData =
        web3wallet.engine.signClient.session.get(topic);

      switch (request.method) {
        case EIP155_SIGNING_METHODS.ETH_SIGN:
        case EIP155_SIGNING_METHODS.PERSONAL_SIGN:
          setRequestSession(requestSessionData);
          setRequestEventData(requestEvent);
          setSignModal(true);
          return;

        case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA:
        case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V3:
        case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V4:
          setRequestSession(requestSessionData);
          setRequestEventData(requestEvent);
          setSignTypedDataModal(true);
          return;
        case EIP155_SIGNING_METHODS.ETH_SEND_TRANSACTION:
        case EIP155_SIGNING_METHODS.ETH_SIGN_TRANSACTION:
          setRequestSession(requestSessionData);
          setRequestEventData(requestEvent);
          setSendTransactionModal(true);
          return;
      }
    },
    [],
  );

  useEffect(() => {
    if (
      copyDialog ||
      approvalModal ||
      signTypedDataModal ||
      signModal ||
      sendTransactionModal
    ) {
      web3wallet.on('session_proposal', onSessionProposal);
      web3wallet.on('session_request', onSessionRequest);
    }
  }, [
    approvalModal,
    copyDialog,
    signModal,
    signTypedDataModal,
    sendTransactionModal,
    requestEventData,
    requestSession,
    onSessionProposal,
    onSessionRequest,
    successPair,
  ]);

  return (
    <AppContext.Provider
      value={{
        account,
        updateAvatar,
        avatar: avatar || '',

        isAddingWallet,
        createSmartWallet,

        initialized: true || initialized,
      }}>
      {props.children}
    </AppContext.Provider>
  );
}

interface CreateWalletProps {
  type: 'new' | 'mnemonic' | 'privateKey';
  mnemonic?: string;
  privateKey?: string;
}

interface AppContext {
  initialized: boolean;
  account: Wallet | null;

  avatar: string;
  updateAvatar: (avatar: string) => void;

  isAddingWallet: boolean;
  createSmartWallet: ({type, mnemonic, privateKey}: CreateWalletProps) => void;
}

const AppContext = React.createContext({} as AppContext);

type AppProviderProps = {
  children: React.ReactNode;
};

export function useApp() {
  const value = React.useContext(AppContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useApp must be wrapped in a <AppProvider />');
    }
  }
  return value;
}

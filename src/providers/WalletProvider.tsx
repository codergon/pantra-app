import Toast from 'react-native-toast-message';
import {Wallet, providers, utils} from 'ethers';
import {useStorage, useSecureStorage} from 'hooks';
import React, {useEffect, useState, useCallback} from 'react';
import useInitialization from 'hooks/useInitialization';

// =========================
import {parseEther} from 'viem';
import {IWallet} from 'typings/common';
import {getSdkError} from '@walletconnect/utils';
import {SessionTypes} from '@walletconnect/types';
import {SignClientTypes} from '@walletconnect/types';
import {handleDeepLinkRedirect} from '../utils/LinkingUtils';
import {EIP155_CHAINS, EIP155_SIGNING_METHODS} from '../data/EIP155';
import {currentETHAddress, web3wallet, _pair} from '../utils/Web3WalletClient';

export const provider = new providers.JsonRpcProvider(
  'https://replicator.pegasus.lightlink.io/rpc/vl',
);

export default function WalletProvider(props: WalletProviderProps) {
  const [avatar, updateAvatar] = useStorage<string>('avatar');
  const [isAddingWallet, setIsAddingWallet] = useState(false);
  const [account, setAccount, isAcctReady] =
    useSecureStorage<IWallet>('account');

  // setAccount();

  const [txnPending, setTxnPending] = useState(false);

  // Send ETH
  const sendETH = async ({to, amount}: SendETHProps) => {
    setTxnPending(true);
    try {
      Toast.show({
        type: 'warning',
        text1: 'Transaction Processing',
        text2: 'Waiting for confirmation',
      });

      const signer = new Wallet(account!.privateKey!, provider);

      const tx = await signer!.sendTransaction({
        to,
        value: parseEther(amount),
      });

      if (tx) {
        Toast.show({
          type: 'success',
          text1: 'Transaction Successful',
          text2: 'Transaction has been confirmed',
        });
      }
    } catch (error) {
      console.log('error', error);

      Toast.show({
        type: 'error',
        text1: 'Transaction Failed',
        text2: 'Please try again',
      });
    } finally {
      setTxnPending(false);
    }
  };

  // Create a new wallet
  const createSmartWallet = ({
    type,
    mnemonic,
    privateKey,
  }: CreateWalletProps) => {
    setIsAddingWallet(true);
    try {
      let wallet;

      if (type === 'new') {
        const randomBytes = utils.randomBytes(32);
        const privateHex = utils.hexlify(randomBytes);
        wallet = new Wallet(privateHex, provider);
      } else {
        wallet =
          type === 'mnemonic'
            ? Wallet.fromMnemonic(mnemonic!)
            : new Wallet(privateKey!, provider);
      }

      setAccount({
        name: 'Smart Wallet',
        address: wallet.address,
        privateKey: wallet.privateKey,
        mnemonic: wallet.mnemonic?.phrase,
      });
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
  // const initialized = useInitialization();

  // useEffect(() => {
  //   console.log('Web3WalletSDK initialized:', initialized);
  // }, [initialized]);

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

  const updateAccount = async (
    key: keyof IWallet,
    value: IWallet[keyof IWallet],
  ) => {
    setAccount({...account, [key]: value} as IWallet);
  };

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
    <WalletContext.Provider
      value={{
        account,
        isAddingWallet,
        initialized: true,
        avatar: avatar || '',
        setAccount,

        sendETH,
        txnPending,

        isAcctReady,

        updateAvatar,
        updateAccount,
        createSmartWallet,
      }}>
      {props.children}
    </WalletContext.Provider>
  );
}

interface SendETHProps {
  to: string;
  amount: string;
  from?: `0x${string}`;
}
interface CreateWalletProps {
  type: 'new' | 'mnemonic' | 'privateKey';
  mnemonic?: string;
  privateKey?: string;
}

interface WalletContext {
  avatar: string;
  txnPending: boolean;
  initialized: boolean;
  isAddingWallet: boolean;
  account: IWallet | null;
  setAccount: (account?: IWallet) => void;

  isAcctReady: boolean;

  updateAvatar: (avatar: string) => void;
  sendETH: ({to, amount}: SendETHProps) => Promise<void>;
  updateAccount: (key: keyof IWallet, value: IWallet[keyof IWallet]) => void;
  createSmartWallet: ({type, mnemonic, privateKey}: CreateWalletProps) => void;
}

const WalletContext = React.createContext({} as WalletContext);

type WalletProviderProps = {
  children: React.ReactNode;
};

export function useWallet() {
  const value = React.useContext(WalletContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useWallet must be wrapped in a <WalletProvider />');
    }
  }
  return value;
}

import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {Core} from '@walletconnect/core';
import {Web3Wallet, IWeb3Wallet} from '@walletconnect/web3wallet';

import {WC_PROJECT_ID} from '@env';
import {useWallet} from './WalletProvider';
import {getSdkError} from '@walletconnect/utils';
import {useNavigation} from '@react-navigation/native';

import {SessionTypes} from '@walletconnect/types';
import {SignClientTypes} from '@walletconnect/types';
import {handleDeepLinkRedirect} from 'utils/LinkingUtils';

const core = new Core({
  // logger: 'debug',
  projectId: WC_PROJECT_ID,
});

export default function SessionProvider(props: SessionProviderProps) {
  const {account} = useWallet();
  const navigation = useNavigation();

  const [web3wallet, setWeb3wallet] = useState<IWeb3Wallet | null>(null);

  // Pairing State
  const [pendingPair, setPendingPair] = useState(false);
  const [requestSession, setRequestSession] = useState();
  const [requestEventData, setRequestEventData] = useState();
  const [pairedProposal, setPairedProposal] =
    useState<SignClientTypes.EventArguments['session_proposal']>();

  const [activeSessions, setActiveSessions] = useState<SessionTypes.Struct[]>(
    [],
  );

  useEffect(() => {
    const initializeWeb3Wallet = async () => {
      try {
        const web3wallet = await Web3Wallet.init({
          core,
          metadata: {
            name: 'Pantra',
            description: 'Non-custodial smart wallet powered by LightLink',
            url: 'https://github.com/codergon/Pantra',
            icons: [
              'https://dr.savee-cdn.com/things/6/5/a6c844c2200119ec0e42e9.png',
            ],
            redirect: {
              native: 'pantra://',
            },
          },
        });

        setWeb3wallet(web3wallet);
      } catch (error) {
        console.error('Error initializing Web3Wallet:', error);
      }
    };

    initializeWeb3Wallet();
  }, []);

  const onSessionProposal = useCallback(
    (proposal: SignClientTypes.EventArguments['session_proposal']) => {
      setPairedProposal(proposal);
    },
    [],
  );

  const onSessionRequest = useCallback(
    async (requestEvent: SignClientTypes.EventArguments['session_request']) => {
      if (!web3wallet) return;

      const {topic, params} = requestEvent;
      const {request} = params;
      const requestSessionData =
        web3wallet.engine.signClient.session.get(topic);

      console.log(requestSessionData);

      //   switch (request.method) {
      //   }
    },
    [],
  );

  // Pair request
  const pairWithURI = async (params: {uri: string}) => {
    await core.pairing.pair({uri: params.uri});
    navigation.canGoBack() && navigation.goBack();
    setPendingPair(true);
    navigation.navigate('pairModal');
  };

  // Decline pair
  const declinePair = (goBack = true) => {
    try {
      if (!pairedProposal) {
        navigation.canGoBack() && !!goBack && navigation.goBack();
        return;
      }

      web3wallet!?.rejectSession({
        id: pairedProposal.id,
        reason: getSdkError('USER_REJECTED_METHODS'),
      });

      setPairedProposal(undefined);

      navigation.canGoBack() && !!goBack && navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  // Accept pair
  const acceptPair = async () => {
    try {
      if (pairedProposal && !!pairedProposal?.id) {
        const session = await web3wallet?.approveSession({
          id: pairedProposal?.id,
          namespaces: {
            eip155: {
              chains: ['eip155:1', 'eip155:5', 'eip155:1891'],
              events: ['eth_subscription'],
              methods: [
                'eth_sign',
                'personal_sign',
                'eth_signTypedData',
                'eth_sendTransaction',
                'eth_signTransaction',
              ],
              accounts: ['eip155:1:', 'eip155:5:', 'eip155:1891:'].map(
                chainId => chainId + account?.address!,
              ),
            },
          },
          relayProtocol: pairedProposal?.params?.relays[0]?.protocol,
        });

        setPendingPair(false);
        const sessions = web3wallet?.getActiveSessions();
        const sessionsArray = Object.values(sessions || {});
        setActiveSessions(sessionsArray);

        const sessionMetadata = session?.peer?.metadata;
        handleDeepLinkRedirect(sessionMetadata?.redirect);

        navigation.canGoBack() && navigation.goBack();
      }
    } catch (e) {
      console.log(e);
    }
  };

  // disconnect session
  const disconnectSession = async (topic: string) => {
    try {
      await web3wallet?.disconnectSession({
        topic,
        reason: getSdkError('USER_DISCONNECTED'),
      });

      const sessions = web3wallet?.getActiveSessions();
      const sessionsArray = Object.values(sessions || {});
      setActiveSessions(sessionsArray.filter(s => s.topic !== topic));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (pendingPair || true) {
      if (!!web3wallet) {
        const sessions = web3wallet?.getActiveSessions();
        const sessionsArray = Object.values(sessions || {});
        setActiveSessions(sessionsArray);
      }

      web3wallet?.on('session_proposal', onSessionProposal);
      web3wallet?.on('session_request', onSessionRequest);
    }
  }, [pendingPair]);

  return (
    <SessionContext.Provider
      value={{
        pendingPair,
        pairedProposal,
        activeSessions,

        acceptPair,
        declinePair,
        pairWithURI,
        disconnectSession,
      }}>
      {props.children}
    </SessionContext.Provider>
  );
}

interface SessionContext {
  pendingPair: boolean;
  activeSessions: SessionTypes.Struct[];
  pairedProposal:
    | SignClientTypes.EventArguments['session_proposal']
    | undefined;

  acceptPair: () => Promise<void>;
  declinePair: (goBack?: boolean) => void;
  disconnectSession: (topic: string) => Promise<void>;
  pairWithURI: (params: {uri: string}) => Promise<void>;
}

const SessionContext = React.createContext({} as SessionContext);

type SessionProviderProps = {
  children: React.ReactNode;
};

export function useSession() {
  const value = React.useContext(SessionContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }
  return value;
}

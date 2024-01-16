import React, {useState} from 'react';
import {HDNodeWallet, Wallet} from 'ethers';
import Toast from 'react-native-toast-message';
import {useStorage, useSecureStorage} from 'hooks';

export default function AppProvider(props: AppProviderProps) {
  const [avatar, updateAvatar] = useStorage<string>('avatar');
  const [account, setAccount] = useSecureStorage<HDNodeWallet | Wallet>(
    'account',
  );

  console.log('account', account);

  const [isAddingWallet, setIsAddingWallet] = useState(false);

  // Create a new wallet
  const createSmartWallet = () => {
    setIsAddingWallet(true);
    try {
      const wallet = Wallet.createRandom();
      setAccount(wallet);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error creating wallet',
        text2: 'Something went wrong',
      });
    } finally {
      setIsAddingWallet(false);
    }
  };

  // Recover wallet from mnemonic
  const recoverFromMnemonic = (mnemonic: string) => {
    setIsAddingWallet(true);
    try {
      const wallet = Wallet.fromPhrase(mnemonic);
      setAccount(wallet);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Mnemonic Phrase',
        text2: 'Please enter a valid Mnemonic',
      });
    } finally {
      setIsAddingWallet(false);
    }
  };

  // Recover wallet from private key
  const recoverFromPrivateKey = (privateKey: string) => {
    setIsAddingWallet(true);
    try {
      const wallet = new Wallet(privateKey);
      setAccount(wallet);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Private Key',
        text2: 'Please enter a valid Private Key',
      });
    } finally {
      setIsAddingWallet(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        account,
        updateAvatar,
        avatar: avatar || '',

        isAddingWallet,
        createSmartWallet,
        recoverFromMnemonic,
        recoverFromPrivateKey,
      }}>
      {props.children}
    </AppContext.Provider>
  );
}

interface AppContext {
  account: HDNodeWallet | Wallet | null;

  avatar: string;
  updateAvatar: (avatar: string) => void;

  isAddingWallet: boolean;
  createSmartWallet: () => void;
  recoverFromMnemonic: (mnemonic: string) => void;
  recoverFromPrivateKey: (privateKey: string) => void;
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

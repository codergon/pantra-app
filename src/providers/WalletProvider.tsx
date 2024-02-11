import {IWallet} from 'typings/common';
import {factoryAbi} from 'contracts/abis';
import {isAddress, parseEther} from 'viem';
import Toast from 'react-native-toast-message';
import React, {useState, useMemo} from 'react';
import {waitForTransaction} from '@wagmi/core';
import {Wallet, providers, utils} from 'ethers';
import {privateKeyToAccount} from 'viem/accounts';
import {useStorage, useSecureStorage} from 'hooks';
import {useContractRead, useContractWrite} from 'wagmi';
import {
  CONTRACT_ADDRESS,
  SUPPORTED_CHAINS,
  WithdrawalInterval,
} from 'contracts/data';

export default function WalletProvider(props: WalletProviderProps) {
  const [currentChain, setCurrentChain] =
    useState<keyof typeof SUPPORTED_CHAINS>('testnet');
  const currentRPC = useMemo(() => {
    return SUPPORTED_CHAINS[currentChain];
  }, [currentChain]);

  const [avatar, updateAvatar] = useStorage<string>('avatar');
  const [isAddingWallet, setIsAddingWallet] = useState(false);
  const [account, setAccount, isAcctReady] =
    useSecureStorage<IWallet>('account');

  const provider = new providers.JsonRpcProvider(
    `https://replicator.${currentRPC}/rpc/vl`,
  );

  // Smart Savings
  const [smartSavings, setSmartSavings] = useStorage<boolean>(
    'smartSavings',
    false,
  );

  const getSavingsWallet = useContractRead({
    abi: factoryAbi,
    functionName: 'getWallet',
    address: CONTRACT_ADDRESS,
    enabled: !!account?.address,
    ...(!!account?.privateKey && {
      account: privateKeyToAccount(account?.privateKey as `0x${string}`),
    }),
  });

  // Generate a savings contract from the factory
  const createSavingsWallet = useContractWrite({
    gasPrice: 0n,
    abi: factoryAbi,
    address: CONTRACT_ADDRESS,
    functionName: 'createWallet',
    args: [WithdrawalInterval.DAILY],
    ...(!!account?.privateKey && {
      account: privateKeyToAccount(account?.privateKey as `0x${string}`),
    }),
  });

  // Toggle Smart Savings
  const toggleSmartSavings = async () => {
    if (smartSavings) {
      setSmartSavings(false);
    } else {
      try {
        if (!isAddress(getSavingsWallet?.data as string)) {
          const txnHash = await createSavingsWallet?.writeAsync();
          const data = await waitForTransaction({
            hash: txnHash?.hash,
          });

          await getSavingsWallet!.refetch();

          setSmartSavings(true);
        } else {
          setSmartSavings(true);
        }
      } catch (error) {
        console.log('error', error);
      }
    }
  };

  // Send ETH
  const [txnPending, setTxnPending] = useState(false);
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

  // Update account
  const updateAccount = async (
    key: keyof IWallet,
    value: IWallet[keyof IWallet],
  ) => {
    setAccount({...account, [key]: value} as IWallet);
  };

  return (
    <WalletContext.Provider
      value={{
        smartSavings,
        setSmartSavings,
        toggleSmartSavings,
        getSavingsWallet,
        createSavingsWallet,

        account,
        isAddingWallet,
        initialized: true,
        avatar: avatar || '',
        setAccount,

        currentRPC,

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
  smartSavings: boolean | null;
  setSmartSavings: (value: boolean) => void;
  toggleSmartSavings: () => Promise<void>;
  getSavingsWallet: ReturnType<typeof useContractRead>;
  createSavingsWallet: ReturnType<typeof useContractWrite>;

  currentRPC: string;

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

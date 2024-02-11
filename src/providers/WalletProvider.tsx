import {IWallet} from 'typings/common';
import {factoryAbi} from 'contracts/abis';
import {isAddress, parseEther} from 'viem';
import Toast from 'react-native-toast-message';
import React, {useState, useMemo} from 'react';
import {waitForTransaction} from '@wagmi/core';
import {Wallet, providers, utils} from 'ethers';
import {privateKeyToAccount} from 'viem/accounts';
import {useStorage, useSecureStorage} from 'hooks';
import {
  useContractRead,
  useContractWrite,
  useFeeData,
  useSendTransaction,
} from 'wagmi';
import {
  CONTRACT_ADDRESS,
  SUPPORTED_CHAINS,
  WithdrawalInterval,
} from 'contracts/data';
import {useSettings} from './SettingsProvider';
import {walletClient} from './Providers';

export default function WalletProvider(props: WalletProviderProps) {
  const [currentChain, setCurrentChain] =
    useState<keyof typeof SUPPORTED_CHAINS>('testnet');
  const currentRPC = useMemo(() => {
    return SUPPORTED_CHAINS[currentChain];
  }, [currentChain]);

  const {activeCurrency} = useSettings();
  const [ethPrices, setEthPrices] = useState<Record<string, number>>({});

  const {data: feeData} = useFeeData({formatUnits: 'ether', watch: true});

  const [avatar, updateAvatar] = useStorage<string>('avatar');
  const [isAddingWallet, setIsAddingWallet] = useState(false);
  const [account, setAccount, isAcctReady] =
    useSecureStorage<IWallet>('account');

  const provider = new providers.JsonRpcProvider(
    `https://replicator.${currentRPC}/rpc/vl`,
  );

  // Smart Savings
  const [withdrawalInterval, setWithdrawalInterval] =
    useStorage<WithdrawalInterval>(
      'withdrawalInterval',
      WithdrawalInterval.DAILY,
    );

  const [smartSavings, setSmartSavings] = useStorage<boolean>(
    'smartSavings',
    false,
  );

  // Get the savings contract
  const getSavingsWallet = useContractRead({
    abi: factoryAbi,
    functionName: 'getWallet',
    address: CONTRACT_ADDRESS,
    enabled: !!account?.address,
    ...(!!account?.privateKey && {
      account: privateKeyToAccount(account?.privateKey),
    }),
  });

  const getSavingsBalance = useContractRead({
    abi: factoryAbi,
    address: CONTRACT_ADDRESS,
    enabled: !!account?.address,
    functionName: 'getWalletBalance',
    ...(!!account?.privateKey && {
      account: privateKeyToAccount(account?.privateKey),
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
      account: privateKeyToAccount(account?.privateKey),
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

  // Set withdrawal interval from the savings contract
  const setSavingsWithdrawal = useContractWrite({
    gasPrice: 0n,
    abi: factoryAbi,
    address: CONTRACT_ADDRESS,
    functionName: 'setWithdrawalInterval',
    args: [withdrawalInterval],
    ...(!!account?.privateKey && {
      account: privateKeyToAccount(account?.privateKey),
    }),
  });

  const updateWithdrawalInterval = async (value: WithdrawalInterval) => {
    if (value === withdrawalInterval) return;
    try {
      await setSavingsWithdrawal?.writeAsync();
      setWithdrawalInterval(value);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error updating withdrawal interval',
        text2: 'Please try again',
      });
    }
  };

  // Send ETH
  const [txnPending, setTxnPending] = useState(false);

  const depositIntoSavings = useContractWrite({
    gasPrice: 0n,
    abi: factoryAbi,
    functionName: 'deposit',
    address: CONTRACT_ADDRESS,
    ...(!!account?.privateKey && {
      account: privateKeyToAccount(account?.privateKey),
    }),
  });

  const sendETH = async ({
    to,
    amount,
    shouldSave,
    amountSaved,
  }: SendETHProps) => {
    setTxnPending(true);

    try {
      Toast.show({
        type: 'warning',
        text2: 'Waiting for confirmation',
        text1: `Transaction${shouldSave ? 's' : ''} Processing'`,
      });

      // Process the send transaction
      const request = await walletClient.prepareTransactionRequest({
        to,
        ...(!!account?.privateKey && {
          account: privateKeyToAccount(account?.privateKey),
        }),
        value: parseEther(amount),
      });

      const signature = await walletClient.signTransaction(request);

      const txnHash = await walletClient.sendRawTransaction({
        serializedTransaction: signature,
      });

      // Process the savings transaction
      if (shouldSave) {
        const savingsTx = await depositIntoSavings.writeAsync({
          value: parseEther(amountSaved?.ether?.toString()),
        });
        await waitForTransaction({hash: savingsTx?.hash});
      }

      await waitForTransaction({hash: txnHash});

      if (!!txnHash) {
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

  // Withdraw from savings
  const withdrawFromSavings = useContractWrite({
    gasPrice: 0n,
    abi: factoryAbi,
    args: [parseEther('0.001')],
    functionName: 'withdraw',
    address: CONTRACT_ADDRESS,
    ...(!!account?.privateKey && {
      account: privateKeyToAccount(account?.privateKey),
    }),
  });

  const withdrawSavings = async ({amount}: WithdrawETHProps) => {
    try {
      const txnHash = await withdrawFromSavings?.writeAsync({
        args: [parseEther(amount)],
      });
      await waitForTransaction({hash: txnHash?.hash});

      Toast.show({
        type: 'success',
        text1: 'Withdrawal Successful',
        text2: 'Transaction has been confirmed',
      });
    } catch (error) {
      console.log('error', error);

      Toast.show({
        type: 'error',
        text1: 'Withdrawal Failed',
        text2: 'Please try again',
      });
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
        mnemonic: wallet.mnemonic?.phrase,
        address: wallet.address as `0x${string}`,
        privateKey: wallet.privateKey as `0x${string}`,
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
        sendETH,
        txnPending,

        withdrawSavings,
        withdrawFromSavings,

        withdrawalInterval,
        setSavingsWithdrawal,
        updateWithdrawalInterval,

        getSavingsWallet,
        getSavingsBalance,

        smartSavings,
        setSmartSavings,
        toggleSmartSavings,
        createSavingsWallet,

        account,
        setAccount,
        isAddingWallet,
        initialized: true,
        avatar: avatar || '',

        ethPrices,
        setEthPrices,
        curretGasPrice: feeData?.formatted?.gasPrice!,

        currentRPC,
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
  to: `0x${string}`;
  amount: string;
  from?: `0x${string}`;
  shouldSave?: boolean;
  amountSaved: {
    ether: number;
    currency: number;
  };
}

interface WithdrawETHProps {
  amount: string;
}
interface CreateWalletProps {
  type: 'new' | 'mnemonic' | 'privateKey';
  mnemonic?: string;
  privateKey?: string;
}

interface WalletContext {
  txnPending: boolean;
  sendETH: ({to, amount}: SendETHProps) => Promise<void>;

  withdrawSavings: ({amount}: WithdrawETHProps) => void;
  withdrawFromSavings: ReturnType<typeof useContractWrite>;

  withdrawalInterval: WithdrawalInterval | null;
  setSavingsWithdrawal: ReturnType<typeof useContractWrite>;
  updateWithdrawalInterval: (value: WithdrawalInterval) => void;

  getSavingsWallet: ReturnType<typeof useContractRead>;
  getSavingsBalance: ReturnType<typeof useContractRead>;

  smartSavings: boolean | null;
  setSmartSavings: (value: boolean) => void;
  toggleSmartSavings: () => Promise<void>;
  createSavingsWallet: ReturnType<typeof useContractWrite>;

  ethPrices: Record<string, number>;
  curretGasPrice: string | undefined;
  setEthPrices: (ethPrices: Record<string, number>) => void;

  currentRPC: string;
  isAcctReady: boolean;

  avatar: string;
  initialized: boolean;
  isAddingWallet: boolean;
  account: IWallet | null;
  setAccount: (account?: IWallet) => void;

  updateAvatar: (avatar: string) => void;
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

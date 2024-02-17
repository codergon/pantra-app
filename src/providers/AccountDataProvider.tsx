import axios from 'axios';
import dayjs from 'dayjs';
import {useBalance} from 'wagmi';
import {ALCHEMY_API_KEY} from '@env';
import {useWallet} from './WalletProvider';
import {Network, Alchemy} from 'alchemy-sdk';
import currencies from 'constants/currencies';
import {useSettings} from './SettingsProvider';
import {TransactionReceipt} from 'typings/txns';
import {INFTItem, IERC20Tokens} from 'typings/common';
import React, {useEffect, useMemo, useState} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {useQuery, UseQueryResult} from '@tanstack/react-query';

export const alchemy = new Alchemy({
  apiKey: ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
});

export default function AccountDataProvider(props: AccountDataProviderProps) {
  const {isConnected} = useNetInfo();

  const {account, setAccount, currentRPC, ethPrices, setEthPrices} =
    useWallet();
  const {setSettings, setPasscode, activeCurrency, useJazzicons} =
    useSettings();

  const queryEnabled = useMemo(() => {
    return !!account?.address && !!isConnected;
  }, [account?.address]);

  const [txnSearch, setTxnSearch] = useState('');
  const [txnFilter, setTxnFilter] = useState<ITxnFilter>('all');

  const [tokensBalances, setTokensBalances] = useState<ITokensBalances>({});
  const {data: ethBalance} = useBalance({
    watch: true,
    formatUnits: 'ether',
    enabled: queryEnabled,
    address: account?.address!,
  });

  const clearAccounts = () => {
    setAccount();
    setSettings();
    setPasscode();
    setEthPrices({});
    setTxnSearch('');
    setTxnFilter('all');
    setTokensBalances({});
  };

  const ERC20Tokens = useQuery<IERC20Tokens[]>(
    ['ERC20Tokens', account?.address],
    async () => {
      const tokens: IERC20Tokens[] = await axios
        .get(
          `https://${currentRPC}/api/v2/addresses/${account?.address}/tokens?type=ERC-20`,
        )
        .then(res => res.data.items);

      return tokens ?? [];
    },
    {
      enabled: queryEnabled,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  );

  const ERC721Tokens = useQuery<INFTItem[]>(
    ['ERC721Tokens', account?.address],
    async () => {
      const nfts: INFTItem[] = await axios
        .get(
          // `https://${currentRPC}/api/v2/addresses/${account?.address}/nft/collections?type=`,
          `https://${currentRPC}/api/v2/addresses/${'0xb54966096068c54788928658E6d96457d48C9802'}/nft/collections?type=`,
        )
        .then(res => res.data.items);

      return nfts ?? [];
    },
    {
      enabled: queryEnabled,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  );

  // Fetch transactions for account
  const acctTxns = useQuery<TransactionReceipt[]>(
    ['acctTxns', account?.address],
    async () => {
      const txns: TransactionReceipt[] = await axios
        .get<{
          items: TransactionReceipt[];
        }>(
          `https://${currentRPC}/api/v2/addresses/${account?.address}/transactions`,
        )
        .then(res => res.data.items);

      if (!txns) return [];

      const sortedTxns = (txns ?? [])?.sort((a, b) => {
        return dayjs(b?.timestamp).valueOf() - dayjs(a?.timestamp).valueOf();
      });

      return sortedTxns;
    },
    {
      enabled: queryEnabled,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  );

  // Fetch token transfers
  const tokenTransfers = useQuery<TransactionReceipt[]>(
    ['tokenTransfers', account?.address],
    async () => {
      const txns: TransactionReceipt[] = await axios
        .get<{
          items: TransactionReceipt[];
        }>(
          `https://${currentRPC}/api/v2/addresses/${account?.address}/token-transfers?type=`,
        )
        .then(res => res.data.items);

      if (!txns) return [];

      const sortedTxns = (txns ?? []).sort((a, b) => {
        return dayjs(b?.timestamp).valueOf() - dayjs(a?.timestamp).valueOf();
      });

      return sortedTxns;
    },
    {
      enabled: queryEnabled,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  );

  // Filter txns based on search and filter
  const filteredTxns = useMemo(() => {
    if (!acctTxns.data) return [];

    return [...(acctTxns.data ?? []), ...(tokenTransfers.data ?? [])].filter(
      txn =>
        (txnFilter === 'all' ||
          (txnFilter === 'sent' &&
            txn?.from?.hash?.toLowerCase() ===
              account?.address?.toLowerCase()) ||
          (txnFilter === 'received' &&
            txn?.to?.hash?.toLowerCase() ===
              account?.address?.toLowerCase())) &&
        (txnSearch === '' ||
          txn.from?.hash?.toLowerCase().includes(txnSearch.toLowerCase()) ||
          txn?.to?.hash?.toLowerCase().includes(txnSearch.toLowerCase()) ||
          txn?.hash?.toLowerCase().includes(txnSearch.toLowerCase())),
    );
  }, [acctTxns.data, txnFilter, txnSearch, tokenTransfers.data]);

  // Fetch prices for tokens in ACTIVE CURRENCY
  useEffect(() => {
    const fetchPrices = async () => {
      if (!ERC20Tokens.data) return;
      const tokenAddresses = ERC20Tokens.data
        .map(token => token.token.address)
        .join('%2C');

      try {
        // comma separated currency slugs
        const currencySlugs = currencies.reduce((acc, curr) => {
          return acc + curr.slug + '%2C';
        }, '');

        const ethPrices = await axios
          .get(
            `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=${currencySlugs}`,
          )
          .then(res => res.data.ethereum);

        setEthPrices(ethPrices);

        // fetch token prices
        const tokensBalances = await axios
          .get(
            `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${tokenAddresses}&vs_currencies=${currencySlugs}`,
          )
          .then(res => res.data);

        setTokensBalances(tokensBalances);
      } catch (error) {}
    };

    fetchPrices();
  }, [ERC20Tokens?.data]);

  // Calculate account balance based on tokens and eth balance
  const acctBalance = useMemo(() => {
    const ethBalanceCurrent = isNaN(Number(ethBalance?.formatted))
      ? 0
      : Number(ethBalance?.formatted) * ethPrices[activeCurrency?.slug];

    if (!ERC20Tokens.data)
      return {
        total: 0,
        tokens: 0,
        ethBalance: ethBalanceCurrent,
      };

    const totalTokensBalance = (ERC20Tokens?.data || [])?.reduce(
      (acc, token) => {
        const price =
          tokensBalances[token.token.address]?.[activeCurrency?.slug] || 0;
        return acc + (token.value ? price * Number(token.value) : 0);
      },
      0,
    );

    const totalEthBalance =
      totalTokensBalance +
      Number(ethBalance?.formatted) * ethPrices[activeCurrency?.slug];

    return {
      ethBalance: ethBalanceCurrent,
      total: isNaN(totalEthBalance) ? 0 : totalEthBalance,
      tokens: isNaN(totalTokensBalance) ? 0 : totalTokensBalance,
    };
  }, [ethPrices, tokensBalances, ERC20Tokens?.data, activeCurrency]);

  return (
    <AccountDataContext.Provider
      value={{
        ERC20Tokens,
        ERC721Tokens,

        txnFilter,
        txnSearch,
        filteredTxns,
        acctTxns: acctTxns,

        setTxnSearch,
        clearAccounts,
        setTxnFilter,

        ethPrices,
        acctBalance,
        useJazzicons,
        activeCurrency,
        tokensBalances,
        ethBalance: ethBalance?.formatted,
        etherBalance: isNaN(Number(ethBalance?.formatted))
          ? 0
          : Number(ethBalance?.formatted),
      }}>
      {props.children}
    </AccountDataContext.Provider>
  );
}

interface IAcctBalance {
  total: number;
  tokens: number;
  ethBalance: number;
}

type ITokenBalance = {
  [token: string]: number;
};

type ITokensBalances = {
  [address: string]: ITokenBalance;
};

export interface ICollection {
  contract: {
    name: string;
    symbol: string;
  };
  nfts: IERC20Tokens[];
}

export type ITxnFilter = 'all' | 'sent' | 'received' | 'minted';

interface AccountDataContext {
  useJazzicons: boolean;
  ethBalance: string | undefined;
  tokensBalances: ITokensBalances;
  ethPrices: Record<string, number>;
  activeCurrency: (typeof currencies)[number];

  etherBalance: number;
  clearAccounts: () => void;

  ERC20Tokens: UseQueryResult<IERC20Tokens[], unknown>;
  ERC721Tokens: UseQueryResult<INFTItem[], unknown>;

  filteredTxns: TransactionReceipt[];
  acctTxns: UseQueryResult<TransactionReceipt[], unknown>;

  txnSearch: string;
  txnFilter: ITxnFilter;
  acctBalance: IAcctBalance;
  setTxnSearch: React.Dispatch<React.SetStateAction<string>>;
  setTxnFilter: React.Dispatch<React.SetStateAction<ITxnFilter>>;
}

const AccountDataContext = React.createContext({} as AccountDataContext);

type AccountDataProviderProps = {
  children: React.ReactNode;
};

export function useAccountData() {
  const value = React.useContext(AccountDataContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error(
        'useAccountData must be wrapped in a <AccountDataProvider />',
      );
    }
  }
  return value;
}

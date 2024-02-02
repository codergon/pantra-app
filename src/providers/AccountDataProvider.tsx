import axios from 'axios';
import dayjs from 'dayjs';
import {useBalance} from 'wagmi';
import {ALCHEMY_API_KEY} from '@env';
import {useWallet} from './WalletProvider';
import currencies from 'constants/currencies';
import {useSettings} from './SettingsProvider';
import React, {useEffect, useMemo, useState} from 'react';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {
  Network,
  Alchemy,
  OwnedToken,
  SortingOrder,
  NftContractForNft,
  OwnedNftsResponse,
  AssetTransfersCategory,
  GetTokensForOwnerResponse,
  AssetTransfersWithMetadataResponse,
} from 'alchemy-sdk';
import {ITransaction} from 'typings/common';

export const alchemy = new Alchemy({
  apiKey: ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
});

export default function AccountDataProvider(props: AccountDataProviderProps) {
  const {account, setAccount} = useWallet();
  const {setSettings, setPasscode} = useSettings();
  const {activeCurrency, useJazzicons} = useSettings();

  const queryEnabled = useMemo(() => {
    return !!account?.address;
  }, [account?.address]);

  const [txnSearch, setTxnSearch] = useState('');
  const [txnFilter, setTxnFilter] = useState<ITxnFilter>('all');

  const [ethPrices, setEthPrices] = useState<Record<string, number>>({});
  const [tokensBalances, setTokensBalances] = useState<ITokensBalances>({});
  const {data: ethBalance} = useBalance({
    watch: true,
    formatUnits: 'ether',
    enabled: queryEnabled,
    address: account?.address! as `0x${string}`,
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

  const acctTokens = useQuery<GetTokensForOwnerResponse>(
    ['acctTokens', account?.address],
    async () => {
      // return await axios.
      return await alchemy.core.getTokensForOwner(account?.address!);
    },
    {
      enabled: queryEnabled,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  );

  const acctTxns = useQuery<ITransaction[]>(
    ['acctTxns', account?.address],
    async () => {
      const txns: ITransaction[] = await axios
        .get<{
          result: ITransaction[];
        }>(
          `https://pegasus.lightlink.io/api?module=account&action=txlist&address=0xf521fC8d46007f5cb9dAf69e873541843294E834&sort=asc`,
        )
        .then(res => res.data.result);

      if (!txns) return [];

      const sortedTxns = (txns ?? []).sort((a, b) => {
        return dayjs(b?.timeStamp).valueOf() - dayjs(a?.timeStamp).valueOf();
      });

      return sortedTxns;
    },
    {
      enabled: queryEnabled,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  );

  const acctNfts = useQuery<OwnedNftsResponse>(
    ['acctNfts', account?.address],
    async () => {
      return await alchemy.nft.getNftsForOwner(account?.address!);
    },
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      enabled: !!account?.address,
    },
  );

  const nftsCollections = useMemo(() => {
    if (!acctNfts.data?.ownedNfts) return [];

    const grouped = acctNfts.data?.ownedNfts.reduce((acc, nft) => {
      const key = nft.contract?.address.toLowerCase();
      if (!acc[key]) {
        acc[key] = {
          contract: nft.contract.openSeaMetadata,
          nfts: [],
        };
      }
      acc[key].nfts.push(nft);
      return acc;
    }, {} as {[key: string]: {contract: NftContractForNft['openSeaMetadata']; nfts: OwnedNftsResponse['ownedNfts']}});

    return Object.values(grouped);
  }, [acctNfts.data?.ownedNfts]);

  // Filter txns based on search and filter
  const filteredTxns = useMemo(() => {
    if (!acctTxns.data) return [];

    return acctTxns.data.filter(
      txn =>
        (txnFilter === 'all' ||
          (txnFilter === 'sent' &&
            txn.from === account?.address?.toLowerCase()) ||
          (txnFilter === 'received' &&
            txn.to === account?.address?.toLowerCase())) &&
        (txnSearch === '' ||
          txn.from?.toLowerCase().includes(txnSearch.toLowerCase()) ||
          txn.to?.toLowerCase().includes(txnSearch.toLowerCase()) ||
          txn.hash?.toLowerCase().includes(txnSearch.toLowerCase())),
    );
  }, [acctTxns.data, txnFilter, txnSearch]);

  // Fetch prices for tokens in ACTIVE CURRENCY
  useEffect(() => {
    const fetchPrices = async () => {
      if (!acctTokens.data?.tokens) return;
      const tokenAddresses = acctTokens.data.tokens
        .map(token => token.contractAddress)
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
  }, [acctTokens?.data?.tokens]);

  const acctBalance = useMemo(() => {
    const ethBalanceCurrent = isNaN(Number(ethBalance?.formatted))
      ? 0
      : Number(ethBalance?.formatted) * ethPrices[activeCurrency?.slug];

    if (!acctTokens.data?.tokens)
      return {
        total: 0,
        tokens: 0,
        ethBalance: ethBalanceCurrent,
      };

    const totalTokensBalance = acctTokens?.data?.tokens?.reduce(
      (acc, token) => {
        const price =
          tokensBalances[token.contractAddress]?.[activeCurrency?.slug] || 0;
        return acc + (token.balance ? price * Number(token.balance) : 0);
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
  }, [ethPrices, tokensBalances, acctTokens?.data, activeCurrency]);

  return (
    <AccountDataContext.Provider
      value={{
        acctNfts,
        txnFilter,
        txnSearch,
        acctBalance,
        setTxnSearch,
        setTxnFilter,
        filteredTxns,
        nftsCollections,

        acctTxns: acctTxns,

        clearAccounts,

        ethPrices,
        useJazzicons,
        activeCurrency,
        tokensBalances,
        ethBalance: ethBalance?.formatted,
        acctTokens: acctTokens?.data?.tokens! ?? [],
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
  contract: NftContractForNft['openSeaMetadata'];
  nfts: OwnedNftsResponse['ownedNfts'];
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

  filteredTxns: ITransaction[];
  acctTxns: UseQueryResult<ITransaction[], unknown>;

  txnSearch: string;
  txnFilter: ITxnFilter;
  acctTokens: OwnedToken[];
  acctBalance: IAcctBalance;
  nftsCollections: ICollection[];
  acctNfts: UseQueryResult<OwnedNftsResponse, unknown>;
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

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

export const alchemy = new Alchemy({
  apiKey: ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
});

export const testAddress = '0xFE83aa8439A8699A25CA47D81e9Be430F5476F93';

export default function AccountDataProvider(props: AccountDataProviderProps) {
  const {account} = useWallet();
  const {activeCurrency, useJazzicons} = useSettings();

  const [txnSearch, setTxnSearch] = useState('');
  const [txnFilter, setTxnFilter] = useState<ITxnFilter>('all');

  const [ethPrices, setEthPrices] = useState<Record<string, number>>({});
  const [tokensBalances, setTokensBalances] = useState<ITokensBalances>({});
  const {data: ethBalance} = useBalance({
    formatUnits: 'ether',
    address: testAddress ?? account?.address,
  });

  const acctTokens = useQuery<GetTokensForOwnerResponse>(
    ['acctTokens', account?.address],
    async () => {
      return await alchemy.core.getTokensForOwner('alphaglitch.eth');
    },
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      enabled: !!account?.address,
    },
  );

  const acctNfts = useQuery<OwnedNftsResponse>(
    ['acctNfts', account?.address],
    async () => {
      return await alchemy.nft.getNftsForOwner('alphaglitch.eth');
    },
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      enabled: !!account?.address,
    },
  );

  const acctTxns = useQuery<AssetTransfersWithMetadataResponse>(
    ['acctTxns', account?.address],
    async () => {
      const fromTxns = await alchemy.core.getAssetTransfers({
        fromBlock: '0x0',
        withMetadata: true,
        excludeZeroValue: false,
        fromAddress: testAddress,
        order: SortingOrder.DESCENDING,
        category: [
          AssetTransfersCategory.ERC20,
          AssetTransfersCategory.ERC721,
          AssetTransfersCategory.ERC1155,
          AssetTransfersCategory.INTERNAL,
          AssetTransfersCategory.EXTERNAL,
        ],
      });

      const toTxns = await alchemy.core.getAssetTransfers({
        fromBlock: '0x0',
        withMetadata: true,
        toAddress: testAddress,
        excludeZeroValue: false,
        order: SortingOrder.DESCENDING,
        category: [
          AssetTransfersCategory.ERC20,
          AssetTransfersCategory.ERC721,
          AssetTransfersCategory.ERC1155,
          AssetTransfersCategory.INTERNAL,
          AssetTransfersCategory.EXTERNAL,
        ],
      });

      const sortedTxns = [...fromTxns.transfers, ...toTxns.transfers].sort(
        (a, b) => {
          return (
            dayjs(b?.metadata?.blockTimestamp).valueOf() -
            dayjs(a?.metadata?.blockTimestamp).valueOf()
          );
        },
      );

      return {
        transfers: sortedTxns,
      };
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
    if (!acctTxns.data?.transfers) return [];

    return acctTxns.data?.transfers.filter(
      txn =>
        (txnFilter === 'all' ||
          (txnFilter === 'sent' && txn.from === testAddress.toLowerCase()) ||
          (txnFilter === 'received' && txn.to === testAddress.toLowerCase())) &&
        (txnSearch === '' ||
          txn.from?.toLowerCase().includes(txnSearch.toLowerCase()) ||
          txn.to?.toLowerCase().includes(txnSearch.toLowerCase()) ||
          txn.hash?.toLowerCase().includes(txnSearch.toLowerCase())),
    );
  }, [acctTxns.data?.transfers, txnFilter, txnSearch]);

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
    if (!acctTokens.data?.tokens) return {total: 0, tokens: 0};

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
      total: isNaN(totalEthBalance) ? 0 : totalEthBalance,
      tokens: isNaN(totalTokensBalance) ? 0 : totalTokensBalance,
    };
  }, [ethPrices, tokensBalances, acctTokens?.data, activeCurrency]);

  return (
    <AccountDataContext.Provider
      value={{
        acctNfts,
        acctTxns,
        txnFilter,
        txnSearch,
        acctBalance,
        setTxnSearch,
        setTxnFilter,
        filteredTxns,
        nftsCollections,

        ethPrices,
        useJazzicons,
        activeCurrency,
        tokensBalances,
        acctTokens: acctTokens?.data?.tokens!,
      }}>
      {props.children}
    </AccountDataContext.Provider>
  );
}

interface IAcctBalance {
  total: number;
  tokens: number;
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
  tokensBalances: ITokensBalances;
  ethPrices: Record<string, number>;
  activeCurrency: (typeof currencies)[number];

  txnSearch: string;
  txnFilter: ITxnFilter;
  acctBalance: IAcctBalance;
  nftsCollections: ICollection[];
  setTxnSearch: React.Dispatch<React.SetStateAction<string>>;
  filteredTxns: AssetTransfersWithMetadataResponse['transfers'];
  setTxnFilter: React.Dispatch<React.SetStateAction<ITxnFilter>>;
  acctTokens: OwnedToken[];
  acctNfts: UseQueryResult<OwnedNftsResponse, unknown>;
  acctTxns: UseQueryResult<AssetTransfersWithMetadataResponse, unknown>;
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

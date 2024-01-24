import axios from 'axios';
import dayjs from 'dayjs';
import {ALCHEMY_API_KEY} from '@env';
import {Address, useBalance} from 'wagmi';
import {useWallet} from './WalletProvider';
import React, {useEffect, useMemo, useState} from 'react';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {
  Network,
  Alchemy,
  OwnedToken,
  SortingOrder,
  OwnedNftsResponse,
  AssetTransfersCategory,
  GetTokensForOwnerResponse,
  AssetTransfersWithMetadataResponse,
  OwnedNft,
  NftContractForNft,
} from 'alchemy-sdk';

export const alchemy = new Alchemy({
  apiKey: ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
});

export const testAddress = '0xFE83aa8439A8699A25CA47D81e9Be430F5476F93';

export default function AccountDataProvider(props: AccountDataProviderProps) {
  const {account} = useWallet();
  const [txnSearch, setTxnSearch] = useState('');
  const [ethUsdPrice, setEthUsdPrice] = useState(0);
  const [txnFilter, setTxnFilter] = useState<ITxnFilter>('all');
  const [usdBalance, setUsdBalance] = useState<IUsdBalance>({
    total: 0,
    tokens: 0,
  });
  const [acctTokens, setAcctTokens] = useState<
    (OwnedToken & {
      usdBalance?: number;
    })[]
  >([]);

  const {data: ethBalance} = useBalance({
    formatUnits: 'ether',
    address: testAddress ?? (account?.address as Address),
  });

  const tokens = useQuery<GetTokensForOwnerResponse>(
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

  // Fetch USD prices for tokens
  useEffect(() => {
    const fetchUsdPrices = async () => {
      if (!tokens.data?.tokens) return;
      const tokenAddresses = tokens.data.tokens
        .map(token => token.contractAddress)
        .join('%2C');

      try {
        const tokensUsdBalance = await axios
          .get(
            `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${tokenAddresses}&vs_currencies=usd`,
          )
          .then(res => res.data);

        const ethUsdPrice = await axios
          .get(
            `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`,
          )
          .then(res => res.data.ethereum.usd);

        const newTokens = tokens.data.tokens.map(token => {
          return {
            ...token,
            usdBalance:
              tokensUsdBalance[token.contractAddress]?.usd *
              Number(token.balance),
          };
        });

        const totalTokensInUsd = newTokens.reduce(
          (acc, token) =>
            acc + (!isNaN(token.usdBalance) ? token.usdBalance : 0),
          0,
        );

        setEthUsdPrice(ethUsdPrice);
        setUsdBalance({
          tokens: totalTokensInUsd,
          total: totalTokensInUsd + Number(ethBalance?.formatted) * ethUsdPrice,
        });

        setAcctTokens(newTokens);
      } catch (error) {
        if (tokens.data?.tokens) {
          setAcctTokens(tokens.data?.tokens);
        }
      }
    };

    fetchUsdPrices();
  }, [tokens.data?.tokens]);

  return (
    <AccountDataContext.Provider
      value={{
        acctNfts,
        acctTxns,
        txnFilter,
        txnSearch,
        acctTokens,
        usdBalance,
        ethUsdPrice,
        setTxnSearch,
        setTxnFilter,
        filteredTxns,
        nftsCollections,
      }}>
      {props.children}
    </AccountDataContext.Provider>
  );
}

interface IUsdBalance {
  total: number;
  tokens: number;
}

export interface ICollection {
  contract: NftContractForNft['openSeaMetadata'];
  nfts: OwnedNftsResponse['ownedNfts'];
}

export type ITxnFilter = 'all' | 'sent' | 'received' | 'minted';

interface AccountDataContext {
  txnSearch: string;
  ethUsdPrice: number;
  txnFilter: ITxnFilter;
  usdBalance: IUsdBalance;
  nftsCollections: ICollection[];
  setTxnSearch: React.Dispatch<React.SetStateAction<string>>;
  filteredTxns: AssetTransfersWithMetadataResponse['transfers'];
  setTxnFilter: React.Dispatch<React.SetStateAction<ITxnFilter>>;
  acctTokens: (OwnedToken & {
    usdBalance?: number;
  })[];
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

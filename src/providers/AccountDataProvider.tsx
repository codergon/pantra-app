import axios from 'axios';
import {Address, useBalance} from 'wagmi';
import {useWallet} from './WalletProvider';
import React, {useEffect, useState} from 'react';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {INFURA_API_KEY, ALCHEMY_API_KEY, INFURA_API_KEY_SECRET} from '@env';
import {
  Network,
  Alchemy,
  OwnedToken,
  OwnedNftsResponse,
  AssetTransfersCategory,
  GetTokensForOwnerResponse,
  AssetTransfersWithMetadataResponse,
} from 'alchemy-sdk';

const alchemy = new Alchemy({
  apiKey: ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
});

const Auth = btoa(INFURA_API_KEY + ':' + INFURA_API_KEY_SECRET);

export default function AccountDataProvider(props: AccountDataProviderProps) {
  const {account} = useWallet();
  const [ethUsdPrice, setEthUsdPrice] = useState(0);
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
    address:
      '0xFE83aa8439A8699A25CA47D81e9Be430F5476F93' ??
      (account?.address as Address),
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
      return await alchemy.core.getAssetTransfers({
        fromBlock: '0x0',
        withMetadata: true,
        fromAddress: '0xFE83aa8439A8699A25CA47D81e9Be430F5476F93',
        category: [
          AssetTransfersCategory.ERC20,
          AssetTransfersCategory.ERC721,
          AssetTransfersCategory.ERC1155,
          AssetTransfersCategory.INTERNAL,
          AssetTransfersCategory.EXTERNAL,
        ],
      });
    },
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      enabled: !!account?.address,
    },
  );

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
        acctTokens,
        usdBalance,
        ethUsdPrice,
      }}>
      {props.children}
    </AccountDataContext.Provider>
  );
}

interface IUsdBalance {
  total: number;
  tokens: number;
}

interface AccountDataContext {
  ethUsdPrice: number;
  usdBalance: IUsdBalance;
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

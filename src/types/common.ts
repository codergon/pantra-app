import {Wallet} from 'ethers';

export type IWallet = {
  name?: string;
  address?: Wallet['address'];
  privateKey?: Wallet['privateKey'];
  mnemonic?: Wallet['mnemonic']['phrase'];
};

export interface ITransaction {
  blockHash: string;
  blockNumber: string;
  confirmations: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  from: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  hash: string;
  input: string;
  isError: string;
  nonce: string;
  timeStamp: string;
  to: string;
  transactionIndex: string;
  txreceipt_status: string;
  value: string;
}

export interface TransactionReceipt {
  blockNumber: string;
  confirmations: string;
  from: string;
  gasLimit: string;
  gasPrice: string;
  gasUsed: string;
  hash: string;
  input: string;
  logs: any[];
  next_page_params: any;
  revertReason: string;
  success: boolean;
  timeStamp: string;
  to: string;
  value: string;
}

export interface IERC721Tokens {
  token: Token721;
  token_id: any;
  token_instance: any;
  value: string;
}

export interface Token721 {
  address: string;
  circulating_market_cap: any;
  decimals: any;
  exchange_rate: any;
  holders: string;
  icon_url: any;
  name: string;
  symbol: string;
  total_supply: string;
  type: string;
}

export interface IERC20Tokens {
  token: Token20;
  token_id: any;
  token_instance: any;
  value: string;
}

export interface Token20 {
  address: string;
  circulating_market_cap: any;
  decimals: string;
  exchange_rate: any;
  holders: string;
  icon_url: string;
  name: string;
  symbol: string;
  total_supply: string;
  type: string;
}

// ==============
export interface INFTItem {
  amount: string;
  token: NFT;
  token_instances: TokenInstance[];
}

export interface NFT {
  address: string;
  circulating_market_cap: any;
  decimals: any;
  exchange_rate: any;
  holders: string;
  icon_url: any;
  name: string;
  symbol: string;
  total_supply: string;
  type: string;
}

export interface TokenInstance {
  animation_url: any;
  external_app_url: any;
  id: string;
  image_url: string;
  is_unique: any;
  metadata: Metadata;
  owner: any;
  token: any;
  token_type: string;
  value: string;
}

export interface Metadata {
  attributes: Attribute[];
  image: string;
  name: string;
}

export interface Attribute {
  trait_type: string;
  value: any;
}

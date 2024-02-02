import {Wallet} from 'ethers';

export type IWallet = {
  name?: string;
  address?: Wallet['address'];
  privateKey?: Wallet['privateKey'];
  mnemonic?: Wallet['mnemonic']['phrase'];
};

export type RecentSearches = RecentSearch[];

export type RecentSearch = {
  id: string;
  keyword?: string;
  type: 'keyword' | 'contact';
  creator?: RecentSearchContact;
};

export interface RecentSearchContact {
  id?: string;
  address?: string;
  image_url?: string;
}

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

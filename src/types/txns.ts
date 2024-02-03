export interface TransactionReceipt {
  timestamp: string;
  fee: Fee;
  gas_limit: string;
  block: number;
  status: string;
  method: string;
  confirmations: number;
  type: number;
  exchange_rate: any;
  to: To;
  tx_burnt_fee: any;
  max_fee_per_gas: any;
  result: string;
  hash: string;
  gas_price: string;
  priority_fee: any;
  base_fee_per_gas: any;
  from: From;
  token_transfers: TokenTransfer[];
  tx_types: string[];
  gas_used: string;
  created_contract: CreatedContract;
  position: number;
  nonce: number;
  has_error_in_internal_txs: boolean;
  actions: any[];
  decoded_input: DecodedInput;
  token_transfers_overflow: boolean;
  raw_input: string;
  value: string;
  max_priority_fee_per_gas: any;
  revert_reason: any;
  confirmation_duration: number[];
  tx_tag: any;
  tx_hash: string;

  total: Total;
  token: Token;
}

export interface Fee {
  type: string;
  value: string;
}

export interface To {
  ens_domain_name: any;
  hash: string;
  implementation_name: string;
  is_contract: boolean;
  is_verified: boolean;
  name: string;
  private_tags: any[];
  public_tags: any[];
  watchlist_names: any[];
}

export interface From {
  ens_domain_name: any;
  hash: string;
  implementation_name: any;
  is_contract: boolean;
  is_verified: any;
  name: any;
  private_tags: any[];
  public_tags: any[];
  watchlist_names: any[];
}

export interface TokenTransfer {
  block_hash: string;
  from: From2;
  log_index: string;
  method: any;
  timestamp: any;
  to: To2;
  token: Token;
  total: Total;
  tx_hash: string;
  type: string;
}

export interface From2 {
  ens_domain_name: any;
  hash: string;
  implementation_name: any;
  is_contract: boolean;
  is_verified: boolean;
  name: any;
  private_tags: any[];
  public_tags: any[];
  watchlist_names: any[];
}

export interface To2 {
  ens_domain_name: any;
  hash: string;
  implementation_name: any;
  is_contract: boolean;
  is_verified: boolean;
  name: any;
  private_tags: any[];
  public_tags: any[];
  watchlist_names: any[];
}

export interface Token {
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

export interface Total {
  decimals: string;
  value: string;
}

export interface CreatedContract {
  ens_domain_name: any;
  hash: string;
  implementation_name: any;
  is_contract: boolean;
  is_verified: any;
  name: any;
  private_tags: any[];
  public_tags: any[];
  watchlist_names: any[];
}

export interface DecodedInput {
  method_call: string;
  method_id: string;
  parameters: Parameter[];
}

export interface Parameter {
  name: string;
  type: string;
  value: string;
}

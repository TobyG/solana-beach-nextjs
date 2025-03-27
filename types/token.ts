

export interface TokenInfo {
  address: string;
  name?: string;
  logo?: string;
  ticker: string;
  cmcId: string;
}

export interface TokenBalance {
  mint: TokenInfo;
  amount: number;
  address: TokenInfo;
  decimals: number;
} 
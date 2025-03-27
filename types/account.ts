export interface AddressInfo {
  address: string;
  name: string;
  logo: string;
  ticker: string;
  cmcId: string;
}

export interface AccountBase {
  address: AddressInfo;
  balance: number;
  executable: boolean;
  owner: AddressInfo;
  rentEpoch: number;
  dataSize: number;
}

export interface AccountResponse {
  type: string;
  value: {
    base: AccountBase;
    extended: Record<string, any>;
  };
}

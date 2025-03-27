export interface AccountInfo {
  address: string;
  name?: string;
  logo?: string;
  ticker?: string;
  cmcId?: string;
}

export interface AccountInTransaction {
  isSigner: boolean;
  isWritable: boolean;
  isLUT: boolean;
  account: AccountInfo;
}

export interface TransactionHeader {
  numReadonlySignedAccounts: number;
  numReadonlyUnsignedAccounts: number;
  numRequiredSignatures: number;
}

export interface ProgramId {
  name: string;
  address: string;
}

export interface TransferSolInstruction {
  amount: number;
  source: {
    address: string;
  };
  destination: {
    address: string;
  };
  signers: {
    address: string;
  }[];
  writable: {
    address: string;
  }[];
}

export interface SetComputeUnitPriceInstruction {
  microLamports: number;
}

export interface SetComputeUnitLimitInstruction {
  units: number;
}

export interface Instruction {
  parsed: {
    SetComputeUnitPrice?: SetComputeUnitPriceInstruction;
    SetComputeUnitLimit?: SetComputeUnitLimitInstruction;
    TransferSol?: TransferSolInstruction;
  };
  programId: ProgramId;
}

export interface LoadedAddresses {
  readonly: string[];
  writable: string[];
}

export interface TransactionMeta {
  computeUnitsConsumed: number;
  err: any;
  fee: number;
  loadedAddresses: LoadedAddresses;
  logMessages: string[];
  postBalances: number[];
  postTokenBalances: any[];
  preBalances: number[];
  preTokenBalances: any[];
  rewards: any[];
  status: {
    Ok: null;
  };
}

export interface Blocktime {
  absolute: number;
  relative: number;
}

export interface MostImportantInstruction {
  name: string;
  weight: number;
  index: number;
}

export interface Transaction {
  transactionHash: string;
  blockNumber: number;
  accounts: AccountInTransaction[];
  header: TransactionHeader;
  instructions: Instruction[];
  recentBlockhash: string;
  signatures: string[];
  meta: TransactionMeta;
  valid: boolean;
  blocktime: Blocktime;
  mostImportantInstruction: MostImportantInstruction;
  overpaidFees: number;
} 
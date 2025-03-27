export interface ValidatorDetails {
  validator: {
    activatedStake: number;
    stakePercentage: number;
    commission: number;
    epochCredits: number[];
    epochVoteAccount: boolean;
    lastVote: number;
    nodePubkey: string;
    rootSlot: number;
    votePubkey: string;
    blockProduction: {
      leaderSlots: number;
      skippedSlots: number;
    };
    delegatingStakeAccounts: DelegatingStakeAccount[];
    delegatorCount: number;
    location: {
      range: number[];
      country: string;
      region: string;
      eu: string;
      timezone: string;
      city: string;
      ll: number[];
      metro: number;
      area: number;
    };
    moniker: string;
    website: string;
    pictureURL: string;
    version: string;
    details: string;
    asn: {
      code: string;
      organization: string;
    };
  };
  slots: Slot[][];
  historic: HistoricData[];
  latestBlocks: Block[];
}

interface DelegatingStakeAccount {
  pubkey: string;
  lamports: number;
  data: {
    state: number;
    meta: {
      rent_exempt_reserve: number;
      authorized: {
        staker: string;
        withdrawer: string;
      };
    };
    lockup: {
      unix_timestamp: number;
      epoch: number;
      custodian: string;
    };
    stake: {
      delegation: {
        voter_pubkey: string;
        stake: number;
        activation_epoch: number;
        deactivation_epoch: number;
        warmup_cooldown_rate: number;
        validatorInfo: {
          name: string;
          image: string;
          website: string;
          nodePubkey: string;
        };
      };
      credits_observed: number;
    };
  };
}

interface Slot {
  relativeSlot: number;
  absoluteSlot: number;
  confirmedBlock: boolean;
}

export interface HistoricData {
  stake: number;
  delegators: number;
  timestamp: string;
}

export interface Block {
  blocknumber: number;
  blocktime: {
    absolute: number;
    relative: number;
  };
  metrics: {
    txcount: number;
    failedtxs: number;
    totalfees: number;
    instructions: number;
    sucessfultxs: number;
    innerinstructions: number;
    totalvaluemoved: number;
  };
  proposer: string;
} 
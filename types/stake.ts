export interface StakeReward {
  epoch: number;
  effectiveSlot: number;
  amount: string;
  postBalance: string;
  percentChange: number;
  apr: number;
}

export interface StakeDelegation {
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
}

export interface StakeData {
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
    delegation: StakeDelegation;
    credits_observed: number;
  };
}

export interface Stake {
  pubkey: string;
  lamports: number;
  data: StakeData;
}

export interface PaginatedStakesResponse {
  totalPages: number;
  data: Stake[];
} 
export interface Validator {
  activatedStake: number;
  commission: number;
  votePubkey: string;
  delegatorCount: number;
  ll: [number, number];
  moniker: string;
  version: string;
  lastVote: number;
  pictureURL: string;
} 
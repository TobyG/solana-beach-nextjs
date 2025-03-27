import { Stake } from '@/types/stake';

interface StakesTabProps {
  stakes: Stake[];
}

export function StakesTab({ stakes }: StakesTabProps) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-4">Stake Accounts</h3>
      <div className="space-y-4">
        {stakes.map((stake, index) => (
          <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium">Stake Account</p>
                <p className="font-mono text-sm">{stake.pubkey}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{stake.lamports / 1e9} SOL</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Balance</p>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">Delegated to:</span>{' '}
                <span className="font-mono">{stake.data.stake.delegation.voter_pubkey}</span>
              </p>
              <p className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">Validator:</span>{' '}
                {stake.data.stake.delegation.validatorInfo.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
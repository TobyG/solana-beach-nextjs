'use client';

import { Validator } from '../types/validator';

function calculate33PercentThreshold(validators: Validator[]) {
  const totalStake = validators.reduce((sum, v) => sum + v.activatedStake, 0);
  const threshold = totalStake * 0.33;
  
  let currentSum = 0;
  let count = 0;
  
  for (const validator of validators) {
    currentSum += validator.activatedStake;
    count++;
    if (currentSum >= threshold) {
      break;
    }
  }
  
  return {
    count,
    percentage: (currentSum / totalStake * 100).toFixed(1)
  };
}

export function ValidatorStats({ topValidators, allValidators }: { topValidators: Validator[], allValidators: Validator[] }) {
  const threshold = calculate33PercentThreshold(allValidators);

  return (
    <div className="grid gap-4 md:grid-cols-3 mb-8">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Top Validators</h3>
        <div className="mt-2 text-2xl font-bold">{topValidators.length}</div>
      </div>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Validators</h3>
        <div className="mt-2 text-2xl font-bold">{allValidators.length}</div>
      </div>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Validators for 33% Stake</h3>
        <div className="mt-2 text-2xl font-bold">{threshold.count}</div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          ({threshold.percentage}% of total stake)
        </p>
      </div>
    </div>
  );
} 
import { Transaction } from '@/types/transaction';
import { fetchAccountTransactions } from '@/app/services/api';

interface Props {
  pubkey: string;
}

export async function TransactionsTab({ pubkey }: Props) {
  const transactions = await fetchAccountTransactions(pubkey);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-4">Transaction History</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Hash
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Fee (SOL)
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Instructions
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {transactions.map((tx) => {
              const firstInstruction = tx.instructions[0];
              const firstInstructionType = firstInstruction ? Object.keys(firstInstruction.parsed)[0] : '';
              const remainingInstructions = tx.instructions.length - 1;

              return (
                <tr key={tx.transactionHash}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-mono text-sm text-gray-900 dark:text-gray-100">
                      {tx.transactionHash.slice(0, 4)}...{tx.transactionHash.slice(-4)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      tx.valid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {tx.valid ? 'Success' : 'Failed'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {(tx.meta.fee / 1e9).toString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {firstInstructionType}
                    {remainingInstructions > 0 && (
                      <span className="ml-1 text-xs text-gray-400">+{remainingInstructions}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(tx.blocktime.absolute * 1000).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
} 
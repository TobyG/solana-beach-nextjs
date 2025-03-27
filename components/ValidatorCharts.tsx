'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HistoricData, Block } from '../types/validator-details';

interface ValidatorChartsProps {
  historic: HistoricData[];
  latestBlocks: Block[];
}

export function ValidatorCharts({ historic, latestBlocks }: ValidatorChartsProps) {
  return (
    <>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
        <h3 className="text-lg font-medium mb-4">Stake and Delegator History</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historic}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleString()}
                formatter={(value: number) => [value.toLocaleString(), '']}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="stake" 
                stroke="#8884d8" 
                name="Stake (SOL)"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="delegators" 
                stroke="#82ca9d" 
                name="Delegators"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
        <h3 className="text-lg font-medium mb-4">Latest Blocks</h3>
        <div className="rounded-md border">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4">Block</th>
                <th className="text-left py-2 px-4">Time</th>
                <th className="text-right py-2 px-4">Transactions</th>
                <th className="text-right py-2 px-4">Success Rate</th>
              </tr>
            </thead>
            <tbody>
              {latestBlocks.map((block) => (
                <tr key={block.blocknumber} className="border-b">
                  <td className="py-2 px-4">{block.blocknumber.toLocaleString()}</td>
                  <td className="py-2 px-4">
                    {new Date(block.blocktime.absolute * 1000).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 text-right">{block.metrics.txcount.toLocaleString()}</td>
                  <td className="py-2 px-4 text-right">
                    {((block.metrics.sucessfultxs / block.metrics.txcount) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
} 
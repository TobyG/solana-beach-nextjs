'use client';
import { TokenBalance } from '@/types/token';
import { Coins } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

interface PortfolioTabProps {
  tokens: TokenBalance[];
}

export function PortfolioTab({ tokens }: PortfolioTabProps) {
  const [showZeroBalances, setShowZeroBalances] = useState(false);
  const [showUnnamedTokens, setShowUnnamedTokens] = useState(false);

  const filteredTokens = tokens.filter(token => 
    (showZeroBalances || token.amount > 0) &&
    (showUnnamedTokens || token.mint.name)
  );

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Token Balances</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Show zero balances</span>
            <Switch
              checked={showZeroBalances}
              onCheckedChange={setShowZeroBalances}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Show unnamed tokens</span>
            <Switch
              checked={showUnnamedTokens}
              onCheckedChange={setShowUnnamedTokens}
            />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {filteredTokens.map((token, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              {token.mint.logo ? (
                <img src={token.mint.logo} alt={token.mint.name || token.mint.address} className="w-8 h-8 rounded-full" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                  <Coins className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
              )}
              <div>
                <p className="font-medium">{token.mint.name || token.mint.address}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{token.mint.ticker || token.mint.address.slice(0, 4) + '...' + token.mint.address.slice(-4)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">{token.amount / Math.pow(10, token.decimals)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
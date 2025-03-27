import { AccountResponse } from '@/types/account';
import { TokenBalance } from '@/types/token';
import { Stake } from '@/types/stake';
import { fetchAccountDetails, fetchAccountTokens, fetchAccountStakes, fetchStakeRewards } from '@/app/services/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PortfolioTab, StakesTab, TransactionsTab, SplTransfersTab } from '@/components/account-tabs';

interface Props {
  params: {
    addressId: string;
  };
}

export default async function AccountPage({ params }: Props) {
  const { addressId } = params;
  const accountData = await fetchAccountDetails(addressId);
  const { base } = accountData.value;
  const tokens = await fetchAccountTokens(addressId);
  const stakesResponse = await fetchAccountStakes(addressId);
  const stakes = stakesResponse.data;

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Account Details</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm p-6">
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Address</h2>
          <div className="flex items-center gap-2">
            {base.address.logo && (
              <img 
                src={base.address.logo} 
                alt={base.address.name} 
                className="w-6 h-6 rounded-full"
              />
            )}
            <p className="font-mono text-sm break-all">{base.address.address}</p>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {base.address.name} ({base.address.ticker})
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-medium mb-2">Balance</h2>
            <p className="text-2xl font-bold">{base.balance} {base.address.ticker}</p>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-2">Owner</h2>
            <div className="flex items-center gap-2">
              {base.owner.logo && (
                <img 
                  src={base.owner.logo} 
                  alt={base.owner.name} 
                  className="w-6 h-6 rounded-full"
                />
              )}
              <p className="font-mono text-sm break-all">{base.owner.address}</p>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {base.owner.name} ({base.owner.ticker})
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-2">Account Details</h2>
            <div className="space-y-1">
              <p className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">Executable:</span>{' '}
                <span className={base.executable ? 'text-green-500' : 'text-red-500'}>
                  {base.executable ? 'Yes' : 'No'}
                </span>
              </p>
              <p className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">Data Size:</span>{' '}
                {base.dataSize} bytes
              </p>
              <p className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">Rent Epoch:</span>{' '}
                {base.rentEpoch}
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="portfolio" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="stakes">Stakes</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="spl-transfers">SPL Transfers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="portfolio">
            <PortfolioTab tokens={tokens} />
          </TabsContent>

          <TabsContent value="stakes">
            <StakesTab stakes={stakes} />
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionsTab pubkey={addressId} />
          </TabsContent>

          <TabsContent value="spl-transfers">
            <SplTransfersTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 
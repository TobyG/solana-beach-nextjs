
import { ValidatorDetails } from '../../../types/validator-details';
import { notFound } from 'next/navigation';
import { Avatar } from '../../../components/Avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ValidatorCharts } from '../../../components/ValidatorCharts';
import { fetchValidatorDetails } from '@/app/lib/api';

interface Props {
  params: {
    votePubkey: string;
  };
}

export default async function ValidatorDetailsPage({ params }: Props) {
  const { votePubkey } = params;
  
  try {
    const details = await fetchValidatorDetails(votePubkey);
    const { validator, historic, latestBlocks } = details;

    return (
      <div className="min-h-screen p-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Avatar moniker={validator.moniker} pictureURL={validator.pictureURL} />
            <div>
              <h1 className="text-3xl font-bold">{validator.moniker || 'Unknown Validator'}</h1>
              <p className="text-gray-500 dark:text-gray-400">{validator.votePubkey}</p>
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Stake</h3>
              <div className="mt-2 text-2xl font-bold">
                {(validator.activatedStake / 1e9).toLocaleString()} SOL
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {validator.stakePercentage}% of total stake
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Commission</h3>
              <div className="mt-2 text-2xl font-bold">{validator.commission}%</div>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Delegators</h3>
              <div className="mt-2 text-2xl font-bold">{validator.delegatorCount.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="historic" className="w-full">
          <TabsList>
            <TabsTrigger value="historic">Historic Data</TabsTrigger>
            <TabsTrigger value="blocks">Latest Blocks</TabsTrigger>
          </TabsList>
          <TabsContent value="historic">
            <ValidatorCharts historic={historic} latestBlocks={latestBlocks} />
          </TabsContent>
          <TabsContent value="blocks">
            <ValidatorCharts historic={historic} latestBlocks={latestBlocks} />
          </TabsContent>
        </Tabs>
      </div>
    );
  } catch (error) {
    console.error('Error fetching validator details:', error);
    notFound();
  }
} 
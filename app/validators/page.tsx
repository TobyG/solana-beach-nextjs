'use client';

import { Validator } from '../../types/validator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ValidatorStats } from '../../components/ValidatorStats';
import { User } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function Avatar({ moniker, pictureURL }: { moniker?: string; pictureURL?: string }) {
  if (pictureURL) {
    return (
      <img 
        src={pictureURL} 
        alt={moniker || 'Unknown'}
        className="w-8 h-8 rounded-full"
      />
    );
  }

  return (
    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
      <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
    </div>
  );
}

export default function ValidatorsPage() {
  const [topValidators, setTopValidators] = useState<Validator[]>([]);
  const [allValidators, setAllValidators] = useState<Validator[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [topResponse, allResponse] = await Promise.all([
          fetch('/api/validators'),
          fetch('/api/validators?type=all')
        ]);

        if (!topResponse.ok || !allResponse.ok) {
          throw new Error('Failed to fetch validators');
        }

        const [top, all] = await Promise.all([
          topResponse.json(),
          allResponse.json()
        ]);

        setTopValidators(top);
        setAllValidators(all);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch validators');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  if (error) {
    return (
      <div className="min-h-screen p-8">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen p-8">
        <div>Loading validators...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Solana Validators</h1>
      
      <ValidatorStats topValidators={topValidators} allValidators={allValidators} />
      
      <Tabs defaultValue="top" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="top">Top Validators</TabsTrigger>
          <TabsTrigger value="all">All Validators</TabsTrigger>
        </TabsList>
        <TabsContent value="top">
          <ValidatorsTable validators={topValidators} />
        </TabsContent>
        <TabsContent value="all">
          <ValidatorsTable validators={allValidators} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ValidatorsTable({ validators }: { validators: Validator[] }) {
  const totalStake = validators.reduce((sum, v) => sum + v.activatedStake, 0);
  let cumulativeStake = 0;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">#</TableHead>
            <TableHead className="w-[400px]">Validator</TableHead>
            <TableHead className="text-right w-32">Stake</TableHead>
            <TableHead className="text-right w-32">Commission</TableHead>
            <TableHead className="text-right w-48">Cumulative Stake</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {validators.map((validator, index) => {
            cumulativeStake += validator.activatedStake;
            const percentage = (cumulativeStake / totalStake * 100).toFixed(1);
            return (
              <TableRow 
                key={validator.votePubkey} 
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <Link 
                    href={`/validators/${validator.votePubkey}`}
                    className="block"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar moniker={validator.moniker} pictureURL={validator.pictureURL} />
                      <div>
                        <div className="font-medium">
                          {(validator.moniker || 'Unknown').length > 20 
                            ? `${(validator.moniker || 'Unknown').slice(0, 20)}...` 
                            : validator.moniker || 'Unknown'}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {validator.votePubkey.slice(0, 8)}...{validator.votePubkey.slice(-8)}
                        </div>
                      </div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="text-right">
                  {validator.activatedStake.toLocaleString()} SOL
                </TableCell>
                <TableCell className="text-right">
                  {validator.commission}%
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-24 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 dark:bg-blue-400 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{percentage}%</span>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
} 
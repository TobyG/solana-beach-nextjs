import { User } from 'lucide-react';

export function Avatar({ moniker, pictureURL }: { moniker?: string; pictureURL?: string }) {
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
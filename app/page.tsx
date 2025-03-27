import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Solana Beach</h1>
        <div className="grid gap-6">
          <Link 
            href="/validators" 
            className="p-6 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-2">Validators</h2>
            <p className="text-gray-600 dark:text-gray-300">
              View and analyze Solana network validators
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}

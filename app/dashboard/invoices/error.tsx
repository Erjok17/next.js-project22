// /app/dashboard/invoices/error.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-semibold">Something went wrong!</h2>
      <div className="flex gap-4">
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
          onClick={() => reset()}
        >
          Try again
        </button>
        <button
          className="rounded-md bg-gray-500 px-4 py-2 text-sm text-white transition-colors hover:bg-gray-400"
          onClick={() => router.push('/dashboard/invoices')}
        >
          Go back
        </button>
      </div>
    </div>
  );
}
// /app/ui/dashboard/sidenav.tsx
'use client';

import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

export default function SideNav() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = async () => {
    try {
      startTransition(async () => {
        await signOut({ redirect: false });
        router.push('/');
        router.refresh();
      });
    } catch (err) {
      setError('Failed to sign out. Please try again.');
      console.error('Sign out error:', err);
    }
  };

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <div className="relative">
          <button
            onClick={handleSignOut}
            disabled={isPending}
            className={`flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 ${
              isPending ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-disabled={isPending}
          >
            <PowerIcon className="w-6" />
            <div className="hidden md:block">
              {isPending ? 'Signing out...' : 'Sign Out'}
            </div>
          </button>
          {error && (
            <div className="absolute bottom-full mb-2 w-full rounded-md bg-red-50 p-2 text-sm text-red-600">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
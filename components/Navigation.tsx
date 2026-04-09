import React from 'react';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900">
      <Link href="/" className="flex items-center space-x-2">
        <div className="flex items-center space-x-2">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
          >
            <rect x="3" y="3" width="6" height="6" rx="1" fill="#25ebd2" />
            <rect x="9" y="9" width="6" height="6" rx="1" fill="#25ebd9" />
            <rect x="15" y="15" width="6" height="6" rx="1" fill="#25ebd1" />
          </svg>
          <span className="font-bold text-xl" style={{ color: '#25ebd1' }}>
            Splitwise
          </span>
        </div>
      </Link>

      <div className="flex items-center space-x-12">
        {/* Added new link for 'Your Groups' */}
        <Link
          href="/groups"
          className="text-white hover:text-gray-700 hover:underline"
        >
          Your Groups
        </Link>
        <Link
          href="/group"
          className="text-white hover:text-gray-700 hover:underline"
        >
          Create Group
        </Link>
        <Link
          href="/expense"
          className="text-white hover:text-gray-700 hover:underline"
        >
          Add Expense
        </Link>
        <UserButton />
      </div>
    </nav>
  );
}

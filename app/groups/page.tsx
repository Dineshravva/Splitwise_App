'use client';

import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useOrganizationList, useUser } from '@clerk/nextjs';

// Define the type for group
type Group = {
  id: string; // Add id property
  name: string;
  role: string;
  initials: string;
};

const GroupItem = ({
  name,
  role,
  initials,
  id,
}: {
  name: string;
  role: string;
  initials: string;
  id: string;
}) => (
  <Link href={`/group/${id}`}>
    <div className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform duration-300">
            {initials}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-xl group-hover:text-blue-600 transition-colors duration-300">{name}</h3>
            <p className="text-gray-600 text-sm mt-1">
              {role === 'org:admin' ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                  Admin
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                  Member
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  </Link>
);

const YourGroups = () => {
  const [groups, setGroups] = useState<Array<Group>>([]);
  const { userMemberships, isLoaded } = useOrganizationList({
    userMemberships: true,
  });
  const { user } = useUser();

  useEffect(() => {
    if (isLoaded && userMemberships.data) {
      const userGroups = userMemberships.data.map((membership) => {
        const name = membership.organization.name;
        const role = membership.role;
        const initials = name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase();
        return {
          id: membership.organization.id, // Add this line
          name,
          role,
          initials,
        };
      });
      setGroups(userGroups);
    }
  }, [isLoaded, userMemberships.data]);

  if (!isLoaded || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">Your Groups</h1>
          <p className="text-blue-100 text-lg">
            View and manage all your groups in one place. Access your group details and manage expenses effortlessly.
          </p>
        </div>

        {/* Groups Grid */}
        {groups.length > 0 ? (
          <div className="grid gap-6 mb-8">
            {groups.map((group, index) => (
              <GroupItem key={index} {...group} id={group.id} />
            ))}
          </div>
        ) : (
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-12 text-center border border-blue-100 mb-8">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-2xl font-bold text-blue-700 mb-2">No groups yet</h3>
            <p className="text-blue-600">Create your first group to start splitting expenses with friends!</p>
          </div>
        )}

        {/* Create New Group Button */}
        <div className="text-center">
          <Link href="/group">
            <Button className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Create New Group
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default YourGroups;

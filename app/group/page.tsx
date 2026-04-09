'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useOrganizationList, useUser } from '@clerk/nextjs';
import { PlusCircle } from 'lucide-react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateGroup() {
  const [groupName, setGroupName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [invitedMembers, setInvitedMembers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const { createOrganization } = useOrganizationList();
  const { toast } = useToast();
  const router = useRouter();

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: 'You must be logged in to create a group',
      });
      return;
    }

    setIsLoading(true);
    try {
      if (!createOrganization) {
        throw new Error('createOrganization function is undefined');
      }
      const organization = await createOrganization({ name: groupName });

      // Invite members
      for (const email of invitedMembers) {
        await organization.inviteMember({
          emailAddress: email,
          role: 'org:member',
        });
      }

      toast({
        title: 'Success',
        description: 'Group created successfully!',
      });

      // Redirect to the new group page
      router.push(`/group/${organization.id}`);
    } catch (error) {
      console.error('Error creating group:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create group. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInvite = () => {
    if (inviteEmail && !invitedMembers.includes(inviteEmail)) {
      setInvitedMembers([...invitedMembers, inviteEmail]);
      setInviteEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">Create a Group</h1>
          <p className="text-blue-100 text-lg">
            Split expenses with friends, roommates, and more. Start managing your shared expenses today.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleCreateGroup} className="space-y-8">
            {/* Group Name Input */}
            <div>
              <label
                htmlFor="groupName"
                className="block text-lg font-semibold text-gray-900 mb-3"
              >
                Group Name
              </label>
              <Input
                id="groupName"
                name="groupName"
                type="text"
                placeholder="Enter group name"
                className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
              />
            </div>

            {/* Invite Members Section */}
            <div>
              <label
                htmlFor="inviteEmail"
                className="block text-lg font-semibold text-gray-900 mb-3"
              >
                Invite Members
              </label>
              <div className="flex space-x-3">
                <Input
                  id="inviteEmail"
                  name="inviteEmail"
                  type="email"
                  placeholder="Enter email address"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="flex-grow px-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                />
                <Button 
                  type="button" 
                  onClick={handleInvite} 
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Invite
                </Button>
              </div>
            </div>

            {/* Invited Members List */}
            {invitedMembers.length > 0 && (
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">
                  Invited Members ({invitedMembers.length})
                </h3>
                <div className="space-y-2">
                  {invitedMembers.map((email, index) => (
                    <div key={index} className="flex items-center bg-white rounded-lg px-4 py-3 shadow-sm">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                        {email.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-gray-700 font-medium">{email}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300" 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </span>
              ) : (
                <span className="flex items-center">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Create Group
                </span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

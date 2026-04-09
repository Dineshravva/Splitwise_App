'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useOrganizationList, useUser } from '@clerk/nextjs';
import { getGroupData, deleteExpense } from '@/app/actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Define interfaces for Balance and Expense
interface Balance {
  name: string;
  amount: number;
  owes: boolean;
}

interface Expense {
  id: string;
  amount: number;
  description: string;
  created_by: string;
  split_with: {
    id: string;
    name: string;
    splitAmount: number;
  }[];
}

// Add this utility function at the top of the file, outside the component
const formatAmount = (amount: number | string) => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  return numAmount.toFixed(2);
};

function GroupPage() {
  const { id } = useParams();
  const { userMemberships, isLoaded: orgLoaded } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });
  const { user, isLoaded: userLoaded } = useUser();
  const router = useRouter();

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [balances, setBalances] = useState<Balance[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchData() {
      if (id && user) {
        const { expenses, balances } = await getGroupData(
          id as string,
          user.fullName || 'You'
        );
        setExpenses(expenses);
        setBalances(balances);
        setLoading(false);
      }
    }
    if (userLoaded) {
      fetchData();
    }
  }, [id, user, userLoaded]);

  if (!orgLoaded || !userLoaded || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  const selectedOrganization = userMemberships.data?.find(
    (membership) => membership.organization.id === id
  );

  if (!selectedOrganization) {
    return <div>Organization not found</div>;
  }

  // Update the isAdmin check to match the groups page
  const isAdmin = selectedOrganization?.role === 'org:admin';

  console.log('Selected Organization:', selectedOrganization);
  console.log('Is Admin:', isAdmin);

  const groupDescription =
    "View and manage the details of your group. You can see the group's name, balances, and expenses. As an admin, you can also delete expenses.";

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRandomColor = (): string => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-purple-500',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleDeleteExpense = async (expenseId: string) => {
    if (!isAdmin) {
      toast({
        title: 'Error 🚨',
        description: 'Only admins can delete expenses. 🚫',
        variant: 'destructive',
      });
      return;
    }

    const confirmed = window.confirm(
      'Are you sure you want to delete this expense?'
    );
    if (confirmed) {
      const result = await deleteExpense(expenseId);
      if (result.success) {
        // Refresh the page data
        const { expenses: updatedExpenses, balances: updatedBalances } =
          await getGroupData(id as string, user?.fullName || 'You');
        setExpenses(updatedExpenses);
        setBalances(updatedBalances);
        router.refresh(); // Refresh the page to update any server-side rendered content
      } else {
        toast({ title: 'Failed to delete expense. Please try again.' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {selectedOrganization.organization.name}
              </h1>
              <p className="text-blue-100 text-lg">
                {isAdmin ? 'Admin' : 'Member'} • Group Dashboard
              </p>
            </div>
            <Link href="/groups">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200">
                All Groups
              </Button>
            </Link>
          </div>
        </div>

        {/* Description Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <p className="text-gray-700 text-lg">{groupDescription}</p>
        </div>

        {/* Balances Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-1 h-8 bg-blue-600 mr-3 rounded-full"></span>
            Balances
          </h2>
          {balances.length > 0 ? (
            <div className="grid gap-4">
              {balances.map((balance, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-100">
                  <div className="flex items-center">
                    <div
                      className="h-12 w-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full mr-4 flex items-center justify-center text-white font-bold text-lg shadow-md"
                    >
                      {getInitials(balance.name)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg">{balance.name}</h3>
                      <p className="text-gray-600">
                        <span className="text-blue-600 font-semibold">${formatAmount(balance.amount)}</span>
                        <span className="ml-2">{balance.owes ? 'owes you' : 'you owe'}</span>
                      </p>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      balance.owes ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {balance.owes ? 'Owes' : 'Owed'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-8 text-center border border-blue-100">
              <div className="text-6xl mb-4">🌟</div>
              <p className="text-blue-700 text-lg font-semibold">
                No outstanding balances. Everyone&apos;s all squared up!
              </p>
              <p className="text-blue-600 mt-2">🎉 All settled up!</p>
            </div>
          )}

        {/* Expenses Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-1 h-8 bg-teal-600 mr-3 rounded-full"></span>
            Expenses
          </h2>
          {expenses.length > 0 ? (
            <div className="grid gap-4">
              {expenses.map((expense) => (
                <div key={expense.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                      <div
                        className="h-12 w-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full mr-4 flex items-center justify-center text-white font-bold text-lg shadow-md"
                      >
                        {getInitials(expense.description)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg">{expense.description}</h3>
                        <p className="text-gray-600 mt-1">
                          <span className="text-teal-600 font-semibold text-lg">${formatAmount(expense.amount)}</span>
                          <span className="mx-2">•</span>
                          <span className="text-sm">Split with {expense.split_with.map((s) => s.name).join(', ')}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          Split type: Percentage{' '}
                          {(
                            (expense.split_with[0]?.splitAmount / expense.amount) *
                            100
                          ).toFixed(2)}
                          %
                        </p>
                      </div>
                    </div>
                    {isAdmin && (
                      <button
                        onClick={() => handleDeleteExpense(expense.id)}
                        className="ml-4 p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        title="Delete expense"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-8 text-center border border-teal-100">
              <div className="text-6xl mb-4">💸</div>
              <p className="text-teal-700 text-lg font-semibold">
                No expenses yet.
              </p>
              <p className="text-teal-600 mt-2">🧾 Time to split some bills!</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

export default GroupPage;

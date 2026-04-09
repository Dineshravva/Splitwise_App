'use client';

import React from 'react';
import { Users, UserPlus, LineChart, Shield, Zap, Heart } from 'lucide-react';
import Banner from '@/components/Banner';
import FeatureCard from '@/components/FeatureCard';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <Banner />
      
      {/* Features Section */}
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Why choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Split</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the simplest way to manage shared expenses with your friends and family
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            Icon={Users}
            title="Group expense tracking"
            description="Easily add group members to your expense. All the expenses are added up and divided by the number of people in the group."
          />
          <FeatureCard
            Icon={UserPlus}
            title="Individual expense addition"
            description="Add expenses to your group. You can add your expenses, and they will be automatically added to your group's expenses."
          />
          <FeatureCard
            Icon={LineChart}
            title="Expense viewing"
            description="View all your expenses in one place. You can see how much you've spent and how much you owe."
          />
        </div>
        
        {/* Additional Features Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-12 mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-gray-900">
              Built with you in mind
            </h3>
            <p className="text-lg text-gray-600">
              We focus on what matters most - simplicity and reliability
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-md mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2 text-gray-900">Secure</h4>
              <p className="text-gray-600">Your data is encrypted and protected</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-md mb-4">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2 text-gray-900">Lightning Fast</h4>
              <p className="text-gray-600">Split expenses in seconds, not minutes</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-md mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2 text-gray-900">Free Forever</h4>
              <p className="text-gray-600">No hidden fees or premium tiers</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-4">
              By using Split, you agree to our Terms of Service and Privacy Policy
            </p>
            <p className="text-xs text-gray-500">
              © 2024 Split. Made with ❤️ for better expense management
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

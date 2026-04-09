import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Banner() {
  return (
    <div className="relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-teal-500 to-cyan-500">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000" />
        </div>
      </div>
      
      <div className="relative flex flex-col items-center justify-center py-20 sm:py-32 px-6 sm:px-12 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-white text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          <span>Simple. Fast. Fair.</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
          Split expenses with friends in seconds
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed">
          Whether it&apos;s a group trip or dinner, Split makes it easy to track
          shared expenses and settle up in a single tap.
        </p>
        
        <Link href="/group">
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100 text-lg sm:text-xl px-8 py-6 rounded-xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 group"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
        
        {/* Trust indicators */}
        <div className="flex items-center gap-8 mt-12 text-white/80 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>No signup required</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span>Free forever</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <span>Secure & private</span>
          </div>
        </div>
      </div>
    </div>
  );
}

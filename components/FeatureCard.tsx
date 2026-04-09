import React from 'react';

interface FeatureCardProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

export default function FeatureCard({
  Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
      {/* Gradient border effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
      
      {/* Icon container */}
      <div className="flex items-center justify-center mb-6">
        <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl group-hover:from-purple-100 group-hover:to-pink-100 transition-colors duration-300">
          <Icon className="h-8 w-8 text-purple-600 group-hover:text-purple-700 transition-colors duration-300" />
        </div>
      </div>
      
      {/* Content */}
      <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
        {description}
      </p>
      
      {/* Hover indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
    </div>
  );
}

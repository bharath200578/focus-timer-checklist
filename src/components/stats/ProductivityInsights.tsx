import React from 'react';
import { BarChart3, Clock, CalendarCheck } from 'lucide-react';

interface ProductivityInsightsProps {
  onViewAnalytics: () => void;
}

export default function ProductivityInsights({ onViewAnalytics }: ProductivityInsightsProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">Productivity Insights</h2>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
            <BarChart3 size={20} className="text-red-500" />
          </div>
          
          <div>
            <h3 className="font-medium text-gray-800">Most Productive Category</h3>
            <p className="text-sm text-gray-600">Work (8h 30m this week)</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
            <Clock size={20} className="text-green-500" />
          </div>
          
          <div>
            <h3 className="font-medium text-gray-800">Best Focus Time</h3>
            <p className="text-sm text-gray-600">9:00 AM - 11:00 AM</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
            <CalendarCheck size={20} className="text-blue-500" />
          </div>
          
          <div>
            <h3 className="font-medium text-gray-800">Most Productive Day</h3>
            <p className="text-sm text-gray-600">Tuesday (3h 15m average)</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <button 
          onClick={onViewAnalytics}
          className="flex w-full items-center justify-center rounded-md border border-gray-200 bg-white py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
        >
          View Detailed Analytics
        </button>
      </div>
    </div>
  );
}
import React from 'react';
import { format } from 'date-fns';

export default function Header() {
  const currentDate = format(new Date(), 'MMMM d, yyyy • h:mm a');
  
  return (
    <header className="border-b border-gray-200 bg-white px-4 py-2 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-primary-500 sm:text-2xl">
            FocusTimer
          </h1>
        </div>
        
        <div className="text-sm text-gray-500">
          {currentDate}
        </div>
      </div>
    </header>
  );
}
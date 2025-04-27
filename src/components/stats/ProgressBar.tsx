import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  colorClass?: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  showPercentage?: boolean;
}

export default function ProgressBar({ 
  value,
  max,
  colorClass = 'bg-primary-500',
  size = 'md',
  label,
  showPercentage = false,
}: ProgressBarProps) {
  const percentage = Math.min(Math.round((value / max) * 100), 100);
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6',
  };
  
  return (
    <div className="w-full">
      {label && (
        <div className="mb-1 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showPercentage && (
            <span className="text-sm font-medium text-gray-500">{percentage}%</span>
          )}
        </div>
      )}
      
      <div className={`w-full overflow-hidden rounded-full bg-gray-200 ${sizeClasses[size]}`}>
        <div 
          className={`${sizeClasses[size]} ${colorClass} transition-all`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      {!label && showPercentage && (
        <div className="mt-1 text-right">
          <span className="text-xs font-medium text-gray-500">{percentage}%</span>
        </div>
      )}
    </div>
  );
}
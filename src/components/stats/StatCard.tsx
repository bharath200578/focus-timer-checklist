import React, { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: ReactNode;
  label?: string;
  colorClass?: string;
  icon?: ReactNode;
}

export default function StatCard({ title, value, label, colorClass = 'text-primary-500', icon }: StatCardProps) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {icon && <div className={`${colorClass}`}>{icon}</div>}
      </div>
      
      <div className="mt-2">
        <div className={`text-2xl font-bold ${colorClass}`}>
          {value}
        </div>
        {label && <p className="text-xs text-gray-500">{label}</p>}
      </div>
    </div>
  );
}
import React from 'react';
import { TaskCategory } from '../../types';
import { CATEGORY_COLORS, CATEGORY_NAMES } from '../../data/categoryColors';

interface TaskCategoryTagProps {
  category: TaskCategory;
  size?: 'sm' | 'md' | 'lg'; 
}

export default function TaskCategoryTag({ category, size = 'md' }: TaskCategoryTagProps) {
  const { bg, text } = CATEGORY_COLORS[category];
  const name = CATEGORY_NAMES[category];
  
  const sizeClasses = {
    sm: 'text-xs py-0.5 px-2',
    md: 'text-sm py-1 px-2.5',
    lg: 'text-sm py-1.5 px-3',
  };
  
  return (
    <span className={`inline-flex items-center rounded-full ${bg} ${text} ${sizeClasses[size]} font-medium`}>
      {name}
    </span>
  );
}
import React from 'react';
import { Plus } from 'lucide-react';
import { CATEGORY_COLORS, CATEGORY_NAMES } from '../../data/categoryColors';
import { TaskCategory } from '../../types';

const categories: TaskCategory[] = ['work', 'study', 'creative', 'personal', 'health'];

export default function TaskCategories() {
  const [selectedCategory, setSelectedCategory] = React.useState<TaskCategory | null>(null);
  
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-700">Task Categories</h2>
        
        <button 
          aria-label="Add category"
          className="rounded p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
        >
          <Plus size={16} />
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const { bg, text } = CATEGORY_COLORS[category];
          const isSelected = selectedCategory === category;
          
          return (
            <button
              key={category}
              className={`rounded-full ${bg} ${text} px-3 py-1 text-sm font-medium transition-all hover:ring-2 hover:ring-gray-200 ${isSelected ? 'ring-2 ring-primary-200' : ''}`}
              onClick={() => setSelectedCategory(isSelected ? null : category)}
            >
              {CATEGORY_NAMES[category]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
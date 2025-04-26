import React from 'react';
import { useApp } from '../contexts/AppContext';
import { TaskCategory, PredefinedCategory } from '../types';
import '../styles/TaskCategories.css';

interface TaskCategoriesProps {
  selectedCategory: TaskCategory | null;
  onSelectCategory: (category: TaskCategory | null) => void;
}

export const TaskCategories: React.FC<TaskCategoriesProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const { tasks } = useApp();
  
  // Get predefined categories
  const predefinedCategories: PredefinedCategory[] = ['Work', 'Study', 'Creative', 'Personal', 'Health'];
  
  // Get all unique custom categories from tasks
  const customCategories = Array.from(new Set(
    tasks
      .map(task => task.category)
      .filter(category => !predefinedCategories.includes(category as PredefinedCategory))
  ));
  
  // Get all categories (predefined + custom)
  const allCategories = [...predefinedCategories, ...customCategories];
  
  const getCategoryColorClass = (category: TaskCategory): string => {
    if (predefinedCategories.includes(category as PredefinedCategory)) {
      return `category-${category.toLowerCase()}`;
    }
    return 'category-custom';
  };
  
  return (
    <div className="task-categories">
      <div className="categories-header">
        <h2>Categories</h2>
        <button 
          className={`category-btn all-categories ${selectedCategory === null ? 'active' : ''}`}
          onClick={() => onSelectCategory(null)}
        >
          All
        </button>
      </div>
      
      <div className="categories-list">
        {allCategories.map((category) => (
          <button
            key={category}
            className={`category-btn ${getCategoryColorClass(category)} ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => onSelectCategory(category)}
          >
            <span className="category-dot"></span>
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}; 
import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { TaskCategory, PredefinedCategory } from '../types';
import '../styles/TaskForm.css';

interface TaskFormProps {
  onClose: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onClose }) => {
  const { addTask } = useApp();
  
  console.log('TaskForm rendered, addTask function available:', !!addTask);
  
  // Form state
  const [title, setTitle] = useState('');
  const [categoryType, setCategoryType] = useState<'predefined' | 'custom'>('predefined');
  const [predefinedCategory, setPredefinedCategory] = useState<PredefinedCategory>('Work');
  const [customCategory, setCustomCategory] = useState('');
  const [estimatedPomodoros, setEstimatedPomodoros] = useState(1);
  
  // Get the actual category based on type
  const getCategory = (): TaskCategory => {
    return categoryType === 'predefined' ? predefinedCategory : customCategory;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }
    
    if (categoryType === 'custom' && !customCategory.trim()) {
      alert('Please enter a category name');
      return;
    }
    
    const category = getCategory();
    
    console.log('Submitting new task:', {
      title: title.trim(),
      category,
      estimatedPomodoros
    });
    
    try {
      // Add the task
      addTask({
        title: title.trim(),
        category,
        estimatedPomodoros
      });
      console.log('Task added successfully');
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Failed to add task: ' + (error instanceof Error ? error.message : String(error)));
    }
    
    // Close the form
    onClose();
  };
  
  return (
    <div className="task-form-overlay">
      <div className="task-form-container">
        <div className="task-form-header">
          <h2>Add New Task</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Task Name</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What are you working on?"
              autoFocus
            />
          </div>
          
          <div className="form-group">
            <label>Category Type</label>
            <div className="category-type-selector">
              <label className="radio-label">
                <input
                  type="radio"
                  checked={categoryType === 'predefined'}
                  onChange={() => setCategoryType('predefined')}
                />
                <span>Predefined</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  checked={categoryType === 'custom'}
                  onChange={() => setCategoryType('custom')}
                />
                <span>Custom</span>
              </label>
            </div>
          </div>
          
          {categoryType === 'predefined' ? (
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={predefinedCategory}
                onChange={(e) => setPredefinedCategory(e.target.value as PredefinedCategory)}
              >
                <option value="Work">Work</option>
                <option value="Study">Study</option>
                <option value="Creative">Creative</option>
                <option value="Personal">Personal</option>
                <option value="Health">Health</option>
              </select>
            </div>
          ) : (
            <div className="form-group">
              <label htmlFor="custom-category">Custom Category</label>
              <input
                id="custom-category"
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Enter a category name"
              />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="pomodoros">Estimated Pomodoros</label>
            <div className="pomodoro-input">
              <button
                type="button"
                className="pomodoro-btn"
                onClick={() => setEstimatedPomodoros(prev => Math.max(1, prev - 1))}
                disabled={estimatedPomodoros <= 1}
              >
                -
              </button>
              
              <span className="pomodoro-count">{estimatedPomodoros}</span>
              
              <button
                type="button"
                className="pomodoro-btn"
                onClick={() => setEstimatedPomodoros(prev => Math.min(10, prev + 1))}
                disabled={estimatedPomodoros >= 10}
              >
                +
              </button>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 
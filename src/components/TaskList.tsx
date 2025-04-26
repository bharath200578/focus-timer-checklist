import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Task, TaskCategory, PredefinedCategory } from '../types';
import { TaskCategories } from './TaskCategories';
import { TaskForm } from './TaskForm';
import '../styles/TaskList.css';

export const TaskList: React.FC = () => {
  const { tasks, completeTask, deleteTask, setCurrentTask, currentTask, loading } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | null>(null);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  
  console.log('TaskList rendered:', { 
    taskCount: tasks.length,
    loading,
    currentTask: currentTask?.id
  });
  
  // Filter tasks based on category and completion status
  const filteredTasks = tasks.filter(task => {
    const matchesCategory = selectedCategory ? task.category === selectedCategory : true;
    const matchesCompletionStatus = showCompletedTasks ? true : !task.completed;
    return matchesCategory && matchesCompletionStatus;
  });
  
  // Get all unique categories from tasks
  const allCategories = Array.from(new Set(tasks.map(task => task.category)));
  
  // Group tasks by category
  const tasksByCategory: Record<string, Task[]> = {};
  
  // Initialize with predefined categories
  const predefinedCategories: PredefinedCategory[] = ['Work', 'Study', 'Creative', 'Personal', 'Health'];
  predefinedCategories.forEach(category => {
    tasksByCategory[category] = [];
  });
  
  // Add custom categories
  allCategories.forEach(category => {
    if (!tasksByCategory[category]) {
      tasksByCategory[category] = [];
    }
  });
  
  // Populate tasks by category
  filteredTasks.forEach(task => {
    tasksByCategory[task.category].push(task);
  });
  
  // Get category color class
  const getCategoryColorClass = (category: string): string => {
    if (predefinedCategories.includes(category as PredefinedCategory)) {
      return `category-${category.toLowerCase()}`;
    }
    // For custom categories, use a default color or generate one
    return 'category-custom';
  };
  
  // Handle selecting a task for the timer
  const handleSelectTask = (task: Task) => {
    setCurrentTask(task.id);
  };
  
  // Handle task completion toggle
  const handleToggleComplete = (task: Task) => {
    if (task.completed) {
      // If already completed, this would "uncomplete" it
      // We don't have an explicit "uncomplete" function, so we'll use updateTask
      // This should be added to the AppContext
    } else {
      completeTask(task.id);
    }
  };
  
  // Handle task deletion
  const handleDeleteTask = (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
    }
  };
  
  return (
    <div className="tasklist-container">
      <div className="tasklist-header">
        <h2>Tasks</h2>
        <div className="task-filter">
          <label className="task-filter-toggle">
            <input 
              type="checkbox" 
              checked={showCompletedTasks}
              onChange={() => setShowCompletedTasks(!showCompletedTasks)}
            />
            <span>Show Completed</span>
          </label>
        </div>
      </div>
      
      <TaskCategories 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />
      
      {loading ? (
        <div className="tasks-loading">
          <div className="task-spinner"></div>
          <p>Loading tasks...</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="no-tasks-message">
          <p>No tasks yet. Create your first task to get started!</p>
        </div>
      ) : (
        Object.entries(tasksByCategory).map(([category, categoryTasks]) => {
          // Skip empty categories
          if (categoryTasks.length === 0) return null;
          
          return (
            <div key={category} className="task-category-group">
              <h3>
                <span className={`category-dot ${getCategoryColorClass(category)}`}></span>
                {category}
              </h3>
              
              <ul className="task-list">
                {categoryTasks.map(task => (
                  <li 
                    key={task.id} 
                    className={`task-item ${task.completed ? 'completed' : ''} ${task.id === currentTask?.id ? 'current' : ''}`}
                  >
                    <div className="task-details" onClick={() => handleSelectTask(task)}>
                      <div className="task-checkbox">
                        <input 
                          type="checkbox" 
                          checked={task.completed}
                          onChange={() => handleToggleComplete(task)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      
                      <div className="task-content">
                        <h4 className="task-title">{task.title}</h4>
                        
                        <div className="task-pomodoro-count">
                          {Array.from({ length: task.estimatedPomodoros }).map((_, index) => (
                            <span 
                              key={index} 
                              className={`pomodoro-dot ${index < task.completedPomodoros ? 'completed' : ''}`}
                            ></span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="task-actions">
                      <button 
                        className="task-delete-btn" 
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        ×
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })
      )}
      
      <button 
        className="add-task-btn"
        onClick={() => setIsTaskFormOpen(true)}
      >
        <span className="plus-icon">+</span>
        Add New Task
      </button>
      
      {isTaskFormOpen && (
        <TaskForm onClose={() => setIsTaskFormOpen(false)} />
      )}
    </div>
  );
}; 
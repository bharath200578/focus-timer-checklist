import React, { useState } from 'react';
import { useTaskStore } from '../../store/taskStore';
import { TaskCategory } from '../../types';
import { X } from 'lucide-react';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TaskCategory>('work');
  const [estimatedPomodoros, setEstimatedPomodoros] = useState(1);
  
  const addTask = useTaskStore((state) => state.addTask);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title, category, estimatedPomodoros);
      setTitle('');
      setCategory('work');
      setEstimatedPomodoros(1);
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Add New Task</h2>
          <button 
            onClick={onClose}
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
              Task Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="Enter task title"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="category" className="mb-2 block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as TaskCategory)}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <option value="work">Work</option>
              <option value="study">Study</option>
              <option value="creative">Creative</option>
              <option value="personal">Personal</option>
              <option value="health">Health</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="pomodoros" className="mb-2 block text-sm font-medium text-gray-700">
              Estimated Pomodoros
            </label>
            <input
              type="number"
              id="pomodoros"
              min="1"
              max="10"
              value={estimatedPomodoros}
              onChange={(e) => setEstimatedPomodoros(parseInt(e.target.value))}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 
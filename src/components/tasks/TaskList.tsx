import React, { useState } from 'react';
import { useTaskStore } from '../../store/taskStore';
import TaskItem from './TaskItem';
import { SlidersHorizontal } from 'lucide-react';
import AddTaskModal from './AddTaskModal';

export default function TaskList() {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const tasks = useTaskStore((state) => state.tasks);
  const todayTasks = useTaskStore((state) => state.getTodayTasks());
  
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Today's Tasks</h2>
        
        <div className="flex items-center">
          <button
            aria-label="Filter tasks"
            className="mr-2 rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <SlidersHorizontal size={18} />
          </button>
          
          <button
            aria-label="Add task"
            onClick={() => setIsAddTaskModalOpen(true)}
            className="rounded-md bg-primary-500 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-primary-600"
          >
            Add Task
          </button>
        </div>
      </div>
      
      <div className="max-h-[320px] overflow-y-auto">
        {todayTasks.length > 0 ? (
          todayTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
            <p className="text-gray-500">No tasks for today. Add a task to get started!</p>
          </div>
        )}
      </div>

      <AddTaskModal 
        isOpen={isAddTaskModalOpen} 
        onClose={() => setIsAddTaskModalOpen(false)} 
      />
    </div>
  );
}
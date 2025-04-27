import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { useTaskStore } from '../../store/taskStore';
import { Task } from '../../types';
import TaskCategoryTag from './TaskCategoryTag';
import { useStatsStore } from '../../store/statsStore';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const { updateTask, deleteTask, completeTask } = useTaskStore();
  const { incrementTaskDone } = useStatsStore();
  
  const handleCheckboxChange = () => {
    if (!task.completed) {
      completeTask(task.id);
      incrementTaskDone();
    } else {
      updateTask(task.id, { completed: false, completedAt: null });
    }
  };
  
  const handleDeleteTask = () => {
    deleteTask(task.id);
  };
  
  return (
    <div className={`group mb-3 rounded-lg border p-3 transition-colors ${task.completed ? 'border-gray-200 bg-gray-50' : 'border-gray-200 hover:border-primary-300'}`}>
      <div className="flex items-start">
        <div className="mr-3 mt-1 flex-shrink-0">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleCheckboxChange}
            className="h-5 w-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
          />
        </div>
        
        <div className="flex-grow">
          <div className="flex items-start justify-between">
            <h3 className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
              {task.title}
            </h3>
            
            <div className="ml-4 flex-shrink-0">
              <TaskCategoryTag category={task.category} size="sm" />
            </div>
          </div>
          
          <div className="mt-1 flex items-center text-sm text-gray-500">
            <span>
              {task.completedPomodoros} / {task.estimatedPomodoros} pomodoro{task.estimatedPomodoros !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-2 flex justify-end opacity-0 transition-opacity group-hover:opacity-100">
        <button 
          aria-label="Edit task"
          className="mr-2 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <Pencil size={16} />
        </button>
        
        <button 
          aria-label="Delete task"
          className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-500"
          onClick={handleDeleteTask}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
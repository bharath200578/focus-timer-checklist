import { create } from 'zustand';
import { Task, TaskCategory } from '../types';
import { mockTasks } from '../data/mockData';

interface TasksState {
  tasks: Task[];
  
  // Actions
  addTask: (title: string, category: TaskCategory, estimatedPomodoros: number) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
  incrementTaskPomodoro: (id: string) => void;
  getTodayTasks: () => Task[];
  getTasksByCategory: (category: TaskCategory) => Task[];
}

export const useTaskStore = create<TasksState>((set, get) => ({
  tasks: [...mockTasks],
  
  addTask: (title, category, estimatedPomodoros) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      category,
      estimatedPomodoros,
      completedPomodoros: 0,
      completed: false,
      createdAt: new Date(),
      completedAt: null,
    };
    
    set((state) => ({
      tasks: [newTask, ...state.tasks],
    }));
  },
  
  updateTask: (id, updates) => {
    set((state) => ({
      tasks: state.tasks.map((task) => 
        task.id === id ? { ...task, ...updates } : task
      ),
    }));
  },
  
  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },
  
  completeTask: (id) => {
    set((state) => ({
      tasks: state.tasks.map((task) => 
        task.id === id
          ? { ...task, completed: true, completedAt: new Date() }
          : task
      ),
    }));
  },
  
  incrementTaskPomodoro: (id) => {
    set((state) => ({
      tasks: state.tasks.map((task) => 
        task.id === id
          ? { 
              ...task, 
              completedPomodoros: task.completedPomodoros + 1,
              completed: task.completedPomodoros + 1 >= task.estimatedPomodoros
                ? true
                : task.completed,
              completedAt: task.completedPomodoros + 1 >= task.estimatedPomodoros
                ? new Date()
                : task.completedAt
            }
          : task
      ),
    }));
  },
  
  getTodayTasks: () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return get().tasks.filter((task) => {
      const taskDate = new Date(task.createdAt);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === today.getTime();
    });
  },
  
  getTasksByCategory: (category) => {
    return get().tasks.filter((task) => task.category === category);
  }
}));
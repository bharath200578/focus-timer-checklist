import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  Task, 
  SessionType, 
  Session, 
  DailyStats,
  CategoryStats,
  ProductivityInsight
} from '../types';
import { useAuth } from './AuthContext';
import { supabase } from './AuthContext';

interface AppContextType {
  // Timer state
  currentTime: number;
  isRunning: boolean;
  sessionType: SessionType;
  currentSession: Session | null;
  
  // Tasks state
  tasks: Task[];
  currentTask: Task | null;
  
  // Stats state
  dailyStats: DailyStats;
  weeklyProgress: { goal: number; current: number };
  categoryStats: CategoryStats[];
  productivityInsights: ProductivityInsight;
  
  // Timer actions
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  skipTimer: () => void;
  changeSessionType: (type: SessionType) => void;
  
  // Task actions
  addTask: (task: Omit<Task, 'id' | 'completedPomodoros' | 'completed' | 'createdAt'>) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  setCurrentTask: (taskId: string | null) => void;
  completeTask: (taskId: string) => void;
  
  // Loading state
  loading: boolean;
}

const defaultStats: DailyStats = {
  date: new Date(),
  focusTime: 0,
  pomodoros: 0,
  tasksDone: 0,
  tasksRemaining: 0
};

const defaultProductivityInsights: ProductivityInsight = {
  mostProductiveCategory: {
    category: 'Work',
    timeSpent: 0
  },
  bestFocusTime: {
    startHour: 9,
    endHour: 11
  },
  mostProductiveDay: {
    day: 'Monday',
    average: 0
  }
};

const defaultCategoryStats: CategoryStats[] = [
  { category: 'Work', timeSpent: 0, percentage: 0 },
  { category: 'Study', timeSpent: 0, percentage: 0 },
  { category: 'Creative', timeSpent: 0, percentage: 0 },
  { category: 'Personal', timeSpent: 0, percentage: 0 },
  { category: 'Health', timeSpent: 0, percentage: 0 },
];

// Default context value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Session durations in seconds
const FOCUS_DURATION = 25 * 60; // 25 minutes
const SHORT_BREAK_DURATION = 5 * 60; // 5 minutes
const LONG_BREAK_DURATION = 15 * 60; // 15 minutes

export const AppProvider = ({ children }: { children: ReactNode }) => {
  try {
    const { user } = useAuth();
    
    // Timer state
    const [currentTime, setCurrentTime] = useState(FOCUS_DURATION);
    const [isRunning, setIsRunning] = useState(false);
    const [sessionType, setSessionType] = useState<SessionType>('Focus');
    const [currentSession, _setCurrentSession] = useState<Session | null>(null);
    
    // Tasks state
    const [tasks, setTasks] = useState<Task[]>([]);
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    
    // Stats state
    const [dailyStats, setDailyStats] = useState<DailyStats>(defaultStats);
    const [weeklyProgress, _setWeeklyProgress] = useState({ goal: 1200, current: 0 });
    const [categoryStats, _setCategoryStats] = useState<CategoryStats[]>(defaultCategoryStats);
    const [productivityInsights, _setProductivityInsights] = useState<ProductivityInsight>(defaultProductivityInsights);
    const [loading, setLoading] = useState(true);
    
    // Load user data from Supabase when user changes
    useEffect(() => {
      const fetchUserData = async () => {
        // In development mode, allow the app to function without a valid user
        const isDevelopment = import.meta.env.DEV;
        
        if (!user && !isDevelopment) {
          setLoading(false);
          return;
        }
        
        setLoading(true);
        
        try {
          // In development with no auth, use mock data
          if (isDevelopment && !user) {
            // Set mock data after a short delay to simulate loading
            setTimeout(() => {
              setTasks([
                {
                  id: '1',
                  title: 'Sample Task',
                  category: 'Work',
                  estimatedPomodoros: 1,
                  completedPomodoros: 0,
                  completed: false,
                  createdAt: new Date()
                }
              ]);
              setLoading(false);
            }, 1000);
            return;
          }
          
          // Normal flow with authentication
          // Fetch tasks from Supabase
          const { data: taskData, error: taskError } = await supabase
            .from('tasks')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });
            
          if (taskError) {
            throw taskError;
          }
          
          if (taskData) {
            // Convert database tasks to application tasks
            const appTasks = taskData.map((task: any) => ({
              id: task.id,
              title: task.title,
              category: task.category,
              estimatedPomodoros: task.estimated_pomodoros,
              completedPomodoros: task.completed_pomodoros,
              completed: task.completed,
              createdAt: new Date(task.created_at)
            }));
            
            setTasks(appTasks);
          }
          
          // Fetch daily stats from Supabase (to be implemented)
          // For now, use default stats
          setDailyStats(defaultStats);
          
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      };
      
      fetchUserData();
    }, [user]);
    
    // Basic implementation of timer methods 
    const startTimer = () => setIsRunning(true);
    const pauseTimer = () => setIsRunning(false);
    const resetTimer = () => {
      setIsRunning(false);
      setCurrentTime(getDurationForSessionType(sessionType));
    };
    const skipTimer = resetTimer;
    const changeSessionType = (type: SessionType) => {
      setSessionType(type);
      setCurrentTime(getDurationForSessionType(type));
    };
    
    const addTask = async (taskData: Omit<Task, 'id' | 'completedPomodoros' | 'completed' | 'createdAt'>) => {
      try {
        console.log('Adding task in AppContext:', taskData);
        
        const newTask: Task = {
          id: uuidv4(),
          ...taskData,
          completedPomodoros: 0,
          completed: false,
          createdAt: new Date()
        };
        
        if (user) {
          console.log('User authenticated, saving to Supabase');
          // Save to Supabase
          const { error } = await supabase
            .from('tasks')
            .insert({
              id: newTask.id,
              user_id: user.id,
              title: newTask.title,
              category: newTask.category,
              estimated_pomodoros: newTask.estimatedPomodoros,
              completed_pomodoros: 0,
              completed: false
            });
            
          if (error) {
            console.error('Supabase error:', error);
            throw error;
          }
        } else {
          console.log('No user, adding task only to local state');
        }
        
        console.log('Updating tasks state with new task');
        setTasks((prev) => [...prev, newTask]);
        
        // Update stats
        setDailyStats(prev => ({
          ...prev,
          tasksRemaining: prev.tasksRemaining + 1
        }));
        
        console.log('Task added successfully');
        return newTask;
      } catch (error) {
        console.error('Error adding task:', error);
        throw error;
      }
    };
    
    const updateTask = async (taskId: string, updates: Partial<Task>) => {
      try {
        if (user) {
          // Format updates for Supabase
          const dbUpdates: Record<string, any> = {};
          
          if (updates.title) dbUpdates.title = updates.title;
          if (updates.category) dbUpdates.category = updates.category;
          if (updates.estimatedPomodoros) dbUpdates.estimated_pomodoros = updates.estimatedPomodoros;
          if (updates.completedPomodoros !== undefined) dbUpdates.completed_pomodoros = updates.completedPomodoros;
          if (updates.completed !== undefined) dbUpdates.completed = updates.completed;
          
          // Update in Supabase
          const { error } = await supabase
            .from('tasks')
            .update(dbUpdates)
            .eq('id', taskId)
            .eq('user_id', user.id);
            
          if (error) {
            throw error;
          }
        }
        
        setTasks((prev) => 
          prev.map((task) => 
            task.id === taskId ? { ...task, ...updates } : task
          )
        );
        
        // Update current task if it's the one being updated
        if (currentTask?.id === taskId) {
          setCurrentTask((prevTask) => 
            prevTask ? { ...prevTask, ...updates } : null
          );
        }
      } catch (error) {
        console.error('Error updating task:', error);
      }
    };
    
    const deleteTask = async (taskId: string) => {
      try {
        const taskToDelete = tasks.find(t => t.id === taskId);
        
        if (taskToDelete) {
          if (user) {
            // Delete from Supabase
            const { error } = await supabase
              .from('tasks')
              .delete()
              .eq('id', taskId)
              .eq('user_id', user.id);
              
            if (error) {
              throw error;
            }
          }
          
          setTasks((prev) => prev.filter((task) => task.id !== taskId));
          
          // Update stats
          setDailyStats((prev) => ({
            ...prev,
            tasksRemaining: !taskToDelete.completed ? prev.tasksRemaining - 1 : prev.tasksRemaining,
            tasksDone: taskToDelete.completed ? prev.tasksDone - 1 : prev.tasksDone
          }));
          
          // Clear current task if it's the deleted one
          if (currentTask?.id === taskId) {
            setCurrentTask(null);
          }
        }
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    };
    
    const completeTask = async (taskId: string) => {
      try {
        updateTask(taskId, { completed: true });
        
        // Update stats
        setDailyStats((prev) => ({
          ...prev,
          tasksDone: prev.tasksDone + 1,
          tasksRemaining: prev.tasksRemaining - 1
        }));
      } catch (error) {
        console.error('Error completing task:', error);
      }
    };
    
    const getDurationForSessionType = (type: SessionType): number => {
      switch (type) {
        case 'Focus':
          return FOCUS_DURATION;
        case 'ShortBreak':
          return SHORT_BREAK_DURATION;
        case 'LongBreak':
          return LONG_BREAK_DURATION;
        default:
          return FOCUS_DURATION;
      }
    };
    
    // Handle timer countdown
    useEffect(() => {
      let timer: ReturnType<typeof setInterval> | null = null;
      
      if (isRunning && currentTime > 0) {
        timer = setInterval(() => {
          setCurrentTime((prevTime) => {
            if (prevTime <= 1) {
              if (timer) clearInterval(timer);
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);
      } else if (currentTime === 0) {
        // When timer ends, handle the completion logic
        if (sessionType === 'Focus') {
          // Update stats when a focus session completes
          setDailyStats((prev) => ({
            ...prev,
            focusTime: prev.focusTime + FOCUS_DURATION / 60,
            pomodoros: prev.pomodoros + 1
          }));
          
          // Update completed pomodoros for current task
          if (currentTask) {
            updateTask(currentTask.id, {
              completedPomodoros: currentTask.completedPomodoros + 1
            });
          }
        }
      }
      
      return () => {
        if (timer) clearInterval(timer);
      };
    }, [isRunning, currentTime, sessionType, currentTask]);
    
    const contextValue = {
      // Timer state
      currentTime,
      isRunning,
      sessionType,
      currentSession,
      
      // Tasks state
      tasks,
      currentTask,
      
      // Stats state
      dailyStats,
      weeklyProgress,
      categoryStats,
      productivityInsights,
      
      // Timer actions
      startTimer,
      pauseTimer,
      resetTimer,
      skipTimer,
      changeSessionType,
      
      // Task actions
      addTask,
      updateTask,
      deleteTask,
      setCurrentTask: (taskId: string | null) => {
        if (!taskId) {
          setCurrentTask(null);
          return;
        }
        
        const task = tasks.find((t) => t.id === taskId);
        setCurrentTask(task || null);
      },
      completeTask,
      
      // Loading state
      loading,
    };
    
    return (
      <AppContext.Provider value={contextValue}>
        {children}
      </AppContext.Provider>
    );
  } catch (error) {
    console.error('Error in AppContext:', error);
    throw error;
  }
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  Task, 
  SessionType, 
  Session, 
  DailyStats,
  CategoryStats,
  ProductivityInsight,
  StreakData
} from '../types';

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
  setDailyStats: React.Dispatch<React.SetStateAction<DailyStats>>;
  weeklyProgress: { goal: number; current: number };
  categoryStats: CategoryStats[];
  productivityInsights: ProductivityInsight;
  
  // Streak data
  streakData: StreakData;
  
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
  
  // Streak data
  const today = new Date().toISOString().split('T')[0];
  const [streakData, setStreakData] = useState<StreakData>({
    lastActiveDate: today,
    currentStreak: 1,
    longestStreak: 1,
    streakHistory: [{ date: today, streak: 1 }]
  });
  
  // Load data from localStorage
  useEffect(() => {
    const loadData = () => {
      setLoading(true);
      
      try {
        // Load tasks from localStorage
        const savedTasks = localStorage.getItem('focusTimer_tasks');
        if (savedTasks) {
          const parsedTasks = JSON.parse(savedTasks);
          
          // Convert date strings back to Date objects
          const processedTasks = parsedTasks.map((task: any) => ({
            ...task,
            createdAt: new Date(task.createdAt)
          }));
          
          setTasks(processedTasks);
        } else {
          // Set example tasks if none exist
          setTasks([
            {
              id: uuidv4(),
              title: 'Sample Task',
              category: 'Work',
              estimatedPomodoros: 1,
              completedPomodoros: 0,
              completed: false,
              createdAt: new Date()
            }
          ]);
        }
        
        // Load stats from localStorage
        const savedStats = localStorage.getItem('focusTimer_stats');
        if (savedStats) {
          const parsedStats = JSON.parse(savedStats);
          setDailyStats({
            ...parsedStats,
            date: new Date(parsedStats.date)
          });
        }
        
        // Load streak data from localStorage
        const savedStreak = localStorage.getItem('focusTimer_streak');
        if (savedStreak) {
          setStreakData(JSON.parse(savedStreak));
        }
        
        // Update streak for today
        updateDailyStreak();
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('focusTimer_tasks', JSON.stringify(tasks));
    
    // Update task stats
    const completedTasks = tasks.filter(task => task.completed).length;
    const remainingTasks = tasks.length - completedTasks;
    
    setDailyStats(prev => ({
      ...prev,
      tasksDone: completedTasks,
      tasksRemaining: remainingTasks
    }));
    
    localStorage.setItem('focusTimer_stats', JSON.stringify(dailyStats));
  }, [tasks, dailyStats]);
  
  // Update streak when app is used
  const updateDailyStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    
    if (streakData.lastActiveDate === today) {
      // Already counted today
      return;
    }
    
    const lastDate = new Date(streakData.lastActiveDate);
    const currentDate = new Date(today);
    
    // Check if yesterday
    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);
    
    const isConsecutiveDay = 
      lastDate.getFullYear() === yesterday.getFullYear() &&
      lastDate.getMonth() === yesterday.getMonth() &&
      lastDate.getDate() === yesterday.getDate();
    
    const newStreak = isConsecutiveDay ? streakData.currentStreak + 1 : 1;
    const newLongestStreak = Math.max(newStreak, streakData.longestStreak);
    
    const newStreakData = {
      lastActiveDate: today,
      currentStreak: newStreak,
      longestStreak: newLongestStreak,
      streakHistory: [
        ...streakData.streakHistory,
        { date: today, streak: newStreak }
      ]
    };
    
    setStreakData(newStreakData);
    localStorage.setItem('focusTimer_streak', JSON.stringify(newStreakData));
  };
  
  // Update streak data on focus session completion
  useEffect(() => {
    if (isRunning && currentTime === 0 && sessionType === 'Focus') {
      // Also update the streak data when a focus session is completed
      updateDailyStreak();
    }
  }, [isRunning, currentTime, sessionType]);
  
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
  
  // Move updateTask function definition here before we use it
  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    try {
      // Update in local state
      setTasks(prev => 
        prev.map(task => 
          task.id === taskId ? { ...task, ...updates } : task
        )
      );
      
      // Update current task if it's the one being updated
      if (currentTask && currentTask.id === taskId) {
        setCurrentTask(prev => prev ? { ...prev, ...updates } : null);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  
  // Timer effect for countdown - placed after updateTask is defined
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    
    if (isRunning && currentTime > 0) {
      timer = setInterval(() => {
        setCurrentTime(prev => {
          if (prev <= 1) {
            if (timer) clearInterval(timer);
            setIsRunning(false);
            
            // When focus session completes, update stats
            if (sessionType === 'Focus') {
              // Update daily stats
              setDailyStats(prev => ({
                ...prev,
                focusTime: prev.focusTime + 25, // Add 25 minutes
                pomodoros: prev.pomodoros + 1
              }));
              
              // Update completed pomodoros for current task
              if (currentTask) {
                updateTask(currentTask.id, {
                  completedPomodoros: currentTask.completedPomodoros + 1
                });
              }
            }
            
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, sessionType, currentTask]);
  
  const addTask = async (taskData: Omit<Task, 'id' | 'completedPomodoros' | 'completed' | 'createdAt'>) => {
    try {
      console.log('Adding task in AppContext:', taskData);
      
      // Create new task object
      const newTask: Task = {
        id: uuidv4(),
        ...taskData,
        completedPomodoros: 0,
        completed: false,
        createdAt: new Date()
      };
      
      // Add to local state
      setTasks(prev => [newTask, ...prev]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  
  const deleteTask = async (taskId: string) => {
    try {
      // Remove from local state
      setTasks(prev => prev.filter(task => task.id !== taskId));
      
      // Clear current task if it's the one being deleted
      if (currentTask && currentTask.id === taskId) {
        setCurrentTask(null);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  
  const completeTask = async (taskId: string) => {
    try {
      // Mark task as completed in local state
      updateTask(taskId, { completed: true });
      
      // Update stats
      setDailyStats(prev => ({
        ...prev,
        tasksDone: prev.tasksDone + 1,
        tasksRemaining: Math.max(0, prev.tasksRemaining - 1)
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

  // Add a setCurrentTask function that matches the interface
  const handleSetCurrentTask = (taskId: string | null) => {
    if (!taskId) {
      setCurrentTask(null);
      return;
    }
    
    const task = tasks.find(t => t.id === taskId);
    setCurrentTask(task || null);
  };

  const value = {
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
    setDailyStats,
    weeklyProgress,
    categoryStats,
    productivityInsights,
    
    // Streak data
    streakData,
    
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
    setCurrentTask: handleSetCurrentTask,
    completeTask,
    
    // Loading state
    loading
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 
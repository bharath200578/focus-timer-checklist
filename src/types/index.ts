export type PredefinedCategory = 'Work' | 'Study' | 'Creative' | 'Personal' | 'Health';
export type TaskCategory = PredefinedCategory | string;

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  estimatedPomodoros: number;
  completedPomodoros: number;
  completed: boolean;
  createdAt: Date;
}

export type SessionType = 'Focus' | 'ShortBreak' | 'LongBreak';

export interface Session {
  id: string;
  type: SessionType;
  startTime: Date;
  endTime: Date | null;
  duration: number; // in seconds
  taskId: string | null;
}

export interface DailyStats {
  date: Date;
  focusTime: number; // in minutes
  pomodoros: number;
  tasksDone: number;
  tasksRemaining: number;
}

export interface CategoryStats {
  category: TaskCategory;
  timeSpent: number; // in minutes
  percentage: number;
}

export interface ProductivityInsight {
  mostProductiveCategory: {
    category: TaskCategory;
    timeSpent: number;
  };
  bestFocusTime: {
    startHour: number;
    endHour: number;
  };
  mostProductiveDay: {
    day: string;
    average: number; // in minutes
  };
}

export interface StreakData {
  lastActiveDate: string; // ISO date string
  currentStreak: number;
  longestStreak: number;
  streakHistory: {
    date: string; // ISO date string
    streak: number;
  }[];
} 
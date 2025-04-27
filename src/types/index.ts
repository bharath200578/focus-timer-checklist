export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

export type TimerSettings = {
  focus: number;
  shortBreak: number;
  longBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  longBreakInterval: number;
};

export type TaskCategory = 'work' | 'study' | 'creative' | 'personal' | 'health';

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  estimatedPomodoros: number;
  completedPomodoros: number;
  completed: boolean;
  createdAt: Date;
  completedAt: Date | null;
}

export interface TimerSession {
  id: string;
  mode: TimerMode;
  startTime: Date;
  endTime: Date | null;
  duration: number;
  taskId: string | null;
  category: TaskCategory | null;
  completed: boolean;
}

export interface DailyStats {
  date: string;
  focusTime: number;
  pomodoros: number;
  tasksDone: number;
  tasksCreated: number;
  tasksRemaining: number;
  categoryBreakdown: Record<TaskCategory, number>;
}

export interface WeeklyStats {
  startDate: string;
  endDate: string;
  totalFocusTime: number;
  dailyFocusTime: Record<string, number>;
  goalTime: number;
  completedTasks: number;
  mostProductiveDay: string;
}

export interface MonthlyStats {
  month: string;
  year: number;
  totalFocusTime: number;
  weeklyFocusTime: Record<string, number>;
  goalTime: number;
  completedTasks: number;
  categoryBreakdown: Record<TaskCategory, number>;
}

export interface YearlyStats {
  year: number;
  totalFocusTime: number;
  monthlyFocusTime: Record<string, number>;
  goalTime: number;
  completedTasks: number;
  categoryBreakdown: Record<TaskCategory, number>;
}

export interface UserSettings {
  timer: TimerSettings;
  weeklyGoal: number;
  monthlyGoal: number;
  yearlyGoal: number;
  notifications: boolean;
  darkMode: boolean;
}
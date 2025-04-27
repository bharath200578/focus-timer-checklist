import { addDays, format, subDays, subMonths, subWeeks } from 'date-fns';
import { DailyStats, MonthlyStats, Task, WeeklyStats, YearlyStats } from '../types';

// Mock tasks
export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Prepare quarterly report presentation',
    category: 'work',
    estimatedPomodoros: 2,
    completedPomodoros: 0,
    completed: false,
    createdAt: new Date(),
    completedAt: null,
  },
  {
    id: '2',
    title: 'Review project proposal from client',
    category: 'work',
    estimatedPomodoros: 1,
    completedPomodoros: 0,
    completed: false,
    createdAt: new Date(),
    completedAt: null,
  }
];

// Mock daily stats
export const mockDailyStats: DailyStats = {
  date: format(new Date(), 'yyyy-MM-dd'),
  focusTime: 0,
  pomodoros: 0,
  tasksDone: 0,
  tasksCreated: 0,
  tasksRemaining: 0,
  categoryBreakdown: {
    work: 0,
    study: 0,
    creative: 0,
    personal: 0,
    health: 0,
  },
};

// Mock weekly stats
export const mockWeeklyStats: WeeklyStats = {
  startDate: format(subDays(new Date(), 6), 'yyyy-MM-dd'),
  endDate: format(new Date(), 'yyyy-MM-dd'),
  totalFocusTime: 0,
  dailyFocusTime: {
    [format(subDays(new Date(), 6), 'yyyy-MM-dd')]: 0,
    [format(subDays(new Date(), 5), 'yyyy-MM-dd')]: 0,
    [format(subDays(new Date(), 4), 'yyyy-MM-dd')]: 0,
    [format(subDays(new Date(), 3), 'yyyy-MM-dd')]: 0,
    [format(subDays(new Date(), 2), 'yyyy-MM-dd')]: 0,
    [format(subDays(new Date(), 1), 'yyyy-MM-dd')]: 0,
    [format(new Date(), 'yyyy-MM-dd')]: 0,
  },
  goalTime: 20 * 60, // 20 hours in minutes
  completedTasks: 0,
  mostProductiveDay: format(new Date(), 'yyyy-MM-dd'),
};

// Mock monthly stats
export const mockMonthlyStats: MonthlyStats = {
  month: format(new Date(), 'MMMM'),
  year: new Date().getFullYear(),
  totalFocusTime: 0,
  weeklyFocusTime: {
    [format(subWeeks(new Date(), 3), 'yyyy-MM-dd')]: 0,
    [format(subWeeks(new Date(), 2), 'yyyy-MM-dd')]: 0,
    [format(subWeeks(new Date(), 1), 'yyyy-MM-dd')]: 0,
    [format(new Date(), 'yyyy-MM-dd')]: 0,
  },
  goalTime: 80 * 60, // 80 hours in minutes
  completedTasks: 0,
  categoryBreakdown: {
    work: 0,
    study: 0,
    creative: 0,
    personal: 0,
    health: 0,
  },
};

// Mock yearly stats
export const mockYearlyStats: YearlyStats = {
  year: new Date().getFullYear(),
  totalFocusTime: 0,
  monthlyFocusTime: {
    '01': 0,
    '02': 0,
    '03': 0,
    '04': 0,
    '05': 0,
    '06': 0,
    '07': 0,
    '08': 0,
    '09': 0,
    '10': 0,
    '11': 0,
    '12': 0,
  },
  goalTime: 1000 * 60, // 1000 hours in minutes
  completedTasks: 0,
  categoryBreakdown: {
    work: 0,
    study: 0,
    creative: 0,
    personal: 0,
    health: 0,
  },
};
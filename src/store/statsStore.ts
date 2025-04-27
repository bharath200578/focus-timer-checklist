import { create } from 'zustand';
import { format } from 'date-fns';
import { DailyStats, MonthlyStats, WeeklyStats, YearlyStats } from '../types';
import { mockDailyStats, mockMonthlyStats, mockWeeklyStats, mockYearlyStats } from '../data/mockData';

interface StatsState {
  dailyStats: DailyStats;
  weeklyStats: WeeklyStats;
  monthlyStats: MonthlyStats;
  yearlyStats: YearlyStats;
  
  // Actions
  updateDailyStats: (updates: Partial<DailyStats>) => void;
  updateWeeklyStats: (updates: Partial<WeeklyStats>) => void;
  updateMonthlyStats: (updates: Partial<MonthlyStats>) => void;
  updateYearlyStats: (updates: Partial<YearlyStats>) => void;
  
  // For tracking time in current session
  addFocusTime: (minutes: number, category: string) => void;
  incrementPomodoro: () => void;
  incrementTaskDone: () => void;
}

export const useStatsStore = create<StatsState>((set) => ({
  dailyStats: { ...mockDailyStats },
  weeklyStats: { ...mockWeeklyStats },
  monthlyStats: { ...mockMonthlyStats },
  yearlyStats: { ...mockYearlyStats },
  
  updateDailyStats: (updates) => {
    set((state) => ({
      dailyStats: { ...state.dailyStats, ...updates },
    }));
  },
  
  updateWeeklyStats: (updates) => {
    set((state) => ({
      weeklyStats: { ...state.weeklyStats, ...updates },
    }));
  },
  
  updateMonthlyStats: (updates) => {
    set((state) => ({
      monthlyStats: { ...state.monthlyStats, ...updates },
    }));
  },
  
  updateYearlyStats: (updates) => {
    set((state) => ({
      yearlyStats: { ...state.yearlyStats, ...updates },
    }));
  },
  
  addFocusTime: (minutes, category) => {
    set((state) => {
      // Update daily stats
      const updatedDailyStats = { ...state.dailyStats };
      updatedDailyStats.focusTime += minutes;
      
      if (category in updatedDailyStats.categoryBreakdown) {
        updatedDailyStats.categoryBreakdown[category as keyof typeof updatedDailyStats.categoryBreakdown] += minutes;
      }
      
      // Update weekly stats
      const updatedWeeklyStats = { ...state.weeklyStats };
      updatedWeeklyStats.totalFocusTime += minutes;
      
      const today = format(new Date(), 'yyyy-MM-dd');
      if (today in updatedWeeklyStats.dailyFocusTime) {
        updatedWeeklyStats.dailyFocusTime[today] += minutes;
      } else {
        updatedWeeklyStats.dailyFocusTime[today] = minutes;
      }
      
      return {
        dailyStats: updatedDailyStats,
        weeklyStats: updatedWeeklyStats,
      };
    });
  },
  
  incrementPomodoro: () => {
    set((state) => ({
      dailyStats: {
        ...state.dailyStats,
        pomodoros: state.dailyStats.pomodoros + 1,
      },
    }));
  },
  
  incrementTaskDone: () => {
    set((state) => ({
      dailyStats: {
        ...state.dailyStats,
        tasksDone: state.dailyStats.tasksDone + 1,
        tasksRemaining: Math.max(0, state.dailyStats.tasksRemaining - 1),
      },
    }));
  },
}));
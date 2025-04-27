import { create } from 'zustand';
import { TimerMode, TimerSettings } from '../types';

interface TimerState {
  mode: TimerMode;
  timeLeft: number;
  isRunning: boolean;
  isPaused: boolean;
  isFinished: boolean;
  sessionsCompleted: number;
  currentTaskId: string | null;
  settings: TimerSettings;
  
  // Actions
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  skipTimer: () => void;
  setMode: (mode: TimerMode) => void;
  setCurrentTaskId: (taskId: string | null) => void;
  tick: () => void;
}

const DEFAULT_SETTINGS: TimerSettings = {
  focus: 25 * 60, // 25 minutes in seconds
  shortBreak: 5 * 60, // 5 minutes in seconds
  longBreak: 15 * 60, // 15 minutes in seconds
  autoStartBreaks: false,
  autoStartPomodoros: false,
  longBreakInterval: 4,
};

export const useTimerStore = create<TimerState>((set, get) => ({
  mode: 'focus',
  timeLeft: DEFAULT_SETTINGS.focus,
  isRunning: false,
  isPaused: false,
  isFinished: false,
  sessionsCompleted: 0,
  currentTaskId: null,
  settings: DEFAULT_SETTINGS,
  
  startTimer: () => set({ isRunning: true, isPaused: false }),
  
  pauseTimer: () => set({ isRunning: false, isPaused: true }),
  
  resetTimer: () => {
    const { mode, settings } = get();
    let timeLeft = 0;
    
    switch (mode) {
      case 'focus':
        timeLeft = settings.focus;
        break;
      case 'shortBreak':
        timeLeft = settings.shortBreak;
        break;
      case 'longBreak':
        timeLeft = settings.longBreak;
        break;
    }
    
    set({
      timeLeft,
      isRunning: false,
      isPaused: false,
      isFinished: false,
    });
  },
  
  skipTimer: () => {
    const { mode, settings } = get();
    let nextMode: TimerMode = 'focus';
    let nextTimeLeft = settings.focus;
    let nextSessionsCompleted = get().sessionsCompleted;
    
    if (mode === 'focus') {
      nextSessionsCompleted += 1;
      if (nextSessionsCompleted % settings.longBreakInterval === 0) {
        nextMode = 'longBreak';
        nextTimeLeft = settings.longBreak;
      } else {
        nextMode = 'shortBreak';
        nextTimeLeft = settings.shortBreak;
      }
    } else {
      nextMode = 'focus';
      nextTimeLeft = settings.focus;
    }
    
    set({
      mode: nextMode,
      timeLeft: nextTimeLeft,
      isRunning: false,
      isPaused: false,
      isFinished: false,
      sessionsCompleted: nextSessionsCompleted,
    });
  },
  
  setMode: (mode) => {
    const { settings } = get();
    let timeLeft = 0;
    
    switch (mode) {
      case 'focus':
        timeLeft = settings.focus;
        break;
      case 'shortBreak':
        timeLeft = settings.shortBreak;
        break;
      case 'longBreak':
        timeLeft = settings.longBreak;
        break;
    }
    
    set({
      mode,
      timeLeft,
      isRunning: false,
      isPaused: false,
      isFinished: false,
    });
  },
  
  setCurrentTaskId: (taskId) => set({ currentTaskId: taskId }),
  
  tick: () => {
    const { timeLeft, isRunning, mode, settings } = get();
    
    if (!isRunning || timeLeft <= 0) return;
    
    const newTimeLeft = timeLeft - 1;
    
    if (newTimeLeft <= 0) {
      let nextMode: TimerMode = 'focus';
      let nextTimeLeft = settings.focus;
      let nextSessionsCompleted = get().sessionsCompleted;
      
      if (mode === 'focus') {
        nextSessionsCompleted += 1;
        if (nextSessionsCompleted % settings.longBreakInterval === 0) {
          nextMode = 'longBreak';
          nextTimeLeft = settings.longBreak;
        } else {
          nextMode = 'shortBreak';
          nextTimeLeft = settings.shortBreak;
        }
      } else {
        nextMode = 'focus';
        nextTimeLeft = settings.focus;
      }
      
      set({
        mode: nextMode,
        timeLeft: nextTimeLeft,
        isRunning: settings.autoStartBreaks || (settings.autoStartPomodoros && nextMode === 'focus'),
        isPaused: false,
        isFinished: true,
        sessionsCompleted: nextSessionsCompleted,
      });
    } else {
      set({ timeLeft: newTimeLeft });
    }
  },
}));
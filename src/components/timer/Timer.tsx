import React, { useEffect } from 'react';
import { useTimerStore } from '../../store/timerStore';
import { useStatsStore } from '../../store/statsStore';
import { useTaskStore } from '../../store/taskStore';
import TimerModeSelector from './TimerModeSelector';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';

export default function Timer() {
  const { tick, isRunning, isFinished, mode, currentTaskId, settings } = useTimerStore();
  const { incrementPomodoro, addFocusTime } = useStatsStore();
  const { incrementTaskPomodoro } = useTaskStore();
  
  // Timer ticker
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        tick();
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, tick]);
  
  // Handle completed sessions
  useEffect(() => {
    if (isFinished) {
      // If a focus session was completed
      if (mode !== 'focus') {
        incrementPomodoro();
        
        // Convert from seconds to minutes for stats
        const focusDuration = settings.focus / 60;
        
        // Add focus time to stats
        if (currentTaskId) {
          const task = useTaskStore.getState().tasks.find(t => t.id === currentTaskId);
          if (task) {
            incrementTaskPomodoro(currentTaskId);
            addFocusTime(focusDuration, task.category);
          } else {
            addFocusTime(focusDuration, 'work'); // Default category if task not found
          }
        } else {
          addFocusTime(focusDuration, 'work'); // Default category if no task set
        }
      }
    }
  }, [isFinished, mode, currentTaskId, settings, incrementPomodoro, addFocusTime, incrementTaskPomodoro]);
  
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <TimerModeSelector className="mx-auto max-w-md" />
      <TimerDisplay />
      <TimerControls />
    </div>
  );
}
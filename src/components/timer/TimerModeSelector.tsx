import React from 'react';
import { useTimerStore } from '../../store/timerStore';
import { TimerMode } from '../../types';

interface TimerModeSelectorProps {
  className?: string;
}

export default function TimerModeSelector({ className = '' }: TimerModeSelectorProps) {
  const { mode, setMode, isRunning } = useTimerStore();
  
  const handleModeChange = (newMode: TimerMode) => {
    if (mode !== newMode && !isRunning) {
      setMode(newMode);
    }
  };
  
  return (
    <div className={`flex rounded-lg bg-gray-100 p-1 ${className}`}>
      <button
        className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors sm:text-base
          ${mode === 'focus' 
            ? 'bg-primary-400 text-white shadow-md' 
            : 'text-gray-700 hover:bg-gray-200'
          }`}
        onClick={() => handleModeChange('focus')}
        disabled={isRunning}
      >
        Focus
      </button>
      
      <button
        className={`ml-1 flex-1 rounded-md py-2 text-sm font-medium transition-colors sm:text-base
          ${mode === 'shortBreak' 
            ? 'bg-primary-400 text-white shadow-md' 
            : 'text-gray-700 hover:bg-gray-200'
          }`}
        onClick={() => handleModeChange('shortBreak')}
        disabled={isRunning}
      >
        Short Break
      </button>
      
      <button
        className={`ml-1 flex-1 rounded-md py-2 text-sm font-medium transition-colors sm:text-base
          ${mode === 'longBreak' 
            ? 'bg-primary-400 text-white shadow-md' 
            : 'text-gray-700 hover:bg-gray-200'
          }`}
        onClick={() => handleModeChange('longBreak')}
        disabled={isRunning}
      >
        Long Break
      </button>
    </div>
  );
}
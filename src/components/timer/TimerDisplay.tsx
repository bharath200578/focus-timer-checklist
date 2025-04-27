import React, { useEffect, useState } from 'react';
import { useTimerStore } from '../../store/timerStore';

export default function TimerDisplay() {
  const { timeLeft, mode, sessionsCompleted } = useTimerStore();
  const [progressPercent, setProgressPercent] = useState(100);
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  const displayTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  
  const getColorByMode = () => {
    switch (mode) {
      case 'focus':
        return 'bg-primary-500';
      case 'shortBreak':
        return 'bg-green-500';
      case 'longBreak':
        return 'bg-blue-500';
      default:
        return 'bg-primary-500';
    }
  };
  
  const sessionLabel = `#${sessionsCompleted + 1} ${mode.charAt(0).toUpperCase() + mode.slice(1).replace(/([A-Z])/g, ' $1')} Session`;
  
  useEffect(() => {
    const { settings } = useTimerStore.getState();
    let totalTime = 0;
    
    switch (mode) {
      case 'focus':
        totalTime = settings.focus;
        break;
      case 'shortBreak':
        totalTime = settings.shortBreak;
        break;
      case 'longBreak':
        totalTime = settings.longBreak;
        break;
    }
    
    setProgressPercent((timeLeft / totalTime) * 100);
  }, [timeLeft, mode]);

  return (
    <div className="mt-6 flex flex-col items-center">
      <div className="relative h-8 w-full max-w-md rounded-full bg-gray-200">
        <div 
          className={`absolute left-0 top-0 h-8 rounded-full transition-all ${getColorByMode()}`}
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      
      <div className="mt-4 text-center">
        <h2 className="text-6xl font-bold text-gray-800 sm:text-7xl">{displayTime}</h2>
        <p className="mt-2 text-sm text-gray-500">
          {sessionLabel}
        </p>
      </div>
    </div>
  );
}
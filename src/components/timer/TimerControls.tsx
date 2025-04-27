import React from 'react';
import { Play, Pause, SkipForward, RefreshCw } from 'lucide-react';
import { useTimerStore } from '../../store/timerStore';

export default function TimerControls() {
  const { isRunning, startTimer, pauseTimer, resetTimer, skipTimer } = useTimerStore();
  
  return (
    <div className="mt-6 flex items-center justify-center space-x-4">
      <button
        aria-label={isRunning ? 'Pause' : 'Start'}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white shadow-md transition-transform hover:bg-primary-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        onClick={isRunning ? pauseTimer : startTimer}
      >
        {isRunning ? <Pause size={24} /> : <Play size={24} />}
      </button>

      <button
        aria-label="Reset"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-700 transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        onClick={resetTimer}
      >
        <RefreshCw size={18} />
      </button>

      <button
        aria-label="Skip"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-700 transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        onClick={skipTimer}
      >
        <SkipForward size={18} />
      </button>
    </div>
  );
}
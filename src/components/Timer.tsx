import React from 'react';
import { useApp } from '../contexts/AppContext';
import '../styles/Timer.css';
import { SessionType } from '../types';

export const Timer: React.FC = () => {
  const {
    currentTime,
    isRunning,
    sessionType,
    changeSessionType,
    startTimer,
    pauseTimer,
    resetTimer,
    skipTimer
  } = useApp();
  
  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="timer-container">
      <div className="timer-tabs">
        <button 
          className={`timer-tab ${sessionType === 'Focus' ? 'active' : ''}`}
          onClick={() => changeSessionType('Focus')}
        >
          Focus
        </button>
        <button 
          className={`timer-tab ${sessionType === 'ShortBreak' ? 'active' : ''}`}
          onClick={() => changeSessionType('ShortBreak')}
        >
          Short Break
        </button>
        <button 
          className={`timer-tab ${sessionType === 'LongBreak' ? 'active' : ''}`}
          onClick={() => changeSessionType('LongBreak')}
        >
          Long Break
        </button>
      </div>
      
      <div className="timer-display">
        <h1>{formatTime(currentTime)}</h1>
        <p>#1 Focus Session</p>
      </div>
      
      <div className="timer-controls">
        {isRunning ? (
          <button className="timer-button pause" onClick={pauseTimer}>
            <span className="icon">⏸</span>
            Pause
          </button>
        ) : (
          <button className="timer-button start" onClick={startTimer}>
            <span className="icon">{currentTime === getDurationForSessionType(sessionType) ? '▶' : '⏯'}</span>
            {currentTime === getDurationForSessionType(sessionType) ? 'Start' : 'Resume'}
          </button>
        )}
        <button className="timer-button reset" onClick={resetTimer}>
          <span className="icon">⟲</span>
          Reset
        </button>
        <button className="timer-button skip" onClick={skipTimer}>
          <span className="icon">⏭</span>
          Skip
        </button>
      </div>
    </div>
  );
};

// Helper function to get duration for session type
const getDurationForSessionType = (type: SessionType): number => {
  switch (type) {
    case 'Focus':
      return 25 * 60; // 25 minutes
    case 'ShortBreak':
      return 5 * 60; // 5 minutes
    case 'LongBreak':
      return 15 * 60; // 15 minutes
    default:
      return 25 * 60; // Default to Focus duration
  }
}; 
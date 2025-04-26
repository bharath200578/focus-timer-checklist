import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Charts } from './Charts';
import '../styles/Stats.css';

export const Stats: React.FC = () => {
  const { dailyStats, weeklyProgress } = useApp();
  
  // Format time as Xh Xm
  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours === 0) {
      return `${remainingMinutes}m`;
    } else if (remainingMinutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${remainingMinutes}m`;
    }
  };
  
  // Calculate progress percentage for the week
  const weeklyProgressPercentage = Math.min(
    (weeklyProgress.current / weeklyProgress.goal) * 100, 
    100
  );
  
  return (
    <div className="stats-container">
      <section className="daily-stats">
        <h2>Today's Stats</h2>
        
        <div className="stats-grid">
          <div className="stat-box">
            <span className="stat-label">Focus Time</span>
            <span className="stat-value">{formatTime(dailyStats.focusTime)}</span>
          </div>
          
          <div className="stat-box">
            <span className="stat-label">Pomodoros</span>
            <span className="stat-value">{dailyStats.pomodoros}</span>
          </div>
          
          <div className="stat-box">
            <span className="stat-label">Tasks Done</span>
            <span className="stat-value">{dailyStats.tasksDone}</span>
          </div>
          
          <div className="stat-box">
            <span className="stat-label">Remaining</span>
            <span className="stat-value">{dailyStats.tasksRemaining}</span>
          </div>
        </div>
        
        <div className="focus-distribution">
          <h3>Focus Distribution</h3>
          <div className="chart-wrapper">
            <Charts />
          </div>
        </div>
      </section>
      
      <section className="weekly-progress">
        <h2>Weekly Progress</h2>
        
        <div className="progress-container">
          <div className="progress-labels">
            <span className="progress-goal">Weekly Goal</span>
            <span className="progress-value">{formatTime(weeklyProgress.current)} / {formatTime(weeklyProgress.goal)}</span>
          </div>
          
          <div className="progress-bar-container">
            <div 
              className="progress-bar" 
              style={{ width: `${weeklyProgressPercentage}%` }}
            ></div>
          </div>
        </div>
      </section>
    </div>
  );
}; 
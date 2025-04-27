import React from 'react';
import { useStatsStore } from '../../store/statsStore';
import StatCard from './StatCard';
import { Clock, CheckCircle, ListTodo, Timer } from 'lucide-react';

export default function TodayStats() {
  const { dailyStats } = useStatsStore();
  
  // Convert minutes to hours and minutes
  const focusHours = Math.floor(dailyStats.focusTime / 60);
  const focusMinutes = dailyStats.focusTime % 60;
  const focusTimeDisplay = `${focusHours}h ${focusMinutes}m`;
  
  return (
    <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">Today's Stats</h2>
      
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard 
          title="Focus Time" 
          value={focusTimeDisplay}
          icon={<Clock size={20} />}
          colorClass="text-primary-500"
        />
        
        <StatCard 
          title="Pomodoros" 
          value={dailyStats.pomodoros}
          icon={<Timer size={20} />}
          colorClass="text-green-500"
        />
        
        <StatCard 
          title="Tasks Done" 
          value={dailyStats.tasksDone}
          icon={<CheckCircle size={20} />}
          colorClass="text-blue-500"
        />
        
        <StatCard 
          title="Remaining" 
          value={dailyStats.tasksRemaining}
          icon={<ListTodo size={20} />}
          colorClass="text-yellow-500"
        />
      </div>
    </div>
  );
}
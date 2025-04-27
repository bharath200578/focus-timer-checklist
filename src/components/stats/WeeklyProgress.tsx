import React from 'react';
import { useStatsStore } from '../../store/statsStore';
import ProgressBar from './ProgressBar';
import { format } from 'date-fns';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function WeeklyProgress() {
  const { weeklyStats } = useStatsStore();
  
  // Calculate weekly progress percentage
  const weeklyGoalHours = Math.floor(weeklyStats.goalTime / 60);
  const weeklyGoalMinutes = weeklyStats.goalTime % 60;
  
  const totalFocusTimeHours = Math.floor(weeklyStats.totalFocusTime / 60);
  const totalFocusTimeMinutes = weeklyStats.totalFocusTime % 60;
  
  // Prepare data for chart
  const days = Object.keys(weeklyStats.dailyFocusTime);
  const focusTimeValues = Object.values(weeklyStats.dailyFocusTime);
  
  // Format days to shorter format (Mon, Tue, etc.)
  const formattedDays = days.map(day => format(new Date(day), 'EEE'));
  
  // Convert minutes to hours for chart
  const focusTimeHours = focusTimeValues.map(minutes => Number((minutes / 60).toFixed(1)));
  
  const chartData = {
    labels: formattedDays,
    datasets: [
      {
        label: 'Focus Hours',
        data: focusTimeHours,
        backgroundColor: 'rgba(255, 129, 120, 0.7)',
        borderColor: 'rgba(255, 129, 120, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.formattedValue} hours`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return `${value}h`;
          }
        }
      }
    }
  };
  
  return (
    <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">Weekly Progress</h2>
      
      <div className="mb-4">
        <ProgressBar
          value={weeklyStats.totalFocusTime}
          max={weeklyStats.goalTime}
          label={`${totalFocusTimeHours}h ${totalFocusTimeMinutes}m / ${weeklyGoalHours}h ${weeklyGoalMinutes}m`}
          showPercentage={true}
          size="md"
        />
      </div>
      
      <div className="h-60">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
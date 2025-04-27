import React from 'react';
import { useStatsStore } from '../../store/statsStore';
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

export default function MonthlyProgress() {
  const { monthlyStats } = useStatsStore();
  
  // Calculate monthly progress percentage
  const monthlyGoalHours = Math.floor(monthlyStats.goalTime / 60);
  const totalFocusTimeHours = Math.floor(monthlyStats.totalFocusTime / 60);
  const completionPercentage = Math.round((monthlyStats.totalFocusTime / monthlyStats.goalTime) * 100);
  
  // Prepare data for chart
  const weeks = Object.keys(monthlyStats.weeklyFocusTime);
  const weekNumbers = weeks.map((_, index) => `Week ${index + 1}`);
  const focusTimeValues = Object.values(monthlyStats.weeklyFocusTime);
  
  // Convert minutes to hours for chart
  const focusTimeHours = focusTimeValues.map(minutes => Number((minutes / 60).toFixed(1)));
  
  const chartData = {
    labels: weekNumbers,
    datasets: [
      {
        label: 'Weekly Focus Hours',
        data: focusTimeHours,
        backgroundColor: 'rgba(79, 70, 229, 0.7)',
        borderColor: 'rgba(79, 70, 229, 1)',
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
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Monthly Progress</h2>
        <div className="text-sm text-gray-500">{monthlyStats.month} {monthlyStats.year}</div>
      </div>
      
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex-grow rounded-lg bg-indigo-50 p-3">
          <div className="text-sm font-medium text-gray-600">Goal</div>
          <div className="text-2xl font-bold text-indigo-700">{monthlyGoalHours} hours</div>
        </div>
        
        <div className="flex-grow rounded-lg bg-green-50 p-3">
          <div className="text-sm font-medium text-gray-600">Completed</div>
          <div className="text-2xl font-bold text-green-700">{totalFocusTimeHours} hours</div>
        </div>
        
        <div className="flex-grow rounded-lg bg-blue-50 p-3">
          <div className="text-sm font-medium text-gray-600">Completion</div>
          <div className="text-2xl font-bold text-blue-700">{completionPercentage}%</div>
        </div>
      </div>
      
      <div className="h-60">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
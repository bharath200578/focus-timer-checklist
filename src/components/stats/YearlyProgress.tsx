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

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function YearlyProgress() {
  const { yearlyStats } = useStatsStore();
  
  // Calculate yearly progress
  const yearlyGoalHours = Math.floor(yearlyStats.goalTime / 60);
  const totalFocusTimeHours = Math.floor(yearlyStats.totalFocusTime / 60);
  const completionPercentage = Math.round((yearlyStats.totalFocusTime / yearlyStats.goalTime) * 100);
  
  // Get monthly data
  const monthlyData = Object.entries(yearlyStats.monthlyFocusTime).map(([month, minutes]) => ({
    month: parseInt(month, 10),
    hours: Number((minutes / 60).toFixed(1)),
  }));
  
  // Prepare complete dataset (all 12 months)
  const dataByMonth = Array(12).fill(0);
  monthlyData.forEach(({ month, hours }) => {
    dataByMonth[month - 1] = hours;
  });
  
  const chartData = {
    labels: MONTHS,
    datasets: [
      {
        label: 'Monthly Focus Hours',
        data: dataByMonth,
        backgroundColor: 'rgba(56, 189, 248, 0.7)',
        borderColor: 'rgba(56, 189, 248, 1)',
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
        <h2 className="text-lg font-semibold text-gray-800">Yearly Progress</h2>
        <div className="text-sm text-gray-500">{yearlyStats.year}</div>
      </div>
      
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex-grow rounded-lg bg-sky-50 p-3">
          <div className="text-sm font-medium text-gray-600">Annual Goal</div>
          <div className="text-2xl font-bold text-sky-700">{yearlyGoalHours} hours</div>
        </div>
        
        <div className="flex-grow rounded-lg bg-emerald-50 p-3">
          <div className="text-sm font-medium text-gray-600">Completed</div>
          <div className="text-2xl font-bold text-emerald-700">{totalFocusTimeHours} hours</div>
        </div>
        
        <div className="flex-grow rounded-lg bg-violet-50 p-3">
          <div className="text-sm font-medium text-gray-600">Completion</div>
          <div className="text-2xl font-bold text-violet-700">{completionPercentage}%</div>
        </div>
      </div>
      
      <div className="h-60">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
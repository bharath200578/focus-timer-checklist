import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useApp } from '../contexts/AppContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import '../styles/StreakGraph.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type TimeRange = 'week' | 'month' | 'year' | 'all';

export const StreakGraph: React.FC = () => {
  const { streakData } = useApp();
  const [timeRange, setTimeRange] = useState<TimeRange>('month');
  
  const getDateLabel = (dateStr: string, range: TimeRange): string => {
    const date = new Date(dateStr);
    
    switch (range) {
      case 'week':
        return date.toLocaleDateString(undefined, { weekday: 'short' });
      case 'month':
        return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
      case 'year':
        return date.toLocaleDateString(undefined, { month: 'short', year: '2-digit' });
      case 'all':
        return date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
      default:
        return dateStr;
    }
  };
  
  const prepareChartData = () => {
    if (!streakData.streakHistory.length) {
      return {
        labels: [],
        datasets: []
      };
    }
    
    // Filter data based on selected time range
    const currentDate = new Date();
    let filteredData = [...streakData.streakHistory];
    
    if (timeRange !== 'all') {
      let cutoffDate = new Date();
      
      if (timeRange === 'week') {
        cutoffDate.setDate(currentDate.getDate() - 7);
      } else if (timeRange === 'month') {
        cutoffDate.setMonth(currentDate.getMonth() - 1);
      } else if (timeRange === 'year') {
        cutoffDate.setFullYear(currentDate.getFullYear() - 1);
      }
      
      filteredData = filteredData.filter(item => 
        new Date(item.date) >= cutoffDate
      );
    }
    
    // If year or all, group by month
    if (timeRange === 'year' || timeRange === 'all') {
      const monthlyData: Record<string, number> = {};
      
      filteredData.forEach(item => {
        const date = new Date(item.date);
        const yearMonth = `${date.getFullYear()}-${date.getMonth() + 1}`;
        
        if (!monthlyData[yearMonth] || monthlyData[yearMonth] < item.streak) {
          monthlyData[yearMonth] = item.streak;
        }
      });
      
      // Sort by date
      const sortedMonths = Object.keys(monthlyData).sort();
      
      return {
        labels: sortedMonths.map(ym => {
          const [year, month] = ym.split('-');
          return getDateLabel(`${year}-${month.padStart(2, '0')}-01`, timeRange);
        }),
        datasets: [{
          label: 'Streak',
          data: sortedMonths.map(ym => monthlyData[ym]),
          borderColor: '#ff7f7f',
          backgroundColor: 'rgba(255, 127, 127, 0.5)',
          tension: 0.1,
          fill: true
        }]
      };
    }
    
    // Sort by date
    filteredData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return {
      labels: filteredData.map(item => getDateLabel(item.date, timeRange)),
      datasets: [{
        label: 'Streak',
        data: filteredData.map(item => item.streak),
        borderColor: '#ff7f7f',
        backgroundColor: 'rgba(255, 127, 127, 0.5)',
        tension: 0.1,
        fill: true
      }]
    };
  };
  
  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Streak Days'
        },
        ticks: {
          stepSize: 1
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Your Streak Progress'
      }
    }
  };
  
  return (
    <div className="streak-graph">
      <div className="streak-header">
        <h3>Streak Progress</h3>
        <div className="streak-stats">
          <div className="streak-stat">
            <span className="streak-value">{streakData.currentStreak}</span>
            <span className="streak-label">Current Streak</span>
          </div>
          <div className="streak-stat">
            <span className="streak-value">{streakData.longestStreak}</span>
            <span className="streak-label">Longest Streak</span>
          </div>
        </div>
      </div>
      
      <div className="streak-time-range">
        <button 
          className={`time-range-btn ${timeRange === 'week' ? 'active' : ''}`}
          onClick={() => setTimeRange('week')}
        >
          Week
        </button>
        <button 
          className={`time-range-btn ${timeRange === 'month' ? 'active' : ''}`}
          onClick={() => setTimeRange('month')}
        >
          Month
        </button>
        <button 
          className={`time-range-btn ${timeRange === 'year' ? 'active' : ''}`}
          onClick={() => setTimeRange('year')}
        >
          Year
        </button>
        <button 
          className={`time-range-btn ${timeRange === 'all' ? 'active' : ''}`}
          onClick={() => setTimeRange('all')}
        >
          All Time
        </button>
      </div>
      
      <div className="streak-chart">
        <Line data={prepareChartData()} options={chartOptions} />
      </div>
    </div>
  );
}; 
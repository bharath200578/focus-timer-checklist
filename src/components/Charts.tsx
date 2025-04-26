import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useApp } from '../contexts/AppContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import '../styles/Charts.css';

// Register the required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const Charts: React.FC = () => {
  const { categoryStats } = useApp();
  
  const categories = categoryStats.map(stat => stat.category);
  const percentages = categoryStats.map(stat => stat.percentage);
  
  // Color mapping for each category
  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'Work': return '#3366cc';
      case 'Study': return '#dc3912';
      case 'Creative': return '#ff9900';
      case 'Personal': return '#109618';
      case 'Health': return '#990099';
      default: return '#cccccc';
    }
  };
  
  // Prepare data for the bar chart
  const barData = {
    labels: categories,
    datasets: [
      {
        label: 'Time Distribution (%)',
        data: percentages,
        backgroundColor: categories.map(cat => getCategoryColor(cat)),
        borderWidth: 0,
        borderRadius: 5,
        maxBarThickness: 40,
      },
    ],
  };
  
  // Options for the bar chart
  const barOptions = {
    indexAxis: 'y' as const, // Horizontal bar chart
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide default legend
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.raw}% of focus time`;
          }
        }
      }
    },
    scales: {
      y: {
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          callback: function(value: any) {
            return value + '%';
          }
        },
        max: 100
      }
    }
  };
  
  return (
    <div className="chart-container">
      <div className="category-labels">
        {categories.map((category, index) => (
          <div key={index} className="category-label">
            <div 
              className="category-color" 
              style={{ backgroundColor: getCategoryColor(category) }}
            ></div>
            <div className="category-name">{category}</div>
          </div>
        ))}
      </div>
      
      <div className="bar-chart">
        <Bar data={barData} options={barOptions} />
      </div>
    </div>
  );
}; 
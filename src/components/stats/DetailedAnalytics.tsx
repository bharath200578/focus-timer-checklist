import React from 'react';
import { useStatsStore } from '../../store/statsStore';
import { Bar } from 'react-chartjs-2';
import { format } from 'date-fns';
import { BarChart3, Clock, CalendarCheck, Target, CheckCircle2, Timer } from 'lucide-react';

export default function DetailedAnalytics() {
  const { dailyStats, weeklyStats, monthlyStats, yearlyStats } = useStatsStore();

  // Calculate overall stats
  const totalHours = Math.floor(yearlyStats.totalFocusTime / 60);
  const totalMinutes = yearlyStats.totalFocusTime % 60;
  const averageDailyHours = (yearlyStats.totalFocusTime / 365).toFixed(1);
  const completionRate = ((yearlyStats.completedTasks / (yearlyStats.completedTasks + dailyStats.tasksRemaining)) * 100).toFixed(1);

  // Most productive category
  const categories = Object.entries(yearlyStats.categoryBreakdown)
    .map(([category, minutes]) => ({ category, hours: minutes / 60 }))
    .sort((a, b) => b.hours - a.hours);
  const topCategory = categories[0];

  // Prepare monthly trend data
  const monthlyData = {
    labels: Object.keys(yearlyStats.monthlyFocusTime).map(month => format(new Date(2024, parseInt(month) - 1), 'MMM')),
    datasets: [{
      label: 'Focus Hours',
      data: Object.values(yearlyStats.monthlyFocusTime).map(minutes => minutes / 60),
      backgroundColor: 'rgba(79, 70, 229, 0.7)',
      borderColor: 'rgba(79, 70, 229, 1)',
      borderWidth: 1,
      borderRadius: 4,
    }]
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
          label: (context: any) => `${context.formattedValue} hours`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => `${value}h`
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50">
              <Clock className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Focus Time</h3>
              <p className="text-2xl font-semibold text-gray-900">{totalHours}h {totalMinutes}m</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50">
              <Timer className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Daily Average</h3>
              <p className="text-2xl font-semibold text-gray-900">{averageDailyHours}h</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
              <CheckCircle2 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Completion Rate</h3>
              <p className="text-2xl font-semibold text-gray-900">{completionRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Yearly Trend */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-medium text-gray-900">Yearly Trend</h3>
        <div className="h-80">
          <Bar data={monthlyData} options={chartOptions} />
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-medium text-gray-900">Category Breakdown</h3>
        <div className="space-y-4">
          {categories.map(({ category, hours }) => (
            <div key={category} className="flex items-center">
              <div className="w-32 text-sm text-gray-500">{category}</div>
              <div className="flex-1">
                <div className="h-4 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-4 rounded-full bg-indigo-500"
                    style={{ width: `${(hours / topCategory.hours) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="ml-4 w-20 text-right text-sm text-gray-500">
                {hours.toFixed(1)}h
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-medium text-gray-900">Time Distribution</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Morning (6AM - 12PM)</span>
                <span className="font-medium text-gray-900">40%</span>
              </div>
              <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                <div className="h-2 w-[40%] rounded-full bg-green-500"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Afternoon (12PM - 6PM)</span>
                <span className="font-medium text-gray-900">35%</span>
              </div>
              <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                <div className="h-2 w-[35%] rounded-full bg-blue-500"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Evening (6PM - 12AM)</span>
                <span className="font-medium text-gray-900">25%</span>
              </div>
              <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                <div className="h-2 w-[25%] rounded-full bg-purple-500"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-medium text-gray-900">Productivity Score</h3>
          <div className="flex items-center justify-center">
            <div className="relative flex h-48 w-48 items-center justify-center rounded-full bg-gray-50">
              <div className="text-center">
                <div className="text-5xl font-bold text-indigo-600">85</div>
                <div className="mt-1 text-sm text-gray-500">Great Progress!</div>
              </div>
              <div className="absolute inset-0 rounded-full border-8 border-indigo-500 border-opacity-20"></div>
              <div
                className="absolute inset-0 rounded-full border-8 border-indigo-500"
                style={{
                  clipPath: 'polygon(50% 50%, -50% 50%, -50% -50%, 50% -50%, 100% 0%, 100% 85%)',
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
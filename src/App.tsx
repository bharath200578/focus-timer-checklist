import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Timer from './components/timer/Timer';
import TaskCategories from './components/tasks/TaskCategories';
import TaskList from './components/tasks/TaskList';
import TodayStats from './components/stats/TodayStats';
import WeeklyProgress from './components/stats/WeeklyProgress';
import MonthlyProgress from './components/stats/MonthlyProgress';
import YearlyProgress from './components/stats/YearlyProgress';
import ProductivityInsights from './components/stats/ProductivityInsights';
import DetailedAnalytics from './components/stats/DetailedAnalytics';

function App() {
  const [showDetailedAnalytics, setShowDetailedAnalytics] = useState(false);

  useEffect(() => {
    document.title = 'FocusTimer - Boost Your Productivity';
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {showDetailedAnalytics ? (
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">Detailed Analytics</h2>
              <button
                onClick={() => setShowDetailedAnalytics(false)}
                className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Back to Timer
              </button>
            </div>
            <DetailedAnalytics />
          </div>
        ) : (
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
            {/* Left column - Timer and Tasks */}
            <div className="space-y-6 lg:col-span-2">
              <Timer />
              
              <div className="lg:hidden">
                <TodayStats />
              </div>
              
              <TaskCategories />
              <TaskList />
            </div>
            
            {/* Right column - Stats and Insights */}
            <div className="space-y-6">
              <div className="hidden lg:block">
                <TodayStats />
              </div>
              
              <WeeklyProgress />
              <MonthlyProgress />
              <YearlyProgress />
              <ProductivityInsights onViewAnalytics={() => setShowDetailedAnalytics(true)} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
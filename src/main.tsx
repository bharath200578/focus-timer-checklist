import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register Chart.js components
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

// Timer tick interval
function TimerTicker() {
  useEffect(() => {
    // Import dynamically to avoid circular dependencies
    import('./store/timerStore').then(({ useTimerStore }) => {
      const tick = useTimerStore.getState().tick;
      
      const interval = setInterval(() => {
        tick();
      }, 1000);
      
      return () => clearInterval(interval);
    });
  }, []);
  
  return null;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TimerTicker />
    <App />
  </StrictMode>
);
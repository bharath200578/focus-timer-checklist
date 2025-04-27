import { AppProvider } from './contexts/AppContext'
import { Timer } from './components/Timer'
import { TaskList } from './components/TaskList'
import { Stats } from './components/Stats'
import './App.css'

function App() {
  return (
    <AppProvider>
      <div className="app-container">
        <header className="app-header">
          <h1>Focus Timer</h1>
        </header>
        
        <main className="app-content">
          <div className="content-wrapper">
            <div className="timer-stats-column">
              <Timer />
              <Stats />
            </div>
            
            <div className="task-column">
              <TaskList />
            </div>
          </div>
        </main>
      </div>
    </AppProvider>
  );
}

export default App

import { AppProvider } from './contexts/AppContext'
import { AuthProvider } from './contexts/AuthContext'
import { AuthRoute } from './components/auth'
import { UserMenu } from './components/UserMenu'
import { Timer } from './components/Timer'
import { TaskList } from './components/TaskList'
import { Stats } from './components/Stats'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AuthRoute>
          <div className="app-container">
            <header className="app-header">
              <h1>Focus Timer</h1>
              <UserMenu />
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
        </AuthRoute>
      </AppProvider>
    </AuthProvider>
  );
}

export default App

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add console log to help with debugging
console.log('Initializing application...');

try {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
  console.log('Application mounted successfully');
} catch (error) {
  console.error('Error mounting application:', error);
  
  // Render fallback error UI
  document.body.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column; font-family: sans-serif;">
      <h1 style="color: #e53935;">Error Loading Application</h1>
      <p>There was a problem initializing the app. Please check the console for details.</p>
      <pre style="background: #f5f5f5; padding: 15px; border-radius: 4px; max-width: 80%;">${error instanceof Error ? error.message : String(error)}</pre>
    </div>
  `;
}

import React, { useState } from 'react';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { ForgotPassword } from './ForgotPassword';
import '../../styles/Auth.css';

// Define the enum for authentication views
enum AuthView {
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
}

export const Auth: React.FC = () => {
  const [currentView, setCurrentView] = useState<AuthView>(AuthView.SIGN_IN);

  const handleViewChange = (view: AuthView) => {
    setCurrentView(view);
  };

  return (
    <div className="auth-container">
      <div className="auth-logo">
        <h1>Focus Timer</h1>
      </div>
      
      {currentView === AuthView.SIGN_IN && (
        <SignIn 
          onViewChange={(view) => handleViewChange(view === 'SIGN_UP' 
            ? AuthView.SIGN_UP 
            : AuthView.FORGOT_PASSWORD)} 
        />
      )}
      
      {currentView === AuthView.SIGN_UP && (
        <SignUp 
          onViewChange={() => handleViewChange(AuthView.SIGN_IN)} 
        />
      )}
      
      {currentView === AuthView.FORGOT_PASSWORD && (
        <ForgotPassword 
          onViewChange={() => handleViewChange(AuthView.SIGN_IN)} 
        />
      )}
    </div>
  );
}; 
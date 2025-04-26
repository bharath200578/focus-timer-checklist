import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Auth } from './Auth';

interface AuthRouteProps {
  children: React.ReactNode;
}

export const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  
  // In development mode, bypass authentication
  const isDevelopment = import.meta.env.DEV;
  
  console.log('Dev mode:', isDevelopment, 'Auth state:', { user, loading });

  // For development, always show children to bypass authentication
  if (isDevelopment) {
    console.log("Development mode: bypassing authentication");
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="auth-loading">
        <div className="auth-spinner"></div>
      </div>
    );
  }

  return user ? <>{children}</> : <Auth />;
}; 
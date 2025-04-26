import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

// Define the props interface to handle view changes
type SignInProps = {
  onViewChange: (view: 'SIGN_UP' | 'FORGOT_PASSWORD') => void;
};

export const SignIn: React.FC<SignInProps> = ({ onViewChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Sign In</h2>
      
      {error && <div className="auth-error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="auth-form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="auth-form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="auth-button" 
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      
      <div className="auth-links">
        <button 
          onClick={() => onViewChange('SIGN_UP')} 
          className="auth-link-button"
        >
          Don't have an account? Sign Up
        </button>
        <button 
          onClick={() => onViewChange('FORGOT_PASSWORD')} 
          className="auth-link-button"
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );
}; 
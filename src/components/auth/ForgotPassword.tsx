import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

// Define the props interface to handle view changes
type ForgotPasswordProps = {
  onViewChange: (view: 'SIGN_IN') => void;
};

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onViewChange }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      const { error } = await resetPassword(email);
      
      if (error) {
        setError(error.message);
      } else {
        setSuccess('Password reset instructions sent to your email');
        setEmail('');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Reset Password</h2>
      
      {error && <div className="auth-error">{error}</div>}
      {success && <div className="auth-success">{success}</div>}
      
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
        
        <button 
          type="submit" 
          className="auth-button" 
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Reset Instructions'}
        </button>
      </form>
      
      <div className="auth-links">
        <button 
          onClick={() => onViewChange('SIGN_IN')} 
          className="auth-link-button"
        >
          Back to Sign In
        </button>
      </div>
    </div>
  );
}; 
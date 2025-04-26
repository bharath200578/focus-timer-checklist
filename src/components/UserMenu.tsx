import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/UserMenu.css';

export const UserMenu: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Extract display name from email (first part before @)
  const displayName = user?.email ? user.email.split('@')[0] : '';
  
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  if (!user) return null;
  
  return (
    <div className="user-menu-container" ref={menuRef}>
      <button 
        className="user-menu-button" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="avatar">
          {displayName.charAt(0).toUpperCase()}
        </div>
      </button>
      
      {isOpen && (
        <div className="user-dropdown">
          <div className="user-info">
            <div className="user-name">{displayName}</div>
            <div className="user-email">{user.email}</div>
          </div>
          <button 
            className="sign-out-button"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}; 
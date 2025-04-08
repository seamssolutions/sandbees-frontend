import React, { useState } from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';

interface NavigationProps {
  activeSection: string;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`navigation ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="navigation-header">
        <div className="logo">
          <span className="logo-text">Sandbees</span>
        </div>
        <button 
          className="toggle-button" 
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? 'Collapse menu' : 'Expand menu'}
        >
          {expanded ? '←' : '→'}
        </button>
      </div>
      
      <nav className="navigation-menu">
        <Link 
          to="/dashboard" 
          className={`nav-item ${activeSection === 'dashboard' ? 'active' : ''}`}
        >
          <div className="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </div>
          <span className="nav-text">Dashboard</span>
        </Link>
        
        <Link 
          to="/tasks" 
          className={`nav-item ${activeSection === 'tasks' ? 'active' : ''}`}
        >
          <div className="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4"></path>
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
            </svg>
          </div>
          <span className="nav-text">Tasks</span>
        </Link>
        
        <Link 
          to="/finances" 
          className={`nav-item ${activeSection === 'finances' ? 'active' : ''}`}
        >
          <div className="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"></path>
            </svg>
          </div>
          <span className="nav-text">Finances</span>
        </Link>
        
        <Link 
          to="/customers" 
          className={`nav-item ${activeSection === 'customers' ? 'active' : ''}`}
        >
          <div className="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <span className="nav-text">Customers</span>
        </Link>
        
        <Link 
          to="/ai-assistant" 
          className={`nav-item ${activeSection === 'ai-assistant' ? 'active' : ''}`}
        >
          <div className="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a2 2 0 00-2 2c0 1.1.9 2 2 2 1.1 0 2-.9 2-2a2 2 0 00-2-2z"></path>
              <path d="M12 8c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2 1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z"></path>
              <path d="M12 8c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2 1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z" transform="rotate(60 12 12)"></path>
              <path d="M12 8c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2 1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z" transform="rotate(120 12 12)"></path>
            </svg>
          </div>
          <span className="nav-text">AI Assistant</span>
        </Link>
      </nav>
      
      <div className="navigation-footer">
        <Link 
          to="/settings" 
          className={`nav-item ${activeSection === 'settings' ? 'active' : ''}`}
        >
          <div className="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path>
            </svg>
          </div>
          <span className="nav-text">Settings</span>
        </Link>
        
        <div className="user-profile">
          <div className="user-avatar">JS</div>
          <div className="user-info">
            <div className="user-name">John Smith</div>
            <div className="user-role">Business Owner</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;

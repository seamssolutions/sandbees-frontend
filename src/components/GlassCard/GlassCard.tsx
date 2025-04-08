import React, { useState } from 'react';
import './GlassCard.css';

interface GlassCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  collapsible?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  title, 
  children, 
  className = '', 
  collapsible = false 
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    if (collapsible) {
      setCollapsed(!collapsed);
    }
  };

  return (
    <div className={`glass-card ${className}`}>
      <div 
        className={`glass-card-header ${collapsible ? 'collapsible' : ''}`}
        onClick={toggleCollapse}
      >
        <h2 className="glass-card-title">{title}</h2>
        {collapsible && (
          <button className="glass-card-toggle">
            {collapsed ? '+' : '-'}
          </button>
        )}
      </div>
      <div className={`glass-card-content ${collapsed ? 'collapsed' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default GlassCard;

import React from 'react';
import './GlassButton.css';

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  onClick,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  disabled = false,
  icon,
  className = '',
  type = 'button'
}) => {
  const variantClasses = {
    primary: 'glass-button-primary',
    secondary: 'glass-button-secondary',
    success: 'glass-button-success',
    warning: 'glass-button-warning',
    danger: 'glass-button-danger',
    default: 'glass-button-default'
  };

  const sizeClasses = {
    sm: 'glass-button-sm',
    md: 'glass-button-md',
    lg: 'glass-button-lg'
  };

  return (
    <button
      type={type}
      className={`
        glass-button 
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${fullWidth ? 'glass-button-full-width' : ''}
        ${disabled ? 'glass-button-disabled' : ''}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="glass-button-icon">{icon}</span>}
      <span className="glass-button-text">{children}</span>
    </button>
  );
};

export default GlassButton;

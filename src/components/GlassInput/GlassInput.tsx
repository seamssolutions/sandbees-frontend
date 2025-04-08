import React, { useState } from 'react';
import './GlassInput.css';

interface GlassInputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  name?: string;
  id?: string;
  autoComplete?: string;
  maxLength?: number;
  min?: number;
  max?: number;
}

const GlassInput: React.FC<GlassInputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  label,
  error,
  icon,
  disabled = false,
  required = false,
  className = '',
  name,
  id,
  autoComplete,
  maxLength,
  min,
  max
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`glass-input-container ${className}`}>
      {label && (
        <label className="glass-input-label">
          {label}
          {required && <span className="glass-input-required">*</span>}
        </label>
      )}
      <div 
        className={`glass-input-wrapper ${focused ? 'focused' : ''} ${error ? 'error' : ''} ${disabled ? 'disabled' : ''}`}
      >
        {icon && <div className="glass-input-icon">{icon}</div>}
        <input
          type={type}
          className="glass-input-field"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          name={name}
          id={id}
          autoComplete={autoComplete}
          maxLength={maxLength}
          min={min}
          max={max}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
      {error && <div className="glass-input-error">{error}</div>}
    </div>
  );
};

export default GlassInput;

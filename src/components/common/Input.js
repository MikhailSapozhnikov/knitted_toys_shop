import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/common/Input.css';

const Input = ({
  type = 'text',
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  helperText,
  required = false,
  disabled = false,
  className = '',
  fullWidth = true,
  icon,
  iconPosition = 'left',
  ...props
}) => {
  
  const inputWrapperClasses = [
    'input-wrapper',
    fullWidth ? 'input-full-width' : '',
    error ? 'input-error' : '',
    disabled ? 'input-disabled' : '',
    icon ? 'input-with-icon' : '',
    icon && iconPosition === 'right' ? 'input-icon-right' : 'input-icon-left',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={inputWrapperClasses}>
      {label && (
        <label htmlFor={name} className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      
      <div className="input-field-wrapper">
        {icon && iconPosition === 'left' && (
          <span className="input-icon">{icon}</span>
        )}
        
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className="input-field"
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <span className="input-icon">{icon}</span>
        )}
      </div>
      
      {(error || helperText) && (
        <div className={`input-message ${error ? 'input-error-message' : 'input-helper-text'}`}>
          {error || helperText}
        </div>
      )}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
};

export default Input;
import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/common/Spinner.css';

const Spinner = ({ size = 'medium', color = 'primary', fullPage = false, text = 'Загрузка...' }) => {
  // Размеры спиннера
  const spinnerSizes = {
    small: 20,
    medium: 40,
    large: 60
  };

  // Цвета спиннера
  const spinnerColors = {
    primary: '#9c6644',
    secondary: '#6c757d',
    light: '#ffffff'
  };

  // Размер и цвет спиннера
  const spinnerSize = spinnerSizes[size] || spinnerSizes.medium;
  const spinnerColor = spinnerColors[color] || spinnerColors.primary;

  // Классы для контейнера спиннера
  const containerClasses = `spinner-container ${fullPage ? 'spinner-fullpage' : ''}`;

  return (
    <div className={containerClasses}>
      <div 
        className="spinner" 
        style={{ 
          width: `${spinnerSize}px`, 
          height: `${spinnerSize}px`,
          borderColor: `${spinnerColor}20`,
          borderTopColor: spinnerColor
        }}
      ></div>
      {text && <p className="spinner-text">{text}</p>}
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(['primary', 'secondary', 'light']),
  fullPage: PropTypes.bool,
  text: PropTypes.string
};

export default Spinner;
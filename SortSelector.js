import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/product/SortSelector.css';

const SortSelector = ({ value, onChange }) => {
  // Варианты сортировки
  const sortOptions = [
    { value: 'popularity', label: 'По популярности' },
    { value: 'price_asc', label: 'По возрастанию цены' },
    { value: 'price_desc', label: 'По убыванию цены' },
    { value: 'name_asc', label: 'По названию (А-Я)' },
    { value: 'name_desc', label: 'По названию (Я-А)' },
    { value: 'newest', label: 'Сначала новинки' },
    { value: 'rating', label: 'По рейтингу' }
  ];

  // Обработчик изменения выбранного значения
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="sort-selector">
      <label htmlFor="sort" className="sort-label">Сортировать:</label>
      <select
        id="sort"
        value={value || 'popularity'}
        onChange={handleChange}
        className="sort-select"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="sort-icon">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
};

SortSelector.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default SortSelector;
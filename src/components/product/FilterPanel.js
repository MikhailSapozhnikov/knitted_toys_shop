import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button';
import '../../styles/product/FilterPanel.css';

const FilterPanel = ({ 
  categories, 
  filters, 
  onFilterChange, 
  onClearFilters,
  priceRange = { min: 0, max: 10000 }
}) => {
  const [priceMin, setPriceMin] = useState(filters.priceMin || '');
  const [priceMax, setPriceMax] = useState(filters.priceMax || '');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const handleCategoryChange = (categoryId) => {
    onFilterChange('category', filters.category === categoryId ? null : categoryId);
  };

  const handleInStockChange = (e) => {
    onFilterChange('inStock', e.target.checked ? true : undefined);
  };

  const handleNewChange = (e) => {
    onFilterChange('new', e.target.checked ? true : undefined);
  };

  const handleDiscountChange = (e) => {
    onFilterChange('discount', e.target.checked ? true : undefined);
  };

  const handlePriceMinChange = (e) => {
    setPriceMin(e.target.value);
  };

  const handlePriceMaxChange = (e) => {
    setPriceMax(e.target.value);
  };

  const applyPriceFilter = () => {
    onFilterChange('priceMin', priceMin ? Number(priceMin) : undefined);
    onFilterChange('priceMax', priceMax ? Number(priceMax) : undefined);
  };

  const resetPriceFilter = () => {
    setPriceMin('');
    setPriceMax('');
    onFilterChange('priceMin', undefined);
    onFilterChange('priceMax', undefined);
  };

  const toggleMobileFilters = () => {
    setIsMobileFiltersOpen(!isMobileFiltersOpen);
  };

  const handleClearAll = () => {
    setPriceMin('');
    setPriceMax('');
    onClearFilters();
  };

  const hasActiveFilters = () => {
    return (
      filters.category !== undefined ||
      filters.inStock !== undefined ||
      filters.new !== undefined ||
      filters.discount !== undefined ||
      filters.priceMin !== undefined ||
      filters.priceMax !== undefined
    );
  };

  return (
    <>
      <div className="filter-panel-mobile-toggle">
        <Button 
          variant="secondary"
          onClick={toggleMobileFilters}
          className="filter-mobile-button"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 10H15M2.5 5H17.5M7.5 15H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Фильтры
          {hasActiveFilters() && <span className="filter-active-indicator"></span>}
        </Button>
      </div>

      <aside className={`filter-panel ${isMobileFiltersOpen ? 'filter-panel-mobile-open' : ''}`}>
        <div className="filter-panel-header">
          <h3 className="filter-panel-title">Фильтры</h3>
          <button className="filter-panel-close" onClick={toggleMobileFilters}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {categories && categories.length > 0 && (
          <div className="filter-section">
            <h4 className="filter-section-title">Категории</h4>
            <ul className="filter-category-list">
              {categories.map(category => (
                <li key={category.id} className="filter-category-item">
                  <button 
                    className={`filter-category-button ${filters.category === category.id ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.name}
                    <span className="filter-category-count">{category.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="filter-section">
          <h4 className="filter-section-title">Цена, ₽</h4>
          <div className="filter-price">
            <div className="filter-price-inputs">
              <input
                type="number"
                placeholder="От"
                min={priceRange.min}
                max={priceRange.max}
                value={priceMin}
                onChange={handlePriceMinChange}
                className="filter-price-input"
              />
              <span className="filter-price-separator">—</span>
              <input
                type="number"
                placeholder="До"
                min={priceRange.min}
                max={priceRange.max}
                value={priceMax}
                onChange={handlePriceMaxChange}
                className="filter-price-input"
              />
            </div>
            <div className="filter-price-buttons">
              <Button 
                variant="primary" 
                size="small" 
                onClick={applyPriceFilter}
              >
                Применить
              </Button>
              <Button 
                variant="secondary" 
                size="small" 
                onClick={resetPriceFilter}
              >
                Сбросить
              </Button>
            </div>
          </div>
        </div>

        <div className="filter-section">
          <h4 className="filter-section-title">Дополнительно</h4>
          <div className="filter-checkbox-group">
            <label className="filter-checkbox">
              <input 
                type="checkbox" 
                checked={filters.inStock === true}
                onChange={handleInStockChange}
              />
              <span className="filter-checkbox-text">В наличии</span>
            </label>
            
            <label className="filter-checkbox">
              <input 
                type="checkbox" 
                checked={filters.new === true}
                onChange={handleNewChange}
              />
              <span className="filter-checkbox-text">Новинки</span>
            </label>
            
            <label className="filter-checkbox">
              <input 
                type="checkbox" 
                checked={filters.discount === true}
                onChange={handleDiscountChange}
              />
              <span className="filter-checkbox-text">Со скидкой</span>
            </label>
          </div>
        </div>

        {hasActiveFilters() && (
          <div className="filter-section">
            <Button 
              variant="secondary" 
              fullWidth={true}
              onClick={handleClearAll}
            >
              Сбросить все фильтры
            </Button>
          </div>
        )}
      </aside>

      {isMobileFiltersOpen && (
        <div className="filter-overlay" onClick={toggleMobileFilters}></div>
      )}
    </>
  );
};

FilterPanel.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      count: PropTypes.number
    })
  ),
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired,
  priceRange: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  })
};

export default FilterPanel;
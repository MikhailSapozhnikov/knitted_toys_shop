import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import Spinner from '../common/Spinner';
import '../../styles/product/ProductGrid.css';

const ProductGrid = ({ 
  products, 
  loading = false, 
  error = null, 
  columns = 4,
  emptyMessage = 'Товары не найдены' 
}) => {
  const gridClass = `product-grid product-grid-${columns}`;

  if (loading) {
    return (
      <div className="product-grid-loading">
        <Spinner text="Загрузка товаров..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-grid-error">
        <p>{error}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="product-grid-empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div className={gridClass}>
      {products.map(product => (
        <div key={product.id} className="product-grid-item">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    })
  ),
  loading: PropTypes.bool,
  error: PropTypes.string,
  columns: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  emptyMessage: PropTypes.string
};

export default ProductGrid;
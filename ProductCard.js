import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useCart from '../../hooks/useCart';
import '../../styles/product/ProductCard.css';

const ProductCard = ({ product, variant = 'standard' }) => {
  const { addItem } = useCart();
  
  // Деструктурируем данные товара
  const { 
    id, 
    name, 
    price, 
    images, 
    discount, 
    new: isNew, 
    inStock,
    rating
  } = product;
  
  // Путь к странице товара
  const productLink = `/product/${id}`;
  
  // Вычисляем скидочную цену
  const discountedPrice = discount ? Math.round(price - (price * discount / 100)) : null;
  
  // Обработчик добавления в корзину
  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product, 1);
  };
  
  // Компактный вариант карточки
  if (variant === 'compact') {
    return (
      <div className="product-card product-card-compact">
        <Link to={productLink} className="product-card-link">
          <div className="product-card-image">
            <img src={images[0] || '/images/placeholder.jpg'} alt={name} />
          </div>
          <div className="product-card-info">
            <h3 className="product-card-title">{name}</h3>
            <div className="product-card-price">
              {discountedPrice ? (
                <>
                  <span className="product-price-old">{price} ₽</span>
                  <span className="product-price">{discountedPrice} ₽</span>
                </>
              ) : (
                <span className="product-price">{price} ₽</span>
              )}
            </div>
          </div>
        </Link>
      </div>
    );
  }
  
  // Стандартный вариант карточки
  return (
    <div className="product-card">
      <Link to={productLink} className="product-card-link">
        <div className="product-card-image">
          <img src={images[0] || '/images/placeholder.jpg'} alt={name} />
          
          {/* Метки (новинка, скидка) */}
          <div className="product-card-badges">
            {isNew && <span className="product-badge product-badge-new">Новинка</span>}
            {discount && <span className="product-badge product-badge-discount">-{discount}%</span>}
            {!inStock && <span className="product-badge product-badge-outofstock">Нет в наличии</span>}
          </div>
          
          {/* Кнопка быстрого добавления в корзину */}
          {inStock && (
            <button 
              className="product-card-add-to-cart" 
              onClick={handleAddToCart}
              aria-label="Добавить в корзину"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 10V8H6V12.5C6 12.7761 5.77614 13 5.5 13C5.22386 13 5 12.7761 5 12.5V7H8C8 4.59628 9.95227 3 12 3C14.0575 3 16 4.70556 16 7H19V19.5C19 20.3284 18.3284 21 17.5 21H12.5C12.2239 21 12 20.7761 12 20.5C12 20.2239 12.2239 20 12.5 20H17.5C17.7761 20 18 19.7761 18 19.5V8H16V10H15V8H9V10H8ZM12 4C10.4477 4 9 5.20372 9 7H15C15 5.29444 13.5425 4 12 4Z" fill="currentColor"/>
                <path d="M7.5 14C7.77614 14 8 14.2239 8 14.5V17.5C8 17.7761 7.77614 18 7.5 18C7.22386 18 7 17.7761 7 17.5V14.5C7 14.2239 7.22386 14 7.5 14Z" fill="currentColor"/>
                <path d="M11 14.5C11 14.2239 10.7761 14 10.5 14C10.2239 14 10 14.2239 10 14.5V17.5C10 17.7761 10.2239 18 10.5 18C10.7761 18 11 17.7761 11 17.5V14.5Z" fill="currentColor"/>
              </svg>
            </button>
          )}
        </div>
        
        <div className="product-card-info">
          <h3 className="product-card-title">{name}</h3>
          
          {/* Рейтинг */}
          {rating && (
            <div className="product-card-rating">
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star} 
                    className={`star ${star <= Math.round(rating) ? 'filled' : ''}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="rating-value">{rating.toFixed(1)}</span>
            </div>
          )}
          
          {/* Цена */}
          <div className="product-card-price">
            {discountedPrice ? (
              <>
                <span className="product-price-old">{price} ₽</span>
                <span className="product-price">{discountedPrice} ₽</span>
              </>
            ) : (
              <span className="product-price">{price} ₽</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    discount: PropTypes.number,
    new: PropTypes.bool,
    inStock: PropTypes.bool,
    rating: PropTypes.number
  }).isRequired,
  variant: PropTypes.oneOf(['standard', 'compact'])
};

export default ProductCard;
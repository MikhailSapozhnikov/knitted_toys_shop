import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import useCart from '../hooks/useCart';
import '../styles/pages/CartPage.css';

const CartPage = () => {
  const navigate = useNavigate();
  const {
    items,
    totalItems,
    totalPrice,
    discountAmount,
    promoCode,
    updateQuantity,
    removeItem,
    clearCart
  } = useCart();
  
  // Обработчик изменения количества товара
  const handleQuantityChange = (id, quantity) => {
    updateQuantity(id, quantity);
  };
  
  // Обработчик удаления товара
  const handleRemoveItem = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот товар из корзины?')) {
      removeItem(id);
    }
  };
  
  // Обработчик очистки корзины
  const handleClearCart = () => {
    if (window.confirm('Вы уверены, что хотите очистить корзину?')) {
      clearCart();
    }
  };
  
  // Переход к оформлению заказа
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  // Рассчитываем общую сумму с учетом скидок
  const calculateTotalWithDiscounts = () => {
    return items.reduce((total, item) => {
      const discountedPrice = item.discount 
        ? Math.round(item.price - (item.price * item.discount / 100)) 
        : item.price;
      
      return total + (discountedPrice * item.quantity);
    }, 0);
  };
  
  const discountedTotal = calculateTotalWithDiscounts();
  
  // Если корзина пуста
  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1 className="cart-title">Корзина</h1>
          <div className="cart-empty">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.3333 58.6667C23.9107 58.6667 26 56.5773 26 54C26 51.4227 23.9107 49.3333 21.3333 49.3333C18.756 49.3333 16.6667 51.4227 16.6667 54C16.6667 56.5773 18.756 58.6667 21.3333 58.6667Z" stroke="#9c6644" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M48 58.6667C50.5773 58.6667 52.6667 56.5773 52.6667 54C52.6667 51.4227 50.5773 49.3333 48 49.3333C45.4227 49.3333 43.3333 51.4227 43.3333 54C43.3333 56.5773 45.4227 58.6667 48 58.6667Z" stroke="#9c6644" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16.6667 54H5.33334V8.00001H10.6667M16 8.00001H58.6667L53.3333 33.3333H16L10.6667 8.00001M53.3333 8.00001L48 33.3333" stroke="#9c6644" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3>Ваша корзина пуста</h3>
            <p>Перейдите в каталог, чтобы выбрать товары</p>
            <Link to="/catalog">
              <Button variant="primary">Перейти в каталог</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-title">Корзина</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            <div className="cart-header">
              <div className="cart-header-product">Товар</div>
              <div className="cart-header-price">Цена</div>
              <div className="cart-header-quantity">Количество</div>
              <div className="cart-header-total">Сумма</div>
              <div className="cart-header-actions"></div>
            </div>
            
            {items.map(item => {
              const discountedPrice = item.discount 
                ? Math.round(item.price - (item.price * item.discount / 100)) 
                : null;
              
              const itemPrice = discountedPrice || item.price;
              const itemTotal = itemPrice * item.quantity;
              
              return (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-product">
                    <div className="cart-item-image">
                      <img src={item.images[0] || '/images/placeholder.jpg'} alt={item.name} />
                    </div>
                    <div className="cart-item-details">
                      <Link to={`/product/${item.id}`} className="cart-item-name">{item.name}</Link>
                      {/* Убран блок с отображением цвета */}
                    </div>
                  </div>
                  
                  <div className="cart-item-price">
                    {discountedPrice ? (
                      <>
                        <span className="cart-item-price-old">{item.price} ₽</span>
                        <span className="cart-item-price-current">{discountedPrice} ₽</span>
                      </>
                    ) : (
                      <span className="cart-item-price-current">{item.price} ₽</span>
                    )}
                  </div>
                  
                  <div className="cart-item-quantity">
                    <div className="quantity-control">
                      <button 
                        className="quantity-btn" 
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        className="quantity-input"
                      />
                      <button 
                        className="quantity-btn" 
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        disabled={item.quantity >= 10}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="cart-item-total">
                    {itemTotal} ₽
                  </div>
                  
                  <div className="cart-item-actions">
                    <button 
                      className="cart-item-remove" 
                      onClick={() => handleRemoveItem(item.id)}
                      aria-label="Удалить"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
            
            <div className="cart-actions">
              <Button 
                variant="secondary" 
                onClick={handleClearCart}
              >
                Очистить корзину
              </Button>
              <Link to="/catalog">
                <Button variant="outlined">Продолжить покупки</Button>
              </Link>
            </div>
          </div>
          
          <div className="cart-sidebar">
            <div className="cart-summary">
              <h3 className="cart-summary-title">Сумма заказа</h3>
              
              <div className="cart-summary-rows">
                <div className="cart-summary-row">
                  <span>Товары ({totalItems})</span>
                  <span>{discountedTotal} ₽</span>
                </div>
                
                <div className="cart-summary-row cart-total">
                  <span>Итого</span>
                  <span>{discountedTotal} ₽</span>
                </div>
              </div>
              
              <Button 
                variant="primary" 
                fullWidth 
                size="large" 
                onClick={handleCheckout}
              >
                Оформить заказ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
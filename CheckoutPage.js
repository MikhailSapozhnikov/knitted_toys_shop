import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import useCart from '../hooks/useCart';
import useAuth from '../hooks/useAuth';
import '../styles/pages/CheckoutPage.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalItems, totalPrice, discountAmount, promoCode, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();

  // Если корзина пуста, перенаправляем на страницу корзины
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  // Состояние текущего шага
  const [currentStep, setCurrentStep] = useState(1);

  // Состояние формы
  const [formData, setFormData] = useState({
    firstName: isAuthenticated && user ? user.name.split(' ')[0] : '',
    lastName: isAuthenticated && user ? user.name.split(' ')[1] || '' : '',
    email: isAuthenticated && user ? user.email : '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    deliveryMethod: 'courier',
    paymentMethod: 'card',
    comment: ''
  });

  // Состояние ошибок валидации
  const [errors, setErrors] = useState({});
  
  // Состояние завершения заказа
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Обработчик изменения полей формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Валидация формы для шага контактной информации
  const validateContactInfo = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Введите имя';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Введите фамилию';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите телефон';
    } else if (!/^\+?\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Введите корректный телефон';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Валидация формы для шага адреса доставки
  const validateDeliveryInfo = () => {
    const newErrors = {};
    
    if (formData.deliveryMethod === 'courier') {
      if (!formData.address.trim()) {
        newErrors.address = 'Введите адрес';
      }
      
      if (!formData.city.trim()) {
        newErrors.city = 'Введите город';
      }
      
      if (!formData.postalCode.trim()) {
        newErrors.postalCode = 'Введите почтовый индекс';
      } else if (!/^\d{6}$/.test(formData.postalCode.replace(/\D/g, ''))) {
        newErrors.postalCode = 'Почтовый индекс должен содержать 6 цифр';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Переход к следующему шагу
  const nextStep = () => {
    let isValid = false;
    
    if (currentStep === 1) {
      isValid = validateContactInfo();
    } else if (currentStep === 2) {
      isValid = validateDeliveryInfo();
    }
    
    if (isValid) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  // Возврат к предыдущему шагу
  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  // Отправка заказа
  const submitOrder = async () => {
    setIsSubmitting(true);
    
    try {
      // В реальном проекте здесь был бы запрос к API
      // Имитируем задержку запроса
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Генерируем случайный номер заказа
      const orderId = Math.floor(100000 + Math.random() * 900000);
      
      // Очищаем корзину
      clearCart();
      
      // Перенаправляем на страницу подтверждения заказа
      navigate(`/order-confirmation/${orderId}`);
    } catch (error) {
      console.error('Ошибка при оформлении заказа:', error);
      alert('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Если корзина пуста, не рендерим содержимое
  if (items.length === 0) {
    return null;
  }

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

  // Рендерим содержимое в зависимости от текущего шага
  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="checkout-title">Оформление заказа</h1>
        
        {/* Индикатор шагов */}
        <div className="checkout-steps">
          <div className={`checkout-step ${currentStep >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-title">Контактная информация</div>
          </div>
          
          <div className="step-divider"></div>
          
          <div className={`checkout-step ${currentStep >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-title">Доставка</div>
          </div>
          
          <div className="step-divider"></div>
          
          <div className={`checkout-step ${currentStep >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-title">Оплата</div>
          </div>
          
          <div className="step-divider"></div>
          
          <div className={`checkout-step ${currentStep >= 4 ? 'active' : ''}`}>
            <div className="step-number">4</div>
            <div className="step-title">Подтверждение</div>
          </div>
        </div>
        
        <div className="checkout-content">
          <div className="checkout-form">
            {/* Шаг 1: Контактная информация */}
            {currentStep === 1 && (
              <div className="checkout-section">
                <h2 className="section-title">Контактная информация</h2>
                
                <div className="form-row">
                  <Input
                    label="Имя"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                    required
                  />
                  
                  <Input
                    label="Фамилия"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                    required
                  />
                </div>
                
                <div className="form-row">
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                  />
                  
                  <Input
                    label="Телефон"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    placeholder="+7 (___) ___-__-__"
                    required
                  />
                </div>
                
                <div className="checkout-actions">
                  <Button
                    variant="primary"
                    onClick={nextStep}
                  >
                    Продолжить
                  </Button>
                </div>
              </div>
            )}
            
            {/* Шаг 2: Доставка */}
            {currentStep === 2 && (
              <div className="checkout-section">
                <h2 className="section-title">Способ доставки</h2>
                
                <div className="delivery-options">
                  <label className={`delivery-option ${formData.deliveryMethod === 'courier' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="courier"
                      checked={formData.deliveryMethod === 'courier'}
                      onChange={handleChange}
                    />
                    <div className="delivery-option-content">
                      <div className="delivery-option-header">
                        <div className="delivery-option-title">Курьерская доставка</div>
                        <div className="delivery-option-price">300 ₽</div>
                      </div>
                      <div className="delivery-option-description">
                        Доставка в течение 1-3 дней
                      </div>
                    </div>
                  </label>
                  
                  <label className={`delivery-option ${formData.deliveryMethod === 'pickup' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="pickup"
                      checked={formData.deliveryMethod === 'pickup'}
                      onChange={handleChange}
                    />
                    <div className="delivery-option-content">
                      <div className="delivery-option-header">
                        <div className="delivery-option-title">Самовывоз</div>
                        <div className="delivery-option-price">Бесплатно</div>
                      </div>
                      <div className="delivery-option-description">
                        Из нашего магазина по адресу: г. Санкт-Петербург, пр-т Просвещения, д. 76
                      </div>
                    </div>
                  </label>
                  
                  <label className={`delivery-option ${formData.deliveryMethod === 'post' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="post"
                      checked={formData.deliveryMethod === 'post'}
                      onChange={handleChange}
                    />
                    <div className="delivery-option-content">
                      <div className="delivery-option-header">
                        <div className="delivery-option-title">Почта России</div>
                        <div className="delivery-option-price">250 ₽</div>
                      </div>
                      <div className="delivery-option-description">
                        Доставка в течение 5-7 дней
                      </div>
                    </div>
                  </label>
                </div>
                
                {(formData.deliveryMethod === 'courier' || formData.deliveryMethod === 'post') && (
                  <div className="address-form">
                    <h3 className="subsection-title">Адрес доставки</h3>
                    
                    <Input
                      label="Адрес"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      error={errors.address}
                      required
                    />
                    
                    <div className="form-row">
                      <Input
                        label="Город"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        error={errors.city}
                        required
                      />
                      
                      <Input
                        label="Почтовый индекс"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        error={errors.postalCode}
                        required
                      />
                    </div>
                  </div>
                )}
                
                <div className="checkout-actions">
                  <Button
                    variant="secondary"
                    onClick={prevStep}
                  >
                    Назад
                  </Button>
                  
                  <Button
                    variant="primary"
                    onClick={nextStep}
                  >
                    Продолжить
                  </Button>
                </div>
              </div>
            )}
            
            {/* Шаг 3: Оплата */}
            {currentStep === 3 && (
              <div className="checkout-section">
                <h2 className="section-title">Способ оплаты</h2>
                
                <div className="payment-options">
                  <label className={`payment-option ${formData.paymentMethod === 'card' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                    />
                    <div className="payment-option-content">
                      <div className="payment-option-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                          <path d="M2 10H22" stroke="currentColor" strokeWidth="2"/>
                          <path d="M6 15H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div className="payment-option-title">Банковская карта</div>
                    </div>
                  </label>
                  
                  <label className={`payment-option ${formData.paymentMethod === 'cash' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleChange}
                    />
                    <div className="payment-option-content">
                      <div className="payment-option-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17V7Z" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </div>
                      <div className="payment-option-title">Наличными при получении</div>
                    </div>
                  </label>
                </div>
                
                <div className="checkout-comment">
                  <h3 className="subsection-title">Комментарий к заказу</h3>
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    className="comment-textarea"
                    placeholder="Напишите, если у вас есть особые пожелания к заказу"
                    rows="4"
                  ></textarea>
                </div>
                
                <div className="checkout-actions">
                  <Button
                    variant="secondary"
                    onClick={prevStep}
                  >
                    Назад
                  </Button>
                  
                  <Button
                    variant="primary"
                    onClick={nextStep}
                  >
                    Продолжить
                  </Button>
                </div>
              </div>
            )}
            
            {/* Шаг 4: Подтверждение заказа */}
            {currentStep === 4 && (
              <div className="checkout-section">
                <h2 className="section-title">Подтверждение заказа</h2>
                
                <div className="order-summary">
                  <h3 className="subsection-title">Контактная информация</h3>
                  <div className="summary-info">
                    <div className="summary-row">
                      <div className="summary-label">ФИО:</div>
                      <div className="summary-value">{formData.firstName} {formData.lastName}</div>
                    </div>
                    <div className="summary-row">
                      <div className="summary-label">Email:</div>
                      <div className="summary-value">{formData.email}</div>
                    </div>
                    <div className="summary-row">
                      <div className="summary-label">Телефон:</div>
                      <div className="summary-value">{formData.phone}</div>
                    </div>
                  </div>
                  
                  <h3 className="subsection-title">Доставка</h3>
                  <div className="summary-info">
                    <div className="summary-row">
                      <div className="summary-label">Способ доставки:</div>
                      <div className="summary-value">
                        {formData.deliveryMethod === 'courier' ? 'Курьерская доставка' : 
                         formData.deliveryMethod === 'pickup' ? 'Самовывоз' : 'Почта России'}
                      </div>
                    </div>
                    
                    {(formData.deliveryMethod === 'courier' || formData.deliveryMethod === 'post') && (
                      <>
                        <div className="summary-row">
                          <div className="summary-label">Адрес:</div>
                          <div className="summary-value">{formData.address}</div>
                        </div>
                        <div className="summary-row">
                          <div className="summary-label">Город:</div>
                          <div className="summary-value">{formData.city}</div>
                        </div>
                        <div className="summary-row">
                          <div className="summary-label">Индекс:</div>
                          <div className="summary-value">{formData.postalCode}</div>
                        </div>
                      </>
                    )}
                    
                    {formData.deliveryMethod === 'pickup' && (
                      <div className="summary-row">
                        <div className="summary-label">Адрес самовывоза:</div>
                        <div className="summary-value">г. Санкт-Петербург, пр-т Просвещения, д. 76</div>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="subsection-title">Оплата</h3>
                  <div className="summary-info">
                    <div className="summary-row">
                      <div className="summary-label">Способ оплаты:</div>
                      <div className="summary-value">
                        {formData.paymentMethod === 'card' ? 'Банковская карта' : 'Наличными при получении'}
                      </div>
                    </div>
                  </div>
                  
                  {formData.comment && (
                    <>
                      <h3 className="subsection-title">Комментарий к заказу</h3>
                      <div className="summary-info">
                        <div className="summary-value comment">{formData.comment}</div>
                      </div>
                    </>
                  )}
                  
                  <h3 className="subsection-title">Товары ({totalItems})</h3>
                  <div className="order-items">
                    {items.map(item => {
                      const discountedPrice = item.discount 
                        ? Math.round(item.price - (item.price * item.discount / 100)) 
                        : null;
                      
                      const itemPrice = discountedPrice || item.price;
                      
                      return (
                        <div key={item.id} className="order-item">
                          <div className="order-item-image">
                            <img src={item.images[0] || '/images/placeholder.jpg'} alt={item.name} />
                          </div>
                          <div className="order-item-details">
                            <div className="order-item-name">{item.name}</div>
                            <div className="order-item-price">
                              {discountedPrice ? (
                                <>
                                  <span className="old-price">{item.price} ₽</span>
                                  <span>{discountedPrice} ₽</span>
                                </>
                              ) : (
                                <span>{item.price} ₽</span>
                              )}
                              <span className="quantity">× {item.quantity}</span>
                            </div>
                          </div>
                          <div className="order-item-total">
                            {itemPrice * item.quantity} ₽
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="order-totals">
                    <div className="total-row">
                      <div className="total-label">Товары:</div>
                      <div className="total-value">{discountedTotal} ₽</div>
                    </div>
                    
                    <div className="total-row">
                      <div className="total-label">Доставка:</div>
                      <div className="total-value">
                        {formData.deliveryMethod === 'pickup' 
                          ? 'Бесплатно' 
                          : formData.deliveryMethod === 'courier' 
                            ? '300 ₽' 
                            : '250 ₽'}
                      </div>
                    </div>
                    
                    <div className="total-row grand-total">
                      <div className="total-label">Итого:</div>
                      <div className="total-value">
                        {discountedTotal + (formData.deliveryMethod === 'pickup' 
                          ? 0 
                          : formData.deliveryMethod === 'courier' 
                            ? 300 
                            : 250)} ₽
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="checkout-terms">
                  <p>Нажимая кнопку "Оформить заказ", вы соглашаетесь с условиями 
                    <a href="/terms" target="_blank"> пользовательского соглашения</a> и 
                    <a href="/privacy" target="_blank"> политики конфиденциальности</a>.
                  </p>
                </div>
                
                <div className="checkout-actions">
                  <Button
                    variant="secondary"
                    onClick={prevStep}
                    disabled={isSubmitting}
                  >
                    Назад
                  </Button>
                  
                  <Button
                    variant="primary"
                    onClick={submitOrder}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Оформление...' : 'Оформить заказ'}
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <div className="checkout-sidebar">
            <div className="order-summary-card">
              <h3 className="summary-card-title">Ваш заказ</h3>
              
              <div className="summary-card-content">
                <div className="summary-card-row">
                  <span>Товары ({totalItems})</span>
                  <span>{discountedTotal} ₽</span>
                </div>
                
                <div className="summary-card-row">
                  <span>Доставка</span>
                  <span>
                    {currentStep < 2 || formData.deliveryMethod === 'pickup' 
                      ? 'Бесплатно' 
                      : formData.deliveryMethod === 'courier' 
                        ? '300 ₽' 
                        : '250 ₽'}
                  </span>
                </div>
                
                <div className="summary-card-row total">
                  <span>Итого</span>
                  <span>
                    {discountedTotal + (currentStep < 2 || formData.deliveryMethod === 'pickup' 
                      ? 0 
                      : formData.deliveryMethod === 'courier' 
                        ? 300 
                        : 250)} ₽
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
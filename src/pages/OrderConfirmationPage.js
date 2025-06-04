import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import useCart from '../hooks/useCart';
import '../styles/pages/OrderConfirmationPage.css';

const OrderConfirmationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items } = useCart();
  
  useEffect(() => {
    if (items.length > 0) {
      navigate('/cart');
    }
  }, [items, navigate]);
  
  useEffect(() => {
    if (!id) {
      navigate('/');
    }
  }, [id, navigate]);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('ru-RU');
  
  const deliveryDate = new Date(currentDate);
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const formattedDeliveryDate = `${deliveryDate.toLocaleDateString('ru-RU')} - ${new Date(currentDate.setDate(currentDate.getDate() + 5)).toLocaleDateString('ru-RU')}`;

  return (
    <div className="order-confirmation-page">
      <div className="container">
        <div className="confirmation-content">
          <div className="confirmation-icon">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="40" fill="#F0F8F0"/>
              <path d="M56.6668 30L35.0002 51.6667L23.3335 40" stroke="#4CAF50" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <h1 className="confirmation-title">Ваш заказ успешно оформлен!</h1>
          
          <div className="confirmation-details">
            <div className="confirmation-info">
              <div className="info-row">
                <div className="info-label">Номер заказа:</div>
                <div className="info-value order-number">{id}</div>
              </div>
              
              <div className="info-row">
                <div className="info-label">Дата заказа:</div>
                <div className="info-value">{formattedDate}</div>
              </div>
              
              <div className="info-row">
                <div className="info-label">Ожидаемая дата доставки:</div>
                <div className="info-value">{formattedDeliveryDate}</div>
              </div>
            </div>
            
            <div className="confirmation-message">
              <p>Спасибо за ваш заказ! Мы уже начали его обрабатывать.</p>
              <p>Подтверждение заказа отправлено на вашу электронную почту. Вы также можете отслеживать статус заказа в личном кабинете.</p>
            </div>
            
            <div className="order-status">
              <h3 className="status-title">Статус заказа</h3>
              
              <div className="status-timeline">
                <div className="status-step active">
                  <div className="status-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M16 9L10.5 14.5L8 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="status-label">
                    <div className="status-name">Заказ принят</div>
                    <div className="status-date">{formattedDate}</div>
                  </div>
                </div>
                
                <div className="status-step">
                  <div className="status-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 12H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="status-label">
                    <div className="status-name">В обработке</div>
                  </div>
                </div>
                
                <div className="status-step">
                  <div className="status-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 12H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="status-label">
                    <div className="status-name">Отправлен</div>
                  </div>
                </div>
                
                <div className="status-step">
                  <div className="status-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 12H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="status-label">
                    <div className="status-name">Доставлен</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="confirmation-actions">
              <Link to="/profile">
                <Button variant="primary">Мои заказы</Button>
              </Link>
              
              <Link to="/">
                <Button variant="secondary">Вернуться на главную</Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="confirmation-extra">
          <div className="extra-section">
            <h3 className="extra-title">Есть вопросы по заказу?</h3>
            <p className="extra-text">Свяжитесь с нами по телефону <a href="tel:+79001234567">+7 (900) 123-45-67</a> или напишите на <a href="mailto:info@knittedtoys.ru">info@knittedtoys.ru</a></p>
          </div>
          
          <div className="extra-section">
            <h3 className="extra-title">Подпишитесь на нас</h3>
            <p className="extra-text">Следите за новинками и акциями в наших социальных сетях</p>
            <div className="social-links">
              <a href="https://instagram.com" className="social-link" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="18" cy="6" r="1" fill="currentColor"/>
                </svg>
              </a>
              <a href="https://vk.com" className="social-link" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 8H11C8.79086 8 7 9.79086 7 12C7 14.2091 8.79086 16 11 16H13C15.2091 16 17 14.2091 17 12C17 9.79086 15.2091 8 13 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 12V12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </a>
              <a href="https://t.me" className="social-link" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
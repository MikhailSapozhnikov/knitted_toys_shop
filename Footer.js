import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/layout/Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Здесь будет логика подписки на рассылку
    console.log('Подписка на email:', email);
    setEmail('');
    alert('Спасибо за подписку!');
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-column">
          <h3 className="footer-title">Магазин</h3>
          <ul className="footer-links">
            <li><Link to="/catalog">Каталог</Link></li>
            <li><Link to="/catalog?category=new">Новинки</Link></li>
            <li><Link to="/catalog?category=bestsellers">Бестселлеры</Link></li>
            <li><Link to="/catalog?category=sale">Скидки</Link></li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h3 className="footer-title">Информация</h3>
          <ul className="footer-links">
            <li><Link to="/about">О нас</Link></li>
            <li><Link to="/contact">Контакты</Link></li>
            <li><Link to="/faq">Вопросы и ответы</Link></li>
            <li><Link to="/delivery">Доставка и оплата</Link></li>
            <li><Link to="/return-policy">Возврат и обмен</Link></li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h3 className="footer-title">Контакты</h3>
          <ul className="footer-contacts">
            <li>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6.5L9 9.5L15 6.5M15 11.5V6.5L9 3.5L3 6.5V11.5L9 14.5L15 11.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <a href="mailto:info@knittedtoys.ru">info@knittedtoys.ru</a>
            </li>
            <li>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.25 11.25V13.5C14.25 13.6989 14.171 13.8897 14.0303 14.0303C13.8897 14.171 13.6989 14.25 13.5 14.25H4.5C4.30109 14.25 4.11032 14.171 3.96967 14.0303C3.82902 13.8897 3.75 13.6989 3.75 13.5V11.25M6 9L9 12M9 12L12 9M9 12V3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <a href="tel:+79001234567">+7 (900) 123-45-67</a>
            </li>
            <li>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 7.5C15 12 9 16.5 9 16.5C9 16.5 3 12 3 7.5C3 5.91 3.63214 4.38437 4.75736 3.25736C5.88258 2.13035 7.4087 1.5 9 1.5C10.5913 1.5 12.1174 2.13035 13.2426 3.25736C14.3679 4.38437 15 5.91 15 7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 9.75C10.2426 9.75 11.25 8.74264 11.25 7.5C11.25 6.25736 10.2426 5.25 9 5.25C7.75736 5.25 6.75 6.25736 6.75 7.5C6.75 8.74264 7.75736 9.75 9 9.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <address>г. Санкт-Петербург, пр-т Просвещения, д. 76</address>
            </li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h3 className="footer-title">Следите за новинками</h3>
          <form className="footer-subscribe" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Ваш email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Подписаться</button>
          </form>
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.5 3.5H7.5C5.29086 3.5 3.5 5.29086 3.5 7.5V16.5C3.5 18.7091 5.29086 20.5 7.5 20.5H16.5C18.7091 20.5 20.5 18.7091 20.5 16.5V7.5C20.5 5.29086 18.7091 3.5 16.5 3.5Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M17.5 8C18.0523 8 18.5 7.55228 18.5 7C18.5 6.44772 18.0523 6 17.5 6C16.9477 6 16.5 6.44772 16.5 7C16.5 7.55228 16.9477 8 17.5 8Z" fill="currentColor"/>
              </svg>
            </a>
            <a href="https://vk.com" target="_blank" rel="noopener noreferrer" aria-label="VK">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M7 12.5H9C11 16 12.5 15 13 12.5H15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-copyright">
          <p>© 2025 Интернет-магазин вязаных игрушек. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
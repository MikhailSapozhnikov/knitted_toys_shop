import React, { useState } from 'react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import '../styles/pages/ContactPage.css';

const ContactPage = () => {
  // Состояние формы
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  // Состояние ошибок
  const [errors, setErrors] = useState({});
  
  // Состояние отправки формы
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Состояние успешной отправки
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
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
  
  // Валидация формы
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Введите ваше имя';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }
    
    if (formData.phone && !/^\+?\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Введите корректный телефон';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Выберите тему обращения';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Введите ваше сообщение';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Сообщение должно содержать не менее 10 символов';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Имитация отправки данных на сервер
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Очищаем форму
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Показываем сообщение об успешной отправке
      setSubmitSuccess(true);
      
      // Скрываем сообщение через 5 секунд
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
      setErrors({ general: 'Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="container">
        <h1 className="contact-title">Контакты</h1>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-section">
              <h2 className="section-title">Наши контакты</h2>
              
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <h3>Телефон</h3>
                    <p><a href="tel:+79001234567">+7 (900) 123-45-67</a></p>
                    <p>Пн-Пт, 9:00-18:00</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <h3>Email</h3>
                    <p><a href="mailto:info@knittedtoys.ru">info@knittedtoys.ru</a></p>
                    <p>Мы отвечаем в течение 24 часов</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.6569 16.6569C16.7202 17.5935 14.7616 19.5521 13.4138 20.8999C12.6327 21.681 11.3677 21.6814 10.5866 20.9003C9.26234 19.5761 7.34159 17.6553 6.34315 16.6569C3.21895 13.5327 3.21895 8.46734 6.34315 5.34315C9.46734 2.21895 14.5327 2.21895 17.6569 5.34315C20.781 8.46734 20.781 13.5327 17.6569 16.6569Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <h3>Адрес</h3>
                    <p>г. Санкт-Петербург, пр-т Просвещения, д. 76</p>
                    <p>Пн-Сб, 10:00-20:00</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 10V8H6V12.5C6 12.7761 5.77614 13 5.5 13C5.22386 13 5 12.7761 5 12.5V7H8C8 4.59628 9.95227 3 12 3C14.0575 3 16 4.70556 16 7H19V19.5C19 20.3284 18.3284 21 17.5 21H12.5C12.2239 21 12 20.7761 12 20.5C12 20.2239 12.2239 20 12.5 20H17.5C17.7761 20 18 19.7761 18 19.5V8H16V10H15V8H9V10H8ZM12 4C10.4477 4 9 5.20372 9 7H15C15 5.29444 13.5425 4 12 4Z" fill="currentColor"/>
                      <path d="M7.5 14C7.77614 14 8 14.2239 8 14.5V17.5C8 17.7761 7.77614 18 7.5 18C7.22386 18 7 17.7761 7 17.5V14.5C7 14.2239 7.22386 14 7.5 14Z" fill="currentColor"/>
                      <path d="M11 14.5C11 14.2239 10.7761 14 10.5 14C10.2239 14 10 14.2239 10 14.5V17.5C10 17.7761 10.2239 18 10.5 18C10.7761 18 11 17.7761 11 17.5V14.5Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <h3>Социальные сети</h3>
                    <div className="contact-socials">
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                      <a href="https://vk.com" target="_blank" rel="noopener noreferrer">ВКонтакте</a>
                      <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">Telegram</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contact-section">
              <h2 className="section-title">Как добраться</h2>
              
              <div className="contact-map">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1995.4338641823306!2d30.38113991197881!3d60.05111448202986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x469631b9daeb47ef%3A0x92cca6fa7aeaf953!2z0J_RgNC-0YHQvy4g0J_RgNC-0YHQstC10YnQtdC90LjRjywgNzYsINCh0LDQvdC60YIt0J_QtdGC0LXRgNCx0YPRgNCzLCAxOTUyNzM!5e0!3m2!1sru!2sru!4v1715006010261!5m2!1sru!2sru" 
                  width="100%" 
                  height="400" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy"
                  title="Карта с нашим местоположением"
                ></iframe>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            <h2 className="section-title">Связаться с нами</h2>
            
            {submitSuccess ? (
              <div className="form-success">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="32" cy="32" r="32" fill="#F0F8F0"/>
                  <path d="M45.3334 24L27.3334 42L18.6667 33.3333" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3>Сообщение отправлено!</h3>
                <p>Спасибо за ваше обращение. Мы ответим вам в ближайшее время.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                {errors.general && (
                  <div className="form-error general-error">
                    {errors.general}
                  </div>
                )}
                
                <div className="form-row">
                  <Input
                    label="Ваше имя"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
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
                </div>
                
                <div className="form-row">
                  <Input
                    label="Телефон"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">Тема обращения</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`form-select ${errors.subject ? 'error' : ''}`}
                      required
                    >
                      <option value="">Выберите тему</option>
                      <option value="order">Вопрос по заказу</option>
                      <option value="product">Вопрос о товаре</option>
                      <option value="cooperation">Сотрудничество</option>
                      <option value="other">Другое</option>
                    </select>
                    {errors.subject && <div className="form-error">{errors.subject}</div>}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Сообщение</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className={`form-textarea ${errors.message ? 'error' : ''}`}
                      required
                    ></textarea>
                    {errors.message && <div className="form-error">{errors.message}</div>}
                  </div>
                </div>
                
                <div className="form-row">
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
                  </Button>
                </div>
                
                <p className="form-disclaimer">
                  Нажимая на кнопку, вы даете согласие на обработку персональных данных 
                  и соглашаетесь с <a href="/privacy" target="_blank">политикой конфиденциальности</a>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
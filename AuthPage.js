import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import useAuth from '../hooks/useAuth';
import '../styles/pages/AuthPage.css';

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login, register, resetPassword, error: authError } = useAuth();
  
  // Получаем redirect URL из параметров, если есть
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('redirect') || '/';
  
  // Если пользователь уже авторизован, перенаправляем его
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath);
    }
  }, [isAuthenticated, navigate, redirectPath]);

  // Состояние для переключения между формами
  const [activeForm, setActiveForm] = useState('login');
  
  // Состояние для форм
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [resetForm, setResetForm] = useState({
    email: ''
  });
  
  // Состояние ошибок валидации
  const [errors, setErrors] = useState({});
  
  // Состояние отправки формы
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Состояние для успешного сброса пароля
  const [resetSuccess, setResetSuccess] = useState(false);
  
  // Обработчик изменения полей формы входа
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({
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
  
  // Обработчик изменения полей формы регистрации
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({
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
  
  // Обработчик изменения полей формы сброса пароля
  const handleResetChange = (e) => {
    const { name, value } = e.target;
    setResetForm(prev => ({
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
  
  // Валидация формы входа
  const validateLoginForm = () => {
    const newErrors = {};
    
    if (!loginForm.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
      newErrors.email = 'Введите корректный email';
    }
    
    if (!loginForm.password) {
      newErrors.password = 'Введите пароль';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Валидация формы регистрации
  const validateRegisterForm = () => {
    const newErrors = {};
    
    if (!registerForm.name.trim()) {
      newErrors.name = 'Введите имя';
    }
    
    if (!registerForm.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/\S+@\S+\.\S+/.test(registerForm.email)) {
      newErrors.email = 'Введите корректный email';
    }
    
    if (!registerForm.password) {
      newErrors.password = 'Введите пароль';
    } else if (registerForm.password.length < 6) {
      newErrors.password = 'Пароль должен содержать не менее 6 символов';
    }
    
    if (!registerForm.confirmPassword) {
      newErrors.confirmPassword = 'Подтвердите пароль';
    } else if (registerForm.password !== registerForm.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Валидация формы сброса пароля
  const validateResetForm = () => {
    const newErrors = {};
    
    if (!resetForm.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/\S+@\S+\.\S+/.test(resetForm.email)) {
      newErrors.email = 'Введите корректный email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Обработчик отправки формы входа
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateLoginForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await login(loginForm.email, loginForm.password);
      
      if (success) {
        navigate(redirectPath);
      }
    } catch (error) {
      console.error('Ошибка при входе:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Обработчик отправки формы регистрации
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateRegisterForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await register({
        name: registerForm.name,
        email: registerForm.email,
        password: registerForm.password
      });
      
      if (success) {
        navigate(redirectPath);
      }
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Обработчик отправки формы сброса пароля
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateResetForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await resetPassword(resetForm.email);
      
      if (success) {
        setResetSuccess(true);
      }
    } catch (error) {
      console.error('Ошибка при сбросе пароля:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Переключение между формами
  const switchForm = (formName) => {
    setActiveForm(formName);
    setErrors({});
    setResetSuccess(false);
  };

  return (
    <div className="auth-page">
      {/* Добавляем класс с заданной шириной для формы */}
      <div className="container narrow-auth-form">
        <div className="auth-container">
          <div className="auth-tabs">
            <button 
              className={`auth-tab ${activeForm === 'login' ? 'active' : ''}`} 
              onClick={() => switchForm('login')}
            >
              Вход
            </button>
            
            <button 
              className={`auth-tab ${activeForm === 'register' ? 'active' : ''}`} 
              onClick={() => switchForm('register')}
            >
              Регистрация
            </button>
          </div>
          
          <div className="auth-content">
            {/* Форма входа */}
            {activeForm === 'login' && (
              <form className="auth-form" onSubmit={handleLoginSubmit}>
                <h2 className="auth-title">Вход в аккаунт</h2>
                
                <div className="form-group">
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    error={errors.email}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <Input
                    label="Пароль"
                    type="password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    error={errors.password}
                    required
                  />
                </div>
                
                {authError && (
                  <div className="auth-error">
                    {authError}
                  </div>
                )}
                
                <div className="auth-actions">
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Вход...' : 'Войти'}
                  </Button>
                </div>
                
                <div className="auth-links">
                  <button 
                    type="button"
                    className="auth-link"
                    onClick={() => switchForm('reset')}
                  >
                    Забыли пароль?
                  </button>
                </div>
              </form>
            )}
            
            {/* Форма регистрации */}
            {activeForm === 'register' && (
              <form className="auth-form" onSubmit={handleRegisterSubmit}>
                <h2 className="auth-title">Регистрация</h2>
                
                <div className="form-group">
                  <Input
                    label="Имя"
                    type="text"
                    name="name"
                    value={registerForm.name}
                    onChange={handleRegisterChange}
                    error={errors.name}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={registerForm.email}
                    onChange={handleRegisterChange}
                    error={errors.email}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <Input
                    label="Пароль"
                    type="password"
                    name="password"
                    value={registerForm.password}
                    onChange={handleRegisterChange}
                    error={errors.password}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <Input
                    label="Подтвердите пароль"
                    type="password"
                    name="confirmPassword"
                    value={registerForm.confirmPassword}
                    onChange={handleRegisterChange}
                    error={errors.confirmPassword}
                    required
                  />
                </div>
                
                {authError && (
                  <div className="auth-error">
                    {authError}
                  </div>
                )}
                
                <div className="auth-actions">
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
                  </Button>
                </div>
                
                <div className="auth-terms">
                  Регистрируясь, вы соглашаетесь с 
                  <a href="/terms" target="_blank"> пользовательским соглашением</a> и 
                  <a href="/privacy" target="_blank"> политикой конфиденциальности</a>.
                </div>
              </form>
            )}
            
            {/* Форма сброса пароля */}
            {activeForm === 'reset' && (
              <form className="auth-form" onSubmit={handleResetSubmit}>
                <h2 className="auth-title">Сброс пароля</h2>
                
                {resetSuccess ? (
                  <div className="reset-success">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="32" cy="32" r="32" fill="#F0F8F0"/>
                      <path d="M45.3334 24L27.3334 42L18.6667 33.3333" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h3>Инструкции отправлены</h3>
                    <p>На указанный email отправлены инструкции по сбросу пароля. Проверьте свою почту.</p>
                    <Button
                      variant="primary"
                      onClick={() => switchForm('login')}
                    >
                      Вернуться ко входу
                    </Button>
                  </div>
                ) : (
                  <>
                    <p className="reset-info">
                      Введите email, указанный при регистрации. 
                      Мы отправим инструкции по сбросу пароля.
                    </p>
                    
                    <div className="form-group">
                      <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={resetForm.email}
                        onChange={handleResetChange}
                        error={errors.email}
                        required
                      />
                    </div>
                    
                    {authError && (
                      <div className="auth-error">
                        {authError}
                      </div>
                    )}
                    
                    <div className="auth-actions">
                      <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Отправка...' : 'Отправить инструкции'}
                      </Button>
                    </div>
                    
                    <div className="auth-links">
                      <button 
                        type="button"
                        className="auth-link"
                        onClick={() => switchForm('login')}
                      >
                        Вернуться ко входу
                      </button>
                    </div>
                  </>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
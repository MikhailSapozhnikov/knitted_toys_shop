import React, { createContext, useState, useEffect } from 'react';

// Создаем контекст
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // При инициализации, проверяем наличие данных пользователя в localStorage
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        
        if (storedUser && storedToken) {
          // В реальном приложении, здесь должна быть проверка токена на сервере
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error('Authentication error:', err);
        setError('Ошибка аутентификации');
        // Очищаем локальное хранилище при ошибке
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Функция для входа
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // В реальном приложении это был бы запрос к API
      // Для демонстрации используем моковые данные
      if (email === 'user@example.com' && password === 'password') {
        const userData = {
          id: '1',
          name: 'Иван Иванов',
          email: 'user@example.com',
        };
        
        const token = 'mock-jwt-token';
        
        // Сохраняем данные в localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        
        setUser(userData);
        setIsAuthenticated(true);
        return true;
      } else {
        throw new Error('Неверные учетные данные');
      }
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Функция для регистрации
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      // В реальном приложении это был бы запрос к API
      // Для демонстрации используем моковые данные
      if (userData.email && userData.password) {
        const newUser = {
          id: '1',
          name: userData.name || 'Новый пользователь',
          email: userData.email,
        };
        
        const token = 'mock-jwt-token';
        
        // Сохраняем данные в localStorage
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('token', token);
        
        setUser(newUser);
        setIsAuthenticated(true);
        return true;
      } else {
        throw new Error('Неверные данные для регистрации');
      }
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Функция для выхода
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Функция для сброса пароля
  const resetPassword = async (email) => {
    setLoading(true);
    setError(null);
    
    try {
      // В реальном приложении это был бы запрос к API
      // Для демонстрации просто возвращаем успех
      if (email) {
        setTimeout(() => {
          console.log(`Сброс пароля для ${email}`);
        }, 1000);
        return true;
      } else {
        throw new Error('Email не указан');
      }
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Значение контекста, которое будет доступно потребителям
  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
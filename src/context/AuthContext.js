import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error('Authentication error:', err);
        setError('Ошибка аутентификации');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {

      if (email === 'user@example.com' && password === 'password') {
        const userData = {
          id: '1',
          name: 'Иван Иванов',
          email: 'user@example.com',
        };
        
        const token = 'mock-jwt-token';

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

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      if (userData.email && userData.password) {
        const newUser = {
          id: '1',
          name: userData.name || 'Новый пользователь',
          email: userData.email,
        };
        
        const token = 'mock-jwt-token';

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

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const resetPassword = async (email) => {
    setLoading(true);
    setError(null);
    
    try {
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
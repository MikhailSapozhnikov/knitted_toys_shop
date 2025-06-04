import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Хук для доступа к контексту авторизации
const useAuth = () => {
  const context = useContext(AuthContext);
  
  // Проверяем, что хук используется внутри AuthProvider
  if (context === undefined) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  
  return context;
};

export default useAuth;
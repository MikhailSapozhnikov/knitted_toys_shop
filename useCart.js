import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

// Хук для доступа к контексту корзины
const useCart = () => {
  const context = useContext(CartContext);
  
  // Проверяем, что хук используется внутри CartProvider
  if (context === undefined) {
    throw new Error('useCart должен использоваться внутри CartProvider');
  }
  
  return context;
};

export default useCart;
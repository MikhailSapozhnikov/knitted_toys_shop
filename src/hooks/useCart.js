import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart должен использоваться внутри CartProvider');
  }
  
  return context;
};

export default useCart;
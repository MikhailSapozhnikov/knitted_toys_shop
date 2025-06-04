import React, { createContext, useState, useEffect } from 'react';


export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    const loadCart = () => {
      try {
        const storedCart = localStorage.getItem('cart');
        const storedPromo = localStorage.getItem('promoCode');
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart);
          setItems(parsedCart);
        }
        if (storedPromo) {
          setPromoCode(JSON.parse(storedPromo));
        }
      } catch (error) {
        console.error('Ошибка при загрузке корзины:', error);
        localStorage.removeItem('cart');
        localStorage.removeItem('promoCode');
      }
    };
    
    loadCart();
  }, []);
 
  useEffect(() => {
    const calculateTotals = () => {
      const itemCount = items.reduce((total, item) => total + item.quantity, 0);
      setTotalItems(itemCount);

      const itemsTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

      let discount = 0;
      if (promoCode) {
        if (promoCode.type === 'fixed') {
          discount = promoCode.value;
        } else if (promoCode.type === 'percent') {
          discount = (itemsTotal * promoCode.value) / 100;
        }
      }
      
      setDiscountAmount(discount);
      setTotalPrice(itemsTotal - discount);

      localStorage.setItem('cart', JSON.stringify(items));
      if (promoCode) {
        localStorage.setItem('promoCode', JSON.stringify(promoCode));
      }
    };
    
    calculateTotals();
  }, [items, promoCode]);

  const addItem = (product, quantity = 1) => {
    setLoading(true);
    
    try {
      setItems(prevItems => {
        const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
        
        if (existingItemIndex !== -1) {
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + quantity
          };
          return updatedItems;
        } else {
          return [...prevItems, { ...product, quantity }];
        }
      });
      
      return true;
    } catch (error) {
      console.error('Ошибка при добавлении товара:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeItem = (productId) => {
    setLoading(true);
    
    try {
      setItems(prevItems => prevItems.filter(item => item.id !== productId));
      return true;
    } catch (error) {
      console.error('Ошибка при удалении товара:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = (productId, quantity) => {
    setLoading(true);
    
    try {
      if (quantity <= 0) {
        return removeItem(productId);
      }
      
      setItems(prevItems => prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      ));
      
      return true;
    } catch (error) {
      console.error('Ошибка при обновлении количества:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = () => {
    setLoading(true);
    
    try {
      setItems([]);
      setPromoCode(null);
      localStorage.removeItem('cart');
      localStorage.removeItem('promoCode');
      return true;
    } catch (error) {
      console.error('Ошибка при очистке корзины:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const applyPromocode = (code) => {
    setLoading(true);
    
    try {
      const mockPromoCodes = {
        'WELCOME10': { type: 'percent', value: 10, code: 'WELCOME10' },
        'SALE500': { type: 'fixed', value: 500, code: 'SALE500' }
      };
      
      const upperCode = code.toUpperCase();
      
      if (mockPromoCodes[upperCode]) {
        setPromoCode(mockPromoCodes[upperCode]);
        return { success: true, message: 'Промокод успешно применен' };
      } else {
        return { success: false, message: 'Промокод не найден' };
      }
    } catch (error) {
      console.error('Ошибка при применении промокода:', error);
      return { success: false, message: 'Ошибка при применении промокода' };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    items,
    totalItems,
    totalPrice,
    loading,
    promoCode,
    discountAmount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyPromocode
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
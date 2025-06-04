import React, { createContext, useState, useEffect } from 'react';

// Создаем контекст
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Состояние корзины
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  
  // Загружаем корзину из localStorage при инициализации
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
        // Сбрасываем корзину при ошибке
        localStorage.removeItem('cart');
        localStorage.removeItem('promoCode');
      }
    };
    
    loadCart();
  }, []);
  
  // Обновляем общую сумму и количество при изменении элементов корзины
  useEffect(() => {
    const calculateTotals = () => {
      // Общее количество товаров
      const itemCount = items.reduce((total, item) => total + item.quantity, 0);
      setTotalItems(itemCount);
      
      // Общая стоимость
      const itemsTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      // Расчет скидки, если применен промокод
      let discount = 0;
      if (promoCode) {
        // Пример расчета скидки: фиксированная сумма или процент
        if (promoCode.type === 'fixed') {
          discount = promoCode.value;
        } else if (promoCode.type === 'percent') {
          discount = (itemsTotal * promoCode.value) / 100;
        }
      }
      
      setDiscountAmount(discount);
      setTotalPrice(itemsTotal - discount);
      
      // Сохраняем корзину в localStorage
      localStorage.setItem('cart', JSON.stringify(items));
      if (promoCode) {
        localStorage.setItem('promoCode', JSON.stringify(promoCode));
      }
    };
    
    calculateTotals();
  }, [items, promoCode]);
  
  // Добавить товар в корзину
  const addItem = (product, quantity = 1) => {
    setLoading(true);
    
    try {
      setItems(prevItems => {
        // Проверяем, есть ли товар уже в корзине
        const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
        
        if (existingItemIndex !== -1) {
          // Если товар уже в корзине, увеличиваем количество
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + quantity
          };
          return updatedItems;
        } else {
          // Если товара нет в корзине, добавляем новый
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
  
  // Удалить товар из корзины
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
  
  // Обновить количество товара
  const updateQuantity = (productId, quantity) => {
    setLoading(true);
    
    try {
      if (quantity <= 0) {
        // Если количество 0 или меньше, удаляем товар
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
  
  // Очистить корзину
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
  
  // Применить промокод
  const applyPromocode = (code) => {
    setLoading(true);
    
    try {
      // В реальном приложении здесь должна быть проверка кода на сервере
      // Для демонстрации используем моковые промокоды
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
  
  // Значение контекста, которое будет доступно потребителям
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
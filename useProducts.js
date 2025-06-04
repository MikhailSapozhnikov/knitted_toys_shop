import { useState, useEffect, useCallback, useMemo } from 'react';
import productService from '../services/productService';

// Хук для работы с товарами
const useProducts = (initialFilters = {}) => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialFilters.page || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  // Загрузка категорий при инициализации
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await productService.getCategories();
        setCategories(categoriesData);
      } catch (err) {
        console.error('Ошибка при загрузке категорий:', err);
        setError('Не удалось загрузить категории');
      }
    };

    loadCategories();
  }, []);

  // Функция для получения товаров с применением фильтров
  const fetchProducts = useCallback(async (pageFilters = {}) => {
    setLoading(true);
    setError(null);

    try {
      // Объединяем текущие фильтры с переданными
      const mergedFilters = { ...filters, ...pageFilters };
      
      const result = await productService.getProducts(mergedFilters);
      
      setProducts(result.products);
      setTotalProducts(result.total);
      setCurrentPage(result.page);
      setTotalPages(result.totalPages);
      
      return result.products;
    } catch (err) {
      console.error('Ошибка при загрузке товаров:', err);
      setError('Не удалось загрузить товары. Пожалуйста, попробуйте позже.');
      return [];
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Загрузка товаров при изменении фильтров
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Функция для установки фильтра
  const setFilter = useCallback((key, value) => {
    setFilters(prev => {
      // Если значение фильтра не изменилось, ничего не делаем
      if (prev[key] === value) return prev;
      
      // При изменении фильтров сбрасываем страницу на первую
      return { ...prev, [key]: value, page: 1 };
    });
  }, []);

  // Функция для установки нескольких фильтров одновременно
  const setMultipleFilters = useCallback((newFilters) => {
    setFilters(prev => {
      // Проверяем, есть ли изменения в фильтрах
      let hasChanges = false;
      for (const [key, value] of Object.entries(newFilters)) {
        if (prev[key] !== value) {
          hasChanges = true;
          break;
        }
      }
      
      if (!hasChanges) return prev;
      
      // При изменении фильтров сбрасываем страницу на первую
      return { ...prev, ...newFilters, page: 1 };
    });
  }, []);

  // Функция для очистки всех фильтров
  const clearFilters = useCallback(() => {
    setFilters({ page: 1, limit: filters.limit || 10 });
  }, [filters.limit]);

  // Функция для перехода на определенную страницу
  const goToPage = useCallback((page) => {
    if (page < 1 || page > totalPages) return;
    
    setFilters(prev => ({ ...prev, page }));
  }, [totalPages]);

  // Функция для получения товара по ID
  const getProductById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const product = await productService.getProductById(id);
      return product;
    } catch (err) {
      console.error(`Ошибка при получении товара с ID ${id}:`, err);
      setError('Не удалось загрузить товар. Пожалуйста, попробуйте позже.');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Функция для получения похожих товаров
  const getSimilarProducts = useCallback(async (productId, limit = 4) => {
    try {
      return await productService.getSimilarProducts(productId, limit);
    } catch (err) {
      console.error('Ошибка при загрузке похожих товаров:', err);
      return [];
    }
  }, []);
  
  // Функция для получения отзывов
  const getProductReviews = useCallback(async (productId) => {
    try {
      return await productService.getReviews(productId);
    } catch (err) {
      console.error('Ошибка при загрузке отзывов:', err);
      return [];
    }
  }, []);
  
  // Функция для добавления отзыва
  const addProductReview = useCallback(async (productId, reviewData) => {
    try {
      return await productService.addReview(productId, reviewData);
    } catch (err) {
      console.error('Ошибка при добавлении отзыва:', err);
      throw err;
    }
  }, []);
  
  // Функция для получения рекомендуемых товаров
  const getFeaturedProducts = useCallback(async (limit = 6) => {
    try {
      return await productService.getFeaturedProducts(limit);
    } catch (err) {
      console.error('Ошибка при загрузке рекомендуемых товаров:', err);
      return [];
    }
  }, []);
  
  // Функция для получения новых товаров
  const getNewProducts = useCallback(async (limit = 6) => {
    try {
      return await productService.getNewProducts(limit);
    } catch (err) {
      console.error('Ошибка при загрузке новых товаров:', err);
      return [];
    }
  }, []);
  
  // Функция для получения товаров со скидкой
  const getDiscountedProducts = useCallback(async (limit = 6) => {
    try {
      return await productService.getDiscountedProducts(limit);
    } catch (err) {
      console.error('Ошибка при загрузке товаров со скидкой:', err);
      return [];
    }
  }, []);

  // Мемоизированные вычисляемые значения
  const paginationInfo = useMemo(() => ({
    currentPage,
    totalPages,
    totalProducts
  }), [currentPage, totalPages, totalProducts]);

  const activeFilters = useMemo(() => {
    // Возвращаем только активные фильтры, исключая служебные поля
    const { page, limit, sortBy, ...rest } = filters;
    return rest;
  }, [filters]);

  // Возвращаем все необходимые значения и функции
  return {
    products,
    loading,
    error,
    filters,
    categories,
    paginationInfo,
    activeFilters,
    fetchProducts,
    setFilter,
    setMultipleFilters,
    clearFilters,
    goToPage,
    getProductById,
    getSimilarProducts,
    getProductReviews,
    addProductReview,
    getFeaturedProducts,
    getNewProducts,
    getDiscountedProducts
  };
};

export default useProducts;
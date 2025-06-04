import { useState, useEffect, useCallback, useMemo } from 'react';
import productService from '../services/productService';


const useProducts = (initialFilters = {}) => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialFilters.page || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

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

  const fetchProducts = useCallback(async (pageFilters = {}) => {
    setLoading(true);
    setError(null);

    try {

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

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const setFilter = useCallback((key, value) => {
    setFilters(prev => {
      if (prev[key] === value) return prev;
      return { ...prev, [key]: value, page: 1 };
    });
  }, []);

  const setMultipleFilters = useCallback((newFilters) => {
    setFilters(prev => {
      let hasChanges = false;
      for (const [key, value] of Object.entries(newFilters)) {
        if (prev[key] !== value) {
          hasChanges = true;
          break;
        }
      }
      
      if (!hasChanges) return prev;

      return { ...prev, ...newFilters, page: 1 };
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ page: 1, limit: filters.limit || 10 });
  }, [filters.limit]);

  const goToPage = useCallback((page) => {
    if (page < 1 || page > totalPages) return;
    
    setFilters(prev => ({ ...prev, page }));
  }, [totalPages]);

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

  const getSimilarProducts = useCallback(async (productId, limit = 4) => {
    try {
      return await productService.getSimilarProducts(productId, limit);
    } catch (err) {
      console.error('Ошибка при загрузке похожих товаров:', err);
      return [];
    }
  }, []);
  
  const getProductReviews = useCallback(async (productId) => {
    try {
      return await productService.getReviews(productId);
    } catch (err) {
      console.error('Ошибка при загрузке отзывов:', err);
      return [];
    }
  }, []);

  const addProductReview = useCallback(async (productId, reviewData) => {
    try {
      return await productService.addReview(productId, reviewData);
    } catch (err) {
      console.error('Ошибка при добавлении отзыва:', err);
      throw err;
    }
  }, []);

  const getFeaturedProducts = useCallback(async (limit = 6) => {
    try {
      return await productService.getFeaturedProducts(limit);
    } catch (err) {
      console.error('Ошибка при загрузке рекомендуемых товаров:', err);
      return [];
    }
  }, []);

  const getNewProducts = useCallback(async (limit = 6) => {
    try {
      return await productService.getNewProducts(limit);
    } catch (err) {
      console.error('Ошибка при загрузке новых товаров:', err);
      return [];
    }
  }, []);

  const getDiscountedProducts = useCallback(async (limit = 6) => {
    try {
      return await productService.getDiscountedProducts(limit);
    } catch (err) {
      console.error('Ошибка при загрузке товаров со скидкой:', err);
      return [];
    }
  }, []);

  const paginationInfo = useMemo(() => ({
    currentPage,
    totalPages,
    totalProducts
  }), [currentPage, totalPages, totalProducts]);

  const activeFilters = useMemo(() => {
    const { page, limit, sortBy, ...rest } = filters;
    return rest;
  }, [filters]);

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
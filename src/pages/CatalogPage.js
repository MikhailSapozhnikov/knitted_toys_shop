import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FilterPanel from '../components/product/FilterPanel';
import SortSelector from '../components/product/SortSelector';
import ProductGrid from '../components/product/ProductGrid';
import Pagination from '../components/common/Pagination';
import Spinner from '../components/common/Spinner';
import useProducts from '../hooks/useProducts';
import '../styles/pages/CatalogPage.css';

const CatalogPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [skipUrlUpdate, setSkipUrlUpdate] = useState(false);
  const [skipFilterUpdate, setSkipFilterUpdate] = useState(false);
  
  const queryParams = new URLSearchParams(location.search);
  
  const initialFilters = {
    category: queryParams.get('category') || undefined,
    search: queryParams.get('search') || undefined,
    priceMin: queryParams.get('priceMin') ? Number(queryParams.get('priceMin')) : undefined,
    priceMax: queryParams.get('priceMax') ? Number(queryParams.get('priceMax')) : undefined,
    inStock: queryParams.get('inStock') === 'true' ? true : undefined,
    new: queryParams.get('new') === 'true' ? true : undefined,
    discount: queryParams.get('discount') === 'true' ? true : undefined,
    sortBy: queryParams.get('sortBy') || 'popularity',
    page: queryParams.get('page') ? Number(queryParams.get('page')) : 1,
    limit: 12
  };
  
  const {
    products,
    loading,
    error,
    filters,
    categories,
    paginationInfo,
    setFilter,
    setMultipleFilters,
    clearFilters,
    goToPage
  } = useProducts(initialFilters);
  
  useEffect(() => {
    if (skipFilterUpdate) {
      setSkipFilterUpdate(false);
      return;
    }
    
    const queryParams = new URLSearchParams(location.search);
    
    const newFilters = {
      category: queryParams.get('category') || undefined,
      search: queryParams.get('search') || undefined,
      priceMin: queryParams.get('priceMin') ? Number(queryParams.get('priceMin')) : undefined,
      priceMax: queryParams.get('priceMax') ? Number(queryParams.get('priceMax')) : undefined,
      inStock: queryParams.get('inStock') === 'true' ? true : undefined,
      new: queryParams.get('new') === 'true' ? true : undefined,
      discount: queryParams.get('discount') === 'true' ? true : undefined,
      sortBy: queryParams.get('sortBy') || 'popularity',
      page: queryParams.get('page') ? Number(queryParams.get('page')) : 1,
      limit: filters.limit || 12
    };
    
    let hasChanges = false;
    for (const key in newFilters) {
      if (newFilters[key] !== filters[key]) {
        hasChanges = true;
        break;
      }
    }
    
    if (hasChanges) {
      setSkipUrlUpdate(true);
      setMultipleFilters(newFilters);
    }
    
  }, [location.search, setMultipleFilters]);
  
  useEffect(() => {
    if (skipUrlUpdate) {
      setSkipUrlUpdate(false);
      return;
    }
    
    const newParams = new URLSearchParams();
    
    if (filters.category) newParams.set('category', filters.category);
    if (filters.search) newParams.set('search', filters.search);
    if (filters.priceMin) newParams.set('priceMin', filters.priceMin);
    if (filters.priceMax) newParams.set('priceMax', filters.priceMax);
    if (filters.inStock) newParams.set('inStock', filters.inStock);
    if (filters.new) newParams.set('new', filters.new);
    if (filters.discount) newParams.set('discount', filters.discount);
    if (filters.sortBy) newParams.set('sortBy', filters.sortBy);
    if (filters.page && filters.page > 1) newParams.set('page', filters.page);
    
    const currentParams = new URLSearchParams(location.search);
    
    if (currentParams.toString() !== newParams.toString()) {
      setSkipFilterUpdate(true);
      navigate({
        pathname: location.pathname,
        search: newParams.toString()
      }, { replace: true });
    }
    
  }, [filters, navigate, location.pathname, location.search]);
  
  const { currentPage, totalPages } = paginationInfo;
  
  const handleSortChange = (sortBy) => {
    setFilter('sortBy', sortBy);
  };
  
  const handlePageChange = (page) => {
    goToPage(page);
  };
  
  const getPageTitle = () => {
    if (filters.search) {
      return `Результаты поиска: ${filters.search}`;
    }
    
    if (!filters.category) return 'Все товары';
    
    const category = categories.find(cat => cat.id === filters.category);
    return category ? category.name : 'Товары';
  };
  
  return (
    <div className="catalog-page">
      <div className="container">
        <div className="catalog-header">
          <h1 className="catalog-title">{getPageTitle()}</h1>
          
          <div className="catalog-actions">
            <SortSelector 
              value={filters.sortBy} 
              onChange={handleSortChange} 
            />
          </div>
        </div>
        
        <div className="catalog-content">
          <aside className="catalog-sidebar">
            <FilterPanel 
              categories={categories} 
              filters={filters} 
              onFilterChange={setFilter}
              onClearFilters={clearFilters}
              priceRange={{ min: 500, max: 5000 }}
            />
          </aside>
          
          <div className="catalog-main">
            {loading ? (
              <div className="catalog-loading">
                <Spinner />
              </div>
            ) : error ? (
              <div className="catalog-error">
                <p>{error}</p>
              </div>
            ) : (
              <>
                <ProductGrid 
                  products={products}
                  columns={3}
                  emptyMessage="Товары не найдены. Попробуйте изменить параметры фильтрации."
                />
                
                {totalPages > 1 && (
                  <div className="catalog-pagination">
                    <Pagination 
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
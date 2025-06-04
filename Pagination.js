import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/common/Pagination.css';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}) => {
  // Если страница всего одна, не показываем пагинацию
  if (totalPages <= 1) return null;

  // Функция для создания массива номеров страниц
  const generatePaginationItems = () => {
    const items = [];

    // Добавляем первую страницу
    items.push(1);
    
    // Вычисляем начальную и конечную страницу в диапазоне
    const leftSibling = Math.max(currentPage - siblingCount, 2);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages - 1);
    
    // Нужно ли добавлять многоточие слева
    const shouldShowLeftDots = leftSibling > 2;
    // Нужно ли добавлять многоточие справа
    const shouldShowRightDots = rightSibling < totalPages - 1;
    
    // Добавляем многоточие слева, если нужно
    if (shouldShowLeftDots) {
      items.push('...');
    } else if (leftSibling === 2) {
      // Если следующая страница после первой - это leftSibling, добавляем её
      items.push(2);
    }
    
    // Добавляем страницы в диапазоне от leftSibling до rightSibling
    for (let i = leftSibling; i <= rightSibling; i++) {
      if (i !== 1 && i !== totalPages) {
        items.push(i);
      }
    }
    
    // Добавляем многоточие справа, если нужно
    if (shouldShowRightDots) {
      items.push('...');
    } else if (rightSibling === totalPages - 1) {
      // Если предыдущая страница перед последней - это rightSibling, добавляем её
      items.push(totalPages - 1);
    }
    
    // Добавляем последнюю страницу, если totalPages > 1
    if (totalPages > 1) {
      items.push(totalPages);
    }
    
    return items;
  };

  // Получаем массив элементов пагинации
  const paginationItems = generatePaginationItems();

  // Функция для перехода на страницу
  const handlePageChange = (page) => {
    if (page !== currentPage && page !== '...') {
      onPageChange(page);
    }
  };

  // Переход на предыдущую страницу
  const goToPrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Переход на следующую страницу
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button
        className="pagination-button pagination-prev"
        onClick={goToPrevPage}
        disabled={currentPage === 1}
        aria-label="Предыдущая страница"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      <div className="pagination-pages">
        {paginationItems.map((item, index) => (
          <button
            key={`page-${index}`}
            className={`pagination-page ${item === currentPage ? 'active' : ''} ${item === '...' ? 'pagination-dots' : ''}`}
            onClick={() => handlePageChange(item)}
            disabled={item === '...'}
            aria-label={item === '...' ? 'Пропущенные страницы' : `Страница ${item}`}
            aria-current={item === currentPage ? 'page' : undefined}
          >
            {item}
          </button>
        ))}
      </div>
      
      <button
        className="pagination-button pagination-next"
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        aria-label="Следующая страница"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  siblingCount: PropTypes.number,
};

export default Pagination;
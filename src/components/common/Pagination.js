import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/common/Pagination.css';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}) => {
  if (totalPages <= 1) return null;

  const generatePaginationItems = () => {
    const items = [];

    items.push(1);

    const leftSibling = Math.max(currentPage - siblingCount, 2);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages - 1);

    const shouldShowLeftDots = leftSibling > 2;

    const shouldShowRightDots = rightSibling < totalPages - 1;

    if (shouldShowLeftDots) {
      items.push('...');
    } else if (leftSibling === 2) {
      items.push(2);
    }

    for (let i = leftSibling; i <= rightSibling; i++) {
      if (i !== 1 && i !== totalPages) {
        items.push(i);
      }
    }

    if (shouldShowRightDots) {
      items.push('...');
    } else if (rightSibling === totalPages - 1) {
      items.push(totalPages - 1);
    }

    if (totalPages > 1) {
      items.push(totalPages);
    }
    
    return items;
  };

  const paginationItems = generatePaginationItems();

  const handlePageChange = (page) => {
    if (page !== currentPage && page !== '...') {
      onPageChange(page);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

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
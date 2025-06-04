import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import '../../styles/common/Modal.css';

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  size = 'medium',
  closeOnOutsideClick = true,
  showCloseButton = true,
  className = ''
}) => {
  const modalRef = useRef(null);

  // Предотвращаем прокрутку страницы при открытом модальном окне
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Закрытие по клавише Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Обработчик клика вне модального окна
  const handleOutsideClick = (e) => {
    if (closeOnOutsideClick && modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Если модальное окно закрыто, ничего не рендерим
  if (!isOpen) return null;

  // Определяем класс размера
  const sizeClass = `modal-${size}`;

  // Создаем портал для модального окна
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={handleOutsideClick}>
      <div 
        ref={modalRef}
        className={`modal ${sizeClass} ${className}`}
      >
        <div className="modal-header">
          {title && <h3 className="modal-title">{title}</h3>}
          {showCloseButton && (
            <button 
              type="button" 
              className="modal-close" 
              onClick={onClose}
              aria-label="Закрыть"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'fullscreen']),
  closeOnOutsideClick: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  className: PropTypes.string
};

export default Modal;
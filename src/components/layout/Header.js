import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo11.png';
import '../../styles/layout/Header.css';
import useCart from '../../hooks/useCart'; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const { totalItems } = useCart();

  useEffect(() => {
    if (location.pathname === '/catalog' && !location.search.includes('updating=true')) {
      const searchParams = new URLSearchParams(location.search);
      const searchParam = searchParams.get('search');
      if (searchParam) {
        setSearchQuery(searchParam);
      } else {

        setSearchQuery('');
      }
    }
  }, [location.pathname, location.search]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    const searchParams = new URLSearchParams();
    
    if (searchQuery.trim()) {
      searchParams.set('search', searchQuery.trim());
      searchParams.set('updating', 'true');
    }
    
    navigate({
      pathname: '/catalog',
      search: searchParams.toString()
    });
    
    setTimeout(() => {
      if (location.pathname === '/catalog') {
        const currentParams = new URLSearchParams(location.search);
        currentParams.delete('updating');
        
        if (searchQuery.trim()) {
          currentParams.set('search', searchQuery.trim());
        } else {
          currentParams.delete('search');
        }
        
        navigate({
          pathname: '/catalog',
          search: currentParams.toString()
        }, { replace: true });
      }
    }, 100);
  };

  return (
    <header className="header">
      <div className="header-announcement">
        <p>Бесплатная доставка при заказе от 3000 ₽</p>
      </div>
      
      <div className="header-main">
        <div className="header-logo">
          <Link to="/">
            <img src={logo} alt="Вязаные игрушки" />
          </Link>
        </div>
        
        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Открыть меню"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <nav className={`header-nav ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/catalog">Каталог</Link>
              <div className="submenu">
                <ul>
                  <li><Link to="/catalog?category=animals">Животные</Link></li>
                  <li><Link to="/catalog?category=plants">Растения</Link></li>
                  <li><Link to="/catalog?category=fairy">Сказочные существа</Link></li>
                  <li><Link to="/catalog?category=sets">Наборы</Link></li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <Link to="/about">О нас</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact">Контакты</Link>
            </li>
            <li className="nav-item">
              <Link to="/faq">FAQ</Link>
            </li>
          </ul>
        </nav>
        
        <div className="header-actions">
          <form className="search-bar" onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              placeholder="Поиск..." 
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit" aria-label="Искать">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 19L14.5 14.5M16.6667 9.33333C16.6667 13.3869 13.3869 16.6667 9.33333 16.6667C5.27971 16.6667 2 13.3869 2 9.33333C2 5.27971 5.27971 2 9.33333 2C13.3869 2 16.6667 5.27971 16.6667 9.33333Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>
          
          <div className="header-user-actions">
            <Link to="/auth" className="user-action" aria-label="Профиль">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.3333 19.25V17.4167C18.3333 15.3866 16.6967 13.75 14.6667 13.75H7.33333C5.30319 13.75 3.66667 15.3866 3.66667 17.4167V19.25M14.6667 6.41667C14.6667 8.44681 13.0301 10.0833 11 10.0833C8.96986 10.0833 7.33333 8.44681 7.33333 6.41667C7.33333 4.38653 8.96986 2.75 11 2.75C13.0301 2.75 14.6667 4.38653 14.6667 6.41667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            
            <Link to="/cart" className="user-action cart-action" aria-label="Корзина">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.33333 20.1667C8.34385 20.1667 9.16667 19.3439 9.16667 18.3333C9.16667 17.3228 8.34385 16.5 7.33333 16.5C6.32281 16.5 5.5 17.3228 5.5 18.3333C5.5 19.3439 6.32281 20.1667 7.33333 20.1667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.5 20.1667C17.5105 20.1667 18.3333 19.3439 18.3333 18.3333C18.3333 17.3228 17.5105 16.5 16.5 16.5C15.4895 16.5 14.6667 17.3228 14.6667 18.3333C14.6667 19.3439 15.4895 20.1667 16.5 20.1667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1.83333 1.83334H4.58333L7.06417 12.0092C7.17805 12.5509 7.48326 13.0372 7.92385 13.3831C8.36444 13.729 8.91276 13.9146 9.47333 13.9167H15.8333C16.3939 13.9146 16.9422 13.729 17.3828 13.3831C17.8234 13.0372 18.1286 12.5509 18.2425 12.0092L19.7083 5.50001H5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {totalItems > 0 && (
                <span className="cart-counter">{totalItems}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
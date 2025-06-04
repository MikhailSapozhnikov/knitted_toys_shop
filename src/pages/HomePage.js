import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/common/Button';
import Spinner from '../components/common/Spinner';
import '../styles/pages/HomePage.css';

const categoryTitleContainerStyle = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
  padding: 0
};

const categoryTitleStyle = {
  fontSize: '1.1rem',
  fontWeight: 600,
  color: '#333',
  margin: 0,
  padding: 0,
  textAlign: 'center',
  textShadow: 'none',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  lineHeight: 1
};

const fairyTitleStyle = {
  ...categoryTitleStyle,
  fontSize: '1rem'
};

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [loadingNew, setLoadingNew] = useState(true);
  const [loadingDiscounted, setLoadingDiscounted] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { 
    getFeaturedProducts, 
    getNewProducts, 
    getDiscountedProducts
  } = useProducts();

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      setLoadingFeatured(true);
      try {
        const products = await getFeaturedProducts(4);
        setFeaturedProducts(products);
      } catch (error) {
        console.error('Ошибка при загрузке рекомендуемых товаров:', error);
      } finally {
        setLoadingFeatured(false);
      }
    };

    loadFeaturedProducts();
  }, [getFeaturedProducts]);

  useEffect(() => {
    const loadNewProducts = async () => {
      setLoadingNew(true);
      try {
        const products = await getNewProducts(4);
        setNewProducts(products);
      } catch (error) {
        console.error('Ошибка при загрузке новых товаров:', error);
      } finally {
        setLoadingNew(false);
      }
    };

    loadNewProducts();
  }, [getNewProducts]);

  useEffect(() => {
    const loadDiscountedProducts = async () => {
      setLoadingDiscounted(true);
      try {
        const products = await getDiscountedProducts(4);
        setDiscountedProducts(products);
      } catch (error) {
        console.error('Ошибка при загрузке товаров со скидкой:', error);
      } finally {
        setLoadingDiscounted(false);
      }
    };

    loadDiscountedProducts();
  }, [getDiscountedProducts]);

  const slides = [
    {
      id: 1,
      title: 'Уникальные вязаные игрушки ручной работы',
      subtitle: 'Создаем игрушки с любовью и заботой о каждой детали',
      image: '/images/slider/slide1.jpg',
      cta: {
        text: 'Перейти в каталог',
        link: '/catalog'
      },
      color: '#f8e6e0'
    },
    {
      id: 2,
      title: 'Скидки до 20% на весеннюю коллекцию',
      subtitle: 'Только до конца месяца! Успейте приобрести по выгодной цене',
      image: '/images/slider/slide2.jpg',
      cta: {
        text: 'Посмотреть акции',
        link: '/catalog?discount=true'
      },
      color: '#e6f0e0'
    },
    {
      id: 3,
      title: 'Идеальный подарок для любого случая',
      subtitle: 'Порадуйте близких уникальным и теплым подарком',
      image: '/images/slider/slide3.jpg',
      cta: {
        text: 'Выбрать подарок',
        link: '/catalog'
      },
      color: '#e0e6f8'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">
      <section className="hero-slider">
        <div className="slider-container" style={{ backgroundColor: slides[currentSlide].color }}>
          <div className="slider-content">
            <div className="slider-text">
              <h1 className="slider-title">{slides[currentSlide].title}</h1>
              <p className="slider-subtitle">{slides[currentSlide].subtitle}</p>
              <Link to={slides[currentSlide].cta.link}>
                <Button variant="primary" size="large">
                  {slides[currentSlide].cta.text}
                </Button>
              </Link>
            </div>
            <div className="slider-image">
              <img src={slides[currentSlide].image} alt={slides[currentSlide].title} />
            </div>
          </div>
          
          <button className="slider-arrow slider-arrow-left" onClick={prevSlide} aria-label="Предыдущий слайд">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button className="slider-arrow slider-arrow-right" onClick={nextSlide} aria-label="Следующий слайд">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div className="slider-dots">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Перейти к слайду ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      <section className="home-categories section">
        <div className="container">
          <h2 className="section-title">Категории игрушек</h2>
          
          <div className="category-grid">
            <Link to="/catalog?category=animals" className="category-card">
              <div className="category-image">
                <img src="/images/categories/animals.jpg" alt="Животные" />
              </div>
              <div style={categoryTitleContainerStyle}>
                <h3 style={categoryTitleStyle}>Животные</h3>
              </div>
            </Link>
            
            <Link to="/catalog?category=plants" className="category-card">
              <div className="category-image">
                <img src="/images/categories/plants.jpg" alt="Растения" />
              </div>
              <div style={categoryTitleContainerStyle}>
                <h3 style={categoryTitleStyle}>Растения</h3>
              </div>
            </Link>
            
            <Link to="/catalog?category=fairy" className="category-card">
              <div className="category-image">
                <img src="/images/categories/fairy.jpg" alt="Сказочные существа" />
              </div>
              <div style={categoryTitleContainerStyle}>
                <h3 style={fairyTitleStyle}>Сказочные существа</h3>
              </div>
            </Link>
            
            <Link to="/catalog?category=sets" className="category-card">
              <div className="category-image">
                <img src="/images/categories/sets.jpg" alt="Наборы" />
              </div>
              <div style={categoryTitleContainerStyle}>
                <h3 style={categoryTitleStyle}>Наборы</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="home-featured section">
        <div className="container">
          <h2 className="section-title">Популярные товары</h2>
          
          {loadingFeatured ? (
            <div className="section-loading">
              <Spinner />
            </div>
          ) : (
            <>
              <div className="product-grid product-grid-4">
                {featuredProducts.map(product => (
                  <div key={product.id} className="product-grid-item">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              
              <div className="section-action">
                <Link to="/catalog">
                  <Button variant="outlined">Смотреть все товары</Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {newProducts.length > 0 && (
        <section className="home-new section">
          <div className="container">
            <h2 className="section-title">Новинки</h2>
            
            {loadingNew ? (
              <div className="section-loading">
                <Spinner />
              </div>
            ) : (
              <>
                <div className="product-grid product-grid-4">
                  {newProducts.map(product => (
                    <div key={product.id} className="product-grid-item">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
                
                <div className="section-action">
                  <Link to="/catalog?new=true">
                    <Button variant="outlined">Все новинки</Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {discountedProducts.length > 0 && (
        <section className="home-discount section">
          <div className="container">
            <h2 className="section-title">Скидки и акции</h2>
            
            {loadingDiscounted ? (
              <div className="section-loading">
                <Spinner />
              </div>
            ) : (
              <>
                <div className="product-grid product-grid-4">
                  {discountedProducts.map(product => (
                    <div key={product.id} className="product-grid-item">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
                
                <div className="section-action">
                  <Link to="/catalog?discount=true">
                    <Button variant="outlined">Все скидки</Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>
      )}

      <section className="home-benefits section">
        <div className="container">
          <h2 className="section-title">Почему выбирают нас</h2>
          
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12L26.47 19.5H34.5L28 24L30.5 31.5L24 27L17.5 31.5L20 24L13.5 19.5H21.5L24 12Z" fill="#9c6644" stroke="#9c6644" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="#9c6644" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="benefit-title">Высокое качество</h3>
              <p className="benefit-description">Мы используем только высококачественные материалы и фурнитуру для создания наших игрушек.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="#9c6644" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M24 12V24L32 28" stroke="#9c6644" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="benefit-title">Быстрая доставка</h3>
              <p className="benefit-description">Отправляем заказ в течение 5-7 рабочих дней после оплаты.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M44 18V36C44 36.5304 43.7893 37.0391 43.4142 37.4142C43.0391 37.7893 42.5304 38 42 38H6C5.46957 38 4.96086 37.7893 4.58579 37.4142C4.21071 37.0391 4 36.5304 4 36V18" stroke="#9c6644" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 38V12C16 11.4696 16.2107 10.9609 16.5858 10.5858C16.9609 10.2107 17.4696 10 18 10H30C30.5304 10 31.0391 10.2107 31.4142 10.5858C31.7893 10.9609 32 11.4696 32 12V38" stroke="#9c6644" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="benefit-title">Ручная работа</h3>
              <p className="benefit-description">Каждая игрушка создается вручную с любовью и вниманием к деталям.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M44 24C44 24 36 36 24 36C12 36 4 24 4 24C4 24 12 12 24 12C36 12 44 24 44 24Z" stroke="#9c6644" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M24 30C27.3137 30 30 27.3137 30 24C30 20.6863 27.3137 18 24 18C20.6863 18 18 20.6863 18 24C18 27.3137 20.6863 30 24 30Z" stroke="#9c6644" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="benefit-title">Безопасные материалы</h3>
              <p className="benefit-description">Мы используем только гипоаллергенные материалы, безопасные для детей.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Spinner from '../components/common/Spinner';
import ProductCard from '../components/product/ProductCard';
import useProducts from '../hooks/useProducts';
import useCart from '../hooks/useCart';
import '../styles/pages/ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const { getProductById, getSimilarProducts, getProductReviews, addProductReview } = useProducts();
  const { addItem } = useCart();
  
  // Состояния
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Состояния для формы отзыва
  const [reviewForm, setReviewForm] = useState({
    userName: '',
    rating: 5,
    text: ''
  });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  // Загрузка товара
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Получаем данные о товаре
        const productData = await getProductById(id);
        setProduct(productData);
        
        // Получаем похожие товары
        const similar = await getSimilarProducts(id, 4);
        setSimilarProducts(similar);
        
        // Получаем отзывы
        const productReviews = await getProductReviews(id);
        setReviews(productReviews);
      } catch (err) {
        console.error('Ошибка при загрузке товара:', err);
        setError('Не удалось загрузить информацию о товаре. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [id, getProductById, getSimilarProducts, getProductReviews]);
  
  // Обработчик изменения количества
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 10) {
      setQuantity(value);
    }
  };
  
  // Увеличение количества
  const increaseQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };
  
  // Уменьшение количества
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  // Добавление в корзину
  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      // Можно добавить уведомление об успешном добавлении
      alert('Товар добавлен в корзину');
    }
  };
  
  // Изменение изображения
  const changeImage = (index) => {
    setActiveImage(index);
  };
  
  // Обработчик изменения полей формы отзыва
  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  };
  
  // Отправка отзыва
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    // Валидация формы
    if (!reviewForm.userName.trim() || !reviewForm.text.trim()) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    
    setReviewSubmitting(true);
    
    try {
      // Отправка отзыва
      const newReview = await addProductReview(id, {
        userId: 'guest',
        userName: reviewForm.userName,
        rating: reviewForm.rating,
        text: reviewForm.text
      });
      
      // Добавляем новый отзыв в список
      setReviews(prev => [newReview, ...prev]);
      
      // Сбрасываем форму
      setReviewForm({
        userName: '',
        rating: 5,
        text: ''
      });
      
      // Скрываем форму
      setShowReviewForm(false);
    } catch (err) {
      console.error('Ошибка при отправке отзыва:', err);
      alert('Не удалось отправить отзыв. Пожалуйста, попробуйте позже.');
    } finally {
      setReviewSubmitting(false);
    }
  };
  
  // Показываем спиннер загрузки
  if (loading) {
    return (
      <div className="product-page-loading">
        <Spinner size="large" />
      </div>
    );
  }
  
  // Показываем сообщение об ошибке
  if (error || !product) {
    return (
      <div className="product-page-error">
        <h2>Ошибка</h2>
        <p>{error || 'Товар не найден'}</p>
        <Link to="/catalog">
          <Button variant="primary">Вернуться в каталог</Button>
        </Link>
      </div>
    );
  }
  
  // Вычисляем скидочную цену
  const discountedPrice = product.discount 
    ? Math.round(product.price - (product.price * product.discount / 100)) 
    : null;
  
  return (
    <div className="product-page">
      <div className="container">
        <div className="product-breadcrumbs">
          <Link to="/">Главная</Link> / 
          <Link to="/catalog">Каталог</Link> / 
          <Link to={`/catalog?category=${product.category}`}>
            {product.category === 'animals' ? 'Животные' : 
             product.category === 'dolls' ? 'Куклы' : 
             product.category === 'toys' ? 'Игрушки' : 
             product.category === 'seasonal' ? 'Сезонные' : 'Категория'}
          </Link> / 
          <span>{product.name}</span>
        </div>
        
        <div className="product-content">
          {/* Галерея */}
          <div className="product-gallery">
            <div className="product-main-image">
              <img 
                src={product.images[activeImage] || '/images/placeholder.jpg'} 
                alt={product.name} 
              />
              
              {/* Метки (новинка, скидка) */}
              <div className="product-badges">
                {product.new && <span className="product-badge product-badge-new">Новинка</span>}
                {product.discount && (
                  <span className="product-badge product-badge-discount">-{product.discount}%</span>
                )}
                {!product.inStock && (
                  <span className="product-badge product-badge-outofstock">Нет в наличии</span>
                )}
              </div>
            </div>
            
            {product.images.length > 1 && (
              <div className="product-thumbnails">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`product-thumbnail ${index === activeImage ? 'active' : ''}`}
                    onClick={() => changeImage(index)}
                  >
                    <img src={image} alt={`${product.name} - изображение ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Информация о товаре */}
          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            
            {/* Рейтинг */}
            <div className="product-rating">
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star} 
                    className={`star ${star <= Math.round(product.rating) ? 'filled' : ''}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="rating-value">{product.rating.toFixed(1)}</span>
              <span className="reviews-count">({product.reviewsCount} отзывов)</span>
            </div>
            
            {/* Цена */}
            <div className="product-price-block">
              {discountedPrice ? (
                <>
                  <span className="product-price-old">{product.price} ₽</span>
                  <span className="product-price">{discountedPrice} ₽</span>
                </>
              ) : (
                <span className="product-price">{product.price} ₽</span>
              )}
            </div>
            
            {/* Доступность */}
            <div className="product-availability">
              {product.inStock ? (
                <span className="in-stock">В наличии</span>
              ) : (
                <span className="out-of-stock">Нет в наличии</span>
              )}
            </div>
            
            {/* Количество и кнопка добавления в корзину */}
            {product.inStock && (
              <div className="product-actions">
                <div className="quantity-control">
                  <button 
                    className="quantity-btn" 
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="quantity-input"
                  />
                  <button 
                    className="quantity-btn" 
                    onClick={increaseQuantity}
                    disabled={quantity >= 10}
                  >
                    +
                  </button>
                </div>
                
                <Button 
                  variant="primary" 
                  size="large" 
                  onClick={handleAddToCart}
                  fullWidth
                >
                  Добавить в корзину
                </Button>
              </div>
            )}
            
            {/* Описание */}
            <div className="product-description">
              <h3 className="product-section-title">Описание</h3>
              <p>{product.description}</p>
            </div>
            
            {/* Характеристики */}
            <div className="product-specifications">
              <h3 className="product-section-title">Характеристики</h3>
              <div className="specifications-list">
                {product.materials && (
                  <div className="specification-item">
                    <span className="specification-name">Материалы:</span>
                    <span className="specification-value">{product.materials.join(', ')}</span>
                  </div>
                )}
                {product.size && (
                  <div className="specification-item">
                    <span className="specification-name">Размеры:</span>
                    <span className="specification-value">
                      {product.size.height} × {product.size.width} × {product.size.length} см
                    </span>
                  </div>
                )}
                {product.weight && (
                  <div className="specification-item">
                    <span className="specification-name">Вес:</span>
                    <span className="specification-value">{product.weight} г</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Отзывы */}
        <div className="product-reviews">
          <div className="reviews-header">
            <h2 className="section-title">Отзывы о товаре</h2>
            <Button 
              variant={showReviewForm ? 'secondary' : 'primary'} 
              onClick={() => setShowReviewForm(!showReviewForm)}
            >
              {showReviewForm ? 'Отменить' : 'Написать отзыв'}
            </Button>
          </div>
          
          {/* Форма отзыва */}
          {showReviewForm && (
            <div className="review-form-container">
              <form onSubmit={handleSubmitReview} className="review-form">
                <div className="form-group">
                  <label htmlFor="userName">Ваше имя*</label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={reviewForm.userName}
                    onChange={handleReviewChange}
                    required
                    className="form-control"
                  />
                </div>
                
                <div className="form-group">
                  <label>Оценка*</label>
                  <div className="rating-input">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <label key={star} className="rating-label">
                        <input
                          type="radio"
                          name="rating"
                          value={star}
                          checked={reviewForm.rating === star}
                          onChange={handleReviewChange}
                          className="rating-radio"
                        />
                        <span className="star">{star}★</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="text">Отзыв*</label>
                  <textarea
                    id="text"
                    name="text"
                    value={reviewForm.text}
                    onChange={handleReviewChange}
                    required
                    className="form-control"
                    rows="5"
                  ></textarea>
                </div>
                
                <div className="form-actions">
                  <Button 
                    type="submit" 
                    variant="primary"
                    disabled={reviewSubmitting}
                  >
                    {reviewSubmitting ? 'Отправка...' : 'Отправить отзыв'}
                  </Button>
                </div>
              </form>
            </div>
          )}
          
          {/* Список отзывов */}
          <div className="reviews-list">
            {reviews.length === 0 ? (
              <div className="no-reviews">
                <p>Пока нет отзывов. Будьте первым, кто оставит отзыв!</p>
              </div>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <div className="review-author">{review.userName}</div>
                    <div className="review-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span 
                          key={star} 
                          className={`star ${star <= review.rating ? 'filled' : ''}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <div className="review-date">
                      {new Date(review.date).toLocaleDateString('ru-RU')}
                    </div>
                  </div>
                  <div className="review-text">{review.text}</div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Похожие товары */}
        {similarProducts.length > 0 && (
          <div className="similar-products">
            <h2 className="section-title">Похожие товары</h2>
            <div className="product-grid product-grid-4">
              {similarProducts.map(similarProduct => (
                <div key={similarProduct.id} className="product-grid-item">
                  <ProductCard product={similarProduct} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
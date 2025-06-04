import React, { useState, useEffect } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Spinner from '../components/common/Spinner';
import useAuth from '../hooks/useAuth';
import '../styles/pages/ProfilePage.css';

// Моковые данные для заказов
const mockOrders = [
  {
    id: '123456',
    date: '2025-03-15T10:30:00Z',
    status: 'delivered',
    totalAmount: 3450,
    items: [
      { id: '1', name: 'Вязаный мишка', price: 1500, quantity: 1, image: '/images/products/bear-1.jpg' },
      { id: '3', name: 'Вязаная кукла Маша', price: 2500, quantity: 1, image: '/images/products/doll-1.jpg' }
    ]
  },
  {
    id: '789012',
    date: '2025-04-05T14:20:00Z',
    status: 'processing',
    totalAmount: 1200,
    items: [
      { id: '2', name: 'Вязаный зайчик', price: 1200, quantity: 1, image: '/images/products/bunny-1.jpg' }
    ]
  }
];

// Моковые данные для адресов
const mockAddresses = [
  {
    id: '1',
    title: 'Домашний',
    firstName: 'Иван',
    lastName: 'Иванов',
    address: 'ул. Примерная, д. 10, кв. 25',
    city: 'Москва',
    postalCode: '123456',
    phone: '+7 (900) 123-45-67',
    isDefault: true
  },
  {
    id: '2',
    title: 'Рабочий',
    firstName: 'Иван',
    lastName: 'Иванов',
    address: 'ул. Деловая, д. 20, офис 301',
    city: 'Москва',
    postalCode: '654321',
    phone: '+7 (900) 765-43-21',
    isDefault: false
  }
];

const ProfilePage = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Все хуки вызываются на верхнем уровне компонента
  // Состояние для активного раздела
  const [activeSection, setActiveSection] = useState('profile');
  
  // Состояние для данных профиля
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  
  // Состояние для загрузки данных
  const [loading, setLoading] = useState(false);
  
  // Состояние для ошибок
  const [errors, setErrors] = useState({});
  
  // Состояние для отображения формы редактирования
  const [isEditing, setIsEditing] = useState(false);
  
  // Состояние для заказов
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  
  // Состояние для адресов
  const [addresses, setAddresses] = useState([]);
  const [addressesLoading, setAddressesLoading] = useState(true);
  
  // Состояние для формы адреса
  const [addressForm, setAddressForm] = useState({
    id: '',
    title: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    isDefault: false
  });
  
  // Состояние для отображения формы добавления/редактирования адреса
  const [showAddressForm, setShowAddressForm] = useState(false);
  
  // Инициализируем данные профиля на основе данных пользователя
  useEffect(() => {
    if (user) {
      const nameParts = user.name ? user.name.split(' ') : ['', ''];
      setProfileData({
        firstName: nameParts[0] || '',
        lastName: nameParts[1] || '',
        email: user.email || '',
        phone: ''
      });
    }
  }, [user]);
  
  // Загрузка заказов
  useEffect(() => {
    if (activeSection === 'orders') {
      const loadOrders = async () => {
        setOrdersLoading(true);
        try {
          // В реальном приложении здесь был бы запрос к API
          // Имитируем задержку запроса
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          setOrders(mockOrders);
        } catch (error) {
          console.error('Ошибка при загрузке заказов:', error);
        } finally {
          setOrdersLoading(false);
        }
      };
      
      loadOrders();
    }
  }, [activeSection]);
  
  // Загрузка адресов
  useEffect(() => {
    if (activeSection === 'addresses') {
      const loadAddresses = async () => {
        setAddressesLoading(true);
        try {
          // В реальном приложении здесь был бы запрос к API
          // Имитируем задержку запроса
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          setAddresses(mockAddresses);
        } catch (error) {
          console.error('Ошибка при загрузке адресов:', error);
        } finally {
          setAddressesLoading(false);
        }
      };
      
      loadAddresses();
    }
  }, [activeSection]);
  
  // Если пользователь не авторизован, перенаправляем на страницу авторизации
  if (!isAuthenticated) {
    return <Navigate to="/auth?redirect=/profile" replace />;
  }
  
  // Обработчик изменения полей формы профиля
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Валидация формы профиля
  const validateProfileForm = () => {
    const newErrors = {};
    
    if (!profileData.firstName.trim()) {
      newErrors.firstName = 'Введите имя';
    }
    
    if (!profileData.lastName.trim()) {
      newErrors.lastName = 'Введите фамилию';
    }
    
    if (!profileData.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = 'Введите корректный email';
    }
    
    if (profileData.phone && !/^\+?\d{10,15}$/.test(profileData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Введите корректный телефон';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Обработчик сохранения профиля
  const handleSaveProfile = async () => {
    if (!validateProfileForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // В реальном приложении здесь был бы запрос к API
      // Имитируем задержку запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // После успешного запроса отключаем режим редактирования
      setIsEditing(false);
      
      // Уведомляем пользователя
      alert('Профиль успешно обновлен');
    } catch (error) {
      console.error('Ошибка при сохранении профиля:', error);
      setErrors({ general: 'Произошла ошибка при сохранении профиля. Пожалуйста, попробуйте позже.' });
    } finally {
      setLoading(false);
    }
  };
  
  // Обработчик изменения полей формы адреса
  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Валидация формы адреса
  const validateAddressForm = () => {
    const newErrors = {};
    
    if (!addressForm.title.trim()) {
      newErrors.title = 'Введите название адреса';
    }
    
    if (!addressForm.firstName.trim()) {
      newErrors.firstName = 'Введите имя';
    }
    
    if (!addressForm.lastName.trim()) {
      newErrors.lastName = 'Введите фамилию';
    }
    
    if (!addressForm.address.trim()) {
      newErrors.address = 'Введите адрес';
    }
    
    if (!addressForm.city.trim()) {
      newErrors.city = 'Введите город';
    }
    
    if (!addressForm.postalCode.trim()) {
      newErrors.postalCode = 'Введите почтовый индекс';
    } else if (!/^\d{6}$/.test(addressForm.postalCode.replace(/\D/g, ''))) {
      newErrors.postalCode = 'Почтовый индекс должен содержать 6 цифр';
    }
    
    if (!addressForm.phone.trim()) {
      newErrors.phone = 'Введите телефон';
    } else if (!/^\+?\d{10,15}$/.test(addressForm.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Введите корректный телефон';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Обработчик сохранения адреса
  const handleSaveAddress = async () => {
    if (!validateAddressForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // В реальном приложении здесь был бы запрос к API
      // Имитируем задержку запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Если адрес новый, добавляем его в список
      if (!addressForm.id) {
        const newAddress = {
          ...addressForm,
          id: Date.now().toString()
        };
        
        // Если это первый адрес или он отмечен как основной, делаем его основным
        if (addressForm.isDefault || addresses.length === 0) {
          // Снимаем отметку основного адреса с других адресов
          const updatedAddresses = addresses.map(addr => ({
            ...addr,
            isDefault: false
          }));
          
          setAddresses([...updatedAddresses, newAddress]);
        } else {
          setAddresses([...addresses, newAddress]);
        }
      } else {
        // Если адрес существующий, обновляем его
        const updatedAddresses = addresses.map(addr => {
          if (addr.id === addressForm.id) {
            return addressForm;
          }
          
          // Если текущий адрес отмечен как основной, снимаем отметку с других
          if (addressForm.isDefault && addr.id !== addressForm.id) {
            return {
              ...addr,
              isDefault: false
            };
          }
          
          return addr;
        });
        
        setAddresses(updatedAddresses);
      }
      
      // Сбрасываем форму и скрываем её
      setAddressForm({
        id: '',
        title: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        phone: '',
        isDefault: false
      });
      
      setShowAddressForm(false);
      
      // Уведомляем пользователя
      alert('Адрес успешно сохранен');
    } catch (error) {
      console.error('Ошибка при сохранении адреса:', error);
      setErrors({ general: 'Произошла ошибка при сохранении адреса. Пожалуйста, попробуйте позже.' });
    } finally {
      setLoading(false);
    }
  };
  
  // Обработчик редактирования адреса
  const handleEditAddress = (address) => {
    setAddressForm(address);
    setShowAddressForm(true);
  };
  
  // Обработчик удаления адреса
  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот адрес?')) {
      return;
    }
    
    try {
      // В реальном приложении здесь был бы запрос к API
      // Имитируем задержку запроса
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Удаляем адрес из списка
      const updatedAddresses = addresses.filter(addr => addr.id !== addressId);
      
      // Если был удален основной адрес и остались другие адреса, делаем первый из них основным
      if (addresses.find(addr => addr.id === addressId)?.isDefault && updatedAddresses.length > 0) {
        updatedAddresses[0].isDefault = true;
      }
      
      setAddresses(updatedAddresses);
      
      // Уведомляем пользователя
      alert('Адрес успешно удален');
    } catch (error) {
      console.error('Ошибка при удалении адреса:', error);
      alert('Произошла ошибка при удалении адреса. Пожалуйста, попробуйте позже.');
    }
  };
  
  // Обработчик выхода из аккаунта
  const handleLogout = () => {
    if (window.confirm('Вы уверены, что хотите выйти из аккаунта?')) {
      logout();
      navigate('/');
    }
  };
  
  // Получение статуса заказа в текстовом виде
  const getOrderStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Ожидает обработки';
      case 'processing':
        return 'В обработке';
      case 'shipped':
        return 'Отправлен';
      case 'delivered':
        return 'Доставлен';
      case 'cancelled':
        return 'Отменен';
      default:
        return 'Неизвестный статус';
    }
  };
  
  // Получение класса для отображения статуса заказа
  const getOrderStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'order-status-pending';
      case 'processing':
        return 'order-status-processing';
      case 'shipped':
        return 'order-status-shipped';
      case 'delivered':
        return 'order-status-delivered';
      case 'cancelled':
        return 'order-status-cancelled';
      default:
        return '';
    }
  };
  
  // Форматирование даты заказа
  const formatOrderDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="profile-page">
      <div className="container">
        <h1 className="profile-title">Личный кабинет</h1>
        
        <div className="profile-content">
          <aside className="profile-sidebar">
            <div className="profile-user">
              <div className="profile-avatar">
                {user && user.name ? user.name.charAt(0) : '?'}
              </div>
              <div className="profile-user-info">
                <div className="profile-user-name">{user ? user.name : 'Пользователь'}</div>
                <div className="profile-user-email">{user ? user.email : ''}</div>
              </div>
            </div>
            
            <nav className="profile-nav">
              <button 
                className={`profile-nav-link ${activeSection === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveSection('profile')}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.6668 17.5V15.8333C16.6668 14.9493 16.3156 14.1014 15.6905 13.4763C15.0654 12.8512 14.2176 12.5 13.3335 12.5H6.66683C5.78277 12.5 4.93493 12.8512 4.30981 13.4763C3.68469 14.1014 3.3335 14.9493 3.3335 15.8333V17.5M13.3335 5.83333C13.3335 7.67428 11.8411 9.16667 10.0002 9.16667C8.15921 9.16667 6.66683 7.67428 6.66683 5.83333C6.66683 3.99238 8.15921 2.5 10.0002 2.5C11.8411 2.5 13.3335 3.99238 13.3335 5.83333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Профиль
              </button>
              
              <button 
                className={`profile-nav-link ${activeSection === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveSection('orders')}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.66667 5H17.5M6.66667 10H17.5M6.66667 15H17.5M2.5 5H2.50833M2.5 10H2.50833M2.5 15H2.50833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                История заказов
              </button>
              
              <button 
                className={`profile-nav-link ${activeSection === 'addresses' ? 'active' : ''}`}
                onClick={() => setActiveSection('addresses')}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5 8.33333C17.5 14.1667 10 19.1667 10 19.1667C10 19.1667 2.5 14.1667 2.5 8.33333C2.5 6.34421 3.29018 4.43655 4.6967 3.03003C6.10322 1.62351 8.01088 0.833333 10 0.833333C11.9891 0.833333 13.8968 1.62351 15.3033 3.03003C16.7098 4.43655 17.5 6.34421 17.5 8.33333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 10.8333C11.3807 10.8333 12.5 9.71405 12.5 8.33333C12.5 6.95262 11.3807 5.83333 10 5.83333C8.61929 5.83333 7.5 6.95262 7.5 8.33333C7.5 9.71405 8.61929 10.8333 10 10.8333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Адреса доставки
              </button>
              
              <button 
                className="profile-nav-link profile-nav-logout"
                onClick={handleLogout}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.3332 14.1667L17.4998 10M17.4998 10L13.3332 5.83333M17.4998 10H6.6665M6.6665 2.5H5.83317C4.94911 2.5 4.10127 2.85119 3.47615 3.47631C2.85103 4.10143 2.49984 4.94928 2.49984 5.83333V14.1667C2.49984 15.0507 2.85103 15.8986 3.47615 16.5237C4.10127 17.1488 4.94911 17.5 5.83317 17.5H6.6665" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Выйти
              </button>
            </nav>
          </aside>
          
          <div className="profile-main">
            {/* Раздел профиля */}
            {activeSection === 'profile' && (
              <div className="profile-section">
                <div className="section-header">
                  <h2 className="section-title">Персональные данные</h2>
                  
                  {!isEditing ? (
                    <Button 
                      variant="secondary" 
                      onClick={() => setIsEditing(true)}
                    >
                      Редактировать
                    </Button>
                  ) : (
                    <div className="section-header-actions">
                      <Button 
                        variant="secondary" 
                        onClick={() => setIsEditing(false)}
                        disabled={loading}
                      >
                        Отмена
                      </Button>
                      
                      <Button 
                        variant="primary" 
                        onClick={handleSaveProfile}
                        disabled={loading}
                      >
                        {loading ? 'Сохранение...' : 'Сохранить'}
                      </Button>
                    </div>
                  )}
                </div>
                
                {errors.general && (
                  <div className="form-error general-error">
                    {errors.general}
                  </div>
                )}
                
                <div className="profile-form">
                  {isEditing ? (
                    // Форма редактирования
                    <div className="profile-form-edit">
                      <div className="form-row">
                        <Input
                          label="Имя"
                          name="firstName"
                          value={profileData.firstName}
                          onChange={handleProfileChange}
                          error={errors.firstName}
                          required
                        />
                        
                        <Input
                          label="Фамилия"
                          name="lastName"
                          value={profileData.lastName}
                          onChange={handleProfileChange}
                          error={errors.lastName}
                          required
                        />
                      </div>
                      
                      <div className="form-row">
                        <Input
                          label="Email"
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleProfileChange}
                          error={errors.email}
                          required
                        />
                        
                        <Input
                          label="Телефон"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleProfileChange}
                          error={errors.phone}
                          placeholder="+7 (___) ___-__-__"
                        />
                      </div>
                    </div>
                  ) : (
                    // Отображение данных
                    <div className="profile-info">
                      <div className="info-group">
                        <div className="info-label">Имя:</div>
                        <div className="info-value">{profileData.firstName} {profileData.lastName}</div>
                      </div>
                      
                      <div className="info-group">
                        <div className="info-label">Email:</div>
                        <div className="info-value">{profileData.email}</div>
                      </div>
                      
                      {profileData.phone && (
                        <div className="info-group">
                          <div className="info-label">Телефон:</div>
                          <div className="info-value">{profileData.phone}</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="profile-security">
                  <h3 className="subsection-title">Безопасность</h3>
                  
                  <div className="profile-security-actions">
                    <Button variant="secondary">
                      Изменить пароль
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Раздел истории заказов */}
            {activeSection === 'orders' && (
              <div className="profile-section">
                <div className="section-header">
                  <h2 className="section-title">История заказов</h2>
                </div>
                
                {ordersLoading ? (
                  <div className="section-loading">
                    <Spinner />
                  </div>
                ) : orders.length === 0 ? (
                  <div className="empty-section">
                    <p>У вас пока нет заказов</p>
                    <Link to="/catalog">
                      <Button variant="primary">Перейти в каталог</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="orders-list">
                    {orders.map(order => (
                      <div key={order.id} className="order-card">
                        <div className="order-header">
                          <div className="order-header-info">
                            <div className="order-number">
                              Заказ №{order.id}
                            </div>
                            <div className="order-date">
                              от {formatOrderDate(order.date)}
                            </div>
                          </div>
                          
                          <div className={`order-status ${getOrderStatusClass(order.status)}`}>
                            {getOrderStatusText(order.status)}
                          </div>
                        </div>
                        
                        <div className="order-items">
                          {order.items.map(item => (
                            <div key={item.id} className="order-item">
                              <div className="order-item-image">
                                <img src={item.image || '/images/placeholder.jpg'} alt={item.name} />
                              </div>
                              <div className="order-item-details">
                                <div className="order-item-name">{item.name}</div>
                                <div className="order-item-price">
                                  {item.price} ₽ × {item.quantity}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="order-footer">
                          <div className="order-total">
                            Сумма заказа: <span>{order.totalAmount} ₽</span>
                          </div>
                          
                          <Link to={`/order-confirmation/${order.id}`}>
                            <Button variant="outlined" size="small">
                              Детали заказа
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Раздел адресов доставки */}
            {activeSection === 'addresses' && (
              <div className="profile-section">
                <div className="section-header">
                  <h2 className="section-title">Адреса доставки</h2>
                  
                  {!showAddressForm && (
                    <Button 
                      variant="primary" 
                      onClick={() => {
                        setAddressForm({
                          id: '',
                          title: '',
                          firstName: '',
                          lastName: '',
                          address: '',
                          city: '',
                          postalCode: '',
                          phone: '',
                          isDefault: addresses.length === 0
                        });
                        setShowAddressForm(true);
                      }}
                    >
                      Добавить адрес
                    </Button>
                  )}
                </div>
                
                {errors.general && (
                  <div className="form-error general-error">
                    {errors.general}
                  </div>
                )}
                
                {showAddressForm ? (
                  <div className="address-form-container">
                    <h3 className="subsection-title">
                      {addressForm.id ? 'Редактирование адреса' : 'Новый адрес'}
                    </h3>
                    
                    <div className="address-form">
                      <div className="form-row">
                        <Input
                          label="Название адреса"
                          name="title"
                          value={addressForm.title}
                          onChange={handleAddressChange}
                          error={errors.title}
                          placeholder="Например: Дом, Работа"
                          required
                        />
                      </div>
                      
                      <div className="form-row">
                        <Input
                          label="Имя"
                          name="firstName"
                          value={addressForm.firstName}
                          onChange={handleAddressChange}
                          error={errors.firstName}
                          required
                        />
                        
                        <Input
                          label="Фамилия"
                          name="lastName"
                          value={addressForm.lastName}
                          onChange={handleAddressChange}
                          error={errors.lastName}
                          required
                        />
                      </div>
                      
                      <div className="form-row">
                        <Input
                          label="Адрес"
                          name="address"
                          value={addressForm.address}
                          onChange={handleAddressChange}
                          error={errors.address}
                          required
                        />
                      </div>
                      
                      <div className="form-row">
                        <Input
                          label="Город"
                          name="city"
                          value={addressForm.city}
                          onChange={handleAddressChange}
                          error={errors.city}
                          required
                        />
                        
                        <Input
                          label="Почтовый индекс"
                          name="postalCode"
                          value={addressForm.postalCode}
                          onChange={handleAddressChange}
                          error={errors.postalCode}
                          required
                        />
                      </div>
                      
                      <div className="form-row">
                        <Input
                          label="Телефон"
                          name="phone"
                          value={addressForm.phone}
                          onChange={handleAddressChange}
                          error={errors.phone}
                          placeholder="+7 (___) ___-__-__"
                          required
                        />
                      </div>
                      
                      <div className="form-checkbox">
                        <label>
                          <input
                            type="checkbox"
                            name="isDefault"
                            checked={addressForm.isDefault}
                            onChange={handleAddressChange}
                          />
                          <span>Использовать как адрес по умолчанию</span>
                        </label>
                      </div>
                      
                      <div className="address-form-actions">
                        <Button 
                          variant="secondary" 
                          onClick={() => setShowAddressForm(false)}
                          disabled={loading}
                        >
                          Отмена
                        </Button>
                        
                        <Button 
                          variant="primary" 
                          onClick={handleSaveAddress}
                          disabled={loading}
                        >
                          {loading ? 'Сохранение...' : 'Сохранить'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : addressesLoading ? (
                  <div className="section-loading">
                    <Spinner />
                  </div>
                ) : addresses.length === 0 ? (
                  <div className="empty-section">
                    <p>У вас пока нет сохраненных адресов</p>
                  </div>
                ) : (
                  <div className="addresses-list">
                    {addresses.map(address => (
                      <div key={address.id} className={`address-card ${address.isDefault ? 'default' : ''}`}>
                        {address.isDefault && (
                          <div className="address-default-badge">
                            По умолчанию
                          </div>
                        )}
                        
                        <div className="address-card-header">
                          <h3 className="address-title">{address.title}</h3>
                          
                          <div className="address-actions">
                            <button 
                              className="address-action" 
                              onClick={() => handleEditAddress(address)}
                              aria-label="Редактировать"
                            >
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.25 3.75H3.75C3.35218 3.75 2.97064 3.90804 2.68934 4.18934C2.40804 4.47064 2.25 4.85218 2.25 5.25V14.25C2.25 14.6478 2.40804 15.0294 2.68934 15.3107C2.97064 15.592 3.35218 15.75 3.75 15.75H12.75C13.1478 15.75 13.5294 15.592 13.8107 15.3107C14.092 15.0294 14.25 14.6478 14.25 14.25V9.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M13.125 2.62501C13.4234 2.32664 13.8359 2.16064 14.25 2.16064C14.6641 2.16064 15.0766 2.32664 15.375 2.62501C15.6734 2.92338 15.8394 3.33589 15.8394 3.75001C15.8394 4.16413 15.6734 4.57664 15.375 4.87501L9 11.25L6 12L6.75 9.00001L13.125 2.62501Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                            
                            <button 
                              className="address-action" 
                              onClick={() => handleDeleteAddress(address.id)}
                              aria-label="Удалить"
                            >
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.25 4.5H3.75H15.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M6 4.5V3C6 2.60218 6.15804 2.22064 6.43934 1.93934C6.72064 1.65804 7.10218 1.5 7.5 1.5H10.5C10.8978 1.5 11.2794 1.65804 11.5607 1.93934C11.842 2.22064 12 2.60218 12 3V4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M14.25 4.5V15C14.25 15.3978 14.092 15.7794 13.8107 16.0607C13.5294 16.342 13.1478 16.5 12.75 16.5H5.25C4.85218 16.5 4.47064 16.342 4.18934 16.0607C3.90804 15.7794 3.75 15.3978 3.75 15V4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                        
                        <div className="address-card-content">
                          <div className="address-recipient">
                            {address.firstName} {address.lastName}
                          </div>
                          
                          <div className="address-details">
                            {address.address}, {address.city}, {address.postalCode}
                          </div>
                          
                          <div className="address-phone">
                            {address.phone}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
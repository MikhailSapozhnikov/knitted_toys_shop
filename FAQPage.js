import React, { useState } from 'react';
import '../styles/pages/FAQPage.css';

const FAQPage = () => {
  // Состояние для отслеживания открытых вопросов
  const [openItems, setOpenItems] = useState({});
  
  // Категории вопросов
  const categories = [
    {
      id: 'orders',
      name: 'Заказы и доставка',
      questions: [
        {
          id: 'order-1',
          question: 'Как оформить заказ?',
          answer: 'Чтобы оформить заказ, выберите понравившийся товар, добавьте его в корзину, перейдите в корзину и нажмите кнопку "Оформить заказ". Далее следуйте инструкциям по заполнению контактной информации и выбору способа доставки и оплаты.'
        },
        {
          id: 'order-2',
          question: 'Какие способы доставки вы предлагаете?',
          answer: 'Мы предлагаем несколько способов доставки: курьерская доставка (300 ₽), Почта России (250 ₽) и самовывоз (бесплатно) из нашего магазина по адресу: г. Москва, ул. Вязальная, д. 10.'
        },
        {
          id: 'order-3',
          question: 'Сколько времени занимает доставка?',
          answer: 'Сроки доставки зависят от выбранного способа: курьерская доставка занимает 1-3 дня, доставка Почтой России - 5-7 дней. При самовывозе вы можете забрать заказ в день оформления или на следующий день, в зависимости от наличия товара на складе.'
        },
        {
          id: 'order-4',
          question: 'Как отследить статус заказа?',
          answer: 'Вы можете отслеживать статус заказа в личном кабинете на нашем сайте. Также мы отправляем уведомления о смене статуса заказа на указанный при оформлении email.'
        }
      ]
    },
    {
      id: 'payment',
      name: 'Оплата',
      questions: [
        {
          id: 'payment-1',
          question: 'Какие способы оплаты вы принимаете?',
          answer: 'Мы принимаем оплату банковскими картами Visa, MasterCard, МИР через безопасный платежный шлюз, а также наличными при получении заказа (для доставки курьером или самовывоза).'
        },
        {
          id: 'payment-2',
          question: 'Когда нужно производить оплату заказа?',
          answer: 'При оплате банковской картой на сайте, средства списываются сразу после оформления заказа. При оплате наличными, вы оплачиваете заказ в момент получения.'
        },
        {
          id: 'payment-3',
          question: 'Можно ли оплатить заказ по частям?',
          answer: 'К сожалению, частичная оплата заказа не предусмотрена. Вы можете оплатить заказ полностью одним из доступных способов.'
        }
      ]
    },
    {
      id: 'returns',
      name: 'Возврат и обмен',
      questions: [
        {
          id: 'returns-1',
          question: 'Какие условия возврата товара?',
          answer: 'Вы можете вернуть товар надлежащего качества в течение 14 дней с момента получения, если товар не был в употреблении, сохранены его товарный вид, потребительские свойства, пломбы, фабричные ярлыки и оригинальная упаковка.'
        },
        {
          id: 'returns-2',
          question: 'Как вернуть товар?',
          answer: 'Для возврата товара необходимо связаться с нашим отделом обслуживания клиентов по телефону или email, заполнить заявление на возврат и отправить товар на наш адрес. После получения и проверки товара, мы вернем вам деньги тем же способом, которым был оплачен заказ.'
        },
        {
          id: 'returns-3',
          question: 'Возможен ли обмен товара?',
          answer: 'Да, вы можете обменять товар на аналогичный или другой при наличии разницы в цене. Для этого свяжитесь с нашим отделом обслуживания клиентов.'
        }
      ]
    },
    {
      id: 'products',
      name: 'Товары и материалы',
      questions: [
        {
          id: 'products-1',
          question: 'Из каких материалов изготовлены ваши игрушки?',
          answer: 'Мы используем высококачественную пряжу из хлопка, акрила и шерсти, в зависимости от типа игрушки. Наполнитель - гипоаллергенный холлофайбер. Все материалы безопасны для детей и проходят тщательный контроль качества.'
        },
        {
          id: 'products-2',
          question: 'Как ухаживать за вязаными игрушками?',
          answer: 'Рекомендуется бережная ручная стирка в теплой воде с мягким моющим средством. Не используйте отбеливатель и стиральную машину. Сушите игрушки в горизонтальном положении, избегая прямых солнечных лучей. Не отжимайте и не выкручивайте.'
        },
        {
          id: 'products-3',
          question: 'Безопасны ли ваши игрушки для маленьких детей?',
          answer: 'Наши игрушки изготавливаются из безопасных, гипоаллергенных материалов. Однако мы не рекомендуем давать мелкие игрушки или игрушки с мелкими деталями детям до 3 лет без присмотра взрослых, так как существует риск проглатывания мелких частей.'
        },
        {
          id: 'products-4',
          question: 'Можно ли заказать игрушку по индивидуальному дизайну?',
          answer: 'Да, мы принимаем заказы на изготовление игрушек по индивидуальному дизайну. Для этого напишите нам на email или свяжитесь через форму обратной связи на странице "Контакты", указав все детали вашего заказа.'
        }
      ]
    },
    {
      id: 'other',
      name: 'Другие вопросы',
      questions: [
        {
          id: 'other-1',
          question: 'Как связаться с вашей службой поддержки?',
          answer: 'Вы можете связаться с нами по телефону +7 (900) 123-45-67 с понедельника по пятницу с 9:00 до 18:00, по email info@knittedtoys.ru или через форму обратной связи на странице "Контакты".'
        },
        {
          id: 'other-2',
          question: 'Есть ли у вас физический магазин?',
          answer: 'Да, у нас есть шоурум по адресу: г. Москва, ул. Вязальная, д. 10. Мы открыты с понедельника по субботу с 10:00 до 20:00. Воскресенье - выходной.'
        },
        {
          id: 'other-3',
          question: 'Проводите ли вы мастер-классы по вязанию?',
          answer: 'Да, мы регулярно проводим мастер-классы по вязанию игрушек. Расписание мастер-классов публикуется в нашем Instagram и на странице "Новости" на сайте. Также вы можете подписаться на нашу рассылку, чтобы первыми узнавать о новых мероприятиях.'
        }
      ]
    }
  ];
  
  // Обработчик переключения состояния вопроса (открыт/закрыт)
  const toggleQuestion = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Состояние для поиска
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Обработчик изменения поискового запроса
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim().length > 2) {
      setIsSearching(true);
      
      // Собираем все вопросы из всех категорий
      const allQuestions = categories.flatMap(category => 
        category.questions.map(q => ({
          ...q,
          categoryName: category.name
        }))
      );
      
      // Фильтруем вопросы по поисковому запросу
      const filteredQuestions = allQuestions.filter(q => 
        q.question.toLowerCase().includes(query.toLowerCase()) || 
        q.answer.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(filteredQuestions);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };
  
  // Очистка поискового запроса
  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    setSearchResults([]);
  };

  return (
    <div className="faq-page">
      <div className="container">
        <h1 className="faq-title">Часто задаваемые вопросы</h1>
        
        <div className="faq-search">
          <div className="search-container">
            <input
              type="text"
              placeholder="Поиск по вопросам..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            {searchQuery && (
              <button className="search-clear" onClick={clearSearch}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
            <div className="search-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5 17.5L12.5 12.5M14.1667 8.33333C14.1667 11.555 11.555 14.1667 8.33333 14.1667C5.11167 14.1667 2.5 11.555 2.5 8.33333C2.5 5.11167 5.11167 2.5 8.33333 2.5C11.555 2.5 14.1667 5.11167 14.1667 8.33333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        
        {isSearching ? (
          <div className="faq-search-results">
            <h2 className="search-results-title">
              {searchResults.length > 0 
                ? `Найдено результатов: ${searchResults.length}` 
                : 'По вашему запросу ничего не найдено'}
            </h2>
            
            {searchResults.length > 0 && (
              <div className="search-results-list">
                {searchResults.map(result => (
                  <div key={result.id} className="search-result-item">
                    <div 
                      className={`faq-question ${openItems[result.id] ? 'active' : ''}`}
                      onClick={() => toggleQuestion(result.id)}
                    >
                      <h3>{result.question}</h3>
                      <div className="question-category">{result.categoryName}</div>
                      <div className="question-toggle">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    <div className={`faq-answer ${openItems[result.id] ? 'active' : ''}`}>
                      <p>{result.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <button className="search-back-button" onClick={clearSearch}>
              Вернуться к категориям
            </button>
          </div>
        ) : (
          <div className="faq-categories">
            {categories.map(category => (
              <div key={category.id} className="faq-category">
                <h2 className="category-title">{category.name}</h2>
                
                <div className="faq-questions">
                  {category.questions.map(question => (
                    <div key={question.id} className="faq-item">
                      <div 
                        className={`faq-question ${openItems[question.id] ? 'active' : ''}`}
                        onClick={() => toggleQuestion(question.id)}
                      >
                        <h3>{question.question}</h3>
                        <div className="question-toggle">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                      <div className={`faq-answer ${openItems[question.id] ? 'active' : ''}`}>
                        <p>{question.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="faq-contact">
          <h2 className="contact-title">Не нашли ответ на свой вопрос?</h2>
          <p>Свяжитесь с нами через форму обратной связи или по телефону +7 (900) 123-45-67</p>
          <a href="/contact" className="contact-link">Связаться с нами</a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
import React from 'react';
import '../styles/pages/AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="container">
        <h1 className="about-title">О нас</h1>
        
        <div className="about-banner">
          <div className="about-banner-content">
            <h2 className="banner-title">Вязаные игрушки с любовью и заботой</h2>
            <p className="banner-text">
              Мы создаем уникальные вязаные игрушки, вкладывая в каждую частичку души. 
              Наше ремесло — это не просто работа, а настоящее искусство, которое мы рады разделить с вами.
            </p>
          </div>
        </div>
        
        <section className="about-section">
          <h2 className="section-title">Наша история</h2>
          
          <div className="about-history">
            <div className="about-history-image">
              <img src="/images/about/history.jpg" alt="История нашего магазина" />
            </div>
            
            <div className="about-history-content">
              <p>
                Наша история началась в 2018 году, когда основательница Анна Морозова решила 
                превратить свое хобби в нечто большее. Анна с детства любила рукоделие, 
                особенно вязание крючком и спицами.
              </p>
              <p>
                Первая игрушка — маленький медвежонок — была связана для племянницы Анны. 
                Увидев восторг в глазах ребенка, она поняла, что вязаные игрушки приносят 
                не просто радость, но и особое тепло, которого так не хватает в современных 
                пластиковых игрушках.
              </p>
              <p>
                Начав с небольших заказов для друзей и знакомых, Анна постепенно расширила 
                ассортимент и собрала команду талантливых мастериц. Так родился наш 
                интернет-магазин вязаных игрушек.
              </p>
              <p>
                Сегодня мы — это небольшая, но дружная команда из 8 мастериц, объединенных 
                любовью к рукоделию и созданию уникальных игрушек, которые станут верными 
                друзьями для детей и стильным элементом декора для взрослых.
              </p>
            </div>
          </div>
        </section>
        
        <section className="about-section">
          <h2 className="section-title">Наши ценности</h2>
          
          <div className="about-values">
            <div className="value-card">
              <div className="value-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="#9c6644" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M24 12L26.47 19.5H34.5L28 24L30.5 31.5L24 27L17.5 31.5L20 24L13.5 19.5H21.5L24 12Z" fill="#9c6644" stroke="#9c6644" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="value-title">Качество превыше всего</h3>
              <p className="value-description">
                Мы используем только высококачественные материалы, которые безопасны для детей и прослужат долгие годы.
              </p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="#9c6644" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 24H32" stroke="#9c6644" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M24 16V32" stroke="#9c6644" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="value-title">Уникальность в каждой игрушке</h3>
              <p className="value-description">
                Каждая наша игрушка уникальна и создается вручную с вниманием к деталям, делая её по-настоящему особенной.
              </p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M33 18C33 13.0294 28.9706 9 24 9C19.0294 9 15 13.0294 15 18C15 22.9706 19.0294 27 24 27" stroke="#9c6644" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M24 27C28.9706 27 33 31.0294 33 36C33 40.9706 28.9706 45 24 45C19.0294 45 15 40.9706 15 36" stroke="#9c6644" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M24 9C28.9706 9 33 4.97059 33 3" stroke="#9c6644" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 3C15 4.97059 19.0294 9 24 9" stroke="#9c6644" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 36C10.0294 36 6 31.9706 6 27C6 22.0294 10.0294 18 15 18" stroke="#9c6644" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M33 18C37.9706 18 42 22.0294 42 27C42 31.9706 37.9706 36 33 36" stroke="#9c6644" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="value-title">Экологичность</h3>
              <p className="value-description">
                Мы заботимся о планете, используя натуральные материалы и минимизируя отходы при производстве.
              </p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M32 12V36C32 37.0609 31.5786 38.0783 30.8284 38.8284C30.0783 39.5786 29.0609 40 28 40H12C10.9391 40 9.92172 39.5786 9.17157 38.8284C8.42143 38.0783 8 37.0609 8 36V16C8 14.9391 8.42143 13.9217 9.17157 13.1716C9.92172 12.4214 10.9391 12 12 12H32ZM32 12H38C39.0609 12 40.0783 12.4214 40.8284 13.1716C41.5786 13.9217 42 14.9391 42 16V32C42 33.0609 41.5786 34.0783 40.8284 34.8284C40.0783 35.5786 39.0609 36 38 36H32" stroke="#9c6644" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="value-title">Доступность</h3>
              <p className="value-description">
                Мы стремимся сделать наши игрушки доступными для каждого, сохраняя баланс между качеством и ценой.
              </p>
            </div>
          </div>
        </section>
        
        <section className="about-section">
          <h2 className="section-title">Процесс изготовления</h2>
          
          <div className="about-process">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3 className="step-title">Разработка дизайна</h3>
                <p className="step-description">
                  Каждая игрушка начинается с идеи. Наши дизайнеры создают эскизы будущих игрушек, 
                  продумывая каждую деталь - от формы до выразительности мордочки.
                </p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3 className="step-title">Подбор материалов</h3>
                <p className="step-description">
                  Мы тщательно выбираем пряжу и наполнители, учитывая мягкость, гипоаллергенность 
                  и безопасность материалов. Предпочтение отдаем натуральным волокнам.
                </p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3 className="step-title">Вязание</h3>
                <p className="step-description">
                  Самый длительный и трудоемкий этап. Наши мастерицы вручную вяжут каждую деталь 
                  игрушки, вкладывая в работу свои умения и любовь к делу.
                </p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3 className="step-title">Сборка и оформление</h3>
                <p className="step-description">
                  Детали игрушки соединяются вместе, наполняются специальным гипоаллергенным 
                  наполнителем, а затем оформляются: вышиваются глазки, носик, украшаются одеждой или аксессуарами.
                </p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h3 className="step-title">Контроль качества</h3>
                <p className="step-description">
                  Каждая игрушка проходит тщательную проверку качества. Мы убеждаемся, что все 
                  детали надежно закреплены, а игрушка полностью соответствует нашим стандартам.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="about-section">
          <h2 className="section-title">Наша команда</h2>
          
          <div className="about-team">
            <div className="team-member">
              <div className="team-member-image">
                <img src="/images/about/team1.jpg" alt="Анна Морозова" />
              </div>
              <h3 className="team-member-name">Анна Морозова</h3>
              <p className="team-member-role">Основатель и ведущий дизайнер</p>
              <p className="team-member-description">
                Создательница бренда и главный идейный вдохновитель. Более 10 лет опыта вязания и дизайна игрушек.
              </p>
            </div>
            
            <div className="team-member">
              <div className="team-member-image">
                <img src="/images/about/team2.jpg" alt="Елена Соколова" />
              </div>
              <h3 className="team-member-name">Елена Соколова</h3>
              <p className="team-member-role">Ведущий мастер</p>
              <p className="team-member-description">
                Специализируется на создании самых сложных и детализированных игрушек. В команде с первого дня основания.
              </p>
            </div>
            
            <div className="team-member">
              <div className="team-member-image">
                <img src="/images/about/team3.jpg" alt="Марина Волкова" />
              </div>
              <h3 className="team-member-name">Марина Волкова</h3>
              <p className="team-member-role">Дизайнер-конструктор</p>
              <p className="team-member-description">
                Разрабатывает выкройки и схемы вязания. Внедряет новые техники и подходы к созданию игрушек.
              </p>
            </div>
            
            <div className="team-member">
              <div className="team-member-image">
                <img src="/images/about/team4.jpg" alt="Сергей Иванов" />
              </div>
              <h3 className="team-member-name">Сергей Иванов</h3>
              <p className="team-member-role">Менеджер по продажам</p>
              <p className="team-member-description">
                Отвечает за работу с клиентами и организацию доставки. Всегда готов помочь с выбором идеальной игрушки.
              </p>
            </div>
          </div>
        </section>
        
        <section className="about-section">
          <h2 className="section-title">Галерея нашей мастерской</h2>
          
          <div className="about-gallery">
            <div className="gallery-image">
              <img src="/images/about/gallery1.jpg" alt="Наша мастерская" />
            </div>
            <div className="gallery-image">
              <img src="/images/about/gallery2.jpg" alt="Процесс вязания" />
            </div>
            <div className="gallery-image">
              <img src="/images/about/gallery3.jpg" alt="Материалы для вязания" />
            </div>
            <div className="gallery-image">
              <img src="/images/about/gallery4.jpg" alt="Готовые игрушки" />
            </div>
            <div className="gallery-image">
              <img src="/images/about/gallery5.jpg" alt="Упаковка заказов" />
            </div>
            <div className="gallery-image">
              <img src="/images/about/gallery6.jpg" alt="Наша команда за работой" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
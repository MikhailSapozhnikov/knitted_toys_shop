import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="page-container not-found-page">
      <h1>404</h1>
      <h2>Страница не найдена</h2>
      <p>Запрашиваемая страница не существует или была удалена.</p>
      <Link to="/" className="btn btn-primary">Вернуться на главную</Link>
    </div>
  );
};

export default NotFoundPage;
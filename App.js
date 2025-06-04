import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import AuthProvider from './context/AuthContext';
import CartProvider from './context/CartContext';
import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
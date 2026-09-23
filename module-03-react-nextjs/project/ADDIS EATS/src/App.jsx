
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './features/home/Home';
import Menu from './features/menu/Menu';
import DishDetail from './features/menu/DishDetail';
import Cart from './features/cart/Cart';
import Checkout from './features/checkout/Checkout';
import Favorites from './features/favorites/Favorites';
import OrderHistory from './features/orders/OrderHistory';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';

export default function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="menu" element={<Menu />} />
              <Route path="menu/:id" element={<DishDetail />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="orders" element={<OrderHistory />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </CartProvider>
  );
}
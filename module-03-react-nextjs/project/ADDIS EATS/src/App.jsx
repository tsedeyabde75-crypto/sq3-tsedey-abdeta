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
import Login from './features/auth/Login';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import RequireAuth from './components/RequireAuth';

import { AdminAuthProvider } from './admin/useAdminAuth';
import RequireAdmin from './admin/RequireAdmin';
import AdminLayout from './admin/AdminLayout';
import AdminLogin from './admin/AdminLogin';
import Dashboard from './admin/Dashboard';
import DishManager from './admin/DishManager';
import OrderManager from './admin/OrderManager';

export default function App() {
  return (
    <AdminAuthProvider>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="menu" element={<Menu />} />
                  <Route path="menu/:slug" element={<DishDetail />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="login" element={<Login />} />

                  {/* Protected Checkout Route */}
                  <Route element={<RequireAuth />}>
                    <Route path="checkout" element={<Checkout />} />
                  </Route>

                  <Route path="favorites" element={<Favorites />} />
                  <Route path="orders" element={<OrderHistory />} />
                </Route>

                <Route path="/admin/login" element={<AdminLogin />} />

                <Route element={<RequireAdmin />}>
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="menu" element={<DishManager />} />
                    <Route path="orders" element={<OrderManager />} />
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </AdminAuthProvider>
  );
}
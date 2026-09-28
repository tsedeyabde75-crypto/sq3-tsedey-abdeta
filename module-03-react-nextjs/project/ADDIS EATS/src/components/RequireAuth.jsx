import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function RequireAuth() {
  const { isAuthenticated } = useAuth();
  const { cart } = useCart();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!cart || cart.length === 0) {
    return <Navigate to="/menu" replace />;
  }

  return <Outlet />;
}
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAdminAuth } from './useAdminAuth';

export default function RequireAdmin() {
  const { isAdmin } = useAdminAuth();

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
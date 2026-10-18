'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = sessionStorage.getItem('addis_eats_admin');
    if (session === 'true') {
      setIsAdminLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    if (email.toLowerCase().trim() === 'admin@addiseats.com' && password === 'admin123') {
      sessionStorage.setItem('addis_eats_admin', 'true');
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('addis_eats_admin');
    setIsAdminLoggedIn(false);
  };

  return (
    <AdminContext.Provider value={{ isAdminLoggedIn, isLoading, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
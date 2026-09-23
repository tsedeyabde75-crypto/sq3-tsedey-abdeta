import React, { createContext, useContext, useState } from 'react';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem('addis_admin_session') === 'true';
  });

  const login = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      sessionStorage.setItem('addis_admin_session', 'true');
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('addis_admin_session');
    setIsAdmin(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
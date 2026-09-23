import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAdminAuth } from './useAdminAuth';

export default function AdminLayout() {
  const { logout } = useAdminAuth();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <aside
        style={{
          width: '220px',
          padding: '1.5rem',
          borderRight: '1px solid #e5e7eb',
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <h2 style={{ color: '#d97706', fontSize: '1.25rem', marginBottom: '2rem' }}>
            Admin Portal
          </h2>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <NavLink
              to="/admin"
              end
              style={({ isActive }) => ({
                color: isActive ? '#d97706' : '#374151',
                fontWeight: isActive ? 'bold' : 'normal',
                textDecoration: 'none',
                padding: '0.5rem 0'
              })}
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/admin/menu"
              style={({ isActive }) => ({
                color: isActive ? '#d97706' : '#374151',
                fontWeight: isActive ? 'bold' : 'normal',
                textDecoration: 'none',
                padding: '0.5rem 0'
              })}
            >
              Dish Manager
            </NavLink>

            <NavLink
              to="/admin/orders"
              style={({ isActive }) => ({
                color: isActive ? '#d97706' : '#374151',
                fontWeight: isActive ? 'bold' : 'normal',
                textDecoration: 'none',
                padding: '0.5rem 0'
              })}
            >
              Order Manager
            </NavLink>
          </nav>
        </div>

        <button
          onClick={logout}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: '1px solid #ef4444',
            background: 'transparent',
            color: '#ef4444',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          Logout
        </button>
      </aside>

      <main style={{ flex: 1, padding: '2rem', backgroundColor: '#ffffff' }}>
        <Outlet />
      </main>
    </div>
  );
}
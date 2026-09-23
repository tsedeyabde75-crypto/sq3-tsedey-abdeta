import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAdminAuth } from './useAdminAuth';

export default function AdminLayout() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '80vh', maxWidth: '1200px', margin: '0 auto' }}>
      <aside style={{ width: '220px', borderRight: '1px solid var(--border-color)', padding: '1.5rem 1rem' }}>
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--brand-orange)' }}>Admin Portal</h3>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <NavLink to="/admin" end className="nav-item">Dashboard</NavLink>
          <button onClick={handleLogout} className="clear-cart-btn" style={{ marginTop: '2rem', textAlign: 'left' }}>
            Logout
          </button>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '1.5rem 2rem' }}>
        <Outlet />
      </main>
    </div>
  );
}
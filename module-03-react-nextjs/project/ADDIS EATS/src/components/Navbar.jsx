import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <div className="navbar-brand">
          ADDIS <span className="brand-accent">EATS 🍲</span>
        </div>

        <nav className="navbar-links">
          <NavLink to="/" className="nav-item">Home</NavLink>
          <NavLink to="/menu" className="nav-item">Menu</NavLink>
          <NavLink to="/favorites" className="nav-item">Favorites</NavLink>
          <NavLink to="/orders" className="nav-item">Orders</NavLink>

          <NavLink to="/cart" className="nav-item cart-link">
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="cart-badge">
                {totalItems}
              </span>
            )}
          </NavLink>

          <NavLink to="/checkout" className="nav-item">Checkout</NavLink>

          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '0.5rem' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-color, #374151)' }}>
                Hi, {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="nav-item"
                style={{
                  padding: '0.25rem 0.5rem',
                  fontSize: '0.85rem',
                  border: '1px solid #ef4444',
                  color: '#ef4444',
                  backgroundColor: 'transparent',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="nav-item">
              Sign In
            </NavLink>
          )}

          <button 
            onClick={toggleTheme} 
            className="theme-toggle-btn"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </nav>
      </div>
    </header>
  );
}
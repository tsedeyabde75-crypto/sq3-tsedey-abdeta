import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();

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
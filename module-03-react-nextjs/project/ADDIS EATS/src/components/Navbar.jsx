import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { totalItemsCount } = useCart();

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <NavLink to="/" className="navbar-brand">
          <span className="brand-icon">🍲</span>
          <span className="brand-title">
            ADDIS <span className="brand-accent">EATS</span>
          </span>
        </NavLink>

        <nav className="navbar-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            Home
          </NavLink>
          <NavLink to="/menu" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            Menu
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => (isActive ? 'nav-item active cart-link' : 'nav-item cart-link')}>
            Cart
            {totalItemsCount > 0 && <span className="cart-badge">{totalItemsCount}</span>}
          </NavLink>
          <NavLink to="/checkout" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            Checkout
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
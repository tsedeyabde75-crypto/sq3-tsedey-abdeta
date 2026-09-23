import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Layout.css';

export default function Layout() {
  const { totalItems } = useCart();

  const getNavLinkClass = ({ isActive }) => 
    isActive ? 'nav-link active' : 'nav-link';

  const safeItemCount = typeof totalItems === 'number' && !isNaN(totalItems) ? totalItems : 0;

  return (
    <div className="layout-wrapper">
      <header className="main-header">
        <div className="nav-container">
          <Link to="/" className="logo">
            ADDIS EATS 🍲
          </Link>
          
          <nav className="main-nav">
            <NavLink to="/" className={getNavLinkClass} end>Home</NavLink>
            <NavLink to="/menu" className={getNavLinkClass}>Menu</NavLink>
            <NavLink to="/favorites" className={getNavLinkClass}>Favorites</NavLink>
            <NavLink to="/orders" className={getNavLinkClass}>Orders</NavLink>
            
            <NavLink to="/cart" className={getNavLinkClass} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <span>Cart</span>
              {safeItemCount > 0 && (
                <span
                  style={{
                    backgroundColor: '#d97706',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: '1',
                  }}
                >
                  {safeItemCount}
                </span>
              )}
            </NavLink>

            <NavLink to="/checkout" className={getNavLinkClass}>Checkout</NavLink>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="main-footer">
        <p>© {new Date().getFullYear()} Addis Eats. Built for CodeOps Module 3 Capstone.</p>
      </footer>
    </div>
  );
}
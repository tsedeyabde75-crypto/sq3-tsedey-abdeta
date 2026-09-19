import { NavLink, Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🍲</span>
          <span className="brand-title">ADDIS <span className="brand-accent">EATS</span></span>
        </Link>

        <nav className="navbar-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            Home
          </NavLink>
          <NavLink to="/menu" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            Menu
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            Cart
          </NavLink>
          <NavLink to="/checkout" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            Checkout
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
import { Link, NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  const getNavLinkClass = ({ isActive }) => 
    isActive ? 'nav-link active' : 'nav-link';

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
            <NavLink to="/cart" className={getNavLinkClass}>Cart</NavLink>
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
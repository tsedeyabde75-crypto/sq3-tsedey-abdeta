import { useContext } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Layout() {
  const { cart } = useContext(CartContext);
  const cartCount = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;

  return (
    <div className="app-container">
      <header className="header">
        <Link to="/" className="brand-logo">
          Addis Eats
        </Link>
        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active-link" : "")}>
            Home
          </NavLink>
          <NavLink to="/menu" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Menu
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Cart ({cartCount})
          </NavLink>
          <NavLink to="/checkout" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Checkout
          </NavLink>
        </nav>
      </header>

      <main className="content-area">
        <Outlet />
      </main>

      <footer className="footer">
        <p>&copy; 2026 Addis Eats. Authentic Ethiopian Cuisine.</p>
      </footer>
    </div>
  );
}
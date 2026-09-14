import { Outlet, NavLink } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

export default function Layout() {
  const cartCount = useCartStore((s) =>
    s.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <>
      <header>
        <nav>
          <NavLink to="/" className={({ isActive }) => (isActive ? "on" : "")}>
            Home
          </NavLink>
          <NavLink to="/menu" className={({ isActive }) => (isActive ? "on" : "")}>
            Menu
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => (isActive ? "on" : "")}>
            Cart ({cartCount})
          </NavLink>
          <NavLink to="/checkout" className={({ isActive }) => (isActive ? "on" : "")}>
            Checkout
          </NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>&copy; 2026 Addis Eats. Authentic Ethiopian Cuisine.</p>
      </footer>
    </>
  );
}
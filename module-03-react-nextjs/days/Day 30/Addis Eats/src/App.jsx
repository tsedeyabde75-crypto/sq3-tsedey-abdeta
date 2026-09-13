import { CartProvider } from "./context/CartContext";
import CartBadge from "./components/CartBadge";
import Menu from "./components/Menu";
import CheckoutPanel from "./components/CheckoutPanel";

export default function App() {
  return (
    <CartProvider>
      <div className="app-container">
        <header className="app-header">
          <div>
            <h1>Addis Eats</h1>
            <p>Order great food across Addis Ababa.</p>
          </div>
          <CartBadge />
        </header>

        <main className="main-layout">
          <Menu />
          <CheckoutPanel />
        </main>
      </div>
    </CartProvider>
  );
}
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, dispatch } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h2>Your Cart</h2>
        <p>Your cart is empty.</p>
        <Link to="/menu">Go back to menu</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <ul className="cart-list">
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <span>{item.name} x {item.quantity}</span>
            <span>{item.price * item.quantity} ETB</span>
            <button onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <h3>Total: {total} ETB</h3>
      <Link to="/checkout" className="btn-primary">
        Proceed to Checkout
      </Link>
    </div>
  );
}
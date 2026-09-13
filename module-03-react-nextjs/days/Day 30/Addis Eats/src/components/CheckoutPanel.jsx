import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CheckoutPanel() {
  const { items, dispatch, total } = useContext(CartContext);

  if (items.length === 0) {
    return (
      <aside className="checkout-panel">
        <h3>Your Order</h3>
        <p>Your cart is empty.</p>
      </aside>
    );
  }

  return (
    <aside className="checkout-panel">
      <h3>Your Order</h3>
      <ul>
        {items.map((item, index) => (
          <li key={`${item.id}-${index}`}>
            <span>{item.name} - {item.price} ETB</span>
            <button
              onClick={() => dispatch({ type: "remove", id: item.id })}
              className="remove-btn"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <h4>Total Order: {total} ETB</h4>
      <button onClick={() => dispatch({ type: "clear" })} className="clear-btn">
        Clear Cart
      </button>
    </aside>
  );
}
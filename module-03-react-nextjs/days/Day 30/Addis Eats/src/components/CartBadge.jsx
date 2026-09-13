import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartBadge() {
  const { items } = useContext(CartContext);

  return (
    <div className="cart-badge">
      🛒 Cart ({items.length})
    </div>
  );
}
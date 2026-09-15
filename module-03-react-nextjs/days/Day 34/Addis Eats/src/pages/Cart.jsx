import { useCartStore } from "../store/cartStore";

export default function Cart() {
  const items = useCartStore((s) => s.items);
  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div>
      <h2>Your Cart</h2>
      {items.map((item) => (
        <div key={item.id}>
          <span>
            {item.name} x {item.quantity} - {item.price * item.quantity} ETB
          </span>
          <button onClick={() => remove(item.id)}>Remove</button>
        </div>
      ))}
      <h3>Total: {total} ETB</h3>
      <button onClick={clear}>Clear Cart</button>
    </div>
  );
}
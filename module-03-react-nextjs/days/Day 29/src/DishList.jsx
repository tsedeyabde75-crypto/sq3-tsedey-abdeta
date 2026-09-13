function Dish({ name, category, price, onAddToCart }) {
  return (
    <div className="dish-card">
      <h3>
        {name} • {category}
      </h3>
      <p className="price">{price} ETB</p>
      <button onClick={() => onAddToCart(price)}>Add to Order</button>
    </div>
  );
}

export default function DishList({ dishes, onAddToCart }) {
  if (dishes.length === 0) {
    return <p>No dishes in this category yet.</p>;
  }

  return (
    <div className="dish-list">
      {dishes.map((dish) => (
        <Dish key={dish.id} {...dish} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}
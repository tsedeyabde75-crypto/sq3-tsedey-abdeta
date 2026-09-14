import { useSearchParams, Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

export default function Menu({ dishes = [] }) {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") ?? "All";
  
  // Connect to Zustand cart store action
  const addItem = useCartStore((s) => s.addItem);

  const filteredDishes =
    category === "All"
      ? dishes
      : dishes.filter((d) => d.category === category);

  return (
    <div>
      <h2>Addis Eats Menu</h2>
      
      {/* Category Filters */}
      <div className="filters" style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {["All", "Main", "Vegan", "Grill"].map((cat) => (
          <button
            key={cat}
            onClick={() => setParams({ category: cat })}
            style={{ fontWeight: category === cat ? "bold" : "normal" }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Dish List */}
      <div className="dish-list" style={{ display: "grid", gap: "15px" }}>
        {filteredDishes.length === 0 ? (
          <p>No dishes found in this category.</p>
        ) : (
          filteredDishes.map((dish) => (
            <div key={dish.id} className="dish-card" style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px" }}>
              <h3>{dish.name}</h3>
              <p><strong>Category:</strong> {dish.category}</p>
              <p><strong>Price:</strong> {dish.price} ETB</p>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <Link to={`/menu/${dish.id}`}>View Details</Link>
                <button onClick={() => addItem(dish)}>Add to Cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
import { useSearchParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function Menu() {
  const { data: dishes, loading, error } = useFetch("/dishes.json");
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") ?? "All";

  if (loading) return <div className="spinner">Loading menu...</div>;
  if (error) return <div className="error">Error loading menu: {error}</div>;

  const categories = ["All", "Main", "Vegan", "Grill"];

  const filteredDishes = category === "All"
    ? dishes
    : dishes?.filter((dish) => dish.category.toLowerCase() === category.toLowerCase());

  const handleCategoryChange = (cat) => {
    if (cat === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <div className="menu-page">
      <h2>Addis Eats Menu</h2>

      <div className="filter-group">
        {categories.map((cat) => (
          <button
            key={cat}
            className={category.toLowerCase() === cat.toLowerCase() ? "btn active" : "btn"}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="dish-grid">
        {filteredDishes?.map((dish) => (
          <div key={dish.id} className="dish-card">
            <h3>{dish.name}</h3>
            <p>Category: {dish.category}</p>
            <p>Price: {dish.price} ETB</p>
            <Link to={`/menu/${dish.id}`} className="view-details-link">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
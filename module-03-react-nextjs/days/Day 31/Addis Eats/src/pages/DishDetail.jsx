import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useCart } from "../context/CartContext";

export default function DishDetail() {
  const { id } = useParams();
  const { data: dishes, loading, error } = useFetch("/dishes.json");
  const { dispatch } = useCart();

  if (loading) return <div className="spinner">Loading dish details...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const dish = dishes?.find((d) => String(d.id) === id || d.name.toLowerCase() === id.toLowerCase());

  if (!dish) {
    return (
      <div className="not-found">
        <h3>No dish found for "{id}"</h3>
        <Link to="/menu">Back to Menu</Link>
      </div>
    );
  }

  return (
    <div className="dish-detail">
      <h2>{dish.name}</h2>
      <p className="category">Category: {dish.category}</p>
      <p className="price">Price: {dish.price} ETB</p>
      <button 
        onClick={() => dispatch({ type: "ADD_ITEM", payload: dish })}
        className="btn-primary"
      >
        Add to Order
      </button>
      <br /><br />
      <Link to="/menu">&larr; Back to Menu</Link>
    </div>
  );
}
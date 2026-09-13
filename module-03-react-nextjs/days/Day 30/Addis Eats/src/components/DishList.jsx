import { useContext, useCallback } from "react";
import { CartContext } from "../context/CartContext";

export default function DishList({ dishes }) {
  const { dispatch } = useContext(CartContext);

  const handleAdd = useCallback(
    (dish) => {
      dispatch({ type: "add", dish });
    },
    [dispatch]
  );

  return (
    <div className="dish-list">
      {dishes.map((dish) => (
        <div key={dish.id} className="dish-card">
          <h4>
            {dish.name} • <span className="category-tag">{dish.category}</span>
          </h4>
          <p>{dish.price} ETB</p>
          <button onClick={() => handleAdd(dish)}>Add to Order</button>
        </div>
      ))}
    </div>
  );
}
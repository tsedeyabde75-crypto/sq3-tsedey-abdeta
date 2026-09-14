import { useParams } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import NotFound from "./NotFound";

export default function DishDetail({ dishes = [] }) {
  const { id } = useParams();
  const addItem = useCartStore((s) => s.addItem);

  const dish = dishes.find((d) => String(d.id) === String(id));

  if (!dish) {
    return <NotFound message={`No dish called "${id}" exists.`} />;
  }

  return (
    <div className="dish-detail">
      <h2>{dish.name}</h2>
      <p>{dish.description}</p>
      <p>Price: {dish.price} ETB</p>
      <button onClick={() => addItem(dish)}>Add to Cart</button>
    </div>
  );
}
import { useState } from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import OrderForm from "./OrderForm";
import { menuData } from "./data";

export default function Menu() {
  const [category, setCategory] = useState("All");
  const [total, setTotal] = useState(0);

  function handleAddToCart(price) {
    setTotal((prevTotal) => prevTotal + price);
  }

  return (
    <div className="menu-container">
      <CategoryBar selected={category} onSelect={setCategory} />
      
      <DishList
        dishes={menuData}
        category={category}
        onAddToCart={handleAddToCart}
      />

      <div className="order-summary" style={{ margin: "20px 0", fontWeight: "bold" }}>
        <h3>Total Order: {total} ETB</h3>
      </div>

      <OrderForm />
    </div>
  );
}
import { useState, useEffect, useRef } from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import OrderForm from "./OrderForm";

export default function Menu() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [total, setTotal] = useState(0);

  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    async function fetchDishes() {
      try {
        const res = await fetch("/dishes.json", { signal: controller.signal });
        if (!res.ok) throw new Error("Could not load the menu");
        const data = await res.json();
        setDishes(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchDishes();

    return () => controller.abort();
  }, [category]); // 👈 ADDED [category] HERE

  const filteredDishes = dishes.filter((dish) => {
    const matchesCategory =
      category === "All" || dish.category === category;
    const matchesSearch = dish.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    document.title = `Addis Eats - ${filteredDishes.length} items`;
  }, [filteredDishes.length]);

  function handleAddToCart(price) {
    setTotal((prevTotal) => prevTotal + price);
  }

  return (
    <div className="menu-container">
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search menu..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <CategoryBar selected={category} onSelect={setCategory} />

      {loading && <p>Loading the menu...</p>}
      {error && <p className="err">{error}</p>}

      {!loading && !error && (
        <>
          <DishList dishes={filteredDishes} onAddToCart={handleAddToCart} />
          <h3>Total Order: {total} ETB</h3>
          <OrderForm />
        </>
      )}
    </div>
  );
}
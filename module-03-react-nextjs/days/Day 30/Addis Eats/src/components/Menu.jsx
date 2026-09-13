import { useState, useEffect, useRef, useMemo } from "react";
import { useFetch } from "../hooks/useFetch";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";

export default function Menu() {
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);

  const { data: dishes, loading, error } = useFetch("/dishes.json");

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const filteredDishes = useMemo(() => {
    if (!dishes) return [];
    return dishes.filter((dish) => {
      const matchesCategory =
        category === "All" || dish.category === category;
      const matchesSearch = dish.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [dishes, category, searchTerm]);

  useEffect(() => {
    document.title = `Addis Eats - ${filteredDishes.length} items`;
  }, [filteredDishes.length]);

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
      {error && <p className="error">{error}</p>}

      {!loading && !error && <DishList dishes={filteredDishes} />}
    </div>
  );
}
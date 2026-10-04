"use client";

import { useState } from "react";
import DishCard from "./DishCard";

export default function FilterShell({ categories, dishes }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

  return (
    <div>
      <div className="flex gap-2 my-4 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border transition-colors ${
              selectedCategory === cat
                ? "bg-amber-600 text-white border-amber-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import SearchBox from "@/components/SearchBox";
import DishCard from "./DishCard";

const MENU_ITEMS = [
  {
    id: 1,
    name: "Special Beyaynetu",
    category: "Vegetarian",
    tag: "Fasting",
    description:
      "A colorful platter of mixed lentil stews, cabbage, beetroots, and shiro served over soft injera.",
    price: 180,
    image: "/dishes/beyaynetu.jpg",
    priority: true,
  },
  {
    id: 2,
    name: "Doro Wot",
    category: "Traditional Stews",
    tag: "Non-Fasting",
    description:
      "Slow-cooked traditional chicken stew made with rich berbere sauce and boiled eggs.",
    price: 350,
    image: "/dishes/doro-wat.jpg",
  },
  {
    id: 3,
    name: "Tibs (Beef)",
    category: "Grills & Meat",
    tag: "Non-Fasting",
    description:
      "Sautéed beef strips cooked with onions, green chillies, garlic, and seasoned butter.",
    price: 320,
    image: "/dishes/tibs.jpg",
  },
  {
    id: 4,
    name: "Shiro Tegabeno",
    category: "Traditional Stews",
    tag: "Fasting",
    description:
      "Rich, bubbling chickpea flour stew served hot in a traditional clay pot.",
    price: 150,
    image: "/dishes/shiro.jpg",
  },
];

const CATEGORIES = ["All Items", "Traditional Stews", "Grills & Meat", "Vegetarian"];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory =
      selectedCategory === "All Items" || item.category === selectedCategory;

    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-64 flex-shrink-0">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Categories</h2>
        <div className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-lg text-left text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-emerald-100 text-emerald-900 font-semibold shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </aside>

      <main className="flex-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">Addis Eats Menu</h1>
          <SearchBox onSearch={setSearchQuery} />
        </div>

        {filteredItems.length === 0 ? (
          <p className="text-slate-500 text-center py-10">No dishes found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="flex flex-col justify-between">
                <DishCard dish={item} />
                <button
                  onClick={() => addToCart(item)}
                  className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm text-sm"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
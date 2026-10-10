"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

const MENU_ITEMS = [
  {
    id: 1,
    name: "Special Beyaynetu",
    category: "Vegetarian",
    tag: "Fasting",
    description:
      "A colorful platter of mixed lentil stews, cabbage, beetroots, and shiro served over soft injera.",
    price: 180,
  },
  {
    id: 2,
    name: "Doro Wot",
    category: "Traditional Stews",
    tag: "Non-Fasting",
    description:
      "Slow-cooked traditional chicken stew made with rich berbere sauce and boiled eggs.",
    price: 350,
  },
  {
    id: 3,
    name: "Tibs (Beef)",
    category: "Grills & Meat",
    tag: "Non-Fasting",
    description:
      "Sautéed beef strips cooked with onions, green chillies, garlic, and seasoned butter.",
    price: 320,
  },
  {
    id: 4,
    name: "Shiro Tegabeno",
    category: "Traditional Stews",
    tag: "Fasting",
    description:
      "Rich, bubbling chickpea flour stew served hot in a traditional clay pot.",
    price: 150,
  },
];

const CATEGORIES = ["All Items", "Traditional Stews", "Grills & Meat", "Vegetarian"];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const { addToCart } = useCart();

  const filteredItems =
    selectedCategory === "All Items"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-8">
      {/* Categories Sidebar */}
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

      {/* Main Content Area */}
      <main className="flex-1">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Addis Eats Menu</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-900">{item.name}</h3>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-md font-semibold ${
                      item.tag === "Fasting"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {item.tag}
                  </span>
                </div>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div>
                <hr className="border-slate-200 mb-4" />
                <div className="flex items-center justify-between gap-4">
                  <span className="text-lg font-bold text-slate-900 whitespace-nowrap">
                    {item.price} ETB
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
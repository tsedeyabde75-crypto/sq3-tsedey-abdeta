"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function AddToCartButton({ dish }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    addToCart(dish);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <button
      onClick={handleClick}
      className={`mt-2 w-full py-2 px-4 rounded-lg font-medium transition-colors ${
        added
          ? "bg-green-600 text-white"
          : "bg-amber-600 hover:bg-amber-700 text-white"
      }`}
    >
      {added ? "Added!" : "Add to Cart"}
    </button>
  );
}
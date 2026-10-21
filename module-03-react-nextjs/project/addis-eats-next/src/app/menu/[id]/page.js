"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useState } from "react";
import { useParams } from "next/navigation";

const dishesData = {
  d1: { 
    id: "d1", 
    name: "Doro Wat", 
    price: 350, 
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80", 
    description: "Traditional spicy chicken stew served with injera and hard-boiled eggs." 
  },
  d2: { 
    id: "d2", 
    name: "Kitfo", 
    price: 380, 
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80", 
    description: "Minced lean beef warmed in spiced clarified butter and mitmita." 
  },
  d3: { 
    id: "d3", 
    name: "Tibs", 
    price: 320, 
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80", 
    description: "Sauteed chunks of tender beef with onions, garlic, and rosemary." 
  },
  d4: { 
    id: "d4", 
    name: "Shiro", 
    price: 220, 
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80", 
    description: "Smooth, spiced chickpea flour puree simmered in traditional clay pots." 
  }
};

export default function DishDetailPage() {
  const params = useParams();
  const id = params?.id ? (Array.isArray(params.id) ? params.id[0] : params.id) : "d1";
  const dish = dishesData[id] || dishesData["d1"];
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(dish);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-2xl shadow-sm border">
        <div className="relative h-80 rounded-xl overflow-hidden">
          <Image 
            src={dish.image} 
            alt={dish.name} 
            fill 
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover" 
            priority
            unoptimized
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{dish.name}</h1>
            <p className="text-2xl font-semibold text-blue-600 mb-4">{dish.price} ETB</p>
            <p className="text-gray-600 mb-6">{dish.description}</p>
          </div>
          <button
            onClick={handleAdd}
            className={`w-full py-3 text-white font-semibold rounded-xl transition ${
              added ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {added ? "Added to Cart!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </main>
  );
}
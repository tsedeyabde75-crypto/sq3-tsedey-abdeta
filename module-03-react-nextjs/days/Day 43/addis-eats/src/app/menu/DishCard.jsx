"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function DishCard({ dish }) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white flex flex-col justify-between">
      <div>
        <div className="relative h-48 w-full mb-4 overflow-hidden rounded-md">
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            style={{ objectFit: "cover" }}
            priority={dish.priority || false}
          />
        </div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold text-slate-900">{dish.name}</h3>
          {dish.tag && (
            <span
              className={`text-xs px-2 py-1 rounded font-semibold ${
                dish.tag === "Fasting"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-orange-100 text-orange-800"
              }`}
            >
              {dish.tag}
            </span>
          )}
        </div>
        <p className="text-slate-600 text-sm mb-4 leading-relaxed">
          {dish.description}
        </p>
      </div>

      <div>
        <hr className="border-slate-200 mb-4" />
        <div className="flex items-center justify-between gap-4">
          <span className="text-lg font-bold text-slate-900 whitespace-nowrap">
            {dish.price} ETB
          </span>
          <button
            onClick={() => addToCart(dish)}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
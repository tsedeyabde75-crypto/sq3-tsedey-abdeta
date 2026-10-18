'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function FoodCard({ item }) {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    addToCart(item);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between transition-transform duration-200 hover:shadow-md">
      <div className="relative h-48 sm:h-52 bg-slate-100">
        <img
          src={item.image || '/placeholder.jpg'}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={toggleFavorite}
          type="button"
          className={`absolute top-3 right-3 p-2.5 rounded-full shadow-md transition-colors active:scale-95 ${
            isFavorite ? 'bg-red-500 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
          aria-label="Toggle Favorite"
        >
          ♥
        </button>
      </div>

      <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-bold text-slate-900 text-lg leading-snug">{item.name}</h3>
            <span className="font-bold text-blue-600 whitespace-nowrap">{item.price} ETB</span>
          </div>
          <span className="inline-block text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded font-medium">
            {item.category}
          </span>
          <p className="text-slate-600 text-sm line-clamp-2">{item.description}</p>
        </div>

        <button
          onClick={handleAddToCart}
          type="button"
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm shadow-sm cursor-pointer"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
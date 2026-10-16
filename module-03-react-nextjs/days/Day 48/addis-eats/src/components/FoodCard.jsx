"use client";
import { useFavorites } from "@/context/FavoritesContext";

export default function FoodCard({ item }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(item.id);

  return (
    <div className="relative bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
      <button
        onClick={() => toggleFavorite(item)}
        className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full shadow hover:scale-110 transition-transform"
        aria-label="Toggle favorite"
      >
        <span className={fav ? "text-red-500 text-xl" : "text-gray-400 text-xl"}>
          {fav ? "♥" : "♡"}
        </span>
      </button>

      <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-md" />
      <h3 className="font-bold text-lg mt-2">{item.name}</h3>
      <p className="text-sm text-gray-600">{item.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="font-bold">{item.price} ETB</span>
      </div>
    </div>
  );
}
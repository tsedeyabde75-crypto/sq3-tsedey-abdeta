'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useFavorites } from '@/context/FavoritesContext';
import { useCart } from '@/context/CartContext';

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  if (!favorites || favorites.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Your Favorites</h1>
        <p className="text-gray-600 mb-6">You haven't added any favorite dishes yet.</p>
        <Link
          href="/menu"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
        >
          Explore Menu
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Your Favorite Dishes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {favorites.map((item) => (
          <div
            key={item.id}
            className="relative bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col justify-between"
          >
            {/* Remove Favorite Button */}
            <button
              onClick={() => toggleFavorite(item)}
              className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full shadow hover:scale-110 transition-transform"
              aria-label="Remove favorite"
            >
              <span className="text-red-500 text-xl font-bold">♥</span>
            </button>

            <div>
              <div className="relative w-full h-40 overflow-hidden">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-1.5 pr-8">
                  <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
                  <span className="text-sm font-semibold text-blue-600">{item.price} ETB</span>
                </div>
                <p className="text-xs text-gray-600 mb-4">{item.description}</p>
              </div>
            </div>

            <div className="p-4 pt-0">
              <button
                onClick={() => addToCart(item)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 text-sm rounded-lg transition-colors active:scale-95"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function FavoritesPage() {
  const { addToCart } = useCart();
  const router = useRouter();
  const favContext = useFavorites() || {};

  const [favoritesList, setFavoritesList] = useState([]);

  const syncFavorites = () => {
    const contextFavs = favContext.favorites;
    if (Array.isArray(contextFavs) && contextFavs.length > 0) {
      setFavoritesList(contextFavs);
    } else {
      const saved = localStorage.getItem('addis_eats_favorites');
      setFavoritesList(saved ? JSON.parse(saved) : []);
    }
  };

  useEffect(() => {
    syncFavorites();

    const handleStorageChange = () => syncFavorites();
    window.addEventListener('favoritesUpdated', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('favoritesUpdated', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [favContext.favorites]);

  const handleRemove = (item) => {
    if (typeof favContext.toggleFavorite === 'function') {
      favContext.toggleFavorite(item);
    } else if (typeof favContext.removeFavorite === 'function') {
      favContext.removeFavorite(item.id);
    } else {
      const updated = favoritesList.filter((f) => f.id !== item.id);
      setFavoritesList(updated);
      localStorage.setItem('addis_eats_favorites', JSON.stringify(updated));
    }
  };

  if (favoritesList.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto text-2xl">
          ❤️
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">My Favorites</h1>
          <p className="text-slate-600 text-sm">
            You have no favorite dishes yet.
          </p>
        </div>
        <button
          onClick={() => router.push('/menu')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm cursor-pointer"
        >
          Explore Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-slate-900">My Favorites</h1>
        <p className="text-slate-600">Quickly access and order your favorite traditional dishes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoritesList.map((dish) => (
          <div
            key={dish.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col"
          >
            <div className="relative h-48 w-full bg-slate-100">
              {dish.image && (
                <Image src={dish.image} alt={dish.name} fill className="object-cover" />
              )}
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg text-slate-900">{dish.name}</h3>
                  <span className="font-bold text-blue-600">{dish.price} ETB</span>
                </div>
                {dish.category && (
                  <span className="inline-block text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md font-medium">
                    {dish.category}
                  </span>
                )}
                <p className="text-slate-500 text-xs leading-relaxed">{dish.description}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => addToCart(dish)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleRemove(dish)}
                  aria-label="Remove favorite"
                  className="px-3 py-2 border border-red-200 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition-colors cursor-pointer flex items-center justify-center text-sm font-bold"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
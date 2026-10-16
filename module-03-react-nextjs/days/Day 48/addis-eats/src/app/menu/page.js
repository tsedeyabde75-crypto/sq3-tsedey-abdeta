'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import MenuSearch from '@/components/MenuSearch';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function MenuPage() {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { data: menuItems, error, isLoading } = useSWR('/api/menu', fetcher);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = useMemo(() => {
    const defaultCategories = [
      { id: 'all', label: 'All Dishes' },
      { id: 'tibs', label: 'Tibs & Beef' },
      { id: 'stews', label: 'Spicy Stews & Wat' },
      { id: 'fasting', label: 'Fasting / Vegan' },
    ];

    if (!menuItems) return defaultCategories;

    const fetchedCategories = Array.from(
      new Set(menuItems.map((item) => item.category?.toLowerCase()).filter(Boolean))
    ).map((cat) => ({
      id: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
    }));

    const merged = [...defaultCategories];
    fetchedCategories.forEach((cat) => {
      if (!merged.some((m) => m.id === cat.id)) {
        merged.push(cat);
      }
    });

    return merged;
  }, [menuItems]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-lg font-medium text-gray-600 animate-pulse">Loading authentic dishes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-lg font-medium text-red-600">Failed to load menu. Please try again later.</p>
      </div>
    );
  }

  const filteredItems = menuItems?.filter((item) => {
    const itemCat = item.category?.toLowerCase() || '';
    const itemName = item.name.toLowerCase();

    let matchesCategory = selectedCategory === 'all';

    if (!matchesCategory) {
      if (itemCat === selectedCategory) {
        matchesCategory = true;
      } else if (selectedCategory === 'tibs') {
        matchesCategory =
          itemCat.includes('tibs') ||
          itemCat.includes('beef') ||
          itemName.includes('tibs') ||
          itemName.includes('kitfo') ||
          itemName.includes('gomen be siga');
      } else if (selectedCategory === 'stews') {
        matchesCategory =
          itemCat.includes('stew') ||
          itemCat.includes('wat') ||
          itemName.includes('wat') ||
          itemName.includes('wat') ||
          itemName.includes('shiro');
      } else if (selectedCategory === 'fasting') {
        matchesCategory =
          itemCat.includes('fasting') ||
          itemCat.includes('vegan') ||
          itemCat.includes('veggie') ||
          itemName.includes('beyaynetu') ||
          itemName.includes('shiro');
      }
    }

    const matchesSearch = itemName.includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
          Our Menu
        </h1>
        <p className="text-base text-gray-600 mb-6">
          Explore authentic Ethiopian dishes crafted by top Addis kitchens.
        </p>
        <MenuSearch onSearch={setSearchTerm} />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b">
              Categories
            </h2>
            <ul className="space-y-1.5">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <li key={cat.id}>
                    <button
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {cat.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        <div className="flex-1">
          {filteredItems?.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-500 font-medium">No dishes found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="mt-4 text-sm font-semibold text-blue-600 hover:underline"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems?.map((item, index) => {
                const fav = isFavorite(item.id);

                return (
                  <div
                    key={item.id}
                    className="relative bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(item);
                      }}
                      className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full shadow hover:scale-110 transition-transform"
                      aria-label="Toggle favorite"
                    >
                      <span className={fav ? "text-red-500 text-xl font-bold" : "text-gray-400 text-xl"}>
                        {fav ? "♥" : "♡"}
                      </span>
                    </button>

                    <Link href={`/menu/${item.id}`} className="flex flex-col flex-grow group">
                      <div className="relative w-full h-40 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          priority={index < 3}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 flex flex-col flex-grow justify-between">
                        <div>
                          <div className="flex justify-between items-center mb-1.5 pr-8">
                            <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {item.name}
                            </h2>
                            <span className="text-sm font-semibold text-blue-600">{item.price} ETB</span>
                          </div>
                          <p className="text-xs text-gray-600 mb-4">{item.description}</p>
                        </div>
                      </div>
                    </Link>

                    <div className="p-4 pt-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(item);
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 text-sm rounded-lg transition-colors active:scale-95"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
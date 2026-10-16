'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import { useCart } from '@/context/CartContext';
import MenuSearch from '@/components/MenuSearch';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function MenuPage() {
  const { addToCart } = useCart();
  const { data: menuItems, error, isLoading } = useSWR('/api/menu', fetcher);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredItems = menuItems?.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
          Our Menu
        </h1>
        <p className="text-base text-gray-600 mb-6">
          Explore authentic Ethiopian dishes crafted by top Addis kitchens.
        </p>
        
        <MenuSearch onSearch={setSearchTerm} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems?.map((item, index) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            {/* Clickable Card Link for Details */}
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
                  <div className="flex justify-between items-center mb-1.5">
                    <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </h2>
                    <span className="text-sm font-semibold text-blue-600">{item.price} ETB</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-4">{item.description}</p>
                </div>
              </div>
            </Link>

            {/* Add to Cart Button (Isolated from Link navigation) */}
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
        ))}
      </div>
    </main>
  );
}
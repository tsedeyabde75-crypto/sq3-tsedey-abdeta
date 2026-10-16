'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';

export default function Navbar() {
  const { cart } = useCart();
  const { favorites } = useFavorites();

  const cartCount = cart?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const favCount = favorites?.length || 0;

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <Link href="/" className="text-xl font-bold tracking-tight">
        Addis Eats
      </Link>

      <div className="flex items-center gap-6 text-sm font-medium">
        <Link href="/menu" className="hover:text-blue-400 transition-colors">
          Menu
        </Link>

        {/* Favorites Navigation Link with Badge Counter */}
        <Link href="/favorites" className="relative hover:text-blue-400 transition-colors flex items-center gap-1">
          Favorites
          {favCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold ml-1">
              {favCount}
            </span>
          )}
        </Link>

        <Link href="/cart" className="relative hover:text-blue-400 transition-colors">
          Cart
          {cartCount > 0 && (
            <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full font-bold ml-1">
              {cartCount}
            </span>
          )}
        </Link>

        <Link href="/checkout" className="hover:text-blue-400 transition-colors">
          Checkout
        </Link>

        <Link href="/orders" className="hover:text-blue-400 transition-colors">
          Orders
        </Link>

        <Link href="/kitchen" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md transition-colors">
          Kitchen
        </Link>
      </div>
    </nav>
  );
}
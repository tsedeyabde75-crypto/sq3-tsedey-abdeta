'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { cart } = useCart();
  const totalItems = cart?.reduce((acc, item) => acc + (item.quantity || 1), 0) || 0;

  return (
    <header className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight text-white hover:text-blue-400 transition-colors">
          Addis Eats
        </Link>

        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link href="/menu" className="text-slate-300 hover:text-white transition-colors">
            Menu
          </Link>
          <Link href="/cart" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
            Cart
            {totalItems > 0 && (
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
          <Link href="/checkout" className="text-slate-300 hover:text-white transition-colors">
            Checkout
          </Link>
          <Link href="/orders" className="text-slate-300 hover:text-white transition-colors">
            Orders
          </Link>
          <Link href="/kitchen" className="bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 rounded-lg transition-colors font-semibold">
            Kitchen
          </Link>
        </nav>
      </div>
    </header>
  );
}
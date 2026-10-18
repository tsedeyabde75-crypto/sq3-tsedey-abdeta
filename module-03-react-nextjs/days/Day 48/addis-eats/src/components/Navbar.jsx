'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cart } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const totalCartItems = cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  useEffect(() => {
    const hasToken = document.cookie.includes('session_token=');
    const hasLocalStorage = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(hasToken || hasLocalStorage);
  }, [pathname]);

  const handleSignOut = () => {
    document.cookie = 'session_token=; path=/; max-age=0';
    document.cookie = 'user_email=; path=/; max-age=0';
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    
    setIsLoggedIn(false);
    router.push('/signin');
  };

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <Link href="/menu" className="text-xl font-bold tracking-wide">
        Addis Eats
      </Link>

      <div className="flex items-center gap-6 text-sm font-medium">
        <Link href="/menu" className="hover:text-blue-400 transition-colors">Menu</Link>
        <Link href="/favorites" className="hover:text-blue-400 transition-colors">Favorites</Link>
        
        <Link href="/cart" className="relative hover:text-blue-400 transition-colors">
          Cart
          {totalCartItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalCartItems}
            </span>
          )}
        </Link>

        <Link href="/checkout" className="hover:text-blue-400 transition-colors">Checkout</Link>
        <Link href="/orders" className="hover:text-blue-400 transition-colors">Orders</Link>
        <Link href="/kitchen" className="bg-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors">Kitchen</Link>

        {isLoggedIn ? (
          <button
            onClick={handleSignOut}
            className="bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        ) : (
          <Link
            href="/signin"
            className="bg-green-600 hover:bg-green-700 px-4 py-1.5 rounded-lg font-semibold transition-colors"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
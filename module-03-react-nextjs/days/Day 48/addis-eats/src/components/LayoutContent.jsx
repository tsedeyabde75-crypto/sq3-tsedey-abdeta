'use client';

import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar";
import OrderNotifier from "@/components/OrderNotifier";

export default function LayoutContent({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <OrderNotifier />}
      <div className="flex-grow">{children}</div>
      {!isAdminRoute && (
        <footer className="bg-white border-t py-6 text-center text-sm text-gray-500">
          © 2026 Addis Eats. Delivered across Addis Ababa.
        </footer>
      )}
    </>
  );
}
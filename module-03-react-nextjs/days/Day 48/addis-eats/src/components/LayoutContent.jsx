'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import OrderNotifier from './OrderNotifier';

export default function LayoutContent({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isAdminRoute && <OrderNotifier />}
    </>
  );
}
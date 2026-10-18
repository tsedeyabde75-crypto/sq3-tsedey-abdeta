'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main className="flex-1">{children}</main>
    </>
  );
}
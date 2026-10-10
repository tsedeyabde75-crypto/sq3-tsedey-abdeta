
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Addis Eats",
  description: "Food Delivery in Addis Ababa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <CartProvider>
          <header className="bg-white shadow-sm border-b">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">Addis Eats</Link>
              <div className="flex gap-6 items-center">
                <Link href="/menu" className="hover:text-blue-600 font-medium">Menu</Link>
                <Link href="/cart" className="hover:text-blue-600 font-medium">Cart</Link>
                <Link href="/orders" className="hover:text-blue-600 font-medium">Orders</Link>
                <Link href="/kitchen" className="hover:text-blue-600 font-medium text-purple-600">Kitchen</Link>
              </div>
            </nav>
          </header>
          <div className="flex-grow">{children}</div>
          <footer className="bg-white border-t py-6 text-center text-sm text-gray-500">
            © 2026 Addis Eats. Delivered across Addis Ababa.
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
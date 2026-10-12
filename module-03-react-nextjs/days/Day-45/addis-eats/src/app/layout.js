import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";

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
          <Navbar />
          <div className="flex-grow">{children}</div>
          <footer className="bg-white border-t py-6 text-center text-sm text-gray-500">
            © 2026 Addis Eats. Delivered across Addis Ababa.
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
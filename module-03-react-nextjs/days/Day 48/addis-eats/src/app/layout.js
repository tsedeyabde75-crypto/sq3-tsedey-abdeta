import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { AdminProvider } from "@/context/AdminContext";
import LayoutContent from "@/components/LayoutContent";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Addis Eats",
  description: "Food Delivery in Addis Ababa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <AdminProvider>
          <CartProvider>
            <FavoritesProvider>
              <LayoutContent>{children}</LayoutContent>
            </FavoritesProvider>
          </CartProvider>
        </AdminProvider>
      </body>
    </html>
  );
}
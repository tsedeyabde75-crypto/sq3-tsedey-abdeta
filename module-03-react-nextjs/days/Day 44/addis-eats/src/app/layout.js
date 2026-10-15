import { Inter } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://addiseats.et"),
  title: {
    default: "Addis Eats food delivery in Addis Ababa",
    template: "%s | Addis Eats",
  },
  description: "Order Doro Wat, Tibs and Kitfo from kitchens in Bole and Kazanchis. Delivery across Addis Ababa, paid with TeleBirr.",
  openGraph: {
    title: "Addis Eats | Authentic Ethiopian Food Delivery",
    description: "Experience the rich flavors of traditional Ethiopian stews, freshly baked injera, and sizzling tibs delivered hot and fast across Addis Ababa.",
    url: "https://addiseats.et",
    siteName: "Addis Eats",
    locale: "en_ET",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <CartProvider>
          <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              <Link href="/" className="text-xl font-extrabold text-emerald-700">
                Addis Eats
              </Link>
              <div className="flex items-center gap-6">
                <Link
                  href="/menu"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  Menu
                </Link>
                <Link
                  href="/cart"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  Cart
                </Link>
                <Link
                  href="/checkout"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </header>
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
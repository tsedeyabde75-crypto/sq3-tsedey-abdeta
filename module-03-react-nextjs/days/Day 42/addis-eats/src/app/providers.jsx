"use client";

import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";

export function Providers({ children }) {
  return (
    <CartProvider>
      <Navbar />
      {children}
    </CartProvider>
  );
}
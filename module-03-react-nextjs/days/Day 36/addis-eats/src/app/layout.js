import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="p-6 font-sans">
        <header className="mb-8 border-b pb-4">
          <nav className="flex gap-4">
            <Link href="/" className="font-bold hover:underline">Home</Link>
            <Link href="/menu" className="hover:underline">Menu</Link>
            <Link href="/cart" className="hover:underline">Cart</Link>
            <Link href="/checkout" className="hover:underline">Checkout</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}

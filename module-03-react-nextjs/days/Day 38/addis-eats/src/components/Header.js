import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white py-4 px-8 flex justify-between items-center shadow-md">
      <Link href="/" className="text-xl font-bold hover:text-gray-300 transition-colors">
        Addis Eats
      </Link>
      <nav className="flex items-center gap-6 text-sm font-medium">
        <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
        <Link href="/menu" className="hover:text-gray-300 transition-colors">Menu</Link>
        <Link href="/cart" className="hover:text-gray-300 transition-colors">Cart</Link>
        <Link href="/checkout" className="hover:text-gray-300 transition-colors">Checkout</Link>
      </nav>
    </header>
  );
}
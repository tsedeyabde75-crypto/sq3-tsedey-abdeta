import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const totalItems = cart ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white border-b">
      <Link href="/menu" className="text-xl font-bold text-emerald-700">
        Addis Eats
      </Link>
      <div className="flex items-center gap-6">
        <Link href="/cart" className="relative font-medium text-slate-700 hover:text-emerald-600">
          Cart ({totalItems})
        </Link>
        <Link
          href="/checkout"
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700"
        >
          Checkout
        </Link>
      </div>
    </nav>
  );
}

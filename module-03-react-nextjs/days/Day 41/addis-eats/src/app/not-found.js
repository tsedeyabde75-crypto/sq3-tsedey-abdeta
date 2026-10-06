import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto text-center py-16 px-4">
      <h1 className="text-6xl font-extrabold text-amber-600 mb-2">404</h1>
      <h2 className="text-2xl font-bold mb-4">Dish or Page Not Found</h2>
      <p className="text-gray-600 mb-6">The page or menu item you are looking for does not exist.</p>
      <Link href="/menu" className="bg-amber-600 text-white px-5 py-2.5 rounded hover:bg-amber-700 font-medium">
        Back to Menu
      </Link>
    </div>
  );
}
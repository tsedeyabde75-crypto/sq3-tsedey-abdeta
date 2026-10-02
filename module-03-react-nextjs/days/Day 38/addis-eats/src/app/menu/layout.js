import Link from "next/link";

export default function MenuLayout({ children }) {
  return (
    <div className="flex min-h-[calc(100vh-120px)]">
      <aside className="w-64 bg-gray-50 border-r border-gray-200 p-6 flex-shrink-0">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Categories</h2>
        <nav className="flex flex-col gap-2 text-sm text-gray-600">
          <Link href="/menu" className="hover:text-black hover:font-medium">All Items</Link>
          <Link href="/menu" className="hover:text-black hover:font-medium">Traditional Stews</Link>
          <Link href="/menu" className="hover:text-black hover:font-medium">Grills & Meat</Link>
          <Link href="/menu" className="hover:text-black hover:font-medium">Vegetarian</Link>
        </nav>
      </aside>

      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
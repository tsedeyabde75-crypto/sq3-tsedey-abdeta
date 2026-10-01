import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1 className="text-3xl font-bold mb-4">Welcome to Addis Eats</h1>
      <p className="mb-4">Explore traditional Ethiopian cuisine delivered to your doorstep.</p>
      <Link href="/menu" className="bg-emerald-600 text-white px-4 py-2 rounded">
        View Full Menu
      </Link>
    </main>
  );
}

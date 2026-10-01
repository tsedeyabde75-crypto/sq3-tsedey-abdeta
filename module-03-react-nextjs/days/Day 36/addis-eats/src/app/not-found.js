import Link from "next/link";

export default function NotFound() {
  return (
    <main className="text-center py-12">
      <h2 className="text-2xl font-bold mb-2">404 - Page Not Found</h2>
      <p className="mb-4 text-gray-600">The dish or page you are looking for does not exist.</p>
      <Link href="/menu" className="text-emerald-600 underline">
        Return to Menu
      </Link>
    </main>
  );
}
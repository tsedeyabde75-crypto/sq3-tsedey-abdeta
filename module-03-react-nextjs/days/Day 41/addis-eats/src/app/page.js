import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">
        Welcome to Addis Eats
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-2xl mb-8">
        Delicious Ethiopian food delivered to your home.
      </p>
      <Link
        href="/menu"
        className="bg-sky-100 text-sky-900 hover:bg-sky-200 border border-sky-300 px-8 py-3.5 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-sm"
      >
        View Full Menu
      </Link>
    </main>
  );
}

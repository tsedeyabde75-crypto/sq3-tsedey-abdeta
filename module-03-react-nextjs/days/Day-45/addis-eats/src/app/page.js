import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center px-4 py-8 text-center max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
        Fresh Ethiopian Meals Delivered Straight to You
      </h1>
      
      <p className="text-lg font-semibold text-gray-800 max-w-xl mb-6">
        Order your favorite local dishes from top Addis kitchens.
      </p>

      <div className="relative w-full max-w-2xl h-64 rounded-2xl overflow-hidden shadow-md border border-gray-200 mb-6 bg-white">
        <Image
          src="/images/hero-food.jpg"
          alt="Ethiopian Food Feast"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          className="object-cover"
        />
      </div>

      <div>
        <Link
          href="/menu"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition-colors inline-block text-sm"
        >
          Explore Menu
        </Link>
      </div>
    </main>
  );
}
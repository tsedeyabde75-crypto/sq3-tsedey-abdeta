import Image from "next/image";
import Link from "next/link";

async function getDish(id) {
  const res = await fetch(`https://cdn.addiseats.et/dishes/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }) {
  const dish = await getDish(params.id);
  if (!dish) return { title: "Dish not found" };

  return {
    title: dish.name,
    description: `${dish.name}, ${dish.price} ETB. ${dish.summary}`,
    alternates: {
      canonical: `/menu/${params.id}`,
    },
  };
}

export default async function DishDetailPage({ params }) {
  const dish = await getDish(params.id);

  if (!dish) {
    return <div className="p-8 text-center text-slate-600">Dish not found</div>;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.summary,
    offers: {
      "@type": "Offer",
      price: dish.price,
      priceCurrency: "ETB",
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href="/menu" className="text-sm text-emerald-600 font-medium hover:underline mb-6 inline-block">
        &larr; Back to Menu
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">{dish.name}</h1>
          <p className="text-xl font-semibold text-emerald-600 mb-6">{dish.price} ETB</p>
          <p className="text-slate-600 leading-relaxed mb-8">{dish.description}</p>
        </div>
      </div>
    </div>
  );
}
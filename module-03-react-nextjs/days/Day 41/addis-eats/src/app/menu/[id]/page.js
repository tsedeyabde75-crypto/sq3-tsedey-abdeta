import { getDishById, DISHES } from "@/lib/dishes";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";

export async function generateStaticParams() {
  return DISHES.map((dish) => ({
    id: dish.id,
  }));
}

export default async function DishDetailPage({ params }) {
  const { id } = await params;
  const dish = await getDishById(id);

  if (!dish) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Link href="/menu" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Menu</Link>
      <div className="border rounded-lg p-6 shadow-md bg-white mt-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-1 rounded">
          {dish.category}
        </span>
        <h1 className="text-3xl font-bold mt-3 mb-2">{dish.title}</h1>
        <p className="text-gray-700 text-base mb-6">{dish.description}</p>
        <div className="flex justify-between items-center pt-4 border-t">
          <span className="text-2xl font-bold">{dish.price} ETB</span>
          <AddToCartButton dish={dish} />
        </div>
      </div>
    </div>
  );
}
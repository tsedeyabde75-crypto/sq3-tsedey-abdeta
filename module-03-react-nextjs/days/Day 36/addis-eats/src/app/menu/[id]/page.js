import { notFound } from "next/navigation";
import { DISHES } from "../dishes";

export default async function DishPage({ params }) {
  const resolvedParams = await params;
  const dish = DISHES.find((item) => item.id === resolvedParams.id);

  if (!dish) {
    notFound();
  }

  return (
    <main className="border p-6 rounded-lg max-w-md">
      <h1 className="text-3xl font-bold mb-2">{dish.name}</h1>
      <p className="text-gray-700">{dish.description}</p>
    </main>
  );
}
import { notFound } from "next/navigation";

const mockDishes = [
  { id: "1", name: "Doro Wat", description: "Spicy chicken stew served with hard-boiled eggs and injera." },
  { id: "2", name: "Kitfo", description: "Minced raw beef marinated in mitmita and niter kibbeh." },
  { id: "3", name: "Shiro Wat", description: "Slow-cooked chickpea flour stew seasoned with garlic and berbere." },
];

export async function generateStaticParams() {
  return mockDishes.map((dish) => ({
    id: dish.id,
  }));
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = mockDishes.find((d) => d.id === id);

  if (!dish) {
    notFound();
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-2">{dish.name}</h1>
      <p className="text-gray-600 mb-4">{dish.description}</p>
    </div>
  );
}
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

const dishes = [
  {
    id: "1",
    name: "Doro Wat",
    description: "Spicy chicken stew served with injera and boiled egg.",
    price: 350,
    category: "Main",
  },
  {
    id: "2",
    name: "Beyaynetu",
    description: "Combination of various lentil and vegetable dishes.",
    price: 220,
    category: "Vegetarian",
  },
  {
    id: "3",
    name: "Tibs",
    description: "Sautéed beef cooked with onions, garlic, and rosemary.",
    price: 400,
    category: "Main",
  },
  {
    id: "4",
    name: "Shiro",
    description: "Slow-cooked powdered chickpeas seasoned with berbere.",
    price: 180,
    category: "Vegetarian",
  },
];

async function getDish(id) {
  const dish = dishes.find((item) => item.id === id);
  return dish || null;
}

export default async function DishDetailPage({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) {
    notFound();
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <div className="border rounded-lg p-6 shadow-sm bg-white">
        <span className="text-sm font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          {dish.category}
        </span>
        <h1 className="text-3xl font-bold mt-4 mb-2">{dish.name}</h1>
        <p className="text-gray-600 text-lg mb-6">{dish.description}</p>
        <div className="flex justify-between items-center border-t pt-4">
          <span className="text-2xl font-bold text-amber-700">
            {dish.price} ETB
          </span>
          <div className="w-48">
            <AddToCartButton dish={dish} />
          </div>
        </div>
      </div>
    </main>
  );
}
import FilterShell from "@/components/FilterShell";

async function getMenuData() {
  return [
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
}

export default async function MenuPage() {
  const dishes = await getMenuData();
  const categories = ["All", ...new Set(dishes.map((d) => d.category))];

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Addis Eats Menu</h1>

      <FilterShell categories={categories} dishes={dishes} />
    </main>
  );
}
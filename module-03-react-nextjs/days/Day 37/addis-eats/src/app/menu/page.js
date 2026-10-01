import { Suspense } from "react";
import DishList from "@/components/DishList";
import DishSkeleton from "@/components/DishSkeleton";

export const revalidate = 3600;

const mockDishes = [
  { id: "1", name: "Doro Wat", description: "Spicy chicken stew served with hard-boiled eggs and injera." },
  { id: "2", name: "Kitfo", description: "Minced raw beef marinated in mitmita and niter kibbeh." },
  { id: "3", name: "Shiro Wat", description: "Slow-cooked chickpea flour stew seasoned with garlic and berbere." },
];

async function getDishes() {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockDishes;
}

async function StreamedDishList() {
  const dishes = await getDishes();
  return <DishList dishes={dishes} />;
}

export default function MenuPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Our Menu</h1>
      <Suspense fallback={<DishSkeleton />}>
        <StreamedDishList />
      </Suspense>
    </div>
  );
}
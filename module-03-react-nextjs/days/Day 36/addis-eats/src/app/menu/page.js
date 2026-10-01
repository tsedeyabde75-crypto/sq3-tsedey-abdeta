import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import { DISHES } from "./dishes";

export default function MenuPage() {
  return (
    <main>
      <h1 className="text-3xl font-bold mb-4">Our Menu</h1>
      <CategoryBar />
      <DishList dishes={DISHES} />
    </main>
  );
}
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function DishCard({ dish }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white flex flex-col justify-between hover:shadow-md transition-shadow">
      <Link href={`/menu/${dish.id}`} className="block group">
        <h3 className="font-bold text-lg group-hover:text-amber-600 transition-colors">
          {dish.name}
        </h3>
        <p className="text-gray-600 text-sm my-1">{dish.description}</p>
      </Link>
      <div className="mt-4">
        <span className="font-semibold text-amber-700 block mb-2">
          {dish.price} ETB
        </span>
        <AddToCartButton dish={dish} />
      </div>
    </div>
  );
}
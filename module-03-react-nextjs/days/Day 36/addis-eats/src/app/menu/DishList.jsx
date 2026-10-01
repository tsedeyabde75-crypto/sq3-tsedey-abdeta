import Link from "next/link";

export default function DishList({ dishes }) {
  return (
    <ul className="space-y-4">
      {dishes.map((dish) => (
        <li key={dish.id} className="border p-4 rounded shadow-sm">
          <Link href={`/menu/${dish.id}`} className="text-xl font-semibold hover:underline">
            {dish.name}
          </Link>
          <p className="text-gray-600">{dish.description}</p>
        </li>
      ))}
    </ul>
  );
}
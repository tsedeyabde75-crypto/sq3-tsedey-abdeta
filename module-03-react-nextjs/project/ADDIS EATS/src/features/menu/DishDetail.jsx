import { useParams } from 'react-router-dom';

export default function DishDetail() {
  const { id } = useParams();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Dish Detail (ID: {id})</h1>
      <p className="text-gray-600">
        Full dish description, ingredients, and add-to-cart controls will be added here.
      </p>
    </div>
  );
}
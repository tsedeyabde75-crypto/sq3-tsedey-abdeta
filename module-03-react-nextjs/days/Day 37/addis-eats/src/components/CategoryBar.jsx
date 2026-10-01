export default function CategoryBar() {
  return (
    <div className="flex gap-2 mb-6">
      <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">All</span>
      <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">Beef</span>
      <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">Vegetarian</span>
    </div>
  );
}
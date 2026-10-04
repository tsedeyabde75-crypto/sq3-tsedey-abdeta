export default function DishSkeleton() {
  return (
    <div className="animate-pulse space-y-4 p-4 border rounded-lg max-w-sm">
      <div className="bg-gray-300 h-48 w-full rounded-md"></div>
      <div className="bg-gray-300 h-6 w-3/4 rounded"></div>
      <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
    </div>
  );
}
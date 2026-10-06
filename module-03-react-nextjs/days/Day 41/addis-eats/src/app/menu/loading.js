export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="h-8 w-48 bg-gray-200 animate-pulse rounded mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="border rounded-lg p-5 bg-white space-y-4">
            <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
            <div className="h-10 bg-gray-200 animate-pulse rounded w-1/3"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
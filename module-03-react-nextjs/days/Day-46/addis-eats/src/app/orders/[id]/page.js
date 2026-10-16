export default function OrderDetailPage({ params }) {
  const id = params?.id;

  return (
    <main className="container mx-auto px-4 py-8 max-w-xl">
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h1 className="text-2xl font-bold mb-4">Order Status: #{id}</h1>
        <p className="text-gray-600 mb-2">Current State: <span className="font-semibold text-green-600">Preparing on grill</span></p>
        <p className="text-sm text-gray-500">Your order is being prepared fresh in Addis Ababa.</p>
      </div>
    </main>
  );
}
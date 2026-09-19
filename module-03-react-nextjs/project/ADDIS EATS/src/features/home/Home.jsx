import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="py-12 text-center max-w-2xl mx-auto space-y-6">
      <h1 className="text-4xl font-extrabold text-gray-900">
        Authentic Flavors of Addis Ababa Delivered to You
      </h1>
      <p className="text-lg text-gray-600">
        Explore today's specials or browse our full menu of traditional Ethiopian cuisine, pizzas, burgers, and drinks.
      </p>
      <div>
        <Link 
          to="/menu" 
          className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition"
        >
          View Menu
        </Link>
      </div>
    </div>
  );
}
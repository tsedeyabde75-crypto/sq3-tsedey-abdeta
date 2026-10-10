import Link from "next/link";
import Image from "next/image";

const dishes = [
  { 
    id: "d1", 
    name: "Doro Wat", 
    price: 350, 
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=400&q=80", 
    description: "Traditional spicy chicken stew with hard-boiled eggs." 
  },
  { 
    id: "d2", 
    name: "Kitfo", 
    price: 380, 
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80", 
    description: "Minced lean beef warmed in spiced clarified butter and mitmita." 
  },
  { 
    id: "d3", 
    name: "Tibs", 
    price: 320, 
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80", 
    description: "Sauteed chunks of beef with onions, garlic, and rosemary." 
  },
  { 
    id: "d4", 
    name: "Shiro", 
    price: 220, 
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80", 
    description: "Smooth, spiced chickpea flour puree simmered in clay pots." 
  }
];

export default function MenuPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dishes.map((dish) => (
          <div key={dish.id} className="bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col">
            <div className="relative h-48 w-full">
              <Image 
                src={dish.image} 
                alt={dish.name} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover" 
              />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-xl font-semibold mb-1">{dish.name}</h2>
              <p className="text-gray-600 text-sm mb-4 flex-grow">{dish.description}</p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-lg font-bold text-blue-600">{dish.price} ETB</span>
                <Link 
                  href={`/menu/${dish.id}`} 
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
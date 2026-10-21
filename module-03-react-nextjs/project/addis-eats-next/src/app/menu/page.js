'use client';

import { useCart } from "@/context/CartContext.jsx";
import { useCart } from '../../context/CartContext';
import Image from 'next/image';

const dishes = [
  {
    id: '1',
    name: 'Doro Wat',
    category: 'Spicy Stews & Wat',
    price: 450,
    description: 'Traditional spicy chicken stew served with hard-boiled eggs and injera.',
    image: '/images/menu/doro-wat.jpg',
  },
  {
    id: '2',
    name: 'Special Tibs',
    category: 'Tibs & Beef',
    price: 500,
    description: 'Sautéed cubed beef or lamb cooked with onions, garlic, and rosemary.',
    image: '/images/menu/tibs.jpg',
  },
  {
    id: '3',
    name: 'Special Kitfo',
    category: 'Tibs & Beef',
    price: 550,
    description: 'Minced lean beef warmed in spiced clarified butter and mitmita.',
    image: '/images/menu/kitfo.jpg',
  },
  {
    id: '4',
    name: 'Shiro Tegabeno',
    category: 'Fasting / Vegan',
    price: 250,
    description: 'Rich, bubbling chickpea puree simmered with traditional spices.',
    image: '/images/menu/shiro.jpg',
  },
  {
    id: '5',
    name: 'Yetsom Beyaynetu',
    category: 'Fasting / Vegan',
    price: 300,
    description: 'Colorful platter of lentils, split peas, collard greens, and vegetable stews.',
    image: '/images/menu/beyaynetu.jpg',
  },
  {
    id: '6',
    name: 'Gomen Be Siga',
    category: 'Spicy Stews & Wat',
    price: 420,
    description: 'Tender beef cubes slow-cooked with fresh collard greens and seasoned butter.',
    image: '/images/menu/gomen-besiga.jpg',
  },
];

export default function MenuPage() {
  const { addToCart } = useCart();
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDish, setSelectedDish] = useState(null);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('addis_eats_favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  const handleFavoriteToggle = (e, dish) => {
    e.stopPropagation();
    let updatedFavorites;
    const isAlreadyFav = favorites.some((f) => f.id === dish.id);

    if (isAlreadyFav) {
      updatedFavorites = favorites.filter((f) => f.id !== dish.id);
    } else {
      updatedFavorites = [...favorites, dish];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('addis_eats_favorites', JSON.stringify(updatedFavorites));
  };

  const handleAddToCart = (e, dish) => {
    e.stopPropagation();
    addToCart(dish);
  };

  const categories = ['All', 'Spicy Stews & Wat', 'Tibs & Beef', 'Fasting / Vegan'];

  const filteredDishes = dishes.filter((dish) => {
    const matchesSearch =
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || dish.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-slate-900">Our Menu</h1>
        <p className="text-slate-600 max-w-xl mx-auto">
          Explore authentic traditional Ethiopian dishes prepared fresh daily.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <aside className="lg:col-span-1 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-6 lg:sticky lg:top-6">
          <div>
            <h2 className="font-bold text-slate-900 text-lg mb-3">Search</h2>
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-900"
            />
          </div>

          <div>
            <h2 className="font-bold text-slate-900 text-lg mb-3">Categories</h2>
            <div className="flex flex-col space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="lg:col-span-3">
          {filteredDishes.length === 0 ? (
            <div className="bg-white p-12 rounded-xl border border-slate-200 text-center text-slate-500">
              No dishes found matching your criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDishes.map((dish) => {
                const isFav = favorites.some((f) => f.id === dish.id);
                return (
                  <div
                    key={dish.id}
                    onClick={() => setSelectedDish(dish)}
                    className="bg-white rounded-xl shadow-sm border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer overflow-hidden flex flex-col group"
                  >
                    <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {dish.name}
                          </h3>
                          <span className="text-blue-600 font-bold">{dish.price} ETB</span>
                        </div>
                        <span className="inline-block bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded mt-1 font-medium">
                          {dish.category}
                        </span>
                        <p className="text-slate-500 text-sm mt-2 line-clamp-2">{dish.description}</p>
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <button
                          onClick={(e) => handleAddToCart(e, dish)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={(e) => handleFavoriteToggle(e, dish)}
                          aria-label="Toggle favorite"
                          className={`p-2 px-3 rounded-lg border text-sm font-medium transition-colors cursor-pointer flex items-center justify-center ${
                            isFav
                              ? 'bg-red-50 text-red-500 border-red-200 hover:bg-red-100'
                              : 'bg-white text-slate-400 border-slate-300 hover:text-red-500 hover:border-red-300'
                          }`}
                        >
                          {isFav ? '❤️' : '🤍'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {selectedDish && (
        <div
          onClick={() => setSelectedDish(null)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl overflow-hidden max-w-md w-full space-y-4 shadow-2xl"
          >
            <div className="relative h-56 w-full bg-slate-100">
              <Image src={selectedDish.image} alt={selectedDish.name} fill className="object-cover" />
              <button
                onClick={() => setSelectedDish(null)}
                className="absolute top-4 right-4 bg-white/80 hover:bg-white text-slate-800 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shadow-md cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 pt-0">
              <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{selectedDish.name}</h2>
                  <span className="text-xs text-slate-500 font-medium">{selectedDish.category}</span>
                </div>
                <span className="text-xl font-bold text-blue-600">{selectedDish.price} ETB</span>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">{selectedDish.description}</p>

              <div className="pt-2">
                <button
                  onClick={(e) => {
                    handleAddToCart(e, selectedDish);
                    setSelectedDish(null);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
                >
                  Add to Cart ({selectedDish.price} ETB)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
'use client';

import { useState } from 'react';

const initialDishes = [
  {
    id: '1',
    name: 'Doro Wat',
    category: 'Spicy Stews & Wat',
    price: 450,
    description: 'Traditional spicy chicken stew served with hard-boiled eggs and injera.',
  },
  {
    id: '2',
    name: 'Special Tibs',
    category: 'Tibs & Beef',
    price: 500,
    description: 'Sautéed cubed beef or lamb cooked with onions, garlic, and rosemary.',
  },
  {
    id: '3',
    name: 'Special Kitfo',
    category: 'Tibs & Beef',
    price: 550,
    description: 'Minced lean beef warmed in spiced clarified butter and mitmita.',
  },
  {
    id: '4',
    name: 'Shiro Tegabeno',
    category: 'Fasting / Vegan',
    price: 250,
    description: 'Rich, bubbling chickpea puree simmered with traditional spices.',
  },
  {
    id: '5',
    name: 'Yetsom Beyaynetu',
    category: 'Fasting / Vegan',
    price: 300,
    description: 'Colorful platter of lentils, split peas, collard greens, and vegetable stews.',
  },
  {
    id: '6',
    name: 'Gomen Be Siga',
    category: 'Spicy Stews & Wat',
    price: 420,
    description: 'Tender beef cubes slow-cooked with fresh collard greens and seasoned butter.',
  },
];

export default function MenuManagementPage() {
  const [dishes, setDishes] = useState(initialDishes);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingDish, setEditingDish] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Tibs & Beef',
    price: '',
    description: '',
  });

  const filteredDishes = dishes.filter(
    (dish) =>
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingDish) {
      setDishes(
        dishes.map((d) =>
          d.id === editingDish.id ? { ...d, ...formData, price: Number(formData.price) } : d
        )
      );
      setEditingDish(null);
    } else {
      const newDish = {
        id: Date.now().toString(),
        ...formData,
        price: Number(formData.price),
      };
      setDishes([newDish, ...dishes]);
    }
    setFormData({ name: '', category: 'Tibs & Beef', price: '', description: '' });
  };

  const handleDelete = (id, name) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      setDishes(dishes.filter((d) => d.id !== id));
    }
  };

  const handleEditClick = (dish) => {
    setEditingDish(dish);
    setFormData({
      name: dish.name,
      category: dish.category,
      price: dish.price,
      description: dish.description,
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Menu Management</h1>
          <p className="text-slate-500 text-sm mt-1">Manage dishes served across Addis Eats</p>
        </div>

        <input
          type="text"
          placeholder="Search dishes by name or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-lg text-sm w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-fit space-y-4">
          <h2 className="text-lg font-bold text-slate-900">
            {editingDish ? 'Edit Dish' : 'Add New Dish'}
          </h2>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Dish Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="Tibs & Beef">Tibs & Beef</option>
                <option value="Spicy Stews & Wat">Spicy Stews & Wat</option>
                <option value="Fasting / Vegan">Fasting / Vegan</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Price (ETB)
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Description
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md text-sm transition-colors"
              >
                {editingDish ? 'Update Dish' : 'Add Dish'}
              </button>
              {editingDish && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingDish(null);
                    setFormData({ name: '', category: 'Tibs & Beef', price: '', description: '' });
                  }}
                  className="px-3 py-2 bg-slate-200 text-slate-700 rounded-md text-sm font-medium"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs uppercase tracking-wider">
                <th className="py-3 px-4">Dish</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredDishes.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-slate-500">
                    No dishes found.
                  </td>
                </tr>
              ) : (
                filteredDishes.map((dish) => (
                  <tr key={dish.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-semibold text-slate-900">{dish.name}</td>
                    <td className="py-3 px-4 text-slate-600">{dish.category}</td>
                    <td className="py-3 px-4 font-medium text-slate-800">{dish.price} ETB</td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleEditClick(dish)}
                        className="text-blue-600 hover:underline font-medium text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(dish.id, dish.name)}
                        className="text-red-600 hover:underline font-medium text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
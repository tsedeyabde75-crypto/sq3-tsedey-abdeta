'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const INITIAL_DISHES = [
  { id: '1', name: 'Doro Wat', price: 450, category: 'Traditional', description: 'Spicy chicken stew with boiled eggs and Injera.' },
  { id: '2', name: 'Special Kitfo', price: 520, category: 'Traditional', description: 'Minced beef seasoned with niter kibbeh and mitmita.' },
  { id: '3', name: 'Beef Tibs', price: 380, category: 'Sizzling', description: 'Sautéed beef strips with onions, garlic, and rosemary.' },
];

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('analytics');

  const [orders, setOrders] = useState([]);

  const [dishes, setDishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingDish, setEditingDish] = useState(null);
  const [deletingDishId, setDeletingDishId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDish, setNewDish] = useState({ name: '', price: '', category: 'Traditional', description: '' });

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdminLoggedIn') === 'true';
    if (isAdmin) {
      setIsAuthenticated(true);
    }

    const primaryOrders = JSON.parse(localStorage.getItem('addis_eats_orders') || '[]');
    const userOrders = JSON.parse(localStorage.getItem('addis_eats_user_orders') || '[]');
    const generalOrders = JSON.parse(localStorage.getItem('orders') || '[]');

    const allOrdersMap = new Map();
    [...primaryOrders, ...userOrders, ...generalOrders].forEach((ord) => {
      if (ord && ord.id) {
        allOrdersMap.set(ord.id, {
          ...ord,
          status: ord.status || 'Pending'
        });
      }
    });

    const combinedOrders = Array.from(allOrdersMap.values());
    setOrders(combinedOrders);

    const savedDishes = localStorage.getItem('addis_eats_menu_dishes');
    if (savedDishes) {
      setDishes(JSON.parse(savedDishes));
    } else {
      setDishes(INITIAL_DISHES);
      localStorage.setItem('addis_eats_menu_dishes', JSON.stringify(INITIAL_DISHES));
    }

    setLoading(false);
  }, []);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (password === '1234' && email.trim() !== '') {
      localStorage.setItem('isAdminLoggedIn', 'true');
      localStorage.setItem('adminEmail', email);
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Please enter a valid email and password (1234).');
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminEmail');
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);

    localStorage.setItem('addis_eats_orders', JSON.stringify(updatedOrders));
    localStorage.setItem('addis_eats_user_orders', JSON.stringify(updatedOrders));
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    
    window.dispatchEvent(new Event('ordersUpdated'));
  };

  const handleAddDish = (e) => {
    e.preventDefault();
    if (!newDish.name || !newDish.price) return;
    const created = {
      id: Date.now().toString(),
      ...newDish,
      price: Number(newDish.price)
    };
    const updated = [created, ...dishes];
    setDishes(updated);
    localStorage.setItem('addis_eats_menu_dishes', JSON.stringify(updated));
    setShowAddModal(false);
    setNewDish({ name: '', price: '', category: 'Traditional', description: '' });
  };

  const handleUpdateDish = (e) => {
    e.preventDefault();
    const updated = dishes.map((d) => (d.id === editingDish.id ? editingDish : d));
    setDishes(updated);
    localStorage.setItem('addis_eats_menu_dishes', JSON.stringify(updated));
    setEditingDish(null);
  };

  const confirmDeleteDish = () => {
    if (!deletingDishId) return;
    const updated = dishes.filter((d) => d.id !== deletingDishId);
    setDishes(updated);
    localStorage.setItem('addis_eats_menu_dishes', JSON.stringify(updated));
    setDeletingDishId(null);
  };

  const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.total) || 0), 0);
  const totalOrdersCount = orders.length;
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;

  const statusCounts = {
    Pending: orders.filter((o) => (o.status || 'Pending') === 'Pending').length,
    Preparing: orders.filter((o) => o.status === 'Preparing').length,
    'Out for Delivery': orders.filter((o) => o.status === 'Out for Delivery').length,
    Delivered: orders.filter((o) => o.status === 'Delivered').length,
  };

  const filteredDishes = dishes.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (d.category && d.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <p className="animate-pulse text-sm">Loading Admin Suite...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-6 shadow-xl">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white text-xl mx-auto">
              AE
            </div>
            <h1 className="text-2xl font-bold text-slate-100">Admin Portal Login</h1>
            <p className="text-slate-400 text-sm">Enter admin credentials to access the suite</p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                Admin Email
              </label>
              <input
                type="email"
                required
                placeholder="admin@addiseats.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                Admin Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter password (1234)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {error && <p className="text-red-400 text-xs font-medium">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm cursor-pointer"
            >
              Sign In to Admin Suite
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-lg">
            AE
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-100">Addis Eats</h1>
              <span className="text-xs bg-blue-900/60 text-blue-400 px-2 py-0.5 rounded font-semibold border border-blue-800">
                Admin Suite
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-1 flex gap-1">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'analytics' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              📊 Analytics
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'orders' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              📦 Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('menu')}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'menu' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🍲 Menu CRUD ({dishes.length})
            </button>
          </div>

          <button
            onClick={() => router.push('/menu')}
            className="text-xs text-slate-400 hover:text-slate-200 px-3 py-2 rounded-lg border border-slate-800 hover:bg-slate-900 transition-colors cursor-pointer"
          >
            ← Exit
          </button>

          <button
            onClick={handleAdminLogout}
            className="text-xs text-red-400 hover:text-red-300 px-3 py-2 rounded-lg border border-red-950 bg-red-950/30 hover:bg-red-950/60 transition-colors cursor-pointer font-medium"
          >
            Sign Out
          </button>
        </div>
      </header>

      {activeTab === 'analytics' && (
        <main className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-100">Dashboard Overview</h2>
            <p className="text-slate-400 text-sm">Real-time performance metrics and order status distribution.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Revenue</p>
              <p className="text-3xl font-extrabold text-blue-500">{totalRevenue} <span className="text-lg">ETB</span></p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Orders</p>
              <p className="text-3xl font-extrabold text-slate-100">{totalOrdersCount}</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Average Order Value</p>
              <p className="text-3xl font-extrabold text-blue-500">{avgOrderValue} <span className="text-lg">ETB</span></p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
            <h3 className="font-bold text-slate-100">Order Status Distribution</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-950 border border-amber-900/40 p-4 rounded-lg text-center">
                <p className="text-xs text-amber-400 font-semibold mb-1">🕒 Pending</p>
                <p className="text-2xl font-bold text-slate-100">{statusCounts.Pending}</p>
              </div>
              <div className="bg-slate-950 border border-blue-900/40 p-4 rounded-lg text-center">
                <p className="text-xs text-blue-400 font-semibold mb-1">🍳 Preparing</p>
                <p className="text-2xl font-bold text-slate-100">{statusCounts.Preparing}</p>
              </div>
              <div className="bg-slate-950 border border-purple-900/40 p-4 rounded-lg text-center">
                <p className="text-xs text-purple-400 font-semibold mb-1">🛵 Out for Delivery</p>
                <p className="text-2xl font-bold text-slate-100">{statusCounts['Out for Delivery']}</p>
              </div>
              <div className="bg-slate-950 border border-green-900/40 p-4 rounded-lg text-center">
                <p className="text-xs text-green-400 font-semibold mb-1">✅ Delivered</p>
                <p className="text-2xl font-bold text-slate-100">{statusCounts.Delivered}</p>
              </div>
            </div>
          </div>
        </main>
      )}

      {activeTab === 'orders' && (
        <main className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-100">Order Management</h2>
            <p className="text-slate-400 text-sm">Track and update customer order statuses in real-time.</p>
          </div>

          {orders.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 p-12 rounded-xl text-center text-slate-500">
              No orders placed yet.
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <span className="font-mono text-xs text-blue-400 uppercase font-bold">Order #{order.id}</span>
                      <p className="text-xs text-slate-400">{order.date || 'Recent'}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400">Status:</span>
                      <select
                        value={order.status || 'Pending'}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Pending">🕒 Pending</option>
                        <option value="Preparing">🍳 Preparing</option>
                        <option value="Out for Delivery">🛵 Out for Delivery</option>
                        <option value="Delivered">✅ Delivered</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="font-semibold text-slate-300 mb-1">Customer Details:</p>
                      <p className="text-slate-400">{order.customerName || order.name || 'Walk-in Customer'}</p>
                      <p className="text-slate-400">{order.address || 'Addis Ababa'}</p>
                      <p className="text-slate-400">{order.phone || 'N/A'}</p>
                    </div>

                    <div>
                      <p className="font-semibold text-slate-300 mb-1">Ordered Items:</p>
                      <ul className="space-y-1 text-slate-400">
                        {(order.items || []).map((item, i) => (
                          <li key={i} className="flex justify-between">
                            <span>{item.quantity || 1}x {item.name}</span>
                            <span>{item.price} ETB</span>
                          </li>
                        ))}
                      </ul>
                      <div className="border-t border-slate-800 mt-2 pt-2 flex justify-between font-bold text-slate-200 text-sm">
                        <span>Total Paid:</span>
                        <span className="text-blue-400">{order.total || 0} ETB</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      )}

      {activeTab === 'menu' && (
        <main className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-100">Menu Management</h2>
              <p className="text-slate-400 text-sm">Add, edit, or remove dishes from the store menu.</p>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              + Add New Dish
            </button>
          </div>

          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search dishes by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish) => (
              <div key={dish.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-100">{dish.name}</h3>
                    <span className="text-sm font-bold text-blue-400">{dish.price} ETB</span>
                  </div>
                  {dish.category && (
                    <span className="inline-block text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-semibold uppercase">
                      {dish.category}
                    </span>
                  )}
                  <p className="text-slate-400 text-xs leading-relaxed">{dish.description}</p>
                </div>

                <div className="flex gap-2 pt-2 border-t border-slate-800">
                  <button
                    onClick={() => setEditingDish(dish)}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs py-1.5 rounded transition-colors cursor-pointer"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => setDeletingDishId(dish.id)}
                    className="flex-1 bg-red-950/40 hover:bg-red-900/60 text-red-400 text-xs py-1.5 rounded transition-colors cursor-pointer border border-red-900/40"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {showAddModal && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl max-w-md w-full space-y-4">
                <h3 className="text-lg font-bold text-slate-100">Add New Dish</h3>
                <form onSubmit={handleAddDish} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Dish Name"
                    value={newDish.name}
                    onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-xs text-slate-100"
                  />
                  <input
                    type="number"
                    required
                    placeholder="Price (ETB)"
                    value={newDish.price}
                    onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-xs text-slate-100"
                  />
                  <input
                    type="text"
                    placeholder="Category (e.g. Traditional, Sizzling)"
                    value={newDish.category}
                    onChange={(e) => setNewDish({ ...newDish, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-xs text-slate-100"
                  />
                  <textarea
                    placeholder="Description"
                    value={newDish.description}
                    onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-xs text-slate-100"
                  />
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2 text-xs text-slate-400 hover:text-slate-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                    >
                      Save Dish
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {editingDish && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl max-w-md w-full space-y-4">
                <h3 className="text-lg font-bold text-slate-100">Edit Dish</h3>
                <form onSubmit={handleUpdateDish} className="space-y-3">
                  <input
                    type="text"
                    required
                    value={editingDish.name}
                    onChange={(e) => setEditingDish({ ...editingDish, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-xs text-slate-100"
                  />
                  <input
                    type="number"
                    required
                    value={editingDish.price}
                    onChange={(e) => setEditingDish({ ...editingDish, price: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-xs text-slate-100"
                  />
                  <input
                    type="text"
                    value={editingDish.category || ''}
                    onChange={(e) => setEditingDish({ ...editingDish, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-xs text-slate-100"
                  />
                  <textarea
                    value={editingDish.description || ''}
                    onChange={(e) => setEditingDish({ ...editingDish, description: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-xs text-slate-100"
                  />
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingDish(null)}
                      className="px-4 py-2 text-xs text-slate-400 hover:text-slate-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                    >
                      Update Dish
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {deletingDishId && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl max-w-sm w-full text-center space-y-4">
                <p className="text-sm text-slate-200 font-semibold">Are you sure you want to delete this dish?</p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => setDeletingDishId(null)}
                    className="px-4 py-2 text-xs text-slate-400 hover:text-slate-200 border border-slate-800 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDeleteDish}
                    className="px-4 py-2 text-xs bg-red-600 text-white font-semibold rounded hover:bg-red-700"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      )}
    </div>
  );
}
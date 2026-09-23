import React, { useState, useEffect } from 'react';
import DishForm from './DishForm';
import { formatCurrency } from '../utils/formatCurrency';

export default function DishManager() {
  const [dishes, setDishes] = useState([]);
  const [search, setSearch] = useState('');
  const [editingDish, setEditingDish] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const savedDishes = JSON.parse(localStorage.getItem('addis_eats_dishes') || '[]');
    if (savedDishes.length > 0) {
      setDishes(savedDishes);
    } else {
      fetch('/menu-data.json')
        .then((res) => res.json())
        .then((data) => {
          setDishes(data);
          localStorage.setItem('addis_eats_dishes', JSON.stringify(data));
        })
        .catch((err) => console.error('Failed to seed menu data', err));
    }
  }, []);

  const saveToStorage = (updated) => {
    setDishes(updated);
    localStorage.setItem('addis_eats_dishes', JSON.stringify(updated));
  };

  const handleSaveDish = (dish) => {
    const exists = dishes.some((d) => d.id === dish.id);
    let updated;
    if (exists) {
      updated = dishes.map((d) => (d.id === dish.id ? dish : d));
    } else {
      updated = [dish, ...dishes];
    }
    saveToStorage(updated);
    setIsFormOpen(false);
    setEditingDish(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this dish?')) {
      const updated = dishes.filter((d) => d.id !== id);
      saveToStorage(updated);
    }
  };

  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Dish Manager</h2>
        <button onClick={() => { setEditingDish(null); setIsFormOpen(true); }} className="add-to-cart-btn">
          + Add New Dish
        </button>
      </div>

      <input
        type="text"
        placeholder="Search dishes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
      />

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ padding: '0.75rem' }}>Name</th>
            <th style={{ padding: '0.75rem' }}>Category</th>
            <th style={{ padding: '0.75rem' }}>Price</th>
            <th style={{ padding: '0.75rem' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDishes.map((dish) => (
            <tr key={dish.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '0.75rem' }}>{dish.name}</td>
              <td style={{ padding: '0.75rem' }}>{dish.category}</td>
              <td style={{ padding: '0.75rem' }}>{formatCurrency(dish.price)}</td>
              <td style={{ padding: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => { setEditingDish(dish); setIsFormOpen(true); }} style={{ padding: '0.25rem 0.5rem', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => handleDelete(dish.id)} style={{ padding: '0.25rem 0.5rem', color: '#ef4444', cursor: 'pointer' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isFormOpen && (
        <DishForm
          initialData={editingDish}
          onSubmit={handleSaveDish}
          onClose={() => { setIsFormOpen(false); setEditingDish(null); }}
        />
      )}
    </div>
  );
}
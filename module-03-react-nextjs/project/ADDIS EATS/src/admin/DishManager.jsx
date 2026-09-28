import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/formatCurrency';

export default function DishManager() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Ethiopian');
  const [image, setImage] = useState('');

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const savedDishes = localStorage.getItem('addis_eats_custom_dishes');
    if (savedDishes) {
      setDishes(JSON.parse(savedDishes));
      setLoading(false);
    } else {
      fetch('/menu-data.json')
        .then((res) => res.json())
        .then((data) => {
          setDishes(data);
          localStorage.setItem('addis_eats_custom_dishes', JSON.stringify(data));
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, []);

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setCategory('Ethiopian');
    setImage('');
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) return;

    if (editingId) {
      const updatedDishes = dishes.map((dish) => {
        if (dish.id === editingId) {
          return {
            ...dish,
            name,
            price: parseFloat(price),
            category,
            image: image || dish.image || 'https://via.placeholder.com/150',
            slug: generateSlug(name)
          };
        }
        return dish;
      });

      setDishes(updatedDishes);
      localStorage.setItem('addis_eats_custom_dishes', JSON.stringify(updatedDishes));
    } else {
      const newDish = {
        id: `dish-${Date.now()}`,
        slug: generateSlug(name),
        name,
        price: parseFloat(price),
        category,
        image: image || 'https://via.placeholder.com/150'
      };

      const updatedDishes = [newDish, ...dishes];
      setDishes(updatedDishes);
      localStorage.setItem('addis_eats_custom_dishes', JSON.stringify(updatedDishes));
    }

    resetForm();
  };

  const handleEditClick = (dish) => {
    setEditingId(dish.id);
    setName(dish.name);
    setPrice(dish.price);
    setCategory(dish.category || 'Ethiopian');
    setImage(dish.image || '');
  };

  const handleDeleteDish = (id) => {
    if (window.confirm('Are you sure you want to delete this dish?')) {
      const updated = dishes.filter((dish) => dish.id !== id);
      setDishes(updated);
      localStorage.setItem('addis_eats_custom_dishes', JSON.stringify(updated));
      
      if (editingId === id) {
        resetForm();
      }
    }
  };

  if (loading) return <div>Loading dishes...</div>;

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Dish Manager</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          gap: '0.75rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          alignItems: 'center',
          backgroundColor: editingId ? '#fffbebfb' : '#f9fafb',
          padding: '1rem',
          borderRadius: '8px',
          border: editingId ? '1px solid #f59e0b' : '1px solid #e5e7eb',
          transition: 'all 0.2s ease'
        }}
      >
        <input
          type="text"
          placeholder="Dish Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db' }}
        />
        <input
          type="number"
          placeholder="Price (ETB)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', width: '120px' }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db' }}
        >
          <option value="Ethiopian">Ethiopian</option>
          <option value="Pizza">Pizza</option>
          <option value="Burgers">Burgers</option>
          <option value="Drinks">Drinks</option>
        </select>
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', flex: 1 }}
        />
        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: editingId ? '#2563eb' : '#d97706',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {editingId ? 'Update Dish' : 'Add Dish'}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#6b7280',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {dishes.length === 0 ? (
        <p style={{ color: '#6b7280' }}>No dishes available.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '0.75rem' }}>Image</th>
              <th style={{ padding: '0.75rem' }}>Name</th>
              <th style={{ padding: '0.75rem' }}>Category</th>
              <th style={{ padding: '0.75rem' }}>Price</th>
              <th style={{ padding: '0.75rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dishes.map((dish) => (
              <tr key={dish.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '0.75rem' }}>
                  <img
                    src={dish.image}
                    alt={dish.name}
                    style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                </td>
                <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{dish.name}</td>
                <td style={{ padding: '0.75rem' }}>{dish.category}</td>
                <td style={{ padding: '0.75rem' }}>{formatCurrency(dish.price)}</td>
                <td style={{ padding: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleEditClick(dish)}
                    style={{
                      padding: '0.25rem 0.5rem',
                      color: '#2563eb',
                      border: '1px solid #2563eb',
                      backgroundColor: 'transparent',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteDish(dish.id)}
                    style={{
                      padding: '0.25rem 0.5rem',
                      color: '#dc2626',
                      border: '1px solid #dc2626',
                      backgroundColor: 'transparent',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/formatCurrency';

export default function DishManager() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Ethiopian');
  const [image, setImage] = useState('');

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

  const handleAddDish = (e) => {
    e.preventDefault();
    if (!name || !price) return;

    const newDish = {
      id: `dish-${Date.now()}`,
      name,
      price: parseFloat(price),
      category,
      image: image || 'https://via.placeholder.com/150'
    };

    const updatedDishes = [newDish, ...dishes];
    setDishes(updatedDishes);
    localStorage.setItem('addis_eats_custom_dishes', JSON.stringify(updatedDishes));

    setName('');
    setPrice('');
    setImage('');
  };

  const handleDeleteDish = (id) => {
    if (window.confirm('Are you sure you want to delete this dish?')) {
      const updated = dishes.filter((dish) => dish.id !== id);
      setDishes(updated);
      localStorage.setItem('addis_eats_custom_dishes', JSON.stringify(updated));
    }
  };

  if (loading) return <div>Loading dishes...</div>;

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Dish Manager</h2>

      <form
        onSubmit={handleAddDish}
        style={{
          display: 'flex',
          gap: '0.75rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          alignItems: 'center',
          backgroundColor: '#f9fafb',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
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
            backgroundColor: '#d97706',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Add Dish
        </button>
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
                <td style={{ padding: '0.75rem' }}>
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
import React, { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { Link } from 'react-router-dom';

export default function Menu() {
  const { data: dishes, loading, error } = useFetch('/menu-data.json');
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (loading) return <div className="loading-state">Loading menu...</div>;
  if (error) return <div className="error-state">Error loading menu: {error}</div>;

  const categories = ['All', 'Ethiopian', 'Pizza', 'Burgers', 'Drinks'];

  const filteredDishes = selectedCategory === 'All'
    ? dishes
    : dishes?.filter((dish) => dish.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="menu-page">
      <h1>Addis Eats Menu</h1>
      <p>Explore delicious options across traditional and international favorites.</p>

      <div className="category-bar" style={{ display: 'flex', gap: '0.5rem', margin: '1.5rem 0' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={selectedCategory === cat ? 'active-cat-btn' : 'cat-btn'}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              border: '1px solid #e5e7eb',
              background: selectedCategory === cat ? '#d97706' : '#fff',
              color: selectedCategory === cat ? '#fff' : '#374151',
              cursor: 'pointer'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="dish-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {filteredDishes?.map((dish) => {
          const fav = isFavorite(dish.id);

          return (
            <div key={dish.id} className="dish-card" style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', position: 'relative', background: '#fff' }}>
              <div style={{ position: 'relative', height: '180px' }}>
                <img src={dish.image} alt={dish.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                
                <button
                  onClick={() => toggleFavorite(dish.id)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: '#ffffff',
                    border: 'none',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
                  }}
                  aria-label="Toggle favorite"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill={fav ? '#ef4444' : 'none'}
                    stroke={fav ? '#ef4444' : '#9ca3af'}
                    strokeWidth="2"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              </div>

              <div style={{ padding: '1rem' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{dish.name}</h3>
                <p style={{ fontWeight: 'bold', color: '#d97706', margin: '0 0 1rem 0' }}>{dish.price} ETB</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Link to={`/menu/${dish.id}`} style={{ color: '#d97706', fontSize: '0.875rem', textDecoration: 'none' }}>
                    Details
                  </Link>
                  <button
                    onClick={() => addToCart(dish)}
                    style={{
                      background: '#d97706',
                      color: '#fff',
                      border: 'none',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
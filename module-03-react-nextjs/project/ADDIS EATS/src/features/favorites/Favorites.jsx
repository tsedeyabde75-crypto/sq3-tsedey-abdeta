import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const { data: dishes, loading, error } = useFetch('/menu-data.json');
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  if (loading) return <div className="loading-state">Loading favorites...</div>;
  if (error) return <div className="error-state">Error: {error}</div>;

  const favoriteDishes = dishes?.filter((d) => favorites.includes(d.id)) || [];

  if (favoriteDishes.length === 0) {
    return (
      <div className="empty-cart-view">
        <h2>No Favorite Dishes Yet ❤️</h2>
        <p>Explore the menu and tap the heart icon to save your favorite dishes here.</p>
        <Link to="/menu" className="primary-cta-btn">Browse Menu</Link>
      </div>
    );
  }

  return (
    <div className="menu-page">
      <h1>Your Favorite Dishes</h1>
      <div className="dish-grid" style={{ marginTop: '1.5rem' }}>
        {favoriteDishes.map((dish) => (
          <div key={dish.id} className="dish-card">
            <div className="dish-image-wrapper">
              <img src={dish.image} alt={dish.name} className="dish-image" />
              <button
                onClick={() => toggleFavorite(dish.id)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer'
                }}
              >
                ❤️
              </button>
            </div>
            <div className="dish-info">
              <div className="dish-title-row">
                <h3 className="dish-title">{dish.name}</h3>
                <span className="dish-price">{dish.price} ETB</span>
              </div>
              <p className="dish-description">{dish.description}</p>
              <div className="dish-footer">
                <Link to={`/menu/${dish.id}`} style={{ color: '#d97706', fontSize: '0.875rem' }}>Details</Link>
                <button className="add-to-cart-btn" onClick={() => addToCart(dish)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
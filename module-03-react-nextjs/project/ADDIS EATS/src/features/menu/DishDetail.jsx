import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { formatCurrency } from '../../utils/formatCurrency';

export default function DishDetail() {
  const { slug } = useParams();
  const { data: dishes, loading, error } = useFetch('/menu-data.json');
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  if (loading) return <div className="loading-state">Loading dish details...</div>;
  if (error) return <div className="error-state">Error loading dish: {error}</div>;

  const dish = dishes?.find(
    (d) => d.slug === slug || String(d.id) === String(slug)
  );

  if (!dish) {
    return (
      <div className="empty-cart-view">
        <h2>Dish Not Found</h2>
        <Link to="/menu" className="primary-cta-btn">Back to Menu</Link>
      </div>
    );
  }

  const fav = isFavorite(dish.id);

  return (
    <div className="cart-page" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/menu" style={{ color: '#d97706', textDecoration: 'none', fontWeight: 'bold' }}>
        ← Back to Menu
      </Link>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1.5rem', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <img
            src={dish.image}
            alt={dish.name}
            style={{ width: '100%', borderRadius: '12px', objectFit: 'cover', maxHeight: '350px' }}
          />
          <button
            onClick={() => toggleFavorite(dish.id)}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              fontSize: '1.2rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}
          >
            {fav ? '❤️' : '🤍'}
          </button>
        </div>

        <div>
          <span style={{ background: '#fef3c7', color: '#d97706', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>
            {dish.category}
          </span>
          <h1 style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>{dish.name}</h1>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d97706', marginBottom: '1rem' }}>
            {formatCurrency(dish.price)}
          </p>
          <p style={{ color: '#4b5563', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            {dish.description}
          </p>

          <button
            className="checkout-btn"
            onClick={() => addToCart(dish)}
            style={{ border: 'none', cursor: 'pointer', width: '100%' }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
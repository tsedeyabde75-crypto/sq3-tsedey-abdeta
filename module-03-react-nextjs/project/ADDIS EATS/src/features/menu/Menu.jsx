import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';

export default function Menu() {
  const [menuData, setMenuData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();

  useEffect(() => {
    fetch('/menu-data.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to load menu data');
        }
        return res.json();
      })
      .then((data) => {
        setMenuData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const categories = ['All', 'Ethiopian', 'Pizza', 'Burgers', 'Drinks'];

  const filteredDishes =
    selectedCategory === 'All'
      ? menuData
      : menuData.filter((dish) => dish.category.toLowerCase() === selectedCategory.toLowerCase());

  if (loading) return <div className="loading-state">Loading menu...</div>;
  if (error) return <div className="error-state">Error: {error}</div>;

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1>Addis Eats Menu</h1>
        <p>Explore delicious options across traditional and international favorites.</p>
      </div>

      <div className="category-filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="dish-grid">
        {filteredDishes.map((dish) => (
          <div key={dish.id} className="dish-card">
            <div className="dish-image-wrapper">
              <img src={dish.image} alt={dish.name} className="dish-image" />
              {dish.isSpicy && <span className="spicy-badge">🌶️ Spicy</span>}
            </div>
            <div className="dish-info">
              <div className="dish-title-row">
                <h3 className="dish-title">{dish.name}</h3>
                <span className="dish-price">{dish.price} ETB</span>
              </div>
              <p className="dish-description">{dish.description}</p>
              <div className="dish-footer">
                <span className="dish-category">{dish.category}</span>
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
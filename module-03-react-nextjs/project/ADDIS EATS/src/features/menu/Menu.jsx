import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Menu() {
  const [dishes, setDishes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/menu-data.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load menu data');
        return res.json();
      })
      .then((data) => {
        setDishes(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const categories = ['All', 'Ethiopian', 'Pizza', 'Burgers', 'Drinks'];

  const filteredDishes = selectedCategory === 'All'
    ? dishes
    : dishes.filter((dish) => dish.category === selectedCategory);

  if (loading) return <div className="status-message">Loading delicious menu...</div>;
  if (error) return <div className="status-message error">{error}</div>;

  return (
    <div className="menu-page">
      <header className="menu-header">
        <h1>Addis Eats Menu</h1>
        <p>Explore delicious options across traditional and international favorites.</p>
      </header>

      {/* Category Filter Bar */}
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

      {/* Dish Grid Layout */}
      <div className="dish-grid">
        {filteredDishes.map((dish) => (
          <article key={dish.id} className="dish-card">
            <div className="dish-image-wrapper">
              <img 
                src={dish.image} 
                alt={dish.name} 
                className="dish-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/400x300?text=' + encodeURIComponent(dish.name);
                }}
              />
              {dish.isSpicy && <span className="spicy-badge">🌶️ Spicy</span>}
            </div>

            <div className="dish-info">
              <div className="dish-title-row">
                <h2 className="dish-title">{dish.name}</h2>
                <span className="dish-price">{dish.price} ETB</span>
              </div>
              <p className="dish-description">{dish.description}</p>

              <div className="dish-footer">
                <span className="dish-category">{dish.category}</span>
                <Link to={`/menu/${dish.id}`} className="view-details-btn">
                  View Details &rarr;
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Banner Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-badge">Authentic Ethiopian Cuisine</span>
          <h1 className="hero-title">Experience the Rich Flavors of Addis Ababa</h1>
          <p className="hero-subtitle">
            From slow-cooked stews to fresh vegetarian platters, we bring traditional recipes straight to your table.
          </p>
          <div className="hero-actions">
            <Link to="/menu" className="hero-primary-btn">
              Explore Our Menu →
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights / Features Section */}
      <section className="features-section">
        <div className="feature-card">
          <div className="feature-icon">🍲</div>
          <h3>Authentic Recipes</h3>
          <p>Prepared using traditional herbs, spices, and time-honored cooking techniques.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Fast Delivery</h3>
          <p>Hot, fresh meals delivered straight to your door across Addis Ababa.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🌿</div>
          <h3>Fresh Ingredients</h3>
          <p>Locally sourced ingredients ensuring wholesome quality in every bite.</p>
        </div>
      </section>

      {/* Story / About Section */}
      <section className="about-preview-section">
        <div className="about-text-content">
          <h2>A Taste of Tradition</h2>
          <p>
            At Addis Eats, we are dedicated to celebrating the rich culinary heritage of Ethiopia. Whether you're craving doro wat, fresh beyaynetu, or sizzled tibs, every dish is crafted with passion.
          </p>
          <Link to="/menu" className="secondary-btn">
            Order Now
          </Link>
        </div>
      </section>
    </div>
  );
}
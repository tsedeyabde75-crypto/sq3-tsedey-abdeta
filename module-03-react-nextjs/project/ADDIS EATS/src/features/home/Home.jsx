import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <span className="hero-tagline">Authentic Ethiopian Cuisine</span>
            <h1>Experience the Rich Flavors of Addis Ababa</h1>
            <p>
              From slow-cooked stews to fresh vegetarian platters, 
              we bring traditional recipes straight to your table.
            </p>
            <Link to="/menu" className="primary-cta-btn">
              Explore Our Menu &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className="featured-intro-section">
        <div className="section-content">
          <h2>A Taste of Tradition</h2>
          <p>
            At Addis Eats, we are dedicated to celebrating the authentic 
            culinary heritage of Ethiopia. Every dish is crafted with love using traditional 
            techniques and genuine, flavorful spices.
          </p>
        </div>
      </section>
    </div>
  );
}
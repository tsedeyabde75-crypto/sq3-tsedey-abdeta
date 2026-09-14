import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-page">
      <h2>Welcome to Addis Eats</h2>
      <p>Order great food across Addis Ababa delivered straight to your door.</p>
      <Link to="/menu" className="btn-primary">
        Explore Full Menu
      </Link>
    </div>
  );
}
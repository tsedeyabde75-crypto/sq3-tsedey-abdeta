import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found-page">
      <h2>404 - Page Not Found</h2>
      <p>The page you requested could not be found.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}
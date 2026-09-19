import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="py-16 text-center space-y-4">
      <h1 className="text-6xl font-black text-amber-600">404</h1>
      <h2 className="text-2xl font-bold">Page Not Found</h2>
      <p className="text-gray-600">The route you navigated to does not exist.</p>
      <div>
        <Link to="/" className="text-amber-600 underline font-medium">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
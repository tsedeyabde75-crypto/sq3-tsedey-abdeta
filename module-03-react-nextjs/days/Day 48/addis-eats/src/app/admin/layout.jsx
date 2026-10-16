'use client';

import { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import Link from 'next/link';

export default function AdminLayout({ children }) {
  const { isAdminLoggedIn, isLoading, login, logout } = useAdmin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading Admin Portal...</div>;
  }

  if (!isAdminLoggedIn) {
    const handleLoginSubmit = (e) => {
      e.preventDefault();
      const success = login(email, password);
      if (!success) {
        setError('Invalid admin credentials. Use admin@addiseats.com / admin123');
      }
    };

    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md max-w-md w-full space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
            <p className="text-sm text-slate-500 mt-1">Sign in to manage Addis Eats</p>
          </div>

          {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@addiseats.com"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <span className="font-bold text-lg text-amber-400">Addis Eats Admin</span>
          <Link href="/admin" className="hover:text-amber-300 text-sm font-medium">
            Dashboard
          </Link>
          <Link href="/admin/menu" className="hover:text-amber-300 text-sm font-medium">
            Menu Management
          </Link>
        </div>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-xs px-3 py-1.5 rounded text-white font-medium transition-colors"
        >
          Logout
        </button>
      </nav>
      <div className="max-w-6xl mx-auto p-6">{children}</div>
    </div>
  );
}
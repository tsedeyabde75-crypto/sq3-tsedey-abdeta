'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || searchParams.get('redirect') || '/checkout';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password === '1234') {
      const farFutureDate = new Date();
      farFutureDate.setTime(farFutureDate.getTime() + 30 * 24 * 60 * 60 * 1000);
      const expires = `expires=${farFutureDate.toUTCString()}`;

      document.cookie = `session_token=authenticated_user_token; path=/; ${expires}; SameSite=Lax`;
      document.cookie = `user_email=${encodeURIComponent(email)}; path=/; ${expires}; SameSite=Lax`;

      const userSession = {
        email,
        name: email.split('@')[0] || 'User',
        isLoggedIn: true,
        password: '1234',
      };

      localStorage.setItem('addis_eats_user', JSON.stringify(userSession));
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);

      setIsLoading(false);
      router.push(callbackUrl);
      router.refresh();
    } else {
      setIsLoading(false);
      setError('Invalid credentials. Password must be 1234.');
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 px-4">
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">Sign In to Addis Eats</h1>
          <p className="text-slate-600 text-sm">
            Enter your email and password to access your account.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from './useAdminAuth';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid admin credentials (Use admin / admin123)');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', border: '1px solid var(--border-color)', borderRadius: '10px', backgroundColor: 'var(--bg-card)' }}>
      <h2>Admin Login</h2>
      {error && <p style={{ color: '#ef4444', fontSize: '0.9rem' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem' }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
            required
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
            required
          />
        </div>
        <button type="submit" className="add-to-cart-btn" style={{ marginTop: '0.5rem' }}>
          Sign In
        </button>
      </form>
    </div>
  );
}
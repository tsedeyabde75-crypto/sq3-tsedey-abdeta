import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      style={{
        background: 'transparent',
        border: '1px solid var(--border-color)',
        borderRadius: '50%',
        width: '36px',
        height: '36px',
        cursor: 'pointer',
        fontSize: '1.1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-color)',
      }}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
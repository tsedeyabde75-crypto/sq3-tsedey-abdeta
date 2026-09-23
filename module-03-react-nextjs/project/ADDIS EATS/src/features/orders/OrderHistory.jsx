import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

export default function OrderHistory() {
  const [orders] = useState(() => {
    const saved = localStorage.getItem('addis_eats_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleReorder = (items) => {
    items.forEach((item) => {
      addToCart(item);
    });
    navigate('/cart');
  };

  if (orders.length === 0) {
    return (
      <div className="empty-cart-view" style={{ textAlign: 'center', margin: '3rem auto' }}>
        <h2>No Past Orders</h2>
        <p>Place your first order from the menu!</p>
        <Link to="/menu" style={{ color: '#d97706', fontWeight: 'bold' }}>Explore Menu</Link>
      </div>
    );
  }

  return (
    <div className="cart-page" style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Order History</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
        {orders.map((order) => (
          <div 
            key={order.id} 
            style={{ 
              border: '1px solid #e5e7eb', 
              borderRadius: '8px', 
              padding: '1.5rem', 
              backgroundColor: '#fff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)' 
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <strong style={{ fontSize: '1.1rem' }}>{order.id}</strong>
                <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '0.2rem' }}>
                  {order.date} • 🕒 Est. Delivery: {order.estimatedDelivery || '30-45 mins'}
                </div>
              </div>
              <button
                onClick={() => handleReorder(order.items)}
                style={{
                  background: '#d97706',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.6rem 1rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                Reorder Items 🔄
              </button>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              {order.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                  <span>{item.name} × {item.quantity || 1}</span>
                  <span>{item.price * (item.quantity || 1)} ETB</span>
                </div>
              ))}
            </div>

            {order.specialNotes && (
              <div style={{ backgroundColor: '#f3f4f6', padding: '0.5rem 0.75rem', borderRadius: '4px', fontSize: '0.875rem', color: '#4b5563', marginBottom: '1rem' }}>
                <strong>Note:</strong> "{order.specialNotes}"
              </div>
            )}

            <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '0.8rem 0' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.05rem' }}>
              <span>Total Paid</span>
              <span>{order.total} ETB</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
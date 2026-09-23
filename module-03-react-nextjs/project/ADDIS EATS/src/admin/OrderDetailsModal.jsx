import React from 'react';
import { formatCurrency } from '../utils/formatCurrency';

export default function OrderDetailsModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: 'var(--bg-card)', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '500px', border: '1px solid var(--border-color)' }}>
        <h3 style={{ marginBottom: '1rem' }}>Order Details #{order.id}</h3>
        
        <div style={{ marginBottom: '1rem', fontSize: '0.9rem', lineHeight: '1.5' }}>
          <p><strong>Customer:</strong> {order.fullName || 'N/A'}</p>
          <p><strong>Phone:</strong> {order.phone || 'N/A'}</p>
          <p><strong>Address/Area:</strong> {order.deliveryAddress || 'N/A'}</p>
          {order.specialNotes && <p><strong>Notes:</strong> {order.specialNotes}</p>}
        </div>

        <h4>Items</h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0 1rem 0' }}>
          {order.items?.map((item, idx) => (
            <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
              <span>{item.name} x {item.quantity}</span>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
          <span>Total:</span>
          <span>{formatCurrency(order.total)}</span>
        </div>

        <button onClick={onClose} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }} className="add-to-cart-btn">
          Close
        </button>
      </div>
    </div>
  );
}
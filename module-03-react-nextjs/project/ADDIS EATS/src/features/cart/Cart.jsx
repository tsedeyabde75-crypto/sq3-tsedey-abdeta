import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const deliveryFee = subtotal > 0 ? 100 : 0;
  const total = subtotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>Your Cart is Empty</h2>
        <p>Explore our delicious menu to add items.</p>
        <Link to="/menu" style={{ color: '#d97706', fontWeight: 'bold' }}>Browse Menu</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Your Order</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginTop: '1.5rem' }}>
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                marginBottom: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', borderRadius: '6px', objectFit: 'cover' }} />
                <div>
                  <h3 style={{ margin: 0, fontSize: '1rem' }}>{item.name}</h3>
                  <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>{formatCurrency(item.price)}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '0.2rem 0.5rem' }}>
                  <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>-</button>
                  <span>{item.quantity || 1}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+</button>
                </div>

                <strong style={{ color: '#d97706' }}>{formatCurrency(item.price * (item.quantity || 1))}</strong>

                <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.2rem' }}>
                  ✕
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            style={{ padding: '0.5rem 1rem', border: '1px solid #ef4444', color: '#ef4444', backgroundColor: 'transparent', borderRadius: '6px', cursor: 'pointer' }}
          >
            Clear Cart
          </button>
        </div>

        <div style={{ border: '1px solid #e5e7eb', padding: '1.5rem', borderRadius: '8px', height: 'fit-content', backgroundColor: '#fafafa' }}>
          <h3>Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5rem 0' }}>
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5rem 0' }}>
            <span>Delivery Fee</span>
            <span>{formatCurrency(deliveryFee)}</span>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '1rem 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '1rem' }}>
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            style={{ width: '100%', padding: '0.75rem', backgroundColor: '#d97706', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
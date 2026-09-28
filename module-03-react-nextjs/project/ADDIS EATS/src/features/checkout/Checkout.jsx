import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';

export default function Checkout() {
  const { cart = [], clearCart } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    deliveryArea: 'Bole',
    deliveryNotes: ''
  });

  const deliveryTimes = {
    Bole: '25 - 35 mins',
    Kazanchis: '30 - 40 mins',
    Piazza: '35 - 45 mins',
    CMC: '40 - 50 mins',
    Sarbet: '30 - 40 mins',
    'Akaki Kality': '45 - 60 mins'
  };

  const currentDeliveryTime = deliveryTimes[formData.deliveryArea] || '30 - 45 mins';

  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const deliveryFee = cart.length > 0 ? 50 : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) return;

    const newOrder = {
      orderId: `ORD-${Date.now().toString().slice(-6)}`,
      items: [...cart],
      subtotal,
      deliveryFee,
      totalAmount: grandTotal,
      estimatedDelivery: currentDeliveryTime,
      customer: { ...formData },
      date: new Date().toLocaleDateString()
    };

    try {
      const existingOrders = JSON.parse(localStorage.getItem('addis_eats_orders') || '[]');
      localStorage.setItem('addis_eats_orders', JSON.stringify([newOrder, ...existingOrders]));
    } catch (err) {
      console.error('Failed to save order to localStorage:', err);
    }

    setOrderDetails(newOrder);
    setIsSubmitted(true);

    if (typeof clearCart === 'function') {
      clearCart();
    }
  };

  if (isSubmitted && orderDetails) {
    return (
      <div
        style={{
          maxWidth: '550px',
          margin: '2rem auto',
          padding: '2rem',
          backgroundColor: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '12px',
          textAlign: 'center'
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎉</div>
        <h2 style={{ color: '#166534', marginBottom: '0.5rem' }}>
          Order Confirmed!
        </h2>
        <p style={{ color: '#15803d', marginBottom: '1.5rem' }}>
          Thank you, <strong>{orderDetails.customer.name}</strong>! Your order has been placed successfully.
        </p>

        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '1.25rem',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            textAlign: 'left',
            marginBottom: '1.5rem'
          }}
        >
          <p style={{ margin: '0 0 0.5rem 0' }}>
            <strong>Order ID:</strong> #{orderDetails.orderId}
          </p>
          <p style={{ margin: '0 0 0.5rem 0' }}>
            <strong>Delivery Area:</strong> {orderDetails.customer.deliveryArea}
          </p>
          <p style={{ margin: '0 0 0.5rem 0', color: '#2563eb', fontWeight: 'bold' }}>
            <strong>Estimated Delivery:</strong> ⏱️ {orderDetails.estimatedDelivery}
          </p>
          {orderDetails.customer.deliveryNotes && (
            <p style={{ margin: '0 0 0.5rem 0' }}>
              <strong>Delivery Notes:</strong> {orderDetails.customer.deliveryNotes}
            </p>
          )}

          <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '0.75rem 0' }} />

          <p style={{ fontWeight: 'bold', margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}>Items Ordered:</p>
          <ul style={{ paddingLeft: '1.25rem', margin: '0 0 0.75rem 0', fontSize: '0.9rem', color: '#374151' }}>
            {orderDetails.items.map((item) => (
              <li key={item.id}>
                {item.name} × {item.quantity || 1} ({formatCurrency(item.price * (item.quantity || 1))})
              </li>
            ))}
          </ul>

          <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '0.75rem 0' }} />
          <p style={{ margin: 0, fontWeight: 'bold', color: '#d97706', fontSize: '1.1rem' }}>
            Total Paid: {formatCurrency(orderDetails.totalAmount)}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button
            onClick={() => navigate('/menu')}
            style={{
              padding: '0.65rem 1.25rem',
              backgroundColor: '#d97706',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Back to Menu
          </button>
          <button
            onClick={() => navigate('/orders')}
            style={{
              padding: '0.65rem 1.25rem',
              backgroundColor: '#fff',
              color: '#374151',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            View Order History
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '1rem', textAlign: 'center' }}>
        <p style={{ color: '#6b7280' }}>
          Your cart is empty. <Link to="/menu" style={{ color: '#d97706' }}>Browse Menu</Link>
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '1rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.75rem', fontWeight: 'bold' }}>
        Addis Eats Checkout
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'start'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Abebe Bikila"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                fontSize: '0.95rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>TeleBirr Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="0911223344 or +251911223344"
              value={formData.phone}
              onChange={handleChange}
              required
              style={{
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                fontSize: '0.95rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Delivery Area</label>
            <select
              name="deliveryArea"
              value={formData.deliveryArea}
              onChange={handleChange}
              style={{
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                backgroundColor: '#f9fafb',
                fontSize: '0.95rem'
              }}
            >
              <option value="Bole">Bole</option>
              <option value="Kazanchis">Kazanchis</option>
              <option value="Piazza">Piazza</option>
              <option value="CMC">CMC</option>
              <option value="Sarbet">Sarbet</option>
              <option value="Akaki Kality">Akaki Kality</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Delivery Notes (Optional)</label>
            <textarea
              name="deliveryNotes"
              placeholder="e.g. Near Edna Mall, 2nd floor"
              value={formData.deliveryNotes}
              onChange={handleChange}
              rows="3"
              style={{
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                fontSize: '0.95rem',
                fontFamily: 'inherit'
              }}
            />
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>
            Order Summary
          </h3>

          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                justify: 'space-between',
                fontSize: '0.9rem',
                color: '#4b5563'
              }}
            >
              <span>{item.name} × {item.quantity || 1}</span>
              <span>{formatCurrency(item.price * (item.quantity || 1))}</span>
            </div>
          ))}

          <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '0.5rem 0' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
            <span>Delivery Fee</span>
            <span>{formatCurrency(deliveryFee)}</span>
          </div>

          <div
            style={{
              display: 'flex',
              justify: 'space-between',
              fontSize: '0.9rem',
              backgroundColor: '#eff6ff',
              padding: '0.5rem 0.75rem',
              borderRadius: '6px',
              color: '#1d4ed8',
              fontWeight: '500',
              marginTop: '0.25rem'
            }}
          >
            <span>Est. Delivery Time</span>
            <span>⏱️ {currentDeliveryTime}</span>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '0.5rem 0' }} />

          <div
            style={{
              display: 'flex',
              justify: 'space-between',
              fontWeight: 'bold',
              fontSize: '1.05rem',
              color: '#111827'
            }}
          >
            <span>Total</span>
            <span style={{ color: '#d97706' }}>{formatCurrency(grandTotal)}</span>
          </div>

          <button
            type="submit"
            style={{
              marginTop: '1rem',
              padding: '0.85rem',
              backgroundColor: '#d97706',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Order {formatCurrency(grandTotal)}
          </button>
        </div>
      </form>
    </div>
  );
}
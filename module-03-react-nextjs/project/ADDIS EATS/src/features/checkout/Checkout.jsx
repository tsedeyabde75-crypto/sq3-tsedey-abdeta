import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    deliveryAddress: '',
    specialNotes: '',
    paymentMethod: 'cash',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 100 : 0;
  const total = subtotal + deliveryFee;

  const calculateDeliveryTime = (itemCount, address) => {
    const basePrepTime = 20;
    const additionalTimePerItem = 5;
    let distanceExtraMinutes = 0;

    const lowerAddress = address.toLowerCase();

    if (lowerAddress.includes('akaki') || lowerAddress.includes('kality') || lowerAddress.includes('cmc')) {
      distanceExtraMinutes = 20;
    } else if (lowerAddress.includes('bole') || lowerAddress.includes('kazanchis')) {
      distanceExtraMinutes = 10;
    } else if (address.trim().length > 5) {
      distanceExtraMinutes = 15;
    }

    const minTime = basePrepTime + itemCount * additionalTimePerItem + distanceExtraMinutes;
    const maxTime = minTime + 15;

    return `${minTime} – ${maxTime} mins`;
  };

  const estimatedDelivery = calculateDeliveryTime(totalItems, formData.deliveryAddress);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleString(),
      items: cart,
      total,
      estimatedDelivery,
      specialNotes: formData.specialNotes.trim(),
      status: 'Preparing',
    };

    const existingOrders = JSON.parse(localStorage.getItem('addis_eats_orders') || '[]');
    localStorage.setItem('addis_eats_orders', JSON.stringify([newOrder, ...existingOrders]));

    setIsSubmitted(true);
    clearCart();

    setTimeout(() => {
      navigate('/orders');
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
        <h2 style={{ color: '#059669', marginBottom: '0.5rem' }}>Order Placed Successfully!</h2>
        <p style={{ color: '#4b5563', fontSize: '1.1rem' }}>
          Thank you for ordering with Addis Eats. Redirecting you to your Order History...
        </p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>Your Cart is Empty</h2>
        <p>Add some items to your cart before proceeding to checkout.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Checkout</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1.5rem' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold' }}>Full Name</label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold' }}>Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold' }}>Delivery Address</label>
            <textarea
              name="deliveryAddress"
              required
              rows="3"
              placeholder="e.g. Bole, Akaki Kality, CMC..."
              value={formData.deliveryAddress}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold' }}>Special Instructions / Notes</label>
            <textarea
              name="specialNotes"
              rows="2"
              placeholder="e.g. Make it extra spicy, call upon arrival..."
              value={formData.specialNotes}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: '#d97706',
              color: '#fff',
              padding: '0.75rem',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Place Order ({formatCurrency(total)})
          </button>
        </form>

        <div style={{ border: '1px solid #e5e7eb', padding: '1.5rem', borderRadius: '8px', backgroundColor: '#f9fafb', height: 'fit-content' }}>
          <h2>Order Summary</h2>
          
          <div style={{ margin: '1rem 0', padding: '0.75rem', backgroundColor: '#fef3c7', borderRadius: '6px', border: '1px solid #fde68a' }}>
            <strong style={{ color: '#b45309' }}>
              🕒 {formData.deliveryAddress.trim() ? 'Estimated Delivery Time:' : 'Estimated Time (Base):'}
            </strong>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#92400e', marginTop: '0.25rem' }}>
              {estimatedDelivery}
            </div>
          </div>

          {cart.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>{item.name} x {item.quantity}</span>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}

          <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '1rem 0' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Delivery Fee</span>
            <span>{formatCurrency(deliveryFee)}</span>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '1rem 0' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.1rem' }}>
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
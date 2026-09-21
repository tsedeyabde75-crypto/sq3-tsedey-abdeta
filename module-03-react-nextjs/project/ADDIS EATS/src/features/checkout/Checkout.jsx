import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const { cart, subtotal, deliveryFee, grandTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    paymentMethod: 'cash'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^(09|07|\+251)\d{8}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Enter a valid phone number (e.g., 0911223344 or +251911223344).';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Delivery address is required.';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newOrder = {
      id: 'ORD-' + Date.now(),
      date: new Date().toISOString(),
      items: cart,
      total: grandTotal,
      customer: formData
    };

    const existingOrders = JSON.parse(localStorage.getItem('addis_eats_orders') || '[]');
    localStorage.setItem('addis_eats_orders', JSON.stringify([newOrder, ...existingOrders]));

    setIsSubmitted(true);
    clearCart();
  };

  if (isSubmitted) {
    return (
      <div className="empty-cart-view">
        <h2 style={{ color: '#059669' }}>Order Placed Successfully! 🎉</h2>
        <p>Thank you, {formData.fullName}. Your order is being prepared and will be delivered shortly.</p>
        <Link to="/menu" className="primary-cta-btn">
          Back to Menu
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="empty-cart-view">
        <h2>Your Cart is Empty</h2>
        <p>You need to add items to your cart before proceeding to checkout.</p>
        <Link to="/menu" className="primary-cta-btn">
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Checkout</h1>
      <div className="cart-layout">
        <form className="cart-items-list" onSubmit={handleSubmit} noValidate>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Delivery Information</h2>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.4rem' }}>
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Abebe Bikila"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '6px',
                border: errors.fullName ? '1px solid #ef4444' : '1px solid #d1d5db'
              }}
            />
            {errors.fullName && <span style={{ color: '#ef4444', fontSize: '0.85rem' }}>{errors.fullName}</span>}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.4rem' }}>
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0911223344"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '6px',
                border: errors.phone ? '1px solid #ef4444' : '1px solid #d1d5db'
              }}
            />
            {errors.phone && <span style={{ color: '#ef4444', fontSize: '0.85rem' }}>{errors.phone}</span>}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.4rem' }}>
              Delivery Address
            </label>
            <textarea
              name="address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              placeholder="Subcity, Woreda, or nearby landmark"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '6px',
                border: errors.address ? '1px solid #ef4444' : '1px solid #d1d5db'
              }}
            />
            {errors.address && <span style={{ color: '#ef4444', fontSize: '0.85rem' }}>{errors.address}</span>}
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.4rem' }}>
              Payment Method
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid #d1d5db'
              }}
            >
              <option value="cash">Cash on Delivery</option>
              <option value="telebirr">Telebirr</option>
              <option value="cbe">CBE Birr</option>
            </select>
          </div>

          <button type="submit" className="checkout-btn" style={{ border: 'none', cursor: 'pointer', width: '100%' }}>
            Confirm & Place Order ({grandTotal} ETB)
          </button>
        </form>

        <div className="order-summary-card">
          <h2>Order Summary ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</h2>
          <div style={{ marginBottom: '1rem' }}>
            {cart.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>{item.name} × {item.quantity}</span>
                <span>{item.price * item.quantity} ETB</span>
              </div>
            ))}
          </div>
          <hr />
          <div className="summary-row" style={{ marginTop: '0.75rem' }}>
            <span>Subtotal</span>
            <span>{subtotal} ETB</span>
          </div>
          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>{deliveryFee} ETB</span>
          </div>
          <hr />
          <div className="summary-row grand-total">
            <span>Total</span>
            <span>{grandTotal} ETB</span>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart, subtotal, deliveryFee, grandTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="empty-cart-view">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any dishes to your order yet.</p>
        <Link to="/menu" className="primary-cta-btn">
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Order</h1>
      <div className="cart-layout">
        <div className="cart-items-list">
          {cart.map((item) => (
            <div key={item.id} className="cart-item-card">
              <img src={item.image} alt={item.name} className="cart-item-img" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p className="cart-item-price">{item.price} ETB</p>
              </div>
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
              </div>
              <p className="cart-item-total">{item.price * item.quantity} ETB</p>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                ✕
              </button>
            </div>
          ))}
          <button className="clear-cart-btn" onClick={clearCart}>
            Clear Cart
          </button>
        </div>

        <div className="order-summary-card">
          <h2>Summary</h2>
          <div className="summary-row">
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
          <Link to="/checkout" className="checkout-btn">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
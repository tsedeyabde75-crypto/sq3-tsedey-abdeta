import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/formatCurrency';
import OrderDetailsModal from './OrderDetailsModal';

export default function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('addis_eats_orders') || '[]');
    setOrders(savedOrders);
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('addis_eats_orders', JSON.stringify(updatedOrders));
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      const updatedOrders = orders.filter((order) => order.id !== orderId);
      setOrders(updatedOrders);
      localStorage.setItem('addis_eats_orders', JSON.stringify(updatedOrders));
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Order Manager</h2>

      {orders.length === 0 ? (
        <p style={{ color: '#6b7280' }}>No orders found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
              <th style={{ padding: '0.75rem' }}>Order ID</th>
              <th style={{ padding: '0.75rem' }}>Customer</th>
              <th style={{ padding: '0.75rem' }}>Total</th>
              <th style={{ padding: '0.75rem' }}>Status</th>
              <th style={{ padding: '0.75rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>#{order.id}</td>
                <td style={{ padding: '0.75rem' }}>{order.fullName || order.customerName || order.name || 'N/A'}</td>
                <td style={{ padding: '0.75rem' }}>{formatCurrency(order.total)}</td>
                <td style={{ padding: '0.75rem' }}>
                  <select
                    value={order.status || 'Pending'}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    style={{ padding: '0.25rem 0.5rem', borderRadius: '4px' }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Delivering">Delivering</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td style={{ padding: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => setSelectedOrder(order)} style={{ padding: '0.25rem 0.5rem', cursor: 'pointer' }}>
                    View
                  </button>
                  <button onClick={() => handleDeleteOrder(order.id)} style={{ padding: '0.25rem 0.5rem', color: '#dc2626', cursor: 'pointer' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
}
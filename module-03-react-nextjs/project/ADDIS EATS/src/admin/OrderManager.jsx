import React, { useState, useEffect } from 'react';
import OrderDetailsModal from './OrderDetailsModal';
import { formatCurrency } from '../utils/formatCurrency';

export default function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('addis_eats_orders') || '[]');
    setOrders(savedOrders);
  }, []);

  const updateStatus = (orderId, newStatus) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    setOrders(updated);
    localStorage.setItem('addis_eats_orders', JSON.stringify(updated));
  };

  const handleDelete = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      const updated = orders.filter((o) => o.id !== orderId);
      setOrders(updated);
      localStorage.setItem('addis_eats_orders', JSON.stringify(updated));
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Order Manager</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
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
                <td style={{ padding: '0.75rem' }}>#{order.id}</td>
                <td style={{ padding: '0.75rem' }}>{order.customerName}</td>
                <td style={{ padding: '0.75rem' }}>{formatCurrency(order.total)}</td>
                <td style={{ padding: '0.75rem' }}>
                  <select
                    value={order.status || 'Pending'}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Delivering">Delivering</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td style={{ padding: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => setSelectedOrder(order)} style={{ padding: '0.25rem 0.5rem', cursor: 'pointer' }}>View</button>
                  <button onClick={() => handleDelete(order.id)} style={{ padding: '0.25rem 0.5rem', color: '#ef4444', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
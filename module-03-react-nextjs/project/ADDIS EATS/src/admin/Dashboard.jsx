import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/formatCurrency';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('addis_eats_orders') || '[]');
    setOrders(savedOrders);
  }, []);

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const statusCounts = orders.reduce(
    (acc, order) => {
      const status = order.status || 'Pending';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    { Pending: 0, Preparing: 0, Delivering: 0, Delivered: 0 }
  );

  const itemCounts = {};
  orders.forEach((order) => {
    order.items?.forEach((item) => {
      itemCounts[item.name] = (itemCounts[item.name] || 0) + item.quantity;
    });
  });

  const topDishes = Object.entries(itemCounts)
    .map(([name, quantity]) => ({ name, quantity }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Dashboard Overview</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
          <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>Total Revenue</p>
          <h3 style={{ color: 'var(--brand-orange)', fontSize: '1.5rem' }}>{formatCurrency(totalRevenue)}</h3>
        </div>
        <div style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
          <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>Total Orders</p>
          <h3 style={{ fontSize: '1.5rem' }}>{totalOrders}</h3>
        </div>
        <div style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
          <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>Average Order Value</p>
          <h3 style={{ fontSize: '1.5rem' }}>{formatCurrency(avgOrderValue)}</h3>
        </div>
      </div>

      <div style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '8px', marginBottom: '2rem' }}>
        <h4 style={{ marginBottom: '1rem' }}>Order Status Distribution</h4>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <p><strong>Pending:</strong> {statusCounts.Pending}</p>
          <p><strong>Preparing:</strong> {statusCounts.Preparing}</p>
          <p><strong>Delivering:</strong> {statusCounts.Delivering}</p>
          <p><strong>Delivered:</strong> {statusCounts.Delivered}</p>
        </div>
      </div>

      <div style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '1rem' }}>Top Selling Dishes</h4>
        {topDishes.length === 0 ? (
          <p style={{ color: '#6b7280' }}>No sales data available yet.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {topDishes.map((dish, idx) => (
              <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: idx < topDishes.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                <span>{dish.name}</span>
                <strong>{dish.quantity} sold</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
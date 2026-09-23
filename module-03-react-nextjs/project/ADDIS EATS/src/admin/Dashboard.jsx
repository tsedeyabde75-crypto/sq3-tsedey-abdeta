import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/formatCurrency';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('addis_eats_orders') || '[]');
    setOrders(savedOrders);
  }, []);

  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const statusCounts = orders.reduce((acc, order) => {
    const status = order.status || 'Pending';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <h2>Dashboard Overview</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', margin: '1.5rem 0' }}>
        <div style={{ padding: '1.25rem', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: 'var(--bg-card)' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Total Revenue</span>
          <h3 style={{ fontSize: '1.5rem', color: 'var(--brand-orange)', marginTop: '0.25rem' }}>{formatCurrency(totalRevenue)}</h3>
        </div>
        <div style={{ padding: '1.25rem', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: 'var(--bg-card)' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Total Orders</span>
          <h3 style={{ fontSize: '1.5rem', marginTop: '0.25rem' }}>{totalOrders}</h3>
        </div>
        <div style={{ padding: '1.25rem', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: 'var(--bg-card)' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Average Order Value</span>
          <h3 style={{ fontSize: '1.5rem', marginTop: '0.25rem' }}>{formatCurrency(avgOrderValue)}</h3>
        </div>
      </div>

      <div style={{ padding: '1.25rem', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: 'var(--bg-card)', marginTop: '1.5rem' }}>
        <h3>Order Status Distribution</h3>
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
          <div><strong>Pending:</strong> {statusCounts['Pending'] || 0}</div>
          <div><strong>Preparing:</strong> {statusCounts['Preparing'] || 0}</div>
          <div><strong>Delivering:</strong> {statusCounts['Delivering'] || 0}</div>
          <div><strong>Delivered:</strong> {statusCounts['Delivered'] || 0}</div>
        </div>
      </div>
    </div>
  );
}
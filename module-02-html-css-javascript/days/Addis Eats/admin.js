document.addEventListener('DOMContentLoaded', () => {
  renderOrdersTable();
});

function renderOrdersTable() {
  const orders = JSON.parse(localStorage.getItem('addiseats_orders')) || [];
  const tbody = document.getElementById('ordersTableBody');
  if (!tbody) return;
  
  tbody.innerHTML = '';
  
  if (orders.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5">No orders found.</td></tr>';
    return;
  }

  orders.forEach(order => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${order.id}</td>
      <td>${order.customer?.name || 'Guest'}</td>
      <td>${Number(order.total || 0).toFixed(2)} ETB</td>
      <td>
        <select onchange="updateOrderStatus('${order.id}', this.value)">
          <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
          <option value="preparing" ${order.status === 'preparing' ? 'selected' : ''}>Preparing</option>
          <option value="delivering" ${order.status === 'delivering' ? 'selected' : ''}>Delivering</option>
          <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
          <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
        </select>
      </td>
      <td>${order.date || ''}</td>
    `;
    tbody.appendChild(tr);
  });
}

window.updateOrderStatus = function(orderId, newStatus) {
  let orders = JSON.parse(localStorage.getItem('addiseats_orders')) || [];
  orders = orders.map(order => {
    if (order.id === orderId) {
      return { ...order, status: newStatus };
    }
    return order;
  });
  
  // Directly updates the exact key read by app.js
  localStorage.setItem('addiseats_orders', JSON.stringify(orders));
  renderOrdersTable();
};
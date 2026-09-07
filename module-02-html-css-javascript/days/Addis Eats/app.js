const KEYS = {
  MENU: 'addiseats_menu',
  ORDERS: 'addiseats_orders',
  CART: 'addiseats_cart',
  FAVORITES: 'addiseats_favorites',
  THEME: 'addiseats_theme'
};

let menu = [];
let cart = JSON.parse(localStorage.getItem(KEYS.CART)) || [];
let favorites = JSON.parse(localStorage.getItem(KEYS.FAVORITES)) || [];

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadMenu();
  renderCart();
  
  document.getElementById('searchInput').addEventListener('input', filterMenu);
  document.getElementById('categoryFilter').addEventListener('change', filterMenu);
  document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);
  document.getElementById('areaSelect').addEventListener('change', renderCart);
  document.getElementById('checkoutForm').addEventListener('submit', handleCheckout);
  document.getElementById('historyBtn').addEventListener('click', showHistory);
  document.getElementById('closeModal').onclick = () => document.getElementById('dishModal').style.display = 'none';
  document.getElementById('closeHistoryModal').onclick = () => document.getElementById('historyModal').style.display = 'none';
});

function initTheme() {
  const theme = localStorage.getItem(KEYS.THEME) || 'light';
  if (theme === 'dark') document.body.classList.add('dark-theme');
}

function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
  localStorage.setItem(KEYS.THEME, theme);
}

async function loadMenu() {
  const loading = document.getElementById('loadingState');
  const error = document.getElementById('errorState');
  try {
    const cachedMenu = localStorage.getItem(KEYS.MENU);
    if (cachedMenu) {
      menu = JSON.parse(cachedMenu);
    } else {
      const res = await fetch('data/menu.json');
      if (!res.ok) throw new Error();
      menu = await res.json();
      localStorage.setItem(KEYS.MENU, JSON.stringify(menu));
    }
    if (loading) loading.style.display = 'none';
    if (error) error.style.display = 'none';
    renderMenu(menu);
  } catch (err) {
    if (loading) loading.style.display = 'none';
    if (error) error.style.display = 'block';
  }
}

function renderMenu(items) {
  const container = document.getElementById('menuContainer');
  container.innerHTML = '';
  
  if (items.length === 0) {
    container.innerHTML = '<p>No dishes found.</p>';
    return;
  }

  items.forEach(dish => {
    const isFav = favorites.includes(dish.id);
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${dish.image}" alt="${dish.name}">
      <h3>${dish.name}</h3>
      <p>${dish.price.toFixed(2)} ETB</p>
      <button onclick="viewDetails(${dish.id})">Details</button>
      <button onclick="toggleFav(${dish.id})">${isFav ? '❤️ Favorited' : '🤍 Favorite'}</button>
      <button onclick="addToCart(${dish.id})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

function filterMenu() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;
  
  const filtered = menu.filter(dish => {
    const matchesSearch = dish.name.toLowerCase().includes(search) || dish.description.toLowerCase().includes(search);
    const matchesCat = category === 'all' || dish.category === category;
    return matchesSearch && matchesCat;
  });
  
  renderMenu(filtered);
}

function viewDetails(id) {
  const dish = menu.find(d => d.id === id);
  const modal = document.getElementById('dishModal');
  const body = document.getElementById('modalBody');
  body.innerHTML = `
    <h2>${dish.name}</h2>
    <img src="${dish.image}" style="width:100%; height:200px; object-fit:cover;">
    <p>${dish.description}</p>
    <p><strong>Ingredients:</strong> ${dish.ingredients.join(', ')}</p>
    <p><strong>Price:</strong> ${dish.price.toFixed(2)} ETB</p>
  `;
  modal.style.display = 'flex';
}

function toggleFav(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(favId => favId !== id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem(KEYS.FAVORITES, JSON.stringify(favorites));
  filterMenu();
}

function addToCart(id) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id, quantity: 1 });
  }
  saveCart();
}

function updateQty(id, change) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.quantity += change;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  saveCart();
}

function saveCart() {
  localStorage.setItem(KEYS.CART, JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const cartContainer = document.getElementById('cartItems');
  const emptyMsg = document.getElementById('emptyCartMsg');
  const cartSummary = document.getElementById('cartSummary');
  const cartCount = document.getElementById('cartCount');
  
  cartContainer.innerHTML = '';
  let subtotal = 0;
  let itemCount = 0;

  if (cart.length === 0) {
    emptyMsg.style.display = 'block';
    cartSummary.style.display = 'none';
    cartCount.innerText = 0;
    return;
  }

  emptyMsg.style.display = 'none';
  cartSummary.style.display = 'block';

  cart.forEach(item => {
    const dish = menu.find(d => d.id === item.id);
    if (!dish) return;
    const itemTotal = dish.price * item.quantity;
    subtotal += itemTotal;
    itemCount += item.quantity;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div>
        <strong>${dish.name}</strong><br>
        ${dish.price.toFixed(2)} ETB x ${item.quantity}
      </div>
      <div>
        <button onclick="updateQty(${dish.id}, 1)">+</button>
        <button onclick="updateQty(${dish.id}, -1)">-</button>
      </div>
    `;
    cartContainer.appendChild(div);
  });

  const areaSelect = document.getElementById('areaSelect');
  const deliveryFee = parseFloat(areaSelect.options[areaSelect.selectedIndex].dataset.fee);
  
  cartCount.innerText = itemCount;
  document.getElementById('subtotal').innerText = subtotal.toFixed(2);
  document.getElementById('deliveryFee').innerText = deliveryFee.toFixed(2);
  document.getElementById('grandTotal').innerText = (subtotal + deliveryFee).toFixed(2);
}

function handleCheckout(e) {
  e.preventDefault();
  const name = document.getElementById('custName').value;
  const phone = document.getElementById('custPhone').value;
  const areaSelect = document.getElementById('areaSelect');
  const area = areaSelect.value;
  const fee = parseFloat(areaSelect.options[areaSelect.selectedIndex].dataset.fee);
  const notes = document.getElementById('specialNotes').value;

  const items = cart.map(i => {
    const dish = menu.find(d => d.id === i.id);
    return { id: dish.id, name: dish.name, price: dish.price, quantity: i.quantity };
  });

  const subtotal = items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  
  const order = {
    id: 'ORD-' + Date.now(),
    customer: { name, phone, area },
    items,
    subtotal,
    deliveryFee: fee,
    total: subtotal + fee,
    notes,
    status: 'pending',
    date: new Date().toLocaleString()
  };

  const orders = JSON.parse(localStorage.getItem(KEYS.ORDERS)) || [];
  orders.push(order);
  localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));

  cart = [];
  saveCart();
  alert(`Order Placed Successfully! Your Order ID is ${order.id}`);
  document.getElementById('checkoutForm').reset();
}

function showHistory() {
  const orders = JSON.parse(localStorage.getItem(KEYS.ORDERS)) || [];
  const modal = document.getElementById('historyModal');
  const body = document.getElementById('historyBody');
  
  body.innerHTML = '';

  if (orders.length === 0) {
    body.innerHTML = '<p>No past orders.</p>';
  } else {
    orders.forEach(order => {
      const div = document.createElement('div');
      div.style.borderBottom = '1px solid #ccc';
      div.style.padding = '0.5rem 0';
      div.innerHTML = `
        <p><strong>Order ID:</strong> ${order.id} | <strong>Status:</strong> ${order.status}</p>
        <p><strong>Total:</strong> ${order.total.toFixed(2)} ETB (${order.date})</p>
        <button onclick="reorder('${order.id}')">Reorder</button>
      `;
      body.appendChild(div);
    });
  }
  modal.style.display = 'flex';
}

window.viewDetails = viewDetails;
window.toggleFav = toggleFav;
window.addToCart = addToCart;
window.updateQty = updateQty;
window.showHistory = showHistory;

window.reorder = function(orderId) {
  const orders = JSON.parse(localStorage.getItem(KEYS.ORDERS)) || [];
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  cart = order.items.map(item => ({ id: item.id, quantity: item.quantity }));
  saveCart();
  document.getElementById('historyModal').style.display = 'none';
  alert('Items added to cart!');
};
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  if (user === 'admin' && pass === 'admin123') {
    localStorage.setItem('addiseats_admin_logged_in', 'true');
    window.location.href = 'admin-dashboard.html';
  } else {
    document.getElementById('loginError').style.display = 'block';
  }
});
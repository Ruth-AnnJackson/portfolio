const form = document.getElementById('loginForm');
const errorText = document.getElementById('error');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const res = await fetch(
      'https://portfolio-backend-dg6v.onrender.com/admin/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      errorText.textContent = data.error || 'Login failed';
      return;
    }

    // save JWT
    localStorage.setItem('adminToken', data.token);

    // redirect to admin folder
    window.location.href = '/admin/admin.html';
  } catch {
    errorText.textContent = 'Server unreachable';
  }
});

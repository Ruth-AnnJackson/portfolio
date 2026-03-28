const API_URL = 'https://portfolio-backend-dg6v.onrender.com';
const messagesContainer = document.getElementById('messages');

// check token, redirect to login if missing
const token = localStorage.getItem('adminToken');
if (!token) {
  window.location.href = '/login.html';
}

// fetch messages with token
async function loadMessages() {
  try {
    const res = await fetch(`${API_URL}/messages`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const messages = await res.json();
    messagesContainer.innerHTML = '';

    if (!messages.length) {
      messagesContainer.innerHTML = '<p>No messages yet.</p>';
      return;
    }

    messages.forEach(msg => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <h3>${msg.name}</h3>
        <p>${msg.email}</p>
        <p>${msg.message || ''}</p>
        <button data-id="${msg._id}" class="delete-btn">Delete</button>
      `;
      card.querySelector('button').onclick = () => deleteMessage(msg._id);
      messagesContainer.appendChild(card);
    });
  } catch {
    messagesContainer.innerHTML = '<p>Error loading messages</p>';
  }
}

// delete messages
async function deleteMessage(id) {
  try {
    await fetch(`${API_URL}/messages/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    loadMessages(); // refresh list
  } catch {
    alert('Server not reachable');
  }
}

loadMessages();

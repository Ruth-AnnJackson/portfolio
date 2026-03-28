require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const adminRoutes = require('./routes/admin');
const Contact = require('./models/Contact');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(console.error);

// Test
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Contact form
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }

  await Contact.create({ name, email, message });
  res.json({ success: true });
});

// Admin routes
app.use('/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

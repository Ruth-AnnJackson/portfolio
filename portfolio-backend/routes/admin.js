const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Contact = require('../models/Contact');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

/**
 * 🔐 ADMIN LOGIN
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (email !== process.env.ADMIN_EMAIL) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const passwordMatch = await bcrypt.compare(
    password,
    process.env.ADMIN_PASSWORD_HASH
  );

  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  res.json({ token });
});

/**
 * 🔒 GET ALL MESSAGES (PROTECTED)
 */
router.get('/messages', authMiddleware, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * 🔒 DELETE MESSAGE (PROTECTED)
 */
router.delete('/messages/:id', authMiddleware, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

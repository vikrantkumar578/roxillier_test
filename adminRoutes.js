const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

// Add new user
router.post('/add-user', authenticate, authorizeAdmin, async (req, res) => {
  const { name, email, password, address, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await db.query(
      'INSERT INTO users (name, email, password, address, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, hashedPassword, address, role]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'User creation failed' });
  }
});

// Add new store
router.post('/add-store', authenticate, authorizeAdmin, async (req, res) => {
  const { name, email, address, owner_id } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO stores (name, email, address, owner_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, address, owner_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Store creation failed' });
  }
});

module.exports = router;

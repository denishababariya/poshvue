const express = require('express');
const router = express.Router();
const { auth, requireRole } = require('../middleware/auth');
const { User } = require('../model');

// Admin-only: list users
router.get('/users', auth, requireRole('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    return res.json({ users });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
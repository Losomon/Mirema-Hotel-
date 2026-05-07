const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { signToken } = require('./jwt');
const { authenticate, requireRole } = require('./middleware');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'email and password are required' } });
    }

    const user = await User.findOne({ email: String(email).toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' } });
    }

    const ok = await bcrypt.compare(String(password), user.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' } });
    }

    const token = signToken({ userId: user._id, role: user.role, email: user.email });
    return res.json({ token, user: { id: String(user._id), email: user.email, role: user.role } });
  } catch (e) {
    console.error('[auth/login]', e);
    return res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Login failed' } });
  }
});


router.post('/logout', async (req, res) => {
  // Stateless JWT: client should delete the token.
  return res.json({ message: 'Logged out' });
});

router.get('/me', authenticate, async (req, res) => {
  return res.json({ user: { id: req.user.id, email: req.user.email, role: req.user.role } });
});

// Example protected endpoint (admin-only) for sanity.
router.get('/admin/health', authenticate, requireRole('admin'), (req, res) => {
  res.json({ ok: true, admin: true });
});

module.exports = router;


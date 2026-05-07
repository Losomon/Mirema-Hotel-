const express = require('express');
const { authenticate, requireRole } = require('../auth/middleware');

const router = express.Router();

// Keep current mock behavior but protect admin-only CRUD endpoints (to be added next).
router.get('/', (req, res) => {
  res.json([
    { id: 1, name: 'Standard', price: 100 },
    { id: 2, name: 'Deluxe', price: 150 },
    { id: 3, name: 'Suite', price: 250 }
  ]);
});

// Placeholder examples of admin-only routes.
router.post('/', authenticate, requireRole('admin'), (req, res) => {
  return res.status(501).json({ error: { code: 'NOT_IMPLEMENTED', message: 'Room creation not implemented yet' } });
});

module.exports = router;


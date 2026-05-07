import express, { Request, Response } from 'express';

import { authenticate, requireRole } from '../auth/middleware';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  res.json([
    { id: 1, name: 'Standard', price: 100 },
    { id: 2, name: 'Deluxe', price: 150 },
    { id: 3, name: 'Suite', price: 250 }
  ]);
});

// Placeholder examples of admin-only routes.
router.post('/', authenticate, requireRole('admin'), (_req: Request, res: Response) => {
  return res.status(501).json({
    error: { code: 'NOT_IMPLEMENTED', message: 'Room creation not implemented yet' }
  });
});

export default router;


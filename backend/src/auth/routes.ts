import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import User from '../models/User';
import { signToken } from './jwt';
import { authenticate, requireRole, AuthedRequest } from './middleware';
import { loginSchema } from '../validation';

const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' } });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res
        .status(401)
        .json({ error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' } });
    }

    const token = signToken({ userId: String(user._id), role: user.role, email: user.email });
    return res.json({
      token,
      user: { id: String(user._id), email: user.email, role: user.role }
    });
   } catch (e: any) {
     if (e.name === 'ZodError') {
       return res.status(400).json({
         error: { code: 'BAD_REQUEST', message: 'Validation failed', details: e.issues },
       });
     }
     console.error('[auth/login]', e);
    return res.status(500).json({
      error: { code: 'INTERNAL_ERROR', message: 'Login failed' }
    });
  }
});

router.post('/logout', async (_req: Request, res: Response) => {
  return res.json({ message: 'Logged out' });
});

router.get('/me', authenticate, async (req: AuthedRequest, res: Response) => {
  return res.json({
    user: {
      id: req.user!.id,
      email: req.user!.email,
      role: req.user!.role
    }
  });
});

router.get('/admin/health', authenticate, requireRole('admin'), (_req: Request, res: Response) => {
  res.json({ ok: true, admin: true });
});

export default router;

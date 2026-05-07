import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config';

export function signToken(payload: { userId: string; role: string; email: string }) {
  return jwt.sign(
    { sub: String(payload.userId), role: payload.role, email: payload.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}


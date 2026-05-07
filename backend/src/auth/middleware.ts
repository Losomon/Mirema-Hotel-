import { NextFunction, Request, Response } from 'express';

import { verifyToken } from './jwt';

type JwtPayload = {
  sub: string;
  role: 'admin' | 'member' | string;
  email?: string;
};

type AuthedRequest = Request & {
  user?: {
    id: string;
    role: string;
    email?: string;
  };
};

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header || typeof header !== 'string') {
    return res.status(401).json({
      error: { code: 'UNAUTHORIZED', message: 'Missing Authorization header' }
    });
  }

  const [scheme, token] = header.split(' ');
  if (!token || scheme !== 'Bearer') {
    return res.status(401).json({
      error: { code: 'UNAUTHORIZED', message: 'Invalid Authorization header format' }
    });
  }

  try {
    const payload = verifyToken(token) as JwtPayload;

    (req as AuthedRequest).user = {
      id: payload.sub,
      role: payload.role as any,
      email: payload.email
    };

    return next();
  } catch {
    return res.status(401).json({
      error: { code: 'UNAUTHORIZED', message: 'Invalid or expired token' }
    });
  }
}

export function requireRole(role: 'admin' | 'member' | string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authedReq = req as AuthedRequest;

    if (!authedReq.user) {
      return res.status(401).json({
        error: { code: 'UNAUTHORIZED', message: 'Not authenticated' }
      });
    }

    if (authedReq.user.role !== role) {
      return res.status(403).json({
        error: { code: 'FORBIDDEN', message: 'Insufficient role' }
      });
    }

    return next();
  };
}


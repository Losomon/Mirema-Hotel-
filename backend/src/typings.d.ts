import 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: 'admin' | 'member' | string;
        email?: string;
      };
    }
  }
}

export {};


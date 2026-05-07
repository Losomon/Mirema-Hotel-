import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import authRoutes from './src/auth/routes';
import roomsRoutes from './src/rooms/routes';
import bookingsRoutes from './src/bookings/routes';
import { seedAdminUser } from './src/seedAdmin';

dotenv.config();

export const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

// Security middleware
app.use(helmet());

// CORS — allow only frontend origin(s)
const allowedOrigins = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL]
  : ['http://localhost:4321', 'http://127.0.0.1:4321']; // Astro dev server

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Rate limiting — global
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: { code: 'RATE_LIMIT_EXCEEDED', message: 'Too many requests — please try again later.' } },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(globalLimiter);

// Stricter rate limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 attempts per hour
  message: { error: { code: 'RATE_LIMIT_EXCEEDED', message: 'Too many authentication attempts — try again later.' } },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/auth', authLimiter);

app.use(express.json());

// Health check — excluded from rate limiting
app.get('/health', (req, res) =>
  res.json({ status: 'OK', message: 'Mirema Backend running!' })
);

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomsRoutes);
app.use('/api/bookings', bookingsRoutes);

// Centralized error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('[error]', err);

  // Zod validation errors
  if (err.name === 'ZodError') {
    return res.status(400).json({
      error: {
        code: 'BAD_REQUEST',
        message: 'Validation failed',
        details: err.errors,
      },
    });
  }

  // Known application errors
  if (err.code === 'VALIDATION_ERROR') {
    return res.status(400).json({
      error: { code: 'BAD_REQUEST', message: err.message },
    });
  }

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: {
        code: 'BAD_REQUEST',
        message: 'Data validation failed',
        details: Object.values(err.errors).map((e: any) => e.message),
      },
    });
  }

  // Cast errors (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      error: { code: 'BAD_REQUEST', message: 'Invalid ID format' },
    });
  }

  // Default — generic 500
  return res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'production'
        ? 'Internal server error'
        : (err.message || 'Unknown error'),
    },
  });
});

async function start() {
  if (process.env.MONGO_URI) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB connected');
      await seedAdminUser();
      console.log('Admin seed complete (if env configured)');
    } catch (err: any) {
      console.log('Mongo connection failed (ok for dev):', err?.message ?? err);
    }
  } else {
    console.log('No MONGO_URI - using mock data (production: set .env)');
  }

  app.listen(PORT, () => console.log(`Server on port ${PORT}`));
}

if (require.main === module) {
  start();
}

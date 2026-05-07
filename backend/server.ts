import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './src/auth/routes';
import roomsRoutes from './src/rooms/routes';
import bookingsRoutes from './src/bookings/routes';
import { seedAdminUser } from './src/seedAdmin';



dotenv.config();

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) =>
  res.json({ status: 'OK', message: 'Mirema Backend running!' })
);

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomsRoutes);
app.use('/api/bookings', bookingsRoutes);

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

start();


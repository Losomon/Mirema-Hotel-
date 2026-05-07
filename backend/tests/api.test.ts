import request from 'supertest';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { describe, it, beforeAll, afterAll, beforeEach, expect } from 'vitest';

import { app } from '../server';
import Room from '../src/rooms/model';
import Booking from '../src/bookings/model';
import { MongoMemoryServer } from 'mongodb-memory-server';

const TEST_JWT_SECRET = 'test-secret';

function createAuthToken(userId: string, role = 'member') {
  return jwt.sign({ sub: userId, role, email: 'user@example.com' }, TEST_JWT_SECRET, {
    expiresIn: '1h',
  });
}

let mongoServer: MongoMemoryServer;

async function clearDatabase() {
  const collections = mongoose.connection.collections;
  for (const key of Object.keys(collections)) {
    await collections[key].deleteMany({});
  }
}

describe('Backend API', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), {
      dbName: 'mire-test',
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  it('returns health metadata', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'OK',
      message: 'Mirema Backend running!',
    });
  });

  it('returns active rooms with pagination', async () => {
    await Room.create([
      {
        name: 'Ocean View',
        description: 'A beautiful sea-facing room',
        price: 120,
        capacity: 2,
        amenities: ['wifi', 'air conditioning'],
        imageUrl: 'https://example.com/room1.jpg',
        isActive: true,
      },
      {
        name: 'Garden Suite',
        description: 'Quiet garden views',
        price: 90,
        capacity: 3,
        amenities: ['wifi'],
        imageUrl: 'https://example.com/room2.jpg',
        isActive: true,
      },
      {
        name: 'Closed Room',
        description: 'Inactive room',
        price: 70,
        capacity: 1,
        amenities: [],
        imageUrl: 'https://example.com/room3.jpg',
        isActive: false,
      },
    ]);

    const response = await request(app).get('/api/rooms').query({ page: 1, limit: 10 });

    expect(response.status).toBe(200);
    expect(response.body.pagination).toEqual({
      page: 1,
      limit: 10,
      total: 2,
      pages: 1,
    });
    expect(Array.isArray(response.body.rooms)).toBe(true);
    expect(response.body.rooms).toHaveLength(2);
    expect(response.body.rooms.map((room: any) => room.name)).toEqual(
      expect.arrayContaining(['Ocean View', 'Garden Suite'])
    );
  });

  it('creates a booking when request data is valid and the user is authenticated', async () => {
    const room = await Room.create({
      name: 'Ocean View',
      description: 'A beautiful sea-facing room',
      price: 120,
      capacity: 2,
      amenities: ['wifi'],
      imageUrl: 'https://example.com/room1.jpg',
      isActive: true,
    });

    const token = createAuthToken(new mongoose.Types.ObjectId().toHexString());
    const bookingPayload = {
      guestName: 'Jane Doe',
      guestEmail: 'jane.doe@example.com',
      guestPhone: '+1234567890',
      roomId: room._id.toString(),
      checkIn: '2026-12-01',
      checkOut: '2026-12-05',
      guests: 2,
      notes: 'Anniversary stay',
    };

    const response = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send(bookingPayload);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('booking');
    expect(response.body.booking).toMatchObject({
      guestName: 'Jane Doe',
      guestEmail: 'jane.doe@example.com',
      guestPhone: '+1234567890',
      guests: 2,
      status: 'pending',
    });
    expect(String(response.body.booking.roomId)).toBe(room._id.toString());
  });

  it('returns validation errors for invalid room list query parameters', async () => {
    const response = await request(app).get('/api/rooms').query({ limit: 0, page: 0 });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error.code).toBe('BAD_REQUEST');
    expect(response.body.error.details).toBeDefined();
  });

  it('returns validation errors when booking payload is invalid', async () => {
    const room = await Room.create({
      name: 'Ocean View',
      description: 'A beautiful sea-facing room',
      price: 120,
      capacity: 2,
      amenities: ['wifi'],
      imageUrl: 'https://example.com/room1.jpg',
      isActive: true,
    });

    const token = createAuthToken(new mongoose.Types.ObjectId().toHexString());
    const invalidPayload = {
      guestName: '',
      guestEmail: 'invalid-email',
      guestPhone: '',
      roomId: 'bad-id',
      checkIn: '2026-12-10',
      checkOut: '2026-12-05',
      guests: 0,
    };

    const response = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send(invalidPayload);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error.code).toBe('BAD_REQUEST');
    expect(Array.isArray(response.body.error.details)).toBe(true);
  });
});

import request from 'supertest';
import { app } from '../../server';

const hasMongo = !!process.env.MONGO_URI;
const describeDb = hasMongo ? describe : describe.skip;

// Helper to create an admin token for tests
async function getAdminToken(): Promise<string> {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@mirema.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: adminEmail, password: adminPassword });

  if (res.status !== 200) {
    throw new Error(`Failed to get admin token: ${JSON.stringify(res.body)}`);
  }
  return res.body.token;
}

describe('POST /api/bookings (member)', () => {
  it('should reject unauthenticated request', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .send({
        guestName: 'John Doe',
        guestEmail: 'john@example.com',
        guestPhone: '1234567890',
        roomId: '000000000000000000000000',
        checkIn: '2025-06-01',
        checkOut: '2025-06-05',
        guests: 2,
      });
    expect(res.status).toBe(401);
  });

  it('should validate required fields (Zod)', async () => {
    // Validation is tested in validation.test.ts
  });
});

describe('GET /api/bookings/me (member)', () => {
  it('should reject unauthenticated request', async () => {
    const res = await request(app).get('/api/bookings/me');
    expect(res.status).toBe(401);
  });

  it('should return user bookings when authenticated', async () => {
    // Requires valid user token + DB
  });
});

describeDb('GET /api/bookings (admin)', () => {
  it('should reject unauthenticated request', async () => {
    const res = await request(app).get('/api/bookings');
    expect(res.status).toBe(401);
  });

  it('should return bookings list for admin', async () => {
    const token = await getAdminToken();
    const res = await request(app)
      .get('/api/bookings')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('bookings');
    expect(Array.isArray(res.body.bookings)).toBe(true);
  }, 10000);
});

describeDb('GET /api/bookings/:id (admin)', () => {
  it('should reject unauthenticated request', async () => {
    const res = await request(app).get('/api/bookings/000000000000000000000000');
    expect(res.status).toBe(401);
  });

  it('should return 404 for non-existent booking', async () => {
    const token = await getAdminToken();
    const res = await request(app)
      .get('/api/bookings/000000000000000000000000')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(404);
  }, 10000);
});

describeDb('PUT /api/bookings/:id (admin)', () => {
  it('should reject unauthenticated request', async () => {
    const res = await request(app)
      .put('/api/bookings/000000000000000000000000')
      .send({ status: 'confirmed' });
    expect(res.status).toBe(401);
  });

  it('should accept valid status values (pending, confirmed, cancelled, completed)', async () => {
    const token = await getAdminToken();
    const statuses = ['pending', 'confirmed', 'cancelled', 'completed'] as const;
    for (const status of statuses) {
      const res = await request(app)
        .put('/api/bookings/000000000000000000000000')
        .set('Authorization', `Bearer ${token}`)
        .send({ status });
      expect(res.status).toBe(404); // Booking not found, validation passed
    }
  }, 20000);

  it('should reject invalid status value with 400', async () => {
    const token = await getAdminToken();
    const res = await request(app)
      .put('/api/bookings/000000000000000000000000')
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'invalid' as any });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('BAD_REQUEST');
  }, 10000);
});

describeDb('DELETE /api/bookings/:id (admin)', () => {
  it('should reject unauthenticated request', async () => {
    const res = await request(app).delete('/api/bookings/000000000000000000000000');
    expect(res.status).toBe(401);
  });

  it('should delete booking when authorized', async () => {
    // Requires existing booking + admin token
  }, 10000);
});

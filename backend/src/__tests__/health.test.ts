import request from 'supertest';
import { app } from '../../server';

describe('GET /health', () => {
  it('should return healthy status', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      status: 'OK',
      message: 'Mirema Backend running!',
    });
  });
});

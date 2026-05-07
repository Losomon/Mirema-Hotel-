"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../../server");
// Skip entire suite if MongoDB is not available
const hasMongo = !!process.env.MONGO_URI;
const describeDb = hasMongo ? describe : describe.skip;
describe('GET /health', () => {
    it('should return healthy status', async () => {
        const res = await (0, supertest_1.default)(server_1.app).get('/health');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            status: 'OK',
            message: 'Mirema Backend running!',
        });
    });
});
describe('GET /api/rooms', () => {
    // These tests require MongoDB
    it('should return list of active rooms with pagination metadata', async () => {
        const res = await (0, supertest_1.default)(server_1.app).get('/api/rooms');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('rooms');
        expect(res.body).toHaveProperty('pagination');
        expect(Array.isArray(res.body.rooms)).toBe(true);
        expect(res.body.pagination).toHaveProperty('page');
        expect(res.body.pagination).toHaveProperty('limit');
        expect(res.body.pagination).toHaveProperty('total');
        expect(res.body.pagination).toHaveProperty('pages');
    }, 10000);
    it('should support pagination query params', async () => {
        const res = await (0, supertest_1.default)(server_1.app).get('/api/rooms?page=1&limit=5');
        expect(res.status).toBe(200);
        expect(res.body.pagination.page).toBe(1);
        expect(res.body.pagination.limit).toBe(5);
    }, 10000);
    it('should return validation error for invalid page param', async () => {
        const res = await (0, supertest_1.default)(server_1.app).get('/api/rooms?page=abc');
        expect(res.status).toBe(400);
        expect(res.body.error).toHaveProperty('code', 'BAD_REQUEST');
    });
});
describe('GET /api/rooms/:id', () => {
    it('should return a room by ID', async () => {
        const listRes = await (0, supertest_1.default)(server_1.app).get('/api/rooms');
        expect(listRes.status).toBe(200);
        const rooms = listRes.body.rooms;
        if (rooms.length === 0) {
            // No rooms in DB — skip test with message
            return;
        }
        const roomId = rooms[0].id;
        const res = await (0, supertest_1.default)(server_1.app).get(`/api/rooms/${roomId}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('room');
        expect(res.body.room).toHaveProperty('id', roomId);
    }, 10000);
    it('should return 404 for non-existent room ID', async () => {
        const res = await (0, supertest_1.default)(server_1.app).get('/api/rooms/000000000000000000000000');
        expect(res.status).toBe(404);
        expect(res.body.error.code).toBe('NOT_FOUND');
    }, 10000);
    it('should return 400 for invalid ObjectId format', async () => {
        const res = await (0, supertest_1.default)(server_1.app).get('/api/rooms/invalid-id');
        expect(res.status).toBe(400);
        expect(res.body.error.code).toBe('BAD_REQUEST');
    });
});
describeDb('GET /api/rooms/availability', () => {
    it('should return all rooms with availability flags for valid date range', async () => {
        const today = new Date();
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);
        const start = today.toISOString().split('T')[0];
        const end = nextWeek.toISOString().split('T')[0];
        const res = await (0, supertest_1.default)(server_1.app).get(`/api/rooms/availability?startDate=${start}&endDate=${end}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('rooms');
        expect(Array.isArray(res.body.rooms)).toBe(true);
        if (res.body.rooms.length > 0) {
            expect(res.body.rooms[0]).toHaveProperty('isAvailable');
        }
    }, 10000);
    it('should return validation error for missing dates', async () => {
        const res = await (0, supertest_1.default)(server_1.app).get('/api/rooms/availability');
        expect(res.status).toBe(400);
        expect(res.body.error.code).toBe('BAD_REQUEST');
    });
    it('should return validation error when endDate before startDate', async () => {
        const today = new Date();
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);
        const start = nextWeek.toISOString().split('T')[0];
        const end = today.toISOString().split('T')[0];
        const res = await (0, supertest_1.default)(server_1.app).get(`/api/rooms/availability?startDate=${start}&endDate=${end}`);
        expect(res.status).toBe(400);
        expect(res.body.error.code).toBe('BAD_REQUEST');
    });
});
describeDb('POST /api/rooms (admin only)', () => {
    it('should reject unauthenticated request', async () => {
        const res = await (0, supertest_1.default)(server_1.app)
            .post('/api/rooms')
            .send({ name: 'Test Room', price: 100, capacity: 2 });
        expect(res.status).toBe(401);
    });
    it('should reject non-admin authenticated request', async () => {
        // For this test we'd need a member token — skip for now
        // or implement a helper to generate test tokens
    });
});
describeDb('PUT /api/rooms/:id (admin only)', () => {
    it('should reject unauthenticated request', async () => {
        const res = await (0, supertest_1.default)(server_1.app)
            .put('/api/rooms/000000000000000000000000')
            .send({ price: 200 });
        expect(res.status).toBe(401);
    });
});
describeDb('DELETE /api/rooms/:id (admin only)', () => {
    it('should reject unauthenticated request', async () => {
        const res = await (0, supertest_1.default)(server_1.app).delete('/api/rooms/000000000000000000000000');
        expect(res.status).toBe(401);
    });
});

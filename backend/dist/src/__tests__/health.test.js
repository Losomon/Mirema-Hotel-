"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../../server");
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

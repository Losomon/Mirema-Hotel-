"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./src/auth/routes"));
const routes_2 = __importDefault(require("./src/rooms/routes"));
const routes_3 = __importDefault(require("./src/bookings/routes"));
const seedAdmin_1 = require("./src/seedAdmin");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
// Security middleware
app.use((0, helmet_1.default)());
// CORS — allow only frontend origin(s)
const allowedOrigins = process.env.FRONTEND_URL
    ? [process.env.FRONTEND_URL]
    : ['http://localhost:4321', 'http://127.0.0.1:4321']; // Astro dev server
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
}));
// Rate limiting — global
const globalLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: { error: { code: 'RATE_LIMIT_EXCEEDED', message: 'Too many requests — please try again later.' } },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(globalLimiter);
// Stricter rate limit for auth endpoints
const authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // 10 attempts per hour
    message: { error: { code: 'RATE_LIMIT_EXCEEDED', message: 'Too many authentication attempts — try again later.' } },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/auth', authLimiter);
app.use(express_1.default.json());
// Health check — excluded from rate limiting
app.get('/health', (req, res) => res.json({ status: 'OK', message: 'Mirema Backend running!' }));
// API routes
app.use('/api/auth', routes_1.default);
app.use('/api/rooms', routes_2.default);
app.use('/api/bookings', routes_3.default);
// Centralized error handler
app.use((err, req, res, next) => {
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
                details: Object.values(err.errors).map((e) => e.message),
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
            await mongoose_1.default.connect(process.env.MONGO_URI);
            console.log('MongoDB connected');
            await (0, seedAdmin_1.seedAdminUser)();
            console.log('Admin seed complete (if env configured)');
        }
        catch (err) {
            console.log('Mongo connection failed (ok for dev):', err?.message ?? err);
        }
    }
    else {
        console.log('No MONGO_URI - using mock data (production: set .env)');
    }
    app.listen(PORT, () => console.log(`Server on port ${PORT}`));
}
start();

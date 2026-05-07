"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const jwt_1 = require("./jwt");
const middleware_1 = require("./middleware");
const validation_1 = require("../validation");
const router = express_1.default.Router();
router.post('/login', async (req, res) => {
    try {
        const { email, password } = validation_1.loginSchema.parse(req.body);
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res
                .status(401)
                .json({ error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' } });
        }
        const ok = await bcrypt_1.default.compare(password, user.passwordHash);
        if (!ok) {
            return res
                .status(401)
                .json({ error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' } });
        }
        const token = (0, jwt_1.signToken)({ userId: String(user._id), role: user.role, email: user.email });
        return res.json({
            token,
            user: { id: String(user._id), email: user.email, role: user.role }
        });
    }
    catch (e) {
        if (e.name === 'ZodError') {
            return res.status(400).json({
                error: { code: 'BAD_REQUEST', message: 'Validation failed', details: e.issues },
            });
        }
        console.error('[auth/login]', e);
        return res.status(500).json({
            error: { code: 'INTERNAL_ERROR', message: 'Login failed' }
        });
    }
});
router.post('/logout', async (_req, res) => {
    return res.json({ message: 'Logged out' });
});
router.get('/me', middleware_1.authenticate, async (req, res) => {
    return res.json({
        user: {
            id: req.user.id,
            email: req.user.email,
            role: req.user.role
        }
    });
});
router.get('/admin/health', middleware_1.authenticate, (0, middleware_1.requireRole)('admin'), (_req, res) => {
    res.json({ ok: true, admin: true });
});
exports.default = router;

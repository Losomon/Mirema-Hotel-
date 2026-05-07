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
const router = express_1.default.Router();
router.post('/login', async (req, res) => {
    try {
        const { email, password } = (req.body ?? {});
        if (!email || !password) {
            return res.status(400).json({
                error: { code: 'BAD_REQUEST', message: 'email and password are required' }
            });
        }
        const user = await User_1.default.findOne({ email: String(email).toLowerCase().trim() });
        if (!user) {
            return res
                .status(401)
                .json({ error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' } });
        }
        const ok = await bcrypt_1.default.compare(String(password), user.passwordHash);
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

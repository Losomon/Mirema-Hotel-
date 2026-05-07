"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const model_1 = __importDefault(require("./model"));
const middleware_1 = require("../auth/middleware");
const router = express_1.default.Router();
// GET /api/bookings/me - current user's own bookings (authenticated members)
router.get('/me', middleware_1.authenticate, async (req, res) => {
    try {
        const userId = req.user.id;
        const bookings = await model_1.default.find({ createdBy: userId })
            .populate('roomId', 'name price')
            .sort({ createdAt: -1 })
            .lean();
        return res.json({ bookings });
    }
    catch (e) {
        console.error('[bookings/me]', e);
        return res.status(500).json({
            error: { code: 'INTERNAL_ERROR', message: 'Failed to get user bookings' },
        });
    }
});
// GET /api/bookings - list all bookings (admin only)
router.get('/', middleware_1.authenticate, (0, middleware_1.requireRole)('admin'), async (req, res) => {
    try {
        const bookings = await model_1.default.find()
            .populate('createdBy', 'email')
            .populate('roomId', 'name price')
            .sort({ createdAt: -1 })
            .lean();
        return res.json({ bookings });
    }
    catch (e) {
        console.error('[bookings/list]', e);
        return res.status(500).json({
            error: { code: 'INTERNAL_ERROR', message: 'Failed to list bookings' },
        });
    }
});
// GET /api/bookings/:id - get a specific booking (admin only)
router.get('/:id', middleware_1.authenticate, (0, middleware_1.requireRole)('admin'), async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                error: { code: 'BAD_REQUEST', message: 'Invalid booking ID' },
            });
        }
        const booking = await model_1.default.findById(id)
            .populate('createdBy', 'email')
            .populate('roomId', 'name price')
            .lean();
        if (!booking) {
            return res.status(404).json({
                error: { code: 'NOT_FOUND', message: 'Booking not found' },
            });
        }
        return res.json({ booking });
    }
    catch (e) {
        console.error('[bookings/get]', e);
        return res.status(500).json({
            error: { code: 'INTERNAL_ERROR', message: 'Failed to get booking' },
        });
    }
});
// POST /api/bookings - create a booking (authenticated users only)
router.post('/', middleware_1.authenticate, async (req, res) => {
    try {
        const { guestName, guestEmail, guestPhone, roomId, checkIn, checkOut, guests, notes } = req.body || {};
        if (!guestName || !guestEmail || !guestPhone || !roomId || !checkIn || !checkOut || !guests) {
            return res.status(400).json({
                error: { code: 'BAD_REQUEST', message: 'All booking fields are required' },
            });
        }
        if (!mongoose_1.Types.ObjectId.isValid(roomId)) {
            return res.status(400).json({
                error: { code: 'BAD_REQUEST', message: 'Invalid room ID' },
            });
        }
        const userId = req.user.id;
        const booking = await model_1.default.create({
            guestName: String(guestName).trim(),
            guestEmail: String(guestEmail).toLowerCase().trim(),
            guestPhone: String(guestPhone).trim(),
            roomId,
            checkIn: new Date(checkIn),
            checkOut: new Date(checkOut),
            guests: Number(guests),
            notes: notes ? String(notes).trim() : undefined,
            createdBy: userId,
            status: 'pending',
        });
        return res.status(201).json({
            message: 'Booking created successfully',
            booking: { id: String(booking._id), ...booking.toObject() },
        });
    }
    catch (e) {
        console.error('[bookings/create]', e);
        return res.status(500).json({
            error: { code: 'INTERNAL_ERROR', message: 'Failed to create booking' },
        });
    }
});
// PUT /api/bookings/:id - update booking status (admin only)
router.put('/:id', middleware_1.authenticate, (0, middleware_1.requireRole)('admin'), async (req, res) => {
    try {
        const { id } = req.params;
        const { status, notes } = req.body || {};
        const idStr = id;
        if (!mongoose_1.Types.ObjectId.isValid(idStr)) {
            return res.status(400).json({
                error: { code: 'BAD_REQUEST', message: 'Invalid booking ID' },
            });
        }
        if (!status || !['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
            return res.status(400).json({
                error: { code: 'BAD_REQUEST', message: 'Valid status is required' },
            });
        }
        const booking = await model_1.default.findByIdAndUpdate(idStr, { status, ...(notes !== undefined ? { notes } : {}) }, { new: true, runValidators: true }).populate('createdBy', 'email').populate('roomId', 'name price');
        if (!booking) {
            return res.status(404).json({
                error: { code: 'NOT_FOUND', message: 'Booking not found' },
            });
        }
        return res.json({
            message: 'Booking updated successfully',
            booking: { id: String(booking._id), ...booking.toObject() },
        });
    }
    catch (e) {
        console.error('[bookings/update]', e);
        return res.status(500).json({
            error: { code: 'INTERNAL_ERROR', message: 'Failed to update booking' },
        });
    }
});
// DELETE /api/bookings/:id - delete booking (admin only)
router.delete('/:id', middleware_1.authenticate, (0, middleware_1.requireRole)('admin'), async (req, res) => {
    try {
        const { id } = req.params;
        const idStr = id;
        if (!mongoose_1.Types.ObjectId.isValid(idStr)) {
            return res.status(400).json({
                error: { code: 'BAD_REQUEST', message: 'Invalid booking ID' },
            });
        }
        const booking = await model_1.default.findByIdAndDelete(idStr);
        if (!booking) {
            return res.status(404).json({
                error: { code: 'NOT_FOUND', message: 'Booking not found' },
            });
        }
        return res.json({ message: 'Booking deleted successfully' });
    }
    catch (e) {
        console.error('[bookings/delete]', e);
        return res.status(500).json({
            error: { code: 'INTERNAL_ERROR', message: 'Failed to delete booking' },
        });
    }
});
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const model_1 = __importDefault(require("./model"));
const middleware_1 = require("../auth/middleware");
const validation_1 = require("../validation");
const router = express_1.default.Router();
// GET /api/bookings - list all bookings (admin only)
// Query params: page, limit, sort, order
router.get('/', middleware_1.authenticate, (0, middleware_1.requireRole)('admin'), async (req, res) => {
    try {
        const query = validation_1.paginationSchema.parse(req.query);
        const { page, limit, sort, order } = query;
        const skip = (page - 1) * limit;
        const sortOrder = order === 'asc' ? 1 : -1;
        const sortObj = sort ? { [sort]: sortOrder } : { createdAt: -1 };
        const [bookings, total] = await Promise.all([
            model_1.default.find()
                .populate('createdBy', 'email')
                .sort(sortObj)
                .skip(skip)
                .limit(limit)
                .lean(),
            model_1.default.countDocuments(),
        ]);
        return res.json({
            bookings,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    }
    catch (e) {
        if (e.name === 'ZodError') {
            return res.status(400).json({
                error: { code: 'BAD_REQUEST', message: 'Validation failed', details: e.errors },
            });
        }
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
        const booking = await model_1.default.findById(id).populate('createdBy', 'email').lean();
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
        const bookingData = validation_1.createBookingSchema.parse(req.body);
        const userId = req.user.id;
        const booking = await model_1.default.create({
            ...bookingData,
            createdBy: userId,
            status: 'pending',
        });
        return res.status(201).json({
            message: 'Booking created successfully',
            booking: { id: String(booking._id), ...booking.toObject() },
        });
    }
    catch (e) {
        if (e.name === 'ZodError') {
            return res.status(400).json({
                error: { code: 'BAD_REQUEST', message: 'Validation failed', details: e.errors },
            });
        }
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
        const idStr = id;
        if (!mongoose_1.Types.ObjectId.isValid(idStr)) {
            return res.status(400).json({
                error: { code: 'BAD_REQUEST', message: 'Invalid booking ID' },
            });
        }
        const updateData = validation_1.updateBookingSchema.parse(req.body);
        const booking = await model_1.default.findByIdAndUpdate(idStr, updateData, { new: true, runValidators: true }).populate('createdBy', 'email');
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
        if (e.name === 'ZodError') {
            return res.status(400).json({
                error: { code: 'BAD_REQUEST', message: 'Validation failed', details: e.errors },
            });
        }
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

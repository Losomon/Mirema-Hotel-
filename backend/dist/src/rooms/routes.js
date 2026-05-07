"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const model_1 = __importDefault(require("./model"));
const model_2 = __importDefault(require("../bookings/model"));
const middleware_1 = require("../auth/middleware");
const validation_1 = require("../validation");
const router = express_1.default.Router();
// GET /api/rooms - list all active rooms (public)
// Query params: page, limit, sort (price|name|capacity), order (asc|desc)
router.get('/', async (req, res) => {
    try {
        const query = validation_1.paginationSchema.parse(req.query);
        const { page, limit, sort, order } = query;
        const skip = (page - 1) * limit;
        const sortOrder = order === 'asc' ? 1 : -1;
        const sortObj = sort ? { [sort]: sortOrder } : { price: 1 };
        const [rooms, total] = await Promise.all([
            model_1.default.find({ isActive: true })
                .sort(sortObj)
                .skip(skip)
                .limit(limit)
                .lean(),
            model_1.default.countDocuments({ isActive: true }),
        ]);
        return res.json({
            rooms,
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
        console.error('[rooms/list]', e);
        return res.status(500).json({
            error: { code: 'INTERNAL_ERROR', message: 'Failed to list rooms' },
        });
    }
});
// GET /api/rooms/availability?roomId=&startDate=&endDate=
// Public: check if a specific room is available, or list all available rooms
router.get('/availability', async (req, res) => {
    try {
        const { roomId, startDate, endDate } = validation_1.availabilitySchema.parse(req.query);
        // Find all bookings that overlap the requested range
        // Overlap condition: checkIn < endDate AND checkOut > startDate
        const overlappingBookings = await model_2.default.find({
            status: { $in: ['pending', 'confirmed'] },
            checkIn: { $lt: endDate },
            checkOut: { $gt: startDate },
            ...(roomId ? { roomId } : {}),
        }).select('roomId').lean();
        const bookedRoomIds = new Set(overlappingBookings.map(b => String(b.roomId)));
        if (roomId) {
            // Single room check
            const room = await model_1.default.findOne({ _id: roomId, isActive: true }).lean();
            if (!room) {
                return res.status(404).json({
                    error: { code: 'NOT_FOUND', message: 'Room not found' },
                });
            }
            const isAvailable = !bookedRoomIds.has(roomId);
            return res.json({ roomId, isAvailable, startDate, endDate });
        }
        // All rooms check — return each room with availability flag
        const rooms = await model_1.default.find({ isActive: true }).lean();
        const result = rooms.map(room => ({
            ...room,
            id: String(room._id),
            isAvailable: !bookedRoomIds.has(String(room._id)),
        }));
        return res.json({ rooms: result, startDate, endDate });
    }
    catch (e) {
        if (e.name === 'ZodError') {
            return res.status(400).json({
                error: { code: 'BAD_REQUEST', message: 'Validation failed', details: e.errors },
            });
        }
        console.error('[rooms/availability]', e);
        return res.status(500).json({
            error: { code: 'INTERNAL_ERROR', message: 'Failed to check availability' },
        });
    }
});
// GET /api/rooms/:id - get a specific room (public)
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                error: { code: 'BAD_REQUEST', message: 'Invalid room ID' },
            });
        }
        const room = await model_1.default.findOne({ _id: id, isActive: true }).lean();
        if (!room) {
            return res.status(404).json({
                error: { code: 'NOT_FOUND', message: 'Room not found' },
            });
        }
        return res.json({ room });
    }
    catch (e) {
        console.error('[rooms/get]', e);
        return res.status(500).json({
            error: { code: 'INTERNAL_ERROR', message: 'Failed to get room' },
        });
    }
});
// POST /api/rooms - create a room (admin only)
router.post('/', middleware_1.authenticate, (0, middleware_1.requireRole)('admin'), async (req, res) => {
    try {
        const roomData = validation_1.createRoomSchema.parse(req.body);
        const room = await model_1.default.create(roomData);
        return res.status(201).json({
            message: 'Room created successfully',
            room: { id: String(room._id), ...room.toObject() },
        });
    }
    catch (e) {
        if (e.name === 'ZodError') {
            return res.status(400).json({
                error: { code: 'BAD_REQUEST', message: 'Validation failed', details: e.errors },
            });
        }
        console.error('[rooms/create]', e);
        return res.status(500).json({
            error: { code: 'INTERNAL_ERROR', message: 'Failed to create room' },
        });
    }
});
// PUT /api/rooms/:id - update a room (admin only)
router.put('/:id', middleware_1.authenticate, (0, middleware_1.requireRole)('admin'), async (req, res) => {
    try {
        const { id } = req.params;
        const idStr = id;
        if (!mongoose_1.Types.ObjectId.isValid(idStr)) {
            return res.status(400).json({
                error: { code: 'BAD_REQUEST', message: 'Invalid room ID' },
            });
        }
        const updateData = validation_1.updateRoomSchema.parse(req.body);
        const room = await model_1.default.findByIdAndUpdate(idStr, updateData, { new: true, runValidators: true }).lean();
        if (!room) {
            return res.status(404).json({
                error: { code: 'NOT_FOUND', message: 'Room not found' },
            });
        }
        return res.json({
            message: 'Room updated successfully',
            room: { id: String(room._id), ...room },
        });
    }
    catch (e) {
        if (e.name === 'ZodError') {
            return res.status(400).json({
                error: { code: 'BAD_REQUEST', message: 'Validation failed', details: e.errors },
            });
        }
        console.error('[rooms/update]', e);
        return res.status(500).json({
            error: { code: 'INTERNAL_ERROR', message: 'Failed to update room' },
        });
    }
});
// DELETE /api/rooms/:id - delete a room (admin only)
router.delete('/:id', middleware_1.authenticate, (0, middleware_1.requireRole)('admin'), async (req, res) => {
    try {
        const { id } = req.params;
        const idStr = id;
        if (!mongoose_1.Types.ObjectId.isValid(idStr)) {
            return res.status(400).json({
                error: { code: 'BAD_REQUEST', message: 'Invalid room ID' },
            });
        }
        const room = await model_1.default.findByIdAndDelete(idStr);
        if (!room) {
            return res.status(404).json({
                error: { code: 'NOT_FOUND', message: 'Room not found' },
            });
        }
        return res.json({ message: 'Room deleted successfully' });
    }
    catch (e) {
        console.error('[rooms/delete]', e);
        return res.status(500).json({
            error: { code: 'INTERNAL_ERROR', message: 'Failed to delete room' },
        });
    }
});
exports.default = router;

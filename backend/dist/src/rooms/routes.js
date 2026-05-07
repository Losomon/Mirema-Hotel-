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
        if (e instanceof Error && e.message.includes('validation')) {
            return res.status(400).json({
                error: { code: 'BAD_REQUEST', message: e.message },
            });
        }
        console.error('[rooms/list]', e);
        return res.status(500).json({
            error: { code: 'INTERNAL_ERROR', message: 'Failed to list rooms' },
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

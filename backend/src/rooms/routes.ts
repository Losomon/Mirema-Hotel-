import express, { Request, Response } from 'express';
import { Types } from 'mongoose';

import Room from './model';
import { authenticate, requireRole } from '../auth/middleware';
import { paginationSchema, createRoomSchema, updateRoomSchema } from '../validation';

const router = express.Router();

// GET /api/rooms - list all active rooms (public)
// Query params: page, limit, sort (price|name|capacity), order (asc|desc)
router.get('/', async (req: Request, res: Response) => {
  try {
    const query = paginationSchema.parse(req.query);
    const { page, limit, sort, order } = query;

    const skip = (page - 1) * limit;
    const sortOrder = order === 'asc' ? 1 : -1;
    const sortObj: any = sort ? { [sort]: sortOrder } : { price: 1 };

    const [rooms, total] = await Promise.all([
      Room.find({ isActive: true })
        .sort(sortObj)
        .skip(skip)
        .limit(limit)
        .lean(),
      Room.countDocuments({ isActive: true }),
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
  } catch (e) {
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
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id as string)) {
      return res.status(400).json({
        error: { code: 'BAD_REQUEST', message: 'Invalid room ID' },
      });
    }
    const room = await Room.findOne({ _id: id, isActive: true }).lean();
    if (!room) {
      return res.status(404).json({
        error: { code: 'NOT_FOUND', message: 'Room not found' },
      });
    }
    return res.json({ room });
  } catch (e) {
    console.error('[rooms/get]', e);
    return res.status(500).json({
      error: { code: 'INTERNAL_ERROR', message: 'Failed to get room' },
    });
  }
});

// POST /api/rooms - create a room (admin only)
router.post('/', authenticate, requireRole('admin'), async (req: Request, res: Response) => {
  try {
    const roomData = createRoomSchema.parse(req.body);
    const room = await Room.create(roomData);

    return res.status(201).json({
      message: 'Room created successfully',
      room: { id: String(room._id), ...room.toObject() },
    });
  } catch (e: any) {
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
router.put('/:id', authenticate, requireRole('admin'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idStr = id as string;

    if (!Types.ObjectId.isValid(idStr)) {
      return res.status(400).json({
        error: { code: 'BAD_REQUEST', message: 'Invalid room ID' },
      });
    }

    const updateData = updateRoomSchema.parse(req.body);
    const room = await Room.findByIdAndUpdate(
      idStr,
      updateData,
      { new: true, runValidators: true }
    ).lean();

    if (!room) {
      return res.status(404).json({
        error: { code: 'NOT_FOUND', message: 'Room not found' },
      });
    }

    return res.json({
      message: 'Room updated successfully',
      room: { id: String(room._id), ...room },
    });
  } catch (e: any) {
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
router.delete('/:id', authenticate, requireRole('admin'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idStr = id as string;

    if (!Types.ObjectId.isValid(idStr)) {
      return res.status(400).json({
        error: { code: 'BAD_REQUEST', message: 'Invalid room ID' },
      });
    }

    const room = await Room.findByIdAndDelete(idStr);

    if (!room) {
      return res.status(404).json({
        error: { code: 'NOT_FOUND', message: 'Room not found' },
      });
    }

    return res.json({ message: 'Room deleted successfully' });
  } catch (e) {
    console.error('[rooms/delete]', e);
    return res.status(500).json({
      error: { code: 'INTERNAL_ERROR', message: 'Failed to delete room' },
    });
  }
});

export default router;


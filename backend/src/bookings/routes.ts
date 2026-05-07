import express, { Request, Response } from 'express';
import { Types } from 'mongoose';

import Booking from './model';
import { authenticate, requireRole, AuthedRequest } from '../auth/middleware';
import { createBookingSchema, updateBookingSchema } from '../validation';

const router = express.Router();

// GET /api/bookings/me - current user's own bookings (authenticated members)
router.get('/me', authenticate, async (req: AuthedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const bookings = await Booking.find({ createdBy: userId })
      .populate('roomId', 'name price')
      .sort({ createdAt: -1 })
      .lean();
    return res.json({ bookings });
  } catch (e) {
    console.error('[bookings/me]', e);
    return res.status(500).json({
      error: { code: 'INTERNAL_ERROR', message: 'Failed to get user bookings' },
    });
  }
});

// GET /api/bookings - list all bookings (admin only)
router.get('/', authenticate, requireRole('admin'), async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find()
      .populate('createdBy', 'email')
      .populate('roomId', 'name price')
      .sort({ createdAt: -1 })
      .lean();
    return res.json({ bookings });
  } catch (e) {
    console.error('[bookings/list]', e);
    return res.status(500).json({
      error: { code: 'INTERNAL_ERROR', message: 'Failed to list bookings' },
    });
  }
});

// GET /api/bookings/:id - get a specific booking (admin only)
router.get('/:id', authenticate, requireRole('admin'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id as string)) {
      return res.status(400).json({
        error: { code: 'BAD_REQUEST', message: 'Invalid booking ID' },
      });
    }
    const booking = await Booking.findById(id)
      .populate('createdBy', 'email')
      .populate('roomId', 'name price')
      .lean();
    if (!booking) {
      return res.status(404).json({
        error: { code: 'NOT_FOUND', message: 'Booking not found' },
      });
    }
    return res.json({ booking });
  } catch (e) {
    console.error('[bookings/get]', e);
    return res.status(500).json({
      error: { code: 'INTERNAL_ERROR', message: 'Failed to get booking' },
    });
  }
});

// POST /api/bookings - create a booking (authenticated users only)
router.post('/', authenticate, async (req: Request, res: Response) => {
  try {
    const data = createBookingSchema.parse(req.body);
    const userId = (req as any).user!.id;

    const booking = await Booking.create({
      guestName: data.guestName,
      guestEmail: data.guestEmail,
      guestPhone: data.guestPhone,
      roomId: data.roomId,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guests: data.guests,
      notes: data.notes,
      createdBy: userId,
      status: 'pending',
    });

    return res.status(201).json({
      message: 'Booking created successfully',
      booking: { id: String(booking._id), ...booking.toObject() },
    });
  } catch (e: any) {
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
router.put('/:id', authenticate, requireRole('admin'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idStr = id as string;

    if (!Types.ObjectId.isValid(idStr)) {
      return res.status(400).json({
        error: { code: 'BAD_REQUEST', message: 'Invalid booking ID' },
      });
    }

    const data = updateBookingSchema.parse(req.body);

    const booking = await Booking.findByIdAndUpdate(
      idStr,
      { status: data.status, ...(data.notes !== undefined ? { notes: data.notes } : {}) },
      { new: true, runValidators: true }
    ).populate('createdBy', 'email').populate('roomId', 'name price');

    if (!booking) {
      return res.status(404).json({
        error: { code: 'NOT_FOUND', message: 'Booking not found' },
      });
    }

    return res.json({
      message: 'Booking updated successfully',
      booking: { id: String(booking._id), ...booking.toObject() },
    });
  } catch (e: any) {
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
router.delete('/:id', authenticate, requireRole('admin'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idStr = id as string;

    if (!Types.ObjectId.isValid(idStr)) {
      return res.status(400).json({
        error: { code: 'BAD_REQUEST', message: 'Invalid booking ID' },
      });
    }

    const booking = await Booking.findByIdAndDelete(idStr);
    if (!booking) {
      return res.status(404).json({
        error: { code: 'NOT_FOUND', message: 'Booking not found' },
      });
    }

    return res.json({ message: 'Booking deleted successfully' });
  } catch (e) {
    console.error('[bookings/delete]', e);
    return res.status(500).json({
      error: { code: 'INTERNAL_ERROR', message: 'Failed to delete booking' },
    });
  }
});

export default router;

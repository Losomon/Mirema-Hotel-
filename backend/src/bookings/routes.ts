import express, { Request, Response } from 'express';
import { Types } from 'mongoose';

import Booking from './model';
import { authenticate, requireRole } from '../auth/middleware';

const router = express.Router();

// GET /api/bookings - list all bookings (admin only)
router.get('/', authenticate, requireRole('admin'), async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find()
      .populate('createdBy', 'email')
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
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: { code: 'BAD_REQUEST', message: 'Invalid booking ID' },
      });
    }
    const booking = await Booking.findById(id).populate('createdBy', 'email').lean();
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
    const { guestName, guestEmail, guestPhone, roomName, checkIn, checkOut, guests, notes } =
      req.body || {};

    if (!guestName || !guestEmail || !guestPhone || !roomName || !checkIn || !checkOut || !guests) {
      return res.status(400).json({
        error: { code: 'BAD_REQUEST', message: 'All booking fields are required' },
      });
    }

    const userId = (req as any).user!.id;

    const booking = await Booking.create({
      guestName: String(guestName).trim(),
      guestEmail: String(guestEmail).toLowerCase().trim(),
      guestPhone: String(guestPhone).trim(),
      roomName: String(roomName).trim(),
      checkIn: String(checkIn).trim(),
      checkOut: String(checkOut).trim(),
      guests: Number(guests),
      notes: notes ? String(notes).trim() : undefined,
      createdBy: userId,
      status: 'pending',
    });

    return res.status(201).json({
      message: 'Booking created successfully',
      booking: { id: String(booking._id), ...booking.toObject() },
    });
  } catch (e) {
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
    const { status, notes } = req.body || {};

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: { code: 'BAD_REQUEST', message: 'Invalid booking ID' },
      });
    }

    if (!status || !['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        error: { code: 'BAD_REQUEST', message: 'Valid status is required' },
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status, ...(notes !== undefined ? { notes } : {}) },
      { new: true, runValidators: true }
    ).populate('createdBy', 'email');

    if (!booking) {
      return res.status(404).json({
        error: { code: 'NOT_FOUND', message: 'Booking not found' },
      });
    }

    return res.json({
      message: 'Booking updated successfully',
      booking: { id: String(booking._id), ...booking.toObject() },
    });
  } catch (e) {
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

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: { code: 'BAD_REQUEST', message: 'Invalid booking ID' },
      });
    }

    const booking = await Booking.findByIdAndDelete(id);
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
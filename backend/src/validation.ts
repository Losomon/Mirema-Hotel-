import { z } from 'zod';
import { Types } from 'mongoose';

// Room validation schemas
export const createRoomSchema = z.object({
  name: z.string().min(1, 'Room name is required').trim(),
  description: z.string().trim().optional(),
  price: z.number().min(0, 'Price must be non-negative'),
  capacity: z.number().int().min(1, 'Capacity must be at least 1'),
  amenities: z.array(z.string().trim()).optional(),
  imageUrl: z.string().url('Invalid image URL').optional().or(z.literal('')),
  isActive: z.boolean().optional().default(true),
});

export const updateRoomSchema = createRoomSchema.partial();

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  sort: z.enum(['price', 'name', 'capacity']).optional(),
  order: z.enum(['asc', 'desc']).default('asc'),
});

// Booking validation schemas
const today = new Date();
today.setHours(0, 0, 0, 0);

export const createBookingSchema = z.object({
  guestName: z.string().min(1, 'Guest name is required').trim(),
  guestEmail: z.string().email('Invalid email').toLowerCase().trim(),
  guestPhone: z.string().min(1, 'Phone is required').trim(),
  roomId: z.string().refine(id => Types.ObjectId.isValid(id), { message: 'Invalid room ID' }),
  checkIn: z.coerce.date().min(today, 'Check-in date cannot be in the past'),
  checkOut: z.coerce.date().min(today, 'Check-out date cannot be in the past'),
  guests: z.number().int().min(1, 'Guests must be at least 1'),
  notes: z.string().trim().optional(),
}).refine(
  (data) => data.checkOut > data.checkIn,
  { message: 'Check-out date must be after check-in date', path: ['checkOut'] }
);

export const updateBookingSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']),
  notes: z.string().trim().optional(),
});

export type CreateRoomInput = z.infer<typeof createRoomSchema>;
export type UpdateRoomInput = z.infer<typeof updateRoomSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type UpdateBookingInput = z.infer<typeof updateBookingSchema>;

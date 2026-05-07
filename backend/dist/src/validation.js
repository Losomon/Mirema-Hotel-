"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookingSchema = exports.createBookingSchema = exports.availabilitySchema = exports.paginationSchema = exports.updateRoomSchema = exports.createRoomSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
// Room validation schemas
exports.createRoomSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Room name is required').trim(),
    description: zod_1.z.string().trim().optional(),
    price: zod_1.z.number().min(0, 'Price must be non-negative'),
    capacity: zod_1.z.number().int().min(1, 'Capacity must be at least 1'),
    amenities: zod_1.z.array(zod_1.z.string().trim()).optional(),
    imageUrl: zod_1.z.string().url('Invalid image URL').optional().or(zod_1.z.literal('')),
    isActive: zod_1.z.boolean().optional().default(true),
});
exports.updateRoomSchema = exports.createRoomSchema.partial();
exports.paginationSchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(10),
    sort: zod_1.z.enum(['price', 'name', 'capacity']).optional(),
    order: zod_1.z.enum(['asc', 'desc']).default('asc'),
});
// Availability validation
const today = new Date();
today.setHours(0, 0, 0, 0);
exports.availabilitySchema = zod_1.z.object({
    roomId: zod_1.z.string().refine(v => mongoose_1.Types.ObjectId.isValid(v), { message: 'Invalid room ID' }).optional(),
    startDate: zod_1.z.coerce.date().min(today, 'Start date cannot be in the past'),
    endDate: zod_1.z.coerce.date().min(today, 'End date cannot be in the past'),
}).refine(d => d.endDate > d.startDate, {
    message: 'End date must be after start date',
    path: ['endDate'],
});
// Booking validation schemas
exports.createBookingSchema = zod_1.z.object({
    guestName: zod_1.z.string().min(1, 'Guest name is required').trim(),
    guestEmail: zod_1.z.string().email('Invalid email').toLowerCase().trim(),
    guestPhone: zod_1.z.string().min(1, 'Phone is required').trim(),
    roomId: zod_1.z.string().refine(id => mongoose_1.Types.ObjectId.isValid(id), { message: 'Invalid room ID' }),
    checkIn: zod_1.z.coerce.date().min(today, 'Check-in date cannot be in the past'),
    checkOut: zod_1.z.coerce.date().min(today, 'Check-out date cannot be in the past'),
    guests: zod_1.z.number().int().min(1, 'Guests must be at least 1'),
    notes: zod_1.z.string().trim().optional(),
}).refine((data) => data.checkOut > data.checkIn, { message: 'Check-out date must be after check-in date', path: ['checkOut'] });
exports.updateBookingSchema = zod_1.z.object({
    status: zod_1.z.enum(['pending', 'confirmed', 'cancelled', 'completed']),
    notes: zod_1.z.string().trim().optional(),
});

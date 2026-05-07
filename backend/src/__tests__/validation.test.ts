import { z } from 'zod';
import {
  createRoomSchema,
  updateRoomSchema,
  createBookingSchema,
  updateBookingSchema,
  availabilitySchema,
  loginSchema,
} from '../validation';

describe('Validation Schemas', () => {
  describe('loginSchema', () => {
    it('should accept valid email and password', () => {
      const data = { email: 'test@example.com', password: 'password123' };
      const result = loginSchema.parse(data);
      expect(result).toEqual(data);
    });

    it('should reject invalid email', () => {
      expect(() => {
        loginSchema.parse({ email: 'invalid-email', password: 'password123' });
      }).toThrow();
    });

    it('should reject short password', () => {
      expect(() => {
        loginSchema.parse({ email: 'test@example.com', password: '12345' });
      }).toThrow();
    });
  });

  describe('createRoomSchema', () => {
    it('should accept valid room data', () => {
      const data = {
        name: 'Deluxe Suite',
        price: 250,
        capacity: 4,
        amenities: ['WiFi', 'AC'],
        imageUrl: 'https://example.com/image.jpg',
      };
      const result = createRoomSchema.parse(data);
      expect(result.name).toBe('Deluxe Suite');
      expect(result.price).toBe(250);
      expect(result.capacity).toBe(4);
    });

    it('should reject negative price', () => {
      expect(() => {
        createRoomSchema.parse({ name: 'Test', price: -100, capacity: 1 });
      }).toThrow();
    });

    it('should reject capacity less than 1', () => {
      expect(() => {
        createRoomSchema.parse({ name: 'Test', price: 100, capacity: 0 });
      }).toThrow();
    });

    it('should accept optional fields when omitted', () => {
      const result = createRoomSchema.parse({ name: 'Basic', price: 50, capacity: 2 });
      expect(result.description).toBeUndefined();
      expect(result.amenities).toBeUndefined();
    });
  });

  describe('updateRoomSchema (partial)', () => {
    it('should accept partial updates', () => {
      const result = updateRoomSchema.parse({ price: 200 });
      expect(result.price).toBe(200);
    });

    it('should reject invalid data when provided', () => {
      expect(() => {
        updateRoomSchema.parse({ price: -50 });
      }).toThrow();
    });
  });

  describe('createBookingSchema', () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    it('should accept valid booking data', () => {
      const data = {
        guestName: 'John Doe',
        guestEmail: 'john@example.com',
        guestPhone: '1234567890',
        roomId: '507f1f77bcf86cd799439011',
        checkIn: today,
        checkOut: tomorrow,
        guests: 2,
      };
      const result = createBookingSchema.parse(data);
      expect(result.guestName).toBe('John Doe');
      expect(result.guests).toBe(2);
    });

    it('should reject invalid roomId format', () => {
      expect(() => {
        createBookingSchema.parse({
          guestName: 'Test',
          guestEmail: 'test@test.com',
          guestPhone: '123',
          roomId: 'invalid-id',
          checkIn: today,
          checkOut: tomorrow,
          guests: 1,
        });
      }).toThrow();
    });

    it('should reject checkIn in the past', () => {
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      expect(() => {
        createBookingSchema.parse({
          guestName: 'Test',
          guestEmail: 'test@test.com',
          guestPhone: '123',
          roomId: '507f1f77bcf86cd799439011',
          checkIn: yesterday,
          checkOut: tomorrow,
          guests: 1,
        });
      }).toThrow();
    });

    it('should reject when checkOut is before checkIn', () => {
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);
      expect(() => {
        createBookingSchema.parse({
          guestName: 'Test',
          guestEmail: 'test@test.com',
          guestPhone: '123',
          roomId: '507f1f77bcf86cd799439011',
          checkIn: nextWeek,
          checkOut: today,
          guests: 1,
        });
      }).toThrow();
    });
  });

  describe('updateBookingSchema', () => {
    it('should accept valid status values', () => {
      const statuses = ['pending', 'confirmed', 'cancelled', 'completed'] as const;
      for (const status of statuses) {
        const result = updateBookingSchema.parse({ status });
        expect(result.status).toBe(status);
      }
    });

    it('should reject invalid status', () => {
      expect(() => {
        updateBookingSchema.parse({ status: 'invalid' as any });
      }).toThrow();
    });

    it('should accept optional notes', () => {
      const result = updateBookingSchema.parse({ status: 'confirmed', notes: 'Special request' });
      expect(result.notes).toBe('Special request');
    });
  });

  describe('availabilitySchema', () => {
    it('should accept valid availability query', () => {
      const today = new Date();
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);
      
      const data = {
        startDate: today,
        endDate: nextWeek,
        roomId: '507f1f77bcf86cd799439011',
      };
      const result = availabilitySchema.parse(data);
      expect(result.startDate).toEqual(today);
      expect(result.endDate).toEqual(nextWeek);
    });

    it('should allow roomId to be optional', () => {
      const today = new Date();
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);
      
      const data = {
        startDate: today,
        endDate: nextWeek,
      };
      const result = availabilitySchema.parse(data);
      expect(result.roomId).toBeUndefined();
    });

    it('should reject past startDate', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const tomorrow = new Date();
      
      expect(() => {
        availabilitySchema.parse({ startDate: yesterday, endDate: tomorrow });
      }).toThrow();
    });

    it('should reject when endDate before startDate', () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      
      expect(() => {
        availabilitySchema.parse({ startDate: today, endDate: yesterday });
      }).toThrow();
    });
  });
});

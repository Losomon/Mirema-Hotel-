// Shared mock data for admin pages
// This ensures consistency across all admin components

export type AdminBookingStatus = 'pending' | 'confirmed' | 'cancelled';

export type AdminBooking = {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: AdminBookingStatus;
  notes?: string;
};

export const mockAdminBookings: AdminBooking[] = [
  {
    id: 'bk_1001',
    guestName: 'John K.',
    guestEmail: 'john@example.com',
    guestPhone: '+254 700 000 000',
    roomName: 'Standard Room',
    checkIn: '2026-05-10',
    checkOut: '2026-05-12',
    guests: 2,
    status: 'confirmed',
    notes: 'Prefers late check-in.',
  },
  {
    id: 'bk_1002',
    guestName: 'Mary N.',
    guestEmail: 'mary@example.com',
    guestPhone: '+254 711 111 111',
    roomName: 'Deluxe Room',
    checkIn: '2026-05-11',
    checkOut: '2026-05-15',
    guests: 3,
    status: 'pending',
    notes: 'Airport pickup requested.',
  },
  {
    id: 'bk_1003',
    guestName: 'Peter O.',
    guestEmail: 'peter@example.com',
    guestPhone: '+254 722 222 222',
    roomName: 'One-Bedroom Serviced Apartment',
    checkIn: '2026-05-20',
    checkOut: '2026-05-22',
    guests: 4,
    status: 'cancelled',
  },
];

export type RoomStatus = 'active' | 'inactive';

export type AdminRoom = {
  id: string;
  name: string;
  price: number;
  status: RoomStatus;
  description: string;
};

export const mockAdminRooms: AdminRoom[] = [
  { id: 'rm_1', name: 'Standard Room', price: 100, status: 'active', description: 'Comfortable queen bed.' },
  { id: 'rm_2', name: 'Deluxe Room', price: 150, status: 'active', description: 'Spacious with city views.' },
  { id: 'rm_3', name: 'One-Bedroom Serviced Apartment', price: 250, status: 'inactive', description: 'Great for extended stays.' },
];

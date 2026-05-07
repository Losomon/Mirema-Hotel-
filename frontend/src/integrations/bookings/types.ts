export interface Booking {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  createdBy?: {
    id: string;
    email: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface BookingFormData {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  notes?: string;
}

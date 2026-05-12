import { API_BASE_URL } from '../config';
import { Booking, BookingFormData } from './types';

const getAuthHeaders = (): HeadersInit => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || 'Request failed');
  }
  return data;
};

export const bookingsService = {
  async listBookings(): Promise<{ bookings: Booking[] }> {
    const response = await fetch(`${API_BASE_URL}/api/bookings`, {
      headers: getAuthHeaders(),
      credentials: 'include',
    });
    return handleResponse<{ bookings: Booking[] }>(response);
  },

  async getBooking(id: string): Promise<{ booking: Booking }> {
    const response = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
      headers: getAuthHeaders(),
      credentials: 'include',
    });
    return handleResponse<{ booking: Booking }>(response);
  },

  async createBooking(data: BookingFormData): Promise<{
    message: string;
    booking: Booking;
  }> {
    const response = await fetch(`${API_BASE_URL}/api/bookings`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
      credentials: 'include',
    });
    return handleResponse<{
      message: string;
      booking: Booking;
    }>(response);
  },

  async updateBooking(
    id: string,
    data: { status: 'pending' | 'confirmed' | 'cancelled'; notes?: string }
  ): Promise<{ message: string; booking: Booking }> {
    const response = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
      credentials: 'include',
    });
    return handleResponse<{ message: string; booking: Booking }>(response);
  },

  async deleteBooking(id: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
      credentials: 'include',
    });
    return handleResponse<{ message: string }>(response);
  },
};

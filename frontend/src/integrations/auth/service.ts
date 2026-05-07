import { API_BASE_URL } from '../../config';
import { LoginCredentials, AuthResponse, AuthUser } from './types';

const getAuthHeaders = (): HeadersInit => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || 'Request failed');
  }
  return data;
};

export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
}

export function setToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
}

export function clearToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    credentials: 'include',
  });
  return handleResponse<AuthResponse>(response);
}

export async function logout(): Promise<void> {
  await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: 'POST',
    headers: getAuthHeaders(),
    credentials: 'include',
  });
}

export async function fetchCurrentUser(): Promise<AuthUser> {
  const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
    headers: getAuthHeaders(),
    credentials: 'include',
  });
  const data = await handleResponse<{ user: AuthUser }>(response);
  return data.user;
}

// Types for auth-related data

export type UserRole = 'admin' | 'member';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}

// Extended member type that includes both our auth data and Wix-style fields
export interface Member extends AuthUser {
  contact?: {
    firstName?: string;
    lastName?: string;
  };
  profile?: {
    nickname?: string;
    title?: string;
    photo?: { url?: string };
  };
  loginEmail?: string;
  loginEmailVerified?: boolean;
  _createdDate?: string;
  status?: 'APPROVED' | 'PENDING' | 'DISABLED';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface ApiError {
  code: string;
  message: string;
}

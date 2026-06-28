export interface User {
  id: number;
  email: string;
  username: string;
  password?: string;
  phone: string;
  role: 'CUSTOMER' | 'ADMIN';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  phone: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

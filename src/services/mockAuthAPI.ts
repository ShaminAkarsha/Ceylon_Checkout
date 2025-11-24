/**
 * Mock Authentication API for Development/Testing
 * 
 * This simulates backend API responses for authentication endpoints.
 * Replace this with real API calls in production.
 */

import type { LoginCredentials, RegisterData, AuthResponse } from '../types/auth';

// Simulated delay to mimic network requests
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user database (in memory, resets on refresh)
const mockUsers = new Map<string, { password: string; user: AuthResponse['user'] }>();

// Pre-populate with a test user
mockUsers.set('test@example.com', {
  password: 'password123',
  user: {
    id: '1',
    email: 'test@example.com',
    fullName: 'Test User',
    role: 'customer',
  },
});

// Add admin user
mockUsers.set('admin@example.com', {
  password: 'admin123',
  user: {
    id: '2',
    email: 'admin@example.com',
    fullName: 'Admin User',
    role: 'admin',
  },
});

export class MockAuthAPI {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await delay(800); // Simulate network delay

    const userData = mockUsers.get(credentials.email.toLowerCase());
    
    if (!userData) {
      throw new Error('Invalid email or password');
    }

    if (userData.password !== credentials.password) {
      throw new Error('Invalid email or password');
    }

    // Generate mock JWT token
    const token = `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    return {
      user: userData.user,
      token,
    };
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    await delay(1000); // Simulate network delay

    const email = data.email.toLowerCase();

    // Check if user already exists
    if (mockUsers.has(email)) {
      throw new Error('An account with this email already exists');
    }

    // Create new user
    const newUser = {
      id: `user_${Date.now()}`,
      email: data.email,
      fullName: data.fullName,
      role: 'customer' as const,
    };

    mockUsers.set(email, {
      password: data.password,
      user: newUser,
    });

    // Generate mock JWT token
    const token = `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    return {
      user: newUser,
      token,
    };
  }

  async logout(): Promise<void> {
    await delay(300);
    // In a real implementation, you might invalidate the token on the server
  }

  async verifyToken(token: string): Promise<boolean> {
    await delay(200);
    // Simple mock validation - check if token starts with 'mock_token_'
    return token.startsWith('mock_token_');
  }
}

export const mockAuthAPI = new MockAuthAPI();

import type { LoginCredentials, RegisterData, AuthResponse } from '../types/auth';
import { mockAuthAPI } from './mockAuthAPI';

const USE_MOCK_API = true; // Set to false when backend is ready

class AuthAPI {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Use mock API for development
    if (USE_MOCK_API) {
      return mockAuthAPI.login(credentials);
    }

    try {
      const response = await fetch(`/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Network error. Please try again.');
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    // Use mock API for development
    if (USE_MOCK_API) {
      return mockAuthAPI.register(data);
    }

    try {
      const response = await fetch(`/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Network error. Please try again.');
    }
  }

  async logout(): Promise<void> {
    // Use mock API for development
    if (USE_MOCK_API) {
      return mockAuthAPI.logout();
    }

    // Optional: Call backend logout endpoint
    try {
      await fetch(`/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
    } catch (error) {
      console.error('Logout API call failed:', error);
    }
  }

  async verifyToken(token: string): Promise<boolean> {
    // Use mock API for development
    if (USE_MOCK_API) {
      return mockAuthAPI.verifyToken(token);
    }

    try {
      const response = await fetch(`/auth/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  }
}

export const authAPI = new AuthAPI();

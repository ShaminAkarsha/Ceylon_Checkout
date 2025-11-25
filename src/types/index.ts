import { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
}

// Re-export auth types for convenience
export type { User, AuthState, LoginCredentials, RegisterData, AuthResponse } from './auth';

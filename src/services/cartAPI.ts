import type { 
  AddToCartDto, 
  UpdateCartItemDto, 
  CartItemDto, 
  CartSummaryDto 
} from '../types/cart';

const API_BASE_URL = 'http://localhost:8000/api/cart';

class CartAPI {
  private getAuthHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
    };
  }

  // Add item to cart
  // POST /api/cart
  async addToCart(data: AddToCartDto): Promise<CartItemDto> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Failed to add item to cart');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Failed to add item to cart');
    }
  }

  // Update cart item quantity
  // PUT /api/cart/{cartItemId}
  async updateCartItem(cartItemId: number, data: UpdateCartItemDto): Promise<CartItemDto> {
    try {
      const response = await fetch(`${API_BASE_URL}/${cartItemId}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Failed to update cart item');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update cart item');
    }
  }

  // Delete cart item by ID
  // DELETE /api/cart/{cartItemId}
  async deleteCartItem(cartItemId: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/${cartItemId}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Failed to delete cart item');
      }
    } catch (error: any) {
      throw new Error(error.message || 'Failed to delete cart item');
    }
  }

  // Get all cart items for a user
  // GET /api/cart/user/{userId}
  async getCartByUserId(userId: number): Promise<CartItemDto[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Failed to fetch cart');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch cart');
    }
  }

  // Delete cart item by user ID and product ID
  // DELETE /api/cart/user/{userId}/product/{productId}
  async deleteCartItemByProduct(userId: number, productId: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/user/${userId}/product/${productId}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Failed to delete cart item');
      }
    } catch (error: any) {
      throw new Error(error.message || 'Failed to delete cart item');
    }
  }

  // Clear all items from user's cart
  // DELETE /api/cart/user/{userId}/clear
  async clearCart(userId: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/user/${userId}/clear`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Failed to clear cart');
      }
    } catch (error: any) {
      throw new Error(error.message || 'Failed to clear cart');
    }
  }

  // Get cart summary for a user
  // GET /api/cart/user/{userId}/summary
  async getCartSummary(userId: number): Promise<CartSummaryDto> {
    try {
      const response = await fetch(`${API_BASE_URL}/user/${userId}/summary`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Failed to fetch cart summary');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch cart summary');
    }
  }
}

export const cartAPI = new CartAPI();

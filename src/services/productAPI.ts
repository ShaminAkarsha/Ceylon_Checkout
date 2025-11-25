import type { Product, CreateProductDto, UpdateProductDto } from '../types/product';

const API_BASE_URL = 'http://localhost:8000/api/product';

class ProductAPI {
  // Get all products
  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch products');
    }
  }

  // Get single product by ID
  async getProductById(productId: number): Promise<Product> {
    try {
      const response = await fetch(`${API_BASE_URL}/${productId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch product');
    }
  }

  // Create new product
  async createProduct(product: CreateProductDto): Promise<Product> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create product');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create product');
    }
  }

  // Update existing product
  async updateProduct(product: UpdateProductDto): Promise<Product> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update product');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update product');
    }
  }

  // Delete product
  async deleteProduct(productId: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
    } catch (error: any) {
      throw new Error(error.message || 'Failed to delete product');
    }
  }

  // Toggle product active status (local implementation)
  async toggleProductStatus(productId: number, isActive: boolean): Promise<Product> {
    // This would typically be a separate API endpoint
    // For now, we'll update the product with a status flag
    try {
      const product = await this.getProductById(productId);
      return await this.updateProduct({
        ...product,
        additionalAttributes: {
          ...product.additionalAttributes,
          isActive,
        },
      });
    } catch (error: any) {
      throw new Error(error.message || 'Failed to toggle product status');
    }
  }
}

export const productAPI = new ProductAPI();

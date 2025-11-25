// Cart types matching backend DTOs

export interface AddToCartDto {
  userId: number;
  productId: number;
  quantity: number;
}

export interface UpdateCartItemDto {
  quantity: number;
}

export interface CartItemDto {
  cartItemId: number;
  userId: number;
  productId: number;
  quantity: number;
  createdDate: string;
  updatedDate: string;
}

export interface CartSummaryDto {
  userId: number;
  items: CartItemDto[];
  totalItems: number;
  totalQuantity: number;
}

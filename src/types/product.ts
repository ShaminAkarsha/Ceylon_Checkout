// Product types matching backend ProductDto
export interface Product {
  productId: number;
  productName: string;
  productCode: string;
  productPrice: number;
  productDescription: string;
  productQuantity: number | null;
  productCategory: string;
  productCoverImage: string | null;
  productGalleryImages: string[];
  additionalAttributes: Record<string, any> | null;
  isActive?: boolean; // For activate/deactivate feature
}

// Tour-specific fields
export interface TourAttributes {
  location: string;
  duration: string;
  difficulty?: 'Easy' | 'Moderate' | 'Challenging' | 'Difficult';
  maxGroupSize?: number;
  startDate?: string;
  endDate?: string;
  includedItems?: string[];
  excludedItems?: string[];
  itinerary?: string;
}

// Handicraft-specific fields
export interface HandicraftAttributes {
  material: string;
  artisan?: string;
  origin: string;
  dimensions?: string;
  weight?: string;
  careInstructions?: string;
  isHandmade?: boolean;
  craftingTime?: string;
}

export interface CreateProductDto {
  productName: string;
  productCode: string;
  productPrice: number;
  productDescription: string;
  productQuantity: number | null;
  productCategory: string;
  productCoverImage: string | null;
  productGalleryImages: string[];
  additionalAttributes: Record<string, any> | null;
}

export interface UpdateProductDto extends CreateProductDto {
  productId: number;
}

// Helper type for product with specific category attributes
export type TourProduct = Product & { additionalAttributes: TourAttributes };
export type HandicraftProduct = Product & { additionalAttributes: HandicraftAttributes };


// Product category type matching backend values
export type ProductCategory = 'Tours' | 'HandyCrafts';

// Product types matching backend ProductDto
export interface Product {
  productId: number;
  productName: string;
  productCode: string;
  productPrice: number;
  productDescription: string;
  productQuantity: number | null;
  productCategory: ProductCategory | string;
  productCoverImage: string | null;
  productGalleryImages: string[];
  additionalAttributes: TourAttributes | HandicraftAttributes | null;
  isActive?: boolean; // For activate/deactivate feature
}

// Tour-specific fields (matching actual API response)
export interface TourAttributes {
  adapter_type: 'bokun' | string;
  tour_location: string;
  tour_duration: string;
  difficulty_level?: 'Easy' | 'Moderate' | 'Challenging' | 'Difficult';
  max_participants?: number;
  includes?: string[];
  excludes?: string[];
  meeting_point?: string;
  cancellation_policy?: string;
  external_url?: string;
  sync_timestamp?: string;
}

// Handicraft-specific fields (matching actual API response)
export interface HandicraftAttributes {
  adapter_type: 'handycrafts' | string;
  material: string;
  size?: string;
  color?: string;
  weight?: string;
  dimensions?: string;
  artisan?: string;
  origin: string;
  is_handmade?: boolean;
  crafting_technique?: string;
  product_category?: string;
  sync_timestamp?: string;
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
export type TourProduct = Product & { 
  productCategory: 'Tours';
  additionalAttributes: TourAttributes;
};
export type HandicraftProduct = Product & { 
  productCategory: 'HandyCrafts';
  additionalAttributes: HandicraftAttributes;
};

// Union type for typed products
export type TypedProduct = TourProduct | HandicraftProduct;

// Type guards for runtime checking
export function isTourProduct(product: Product): product is TourProduct {
  return product.productCategory === 'Tours';
}

export function isHandicraftProduct(product: Product): product is HandicraftProduct {
  return product.productCategory === 'HandyCrafts';
}


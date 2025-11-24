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

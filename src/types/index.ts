export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'tour' | 'handicraft';
  image: string;
  location?: string;
  duration?: string;
  rating: number;
  reviews: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

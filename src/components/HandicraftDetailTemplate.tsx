import { useState } from "react";
import {
  MapPin,
  Package,
  Ruler,
  Scale,
  User,
  Paintbrush,
  CheckCircle,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Truck,
  Shield,
} from "lucide-react";
import { HandicraftProduct } from "../types/product";
import { useCart } from "../context/CartContext";

interface HandicraftDetailTemplateProps {
  product: HandicraftProduct;
}

export default function HandicraftDetailTemplate({ product }: HandicraftDetailTemplateProps) {
  const { addItem } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const allImages = [
    product.productCoverImage,
    ...(product.productGalleryImages || []),
  ].filter(Boolean) as string[];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const attrs = product.additionalAttributes;

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="relative">
          <div className="relative h-[500px] lg:h-[600px] bg-gray-100">
            <img
              src={allImages[currentImageIndex] || "/placeholder-image.png"}
              alt={product.productName}
              className="w-full h-full object-contain p-4"
            />
            
            {/* Image Navigation */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-800" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                >
                  <ChevronRight className="h-6 w-6 text-gray-800" />
                </button>
              </>
            )}

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-4 py-2 bg-amber-500 text-white font-semibold rounded-full">
                Handicraft
              </span>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-2 rounded-full shadow-lg transition-all ${
                  isWishlisted ? "bg-red-500 text-white" : "bg-white/80 hover:bg-white text-gray-800"
                }`}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
              </button>
              <button className="p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all">
                <Share2 className="h-5 w-5 text-gray-800" />
              </button>
            </div>
          </div>

          {/* Thumbnail Gallery */}
          {allImages.length > 1 && (
            <div className="flex space-x-2 p-4 overflow-x-auto">
              {allImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentImageIndex ? "border-amber-500" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-8 lg:p-10">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.productName}
          </h1>

          {/* Product Code */}
          <p className="text-sm text-gray-500 mb-4">SKU: {product.productCode}</p>

          {/* Price */}
          <div className="mb-6">
            <span className="text-4xl font-bold text-amber-600">
              ${product.productPrice}
            </span>
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="text-gray-600 leading-relaxed">{product.productDescription}</p>
          </div>

          {/* Product Specifications */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Product Details</h2>
            <div className="grid grid-cols-2 gap-4">
              {attrs?.material && (
                <div className="flex items-center space-x-3">
                  <Package className="h-5 w-5 text-amber-500" />
                  <div>
                    <p className="text-xs text-gray-500">Material</p>
                    <p className="font-medium text-gray-900">{attrs.material}</p>
                  </div>
                </div>
              )}
              {attrs?.dimensions && (
                <div className="flex items-center space-x-3">
                  <Ruler className="h-5 w-5 text-amber-500" />
                  <div>
                    <p className="text-xs text-gray-500">Dimensions</p>
                    <p className="font-medium text-gray-900">{attrs.dimensions}</p>
                  </div>
                </div>
              )}
              {attrs?.weight && (
                <div className="flex items-center space-x-3">
                  <Scale className="h-5 w-5 text-amber-500" />
                  <div>
                    <p className="text-xs text-gray-500">Weight</p>
                    <p className="font-medium text-gray-900">{attrs.weight}</p>
                  </div>
                </div>
              )}
              {attrs?.color && (
                <div className="flex items-center space-x-3">
                  <Paintbrush className="h-5 w-5 text-amber-500" />
                  <div>
                    <p className="text-xs text-gray-500">Color</p>
                    <p className="font-medium text-gray-900">{attrs.color}</p>
                  </div>
                </div>
              )}
              {attrs?.origin && (
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-amber-500" />
                  <div>
                    <p className="text-xs text-gray-500">Origin</p>
                    <p className="font-medium text-gray-900">{attrs.origin}</p>
                  </div>
                </div>
              )}
              {attrs?.artisan && (
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-amber-500" />
                  <div>
                    <p className="text-xs text-gray-500">Artisan</p>
                    <p className="font-medium text-gray-900">{attrs.artisan}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Crafting Info */}
          {(attrs?.is_handmade || attrs?.crafting_technique) && (
            <div className="mb-8">
              <div className="flex flex-wrap gap-3">
                {attrs.is_handmade && (
                  <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Handmade
                  </span>
                )}
                {attrs.crafting_technique && (
                  <span className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                    <Paintbrush className="h-4 w-4 mr-2" />
                    {attrs.crafting_technique}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                -
              </button>
              <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2 mb-4"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Add to Cart</span>
          </button>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-3 text-gray-600">
              <Truck className="h-5 w-5 text-amber-500" />
              <span className="text-sm">Free Shipping</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Shield className="h-5 w-5 text-amber-500" />
              <span className="text-sm">Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

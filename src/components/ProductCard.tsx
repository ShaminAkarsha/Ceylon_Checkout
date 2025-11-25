import { MapPin, Clock, Package, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Product, isTourProduct, isHandicraftProduct } from "../types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-fit">
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.productCoverImage ?? "/placeholder-image.png"}
          alt={product.productName}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              product.productCategory === "Tours"
                ? "bg-emerald-500 text-white"
                : "bg-amber-500 text-white"
            }`}
          >
            {product.productCategory === "Tours" ? "Tour" : "Handicraft"}
          </span>
        </div>
      </div>

      <div className="p-6 pb-0">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {product.productName}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
          {product.productDescription}
        </p>

        {/* Tour-specific details */}
        {isTourProduct(product) && product.additionalAttributes && (
          <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
            {product.additionalAttributes.tour_location && (
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span className="truncate max-w-[120px]">
                  {product.additionalAttributes.tour_location}
                </span>
              </div>
            )}
            {product.additionalAttributes.tour_duration && (
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{product.additionalAttributes.tour_duration}</span>
              </div>
            )}
          </div>
        )}

        {/* Handicraft-specific details */}
        {isHandicraftProduct(product) && product.additionalAttributes && (
          <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
            {product.additionalAttributes.material && (
              <div className="flex items-center space-x-1">
                <Package className="h-4 w-4" />
                <span>{product.additionalAttributes.material}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-emerald-600">
            ${product.productPrice}
          </div>
        </div>
      </div>
      <div className="w-full p-2 text-green-900 flex justify-between bg-slate-100 hover:bg-slate-200 font-semibold py-3 transition-colors duration-200">
        <Link to={`/product/${product.productId}`} className="w-full flex justify-between">
          View
          <div className="hover:scale-110 transition-transform duration-200">
            <ArrowRight />
          </div>
        </Link>
      </div>
    </div>
  );
}

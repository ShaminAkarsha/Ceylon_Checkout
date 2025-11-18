import { MapPin, Clock, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            product.category === 'tour'
              ? 'bg-emerald-500 text-white'
              : 'bg-amber-500 text-white'
          }`}>
            {product.category === 'tour' ? 'Tour' : 'Handicraft'}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
          {product.description}
        </p>

        {product.category === 'tour' && (
          <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
            {product.location && (
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{product.location}</span>
              </div>
            )}
            {product.duration && (
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{product.duration}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-gray-900">{product.rating}</span>
            <span className="text-sm text-gray-500">({product.reviews})</span>
          </div>
          <div className="text-2xl font-bold text-emerald-600">
            ${product.price}
          </div>
        </div>

        <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
          {product.category === 'tour' ? 'Book Now' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

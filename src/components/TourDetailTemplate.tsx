import { useState } from "react";
import {
  MapPin,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { TourProduct } from "../types/product";
import { useCart } from "../context/CartContext";

interface TourDetailTemplateProps {
  product: TourProduct;
}

export default function TourDetailTemplate({ product }: TourDetailTemplateProps) {
  const { addItem } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

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

  const handleBookNow = () => {
    addItem(product, 1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Image Gallery */}
      <div className="relative h-[500px] bg-gray-900">
        <img
          src={allImages[currentImageIndex] || "/placeholder-image.png"}
          alt={product.productName}
          className="w-full h-full object-cover"
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
            
            {/* Image Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex ? "bg-white w-6" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-4 py-2 bg-emerald-500 text-white font-semibold rounded-full">
            Tour Experience
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

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Basic Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.productName}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                {attrs?.tour_location && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-emerald-500" />
                    <span>{attrs.tour_location}</span>
                  </div>
                )}
                {attrs?.tour_duration && (
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-emerald-500" />
                    <span>{attrs.tour_duration}</span>
                  </div>
                )}
                {attrs?.max_participants && (
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-emerald-500" />
                    <span>Max {attrs.max_participants} people</span>
                  </div>
                )}
                {attrs?.difficulty_level && (
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    attrs.difficulty_level === 'Easy' ? 'bg-green-100 text-green-700' :
                    attrs.difficulty_level === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
                    attrs.difficulty_level === 'Challenging' ? 'bg-orange-100 text-orange-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {attrs.difficulty_level}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">About This Tour</h2>
              <p className="text-gray-600 leading-relaxed">{product.productDescription}</p>
            </div>

            {/* What's Included */}
            {attrs?.includes && attrs.includes.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">What's Included</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {attrs.includes.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 text-gray-600">
                      <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What's Not Included */}
            {attrs?.excludes && attrs.excludes.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">What's Not Included</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {attrs.excludes.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 text-gray-500">
                      <XCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Meeting Point */}
            {attrs?.meeting_point && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Meeting Point</h2>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-emerald-500 mt-0.5" />
                  <p className="text-gray-600">{attrs.meeting_point}</p>
                </div>
              </div>
            )}

            {/* Cancellation Policy */}
            {attrs?.cancellation_policy && (
              <div className="bg-blue-50 rounded-xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Cancellation Policy</h2>
                <p className="text-gray-600">{attrs.cancellation_policy}</p>
              </div>
            )}
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="text-center mb-6">
                <span className="text-sm text-gray-500">From</span>
                <div className="text-4xl font-bold text-emerald-600">
                  ${product.productPrice}
                </div>
                <span className="text-sm text-gray-500">per person</span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{attrs?.tour_duration || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Group Size</span>
                  <span className="font-medium">Up to {attrs?.max_participants || 'N/A'} people</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Difficulty</span>
                  <span className="font-medium">{attrs?.difficulty_level || 'N/A'}</span>
                </div>
              </div>

              <button
                onClick={handleBookNow}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-xl transition-colors duration-200 mb-3"
              >
                Book Now
              </button>

              <button className="w-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold py-4 rounded-xl transition-colors duration-200">
                Ask a Question
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Free cancellation available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

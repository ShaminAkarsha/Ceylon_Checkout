import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Product, isTourProduct, isHandicraftProduct } from "../types/product";
import { productAPI } from "../services/productAPI";
import TourDetailTemplate from "../components/TourDetailTemplate";
import HandicraftDetailTemplate from "../components/HandicraftDetailTemplate";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadProduct(parseInt(id));
    }
  }, [id]);

  const loadProduct = async (productId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await productAPI.getProductById(productId);
      setProduct(data);
    } catch (err: any) {
      setError(err.message || "Failed to load product");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-emerald-600 hover:text-emerald-700 mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-xl text-red-500">{error || "Product not found"}</p>
            <button
              onClick={() => navigate("/search")}
              className="mt-4 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Render appropriate template based on product category */}
        {isTourProduct(product) ? (
          <TourDetailTemplate product={product} />
        ) : isHandicraftProduct(product) ? (
          <HandicraftDetailTemplate product={product} />
        ) : (
          // Fallback for unknown categories
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-900">{product.productName}</h1>
            <p className="mt-4 text-gray-600">{product.productDescription}</p>
            <p className="mt-4 text-2xl font-bold text-emerald-600">${product.productPrice}</p>
          </div>
        )}
      </div>
    </div>
  );
}

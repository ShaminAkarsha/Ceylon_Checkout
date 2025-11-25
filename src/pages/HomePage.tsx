import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import { Sparkles, Mountain, Hammer } from "lucide-react";
import { useEffect, useState } from "react";
import { productAPI } from "../services/productAPI";
import { Product } from "../types/product";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  const tours = products.filter((p) => p.productCategory === "Tours");
  const handicrafts = products.filter((p) => p.productCategory === "HandyCrafts");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addItem } = useCart();
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await productAPI.getAllProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || "Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow pt-24 space-y-16">
        {/* 🔷 Promo Banners */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tours Banner */}
          <Link
            to="/search?category=Tour"
            className="group relative bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl p-8 text-white shadow-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-md" />

            <div className="relative z-10">
              <Mountain className="h-10 w-10 mb-4 text-white" />
              <h2 className="text-2xl font-bold mb-2">
                Explore Sri Lanka Tours
              </h2>
              <p className="text-sm max-w-sm mb-4 text-white/80">
                Discover hidden gems, luxury trips and local adventures.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold">
                Browse Tours{" "}
                <Sparkles className="h-4 w-4 group-hover:translate-x-1 transition" />
              </span>
            </div>
          </Link>

          {/* Handicrafts Banner */}
          <Link
            to="/search?category=HandiCrafts"
            className="group relative bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-8 text-white shadow-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-md" />

            <div className="relative z-10">
              <Hammer className="h-10 w-10 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Authentic Handicrafts</h2>
              <p className="text-sm max-w-sm mb-4 text-white/80">
                Support local artisans with traditional handmade treasures.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold">
                Explore Crafts{" "}
                <Sparkles className="h-4 w-4 group-hover:translate-x-1 transition" />
              </span>
            </div>
          </Link>
        </section>

        {/* 🔷 Tours Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Popular Tours</h2>
            <Link
              to="/search?category=Tour"
              className="text-emerald-600 text-sm font-semibold hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tours.slice(0, 4).map((product) => (
              <ProductCard
                key={product.productId}
                product={product}
              />
            ))}
          </div>
        </section>

        {/* 🔷 Handicrafts Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Sri Lankan Handicrafts
            </h2>
            <Link
              to="/search?category=HandiCrafts"
              className="text-orange-600 text-sm font-semibold hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {handicrafts.slice(0, 4).map((product) => (
              <ProductCard
                key={product.productId}
                product={product}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

import { useState, useMemo, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router";
import { productAPI } from "../services/productAPI";
import type {
  Product,
} from "../types/product";

export default function SearchPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "Tours" | "HandyCrafts">("all");
  const [priceRange, setPriceRange] = useState<"all" | "low" | "medium" | "high">("all");
  const [sortBy, setSortBy] = useState<"name" | "price-low" | "price-high" | "rating">("rating");
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (category === "Tours" || category === "Tour") {
      setSelectedCategory("Tours");
    } else if (category === "HandyCrafts" || category === "HandiCrafts" || category === "Handicraft") {
      setSelectedCategory("HandyCrafts");
    } else {
      setSelectedCategory("all");
    }
  }, [category]);

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

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.productDescription
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (product.additionalAttributes as any)?.tour_location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.additionalAttributes as any)?.origin?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.productCategory === selectedCategory
      );
    }

    if (priceRange !== "all") {
      filtered = filtered.filter((product) => {
        if (priceRange === "low") return product.productPrice < 50;
        if (priceRange === "medium")
          return product.productPrice >= 50 && product.productPrice < 150;
        if (priceRange === "high") return product.productPrice >= 150;
        return true;
      });
    }

    filtered.sort((a, b) => {
      if (sortBy === "name") return a.productName.localeCompare(b.productName);
      if (sortBy === "price-low") return a.productPrice - b.productPrice;
      if (sortBy === "price-high") return b.productPrice - a.productPrice;
      return 0;
    });

    return filtered;
  }, [searchTerm, selectedCategory, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 py-12 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-6">
            Search Products
          </h1>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search for tours, handicrafts, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-4 py-4 rounded-lg text-lg focus:outline-none focus:ring-4 focus:ring-emerald-300"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <SlidersHorizontal className="h-5 w-5 text-gray-600" />
            <h2 className="text-xl font-bold text-gray-900">Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Categories</option>
                <option value="Tours">Tours</option>
                <option value="HandyCrafts">Handicrafts</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Prices</option>
                <option value="low">Under $50</option>
                <option value="medium">$50 - $150</option>
                <option value="high">$150+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="rating">Highest Rated</option>
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setPriceRange("all");
                  setSortBy("rating");
                }}
                className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-lg text-gray-700">
            Found{" "}
            <span className="font-bold text-emerald-600">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {filteredProducts.map((product) => (
              <div
                key={product.productId}
                className="cursor-pointer"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">
              No products found matching your search criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setPriceRange("all");
              }}
              className="mt-4 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

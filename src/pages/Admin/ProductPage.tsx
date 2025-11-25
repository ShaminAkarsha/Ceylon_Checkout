import { useState, useEffect } from "react";
import { Plus, Search, RefreshCw } from "lucide-react";
import ProductCardAdmin from "../../components/ProductCardAdmin";
import ProductEditModal from "../../components/ProductEditModal";
import type {
  Product,
  CreateProductDto,
  UpdateProductDto,
} from "../../types/product";
import { productAPI } from "../../services/productAPI";
import ProductTableRow from "../../components/ProducutTableRow";
import { useNavigate } from "react-router";

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  // Load products on mount
  useEffect(() => {
    loadProducts();
  }, []);

  // Filter products when search or category changes
  useEffect(() => {
    filterProducts();
  }, [searchQuery, selectedCategory, products]);

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

  const filterProducts = () => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.productName.toLowerCase().includes(query) ||
          p.productCode.toLowerCase().includes(query) ||
          p.productCategory.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (p) =>
          p.productCategory.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
  };
  const handleEditProduct = async (productId: number) => {
    navigate(`/admin/products/edit/${productId}`);
  };
  const handleDeleteProduct = async (productId: number) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await productAPI.deleteProduct(productId);
      await loadProducts();
    } catch (err: any) {
      alert(err.message || "Failed to delete product");
    }
  };

  const handleToggleStatus = async (productId: number, isActive: boolean) => {
    try {
      await productAPI.toggleProductStatus(productId, isActive);
      await loadProducts();
    } catch (err: any) {
      alert(err.message || "Failed to toggle product status");
    }
  };

  const handleCreateNew = () => {
    navigate("/admin/products/create");
  };

  // Get unique categories
  const categories = [
    "all",
    ...new Set(products.map((p) => p.productCategory)),
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Product Management
        </h1>
        <p className="text-gray-600">Manage your product catalog</p>
      </div>

      {/* Actions Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by name, code, or category..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>

          {/* Refresh Button */}
          <button
            onClick={loadProducts}
            disabled={isLoading}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 flex items-center gap-2"
          >
            <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
            Refresh
          </button>

          {/* Create Button */}
          <button
            onClick={handleCreateNew}
            className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition flex items-center gap-2 font-medium"
          >
            <Plus size={20} />
            Create Product
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Total Products</p>
          <p className="text-2xl font-bold text-gray-900">{products.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Filtered Results</p>
          <p className="text-2xl font-bold text-emerald-600">
            {filteredProducts.length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Categories</p>
          <p className="text-2xl font-bold text-gray-900">
            {categories.length - 1}
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredProducts.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="text-gray-400" size={32} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || selectedCategory !== "all"
              ? "Try adjusting your search or filters"
              : "Get started by creating your first product"}
          </p>
          {!searchQuery && selectedCategory === "all" && (
            <button
              onClick={handleCreateNew}
              className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition inline-flex items-center gap-2"
            >
              <Plus size={20} />
              Create Product
            </button>
          )}
        </div>
      )}

      {/* Products Grid */}
      {/* Products Table */}
      {!isLoading && filteredProducts.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <ProductTableRow
                    key={product.productId}
                    product={product}
                    onEdit={() => handleEditProduct(product.productId)}
                    onDelete={handleDeleteProduct}
                    onToggleStatus={handleToggleStatus}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

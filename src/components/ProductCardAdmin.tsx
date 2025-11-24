import { Edit, Trash2, Power, PowerOff } from "lucide-react";
import type { Product } from "../types/product";

interface ProductCardAdminProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
  onToggleStatus: (productId: number, isActive: boolean) => void;
}

export default function ProductCardAdmin({
  product,
  onEdit,
  onDelete,
  onToggleStatus,
}: ProductCardAdminProps) {
  const isActive = product.additionalAttributes?.isActive ?? true;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-100">
        {product.productCoverImage ? (
          <img
            src={product.productCoverImage}
            alt={product.productName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        
        {/* Active/Inactive Badge */}
        <div className="absolute top-2 right-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isActive
                ? "bg-emerald-100 text-emerald-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="text-lg font-bold text-gray-900 truncate">
            {product.productName}
          </h3>
          <p className="text-sm text-gray-500">Code: {product.productCode}</p>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.productDescription}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-bold text-emerald-600">
              ${product.productPrice.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500">
              Stock: {product.productQuantity ?? "N/A"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Category</p>
            <p className="text-sm font-medium text-gray-700">
              {product.productCategory}
            </p>
          </div>
        </div>

        {/* Gallery Images Count */}
        {product.productGalleryImages.length > 0 && (
          <p className="text-xs text-gray-500 mb-3">
            📷 {product.productGalleryImages.length} gallery image(s)
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition text-sm font-medium"
          >
            <Edit size={16} />
            Edit
          </button>
          
          <button
            onClick={() => onToggleStatus(product.productId, !isActive)}
            className={`flex items-center justify-center px-3 py-2 rounded-lg transition text-sm font-medium ${
              isActive
                ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                : "bg-emerald-500 hover:bg-emerald-600 text-white"
            }`}
            title={isActive ? "Deactivate" : "Activate"}
          >
            {isActive ? <PowerOff size={16} /> : <Power size={16} />}
          </button>
          
          <button
            onClick={() => onDelete(product.productId)}
            className="flex items-center justify-center px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition text-sm font-medium"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

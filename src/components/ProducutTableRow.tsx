import { Edit, Trash2, Power, PowerOff } from "lucide-react";
import type { Product } from "../types/product";

interface Props {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
  onToggleStatus: (productId: number, isActive: boolean) => void;
}

export default function ProductTableRow({
  product,
  onEdit,
  onDelete,
  onToggleStatus
}: Props) {
  const isActive = product.additionalAttributes?.isActive ?? true;

  return (
    <tr className="hover:bg-gray-50 transition">
      
      {/* Product Info */}
      <td className="px-6 py-4 flex items-center gap-4">
        {product.productCoverImage ? (
          <img
            src={product.productCoverImage}
            alt={product.productName}
            className="w-12 h-12 rounded-lg object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-400">
            No Image
          </div>
        )}

        <div>
          <p className="font-semibold text-gray-900">{product.productName}</p>
          <p className="text-xs text-gray-500">{product.productCode}</p>
        </div>
      </td>

      {/* Category */}
      <td className="px-6 py-4 text-sm text-gray-600">
        {product.productCategory}
      </td>

      {/* Price */}
      <td className="px-6 py-4 text-sm font-medium text-emerald-600">
        ${product.productPrice.toFixed(2)}
      </td>

      {/* Stock */}
      <td className="px-6 py-4 text-sm text-gray-600">
        {product.productQuantity ?? "N/A"}
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            isActive
              ? "bg-emerald-100 text-emerald-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-center">
        <div className="flex justify-center gap-2">
          
          <button
            onClick={() => onEdit(product)}
            className="px-3 py-1.5 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white"
            title="Edit"
          >
            <Edit size={16} />
          </button>

          <button
            onClick={() => onToggleStatus(product.productId, !isActive)}
            className={`px-3 py-1.5 rounded-md text-white ${
              isActive
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-emerald-500 hover:bg-emerald-600"
            }`}
            title={isActive ? "Deactivate" : "Activate"}
          >
            {isActive ? <PowerOff size={16} /> : <Power size={16} />}
          </button>

          <button
            onClick={() => onDelete(product.productId)}
            className="px-3 py-1.5 rounded-md bg-red-500 hover:bg-red-600 text-white"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>

    </tr>
  );
}

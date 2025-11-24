import { useEffect, useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import type { Product, CreateProductDto, UpdateProductDto } from "../types/product";

interface ProductEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: CreateProductDto | UpdateProductDto) => Promise<void>;
  product?: Product | null;
}

export default function ProductEditModal({
  isOpen,
  onClose,
  onSave,
  product,
}: ProductEditModalProps) {
  const [formData, setFormData] = useState<CreateProductDto>({
    productName: "",
    productCode: "",
    productPrice: 0,
    productDescription: "",
    productQuantity: 0,
    productCategory: "",
    productCoverImage: null,
    productGalleryImages: [],
    additionalAttributes: null,
  });

  const [galleryInput, setGalleryInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Populate form when editing existing product
  useEffect(() => {
    if (product) {
      setFormData({
        productName: product.productName,
        productCode: product.productCode,
        productPrice: product.productPrice,
        productDescription: product.productDescription,
        productQuantity: product.productQuantity,
        productCategory: product.productCategory,
        productCoverImage: product.productCoverImage,
        productGalleryImages: product.productGalleryImages,
        additionalAttributes: product.additionalAttributes,
      });
    } else {
      // Reset form for new product
      setFormData({
        productName: "",
        productCode: "",
        productPrice: 0,
        productDescription: "",
        productQuantity: 0,
        productCategory: "",
        productCoverImage: null,
        productGalleryImages: [],
        additionalAttributes: null,
      });
    }
    setError(null);
  }, [product, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.productName.trim() || !formData.productCode.trim()) {
      setError("Product name and code are required");
      return;
    }

    if (formData.productPrice <= 0) {
      setError("Product price must be greater than 0");
      return;
    }

    setIsSubmitting(true);

    try {
      if (product) {
        // Update existing product
        await onSave({
          ...formData,
          productId: product.productId,
        } as UpdateProductDto);
      } else {
        // Create new product
        await onSave(formData);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to save product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddGalleryImage = () => {
    if (galleryInput.trim()) {
      setFormData({
        ...formData,
        productGalleryImages: [...formData.productGalleryImages, galleryInput.trim()],
      });
      setGalleryInput("");
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setFormData({
      ...formData,
      productGalleryImages: formData.productGalleryImages.filter((_, i) => i !== index),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">
            {product ? "Edit Product" : "Create New Product"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                value={formData.productName}
                onChange={(e) =>
                  setFormData({ ...formData, productName: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
            </div>

            {/* Product Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Code *
              </label>
              <input
                type="text"
                value={formData.productCode}
                onChange={(e) =>
                  setFormData({ ...formData, productCode: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.productPrice}
                onChange={(e) =>
                  setFormData({ ...formData, productPrice: parseFloat(e.target.value) || 0 })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                value={formData.productQuantity ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    productQuantity: e.target.value ? parseInt(e.target.value) : null,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <input
              type="text"
              value={formData.productCategory}
              onChange={(e) =>
                setFormData({ ...formData, productCategory: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="e.g., Electronics, Clothing, etc."
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.productDescription}
              onChange={(e) =>
                setFormData({ ...formData, productDescription: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Enter product description..."
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image URL
            </label>
            <input
              type="text"
              value={formData.productCoverImage ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, productCoverImage: e.target.value || null })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Gallery Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gallery Images
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={galleryInput}
                onChange={(e) => setGalleryInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddGalleryImage())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Enter image URL and click Add"
              />
              <button
                type="button"
                onClick={handleAddGalleryImage}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition flex items-center gap-2"
              >
                <Plus size={16} />
                Add
              </button>
            </div>

            {formData.productGalleryImages.length > 0 && (
              <div className="space-y-2">
                {formData.productGalleryImages.map((url, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                  >
                    <span className="flex-1 text-sm text-gray-700 truncate">{url}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(index)}
                      className="p-1 hover:bg-red-100 text-red-600 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : product ? "Update Product" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

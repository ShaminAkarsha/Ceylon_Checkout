import { useState, useEffect, FormEvent } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Plus, Trash2, Save, Loader } from "lucide-react";
import type { Product, UpdateProductDto, TourAttributes, HandicraftAttributes } from "../../types/product";
import { productAPI } from "../../services/productAPI";

export default function ProductEditPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [galleryInput, setGalleryInput] = useState("");
  const [product, setProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState<UpdateProductDto>({
    productId: 0,
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

  // Tour-specific fields
  const [tourAttrs, setTourAttrs] = useState<TourAttributes>({
    location: "",
    duration: "",
    difficulty: undefined,
    maxGroupSize: undefined,
    startDate: "",
    endDate: "",
    includedItems: [],
    excludedItems: [],
    itinerary: "",
  });

  // Handicraft-specific fields
  const [handicraftAttrs, setHandicraftAttrs] = useState<HandicraftAttributes>({
    material: "",
    artisan: "",
    origin: "",
    dimensions: "",
    weight: "",
    careInstructions: "",
    isHandmade: true,
    craftingTime: "",
  });

  const [includedItem, setIncludedItem] = useState("");
  const [excludedItem, setExcludedItem] = useState("");

  // Load product data
  useEffect(() => {
    if (productId) {
      loadProduct(parseInt(productId));
    }
  }, [productId]);

  const loadProduct = async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await productAPI.getProductById(id);
      setProduct(data);

      // Populate form
      setFormData({
        productId: data.productId,
        productName: data.productName,
        productCode: data.productCode,
        productPrice: data.productPrice,
        productDescription: data.productDescription,
        productQuantity: data.productQuantity,
        productCategory: data.productCategory,
        productCoverImage: data.productCoverImage,
        productGalleryImages: data.productGalleryImages,
        additionalAttributes: data.additionalAttributes,
      });

      // Populate category-specific fields
      if (data.productCategory.toLowerCase() === "tour" && data.additionalAttributes) {
        setTourAttrs({
          location: data.additionalAttributes.location || "",
          duration: data.additionalAttributes.duration || "",
          difficulty: data.additionalAttributes.difficulty,
          maxGroupSize: data.additionalAttributes.maxGroupSize,
          startDate: data.additionalAttributes.startDate || "",
          endDate: data.additionalAttributes.endDate || "",
          includedItems: data.additionalAttributes.includedItems || [],
          excludedItems: data.additionalAttributes.excludedItems || [],
          itinerary: data.additionalAttributes.itinerary || "",
        });
      } else if (data.productCategory.toLowerCase() === "handicraft" && data.additionalAttributes) {
        setHandicraftAttrs({
          material: data.additionalAttributes.material || "",
          artisan: data.additionalAttributes.artisan || "",
          origin: data.additionalAttributes.origin || "",
          dimensions: data.additionalAttributes.dimensions || "",
          weight: data.additionalAttributes.weight || "",
          careInstructions: data.additionalAttributes.careInstructions || "",
          isHandmade: data.additionalAttributes.isHandmade ?? true,
          craftingTime: data.additionalAttributes.craftingTime || "",
        });
      }
    } catch (err: any) {
      setError(err.message || "Failed to load product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

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
      // Add category-specific attributes
      let additionalAttributes = formData.additionalAttributes;

      if (formData.productCategory.toLowerCase() === "tour") {
        additionalAttributes = { ...tourAttrs };
      } else if (formData.productCategory.toLowerCase() === "handicraft") {
        additionalAttributes = { ...handicraftAttrs };
      }

      const productData: UpdateProductDto = {
        ...formData,
        additionalAttributes,
      };

      await productAPI.updateProduct(productData);
      navigate("/admin/products");
    } catch (err: any) {
      setError(err.message || "Failed to update product");
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

  const handleAddIncludedItem = () => {
    if (includedItem.trim()) {
      setTourAttrs({
        ...tourAttrs,
        includedItems: [...(tourAttrs.includedItems || []), includedItem.trim()],
      });
      setIncludedItem("");
    }
  };

  const handleRemoveIncludedItem = (index: number) => {
    setTourAttrs({
      ...tourAttrs,
      includedItems: tourAttrs.includedItems?.filter((_, i) => i !== index),
    });
  };

  const handleAddExcludedItem = () => {
    if (excludedItem.trim()) {
      setTourAttrs({
        ...tourAttrs,
        excludedItems: [...(tourAttrs.excludedItems || []), excludedItem.trim()],
      });
      setExcludedItem("");
    }
  };

  const handleRemoveExcludedItem = (index: number) => {
    setTourAttrs({
      ...tourAttrs,
      excludedItems: tourAttrs.excludedItems?.filter((_, i) => i !== index),
    });
  };

  const isTour = formData.productCategory.toLowerCase() === "tour";
  const isHandicraft = formData.productCategory.toLowerCase() === "handicraft";

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader className="w-12 h-12 text-emerald-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-600">Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => navigate("/admin/products")}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
          <p className="text-gray-600">Update product information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Common Fields */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Basic Information</h2>

          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Code *
                </label>
                <input
                  type="text"
                  value={formData.productCode}
                  onChange={(e) => setFormData({ ...formData, productCode: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.productPrice}
                  onChange={(e) => setFormData({ ...formData, productPrice: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  value={formData.productQuantity ?? ""}
                  onChange={(e) => setFormData({ ...formData, productQuantity: e.target.value ? parseInt(e.target.value) : null })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.productCategory}
                  onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Tour">Tour</option>
                  <option value="Handicraft">Handicraft</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.productDescription}
                onChange={(e) => setFormData({ ...formData, productDescription: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Enter product description..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image URL
              </label>
              <input
                type="text"
                value={formData.productCoverImage ?? ""}
                onChange={(e) => setFormData({ ...formData, productCoverImage: e.target.value || null })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>

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
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
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
          </div>
        </div>

        {/* Tour-Specific Fields - Same as Create Page */}
        {isTour && (
          <div className="bg-white rounded-xl shadow-sm border border-emerald-200 p-6 mb-6">
            <h2 className="text-xl font-bold text-emerald-900 mb-4">Tour Details</h2>

            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={tourAttrs.location}
                    onChange={(e) => setTourAttrs({ ...tourAttrs, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required={isTour}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration *
                  </label>
                  <input
                    type="text"
                    value={tourAttrs.duration}
                    onChange={(e) => setTourAttrs({ ...tourAttrs, duration: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., 3 days, 5 hours"
                    required={isTour}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={tourAttrs.difficulty || ""}
                    onChange={(e) => setTourAttrs({ ...tourAttrs, difficulty: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Select Difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Challenging">Challenging</option>
                    <option value="Difficult">Difficult</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Group Size
                  </label>
                  <input
                    type="number"
                    value={tourAttrs.maxGroupSize ?? ""}
                    onChange={(e) => setTourAttrs({ ...tourAttrs, maxGroupSize: e.target.value ? parseInt(e.target.value) : undefined })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={tourAttrs.startDate}
                    onChange={(e) => setTourAttrs({ ...tourAttrs, startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={tourAttrs.endDate}
                    onChange={(e) => setTourAttrs({ ...tourAttrs, endDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Itinerary
                </label>
                <textarea
                  value={tourAttrs.itinerary}
                  onChange={(e) => setTourAttrs({ ...tourAttrs, itinerary: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Describe the tour itinerary..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Included Items
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={includedItem}
                    onChange={(e) => setIncludedItem(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddIncludedItem())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., Lunch, Guide, Transport"
                  />
                  <button
                    type="button"
                    onClick={handleAddIncludedItem}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                {tourAttrs.includedItems && tourAttrs.includedItems.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tourAttrs.includedItems.map((item, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm"
                      >
                        {item}
                        <button
                          type="button"
                          onClick={() => handleRemoveIncludedItem(index)}
                          className="hover:text-emerald-900"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excluded Items
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={excludedItem}
                    onChange={(e) => setExcludedItem(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddExcludedItem())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., Personal expenses, Tips"
                  />
                  <button
                    type="button"
                    onClick={handleAddExcludedItem}
                    className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                {tourAttrs.excludedItems && tourAttrs.excludedItems.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tourAttrs.excludedItems.map((item, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {item}
                        <button
                          type="button"
                          onClick={() => handleRemoveExcludedItem(index)}
                          className="hover:text-gray-900"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Handicraft-Specific Fields - Same as Create Page */}
        {isHandicraft && (
          <div className="bg-white rounded-xl shadow-sm border border-amber-200 p-6 mb-6">
            <h2 className="text-xl font-bold text-amber-900 mb-4">Handicraft Details</h2>

            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Material *
                  </label>
                  <input
                    type="text"
                    value={handicraftAttrs.material}
                    onChange={(e) => setHandicraftAttrs({ ...handicraftAttrs, material: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="e.g., Wood, Clay, Metal"
                    required={isHandicraft}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Origin *
                  </label>
                  <input
                    type="text"
                    value={handicraftAttrs.origin}
                    onChange={(e) => setHandicraftAttrs({ ...handicraftAttrs, origin: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="e.g., Kandy, Colombo"
                    required={isHandicraft}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Artisan Name
                  </label>
                  <input
                    type="text"
                    value={handicraftAttrs.artisan}
                    onChange={(e) => setHandicraftAttrs({ ...handicraftAttrs, artisan: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Crafting Time
                  </label>
                  <input
                    type="text"
                    value={handicraftAttrs.craftingTime}
                    onChange={(e) => setHandicraftAttrs({ ...handicraftAttrs, craftingTime: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="e.g., 2 weeks, 5 days"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dimensions
                  </label>
                  <input
                    type="text"
                    value={handicraftAttrs.dimensions}
                    onChange={(e) => setHandicraftAttrs({ ...handicraftAttrs, dimensions: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="e.g., 10cm x 15cm x 5cm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight
                  </label>
                  <input
                    type="text"
                    value={handicraftAttrs.weight}
                    onChange={(e) => setHandicraftAttrs({ ...handicraftAttrs, weight: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="e.g., 500g, 1.2kg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Care Instructions
                </label>
                <textarea
                  value={handicraftAttrs.careInstructions}
                  onChange={(e) => setHandicraftAttrs({ ...handicraftAttrs, careInstructions: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="How to care for this item..."
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isHandmade"
                  checked={handicraftAttrs.isHandmade}
                  onChange={(e) => setHandicraftAttrs({ ...handicraftAttrs, isHandmade: e.target.checked })}
                  className="w-4 h-4 text-amber-600 focus:ring-amber-500 rounded"
                />
                <label htmlFor="isHandmade" className="text-sm font-medium text-gray-700">
                  This is a handmade product
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 sticky bottom-4 bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            disabled={isSubmitting}
          >
            <Save size={18} />
            {isSubmitting ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

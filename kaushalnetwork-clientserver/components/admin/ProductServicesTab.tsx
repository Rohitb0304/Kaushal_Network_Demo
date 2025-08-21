import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import {
  Plus,
  X,
  Package,
  Image as ImageIcon,
  Save,
  Loader2,
  AlertCircle,
  ExternalLink,
  Trash2,
  AlertTriangle,
} from 'lucide-react';

interface ProductService {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  priceExclusiveGST: string;
  gstApplicable: boolean;
  modelNumber?: string;
  companyId: number;
}

interface ProductServicesTabProps {
  companyId?: number;
}

interface ProductFormData {
  name: string;
  description: string;
  image: File | null;
  priceExclusiveGST: string;
  gstApplicable: boolean;
  modelNumber: string;
}

export default function ProductServicesTab({ companyId }: ProductServicesTabProps) {
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    image: null,
    priceExclusiveGST: '0',
    gstApplicable: true,
    modelNumber: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductService[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Fetch products when component loads
  useEffect(() => {
    // Don't try to fetch if there's no token
    const token = Cookies.get('auth_token');
    if (token) {
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = Cookies.get('auth_token');

      // Try to fetch from a more reliable endpoint first
      // Based on the URL in your error, the endpoint expects an ID parameter
      // Use the companyId prop if available, or default to 1
      const response = await axios.get(
        ` ${import.meta.env.VITE_API_BASE_URL}/api/v0/company/user-view?id=${companyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          // Add timeout to prevent hanging requests
          timeout: 8000,
        }
      );

      if (response.data && response.data.productAndServices) {
        setProducts(response.data.productAndServices);
        console.log('Fetched products:', response.data.productAndServices);
      } else {
        console.log('No products found in response', response.data);
      }
    } catch (error: any) {
      console.error('Error fetching products:', error);

      // Set products to empty array but don't show error toast
      setProducts([]);

      // Just log the error without showing it to the user
      console.log('Could not fetch existing products. This is non-critical.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      setFormData(prev => ({ ...prev, image: file }));

      // Create preview
      const reader = new FileReader();
      reader.onload = e => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add these new drag and drop handler functions
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      setFormData(prev => ({ ...prev, image: file }));

      // Create preview
      const reader = new FileReader();
      reader.onload = e => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!formData.image) {
      toast.error('Please select an image');
      return;
    }

    try {
      setSubmitting(true);

      // Create FormData properly
      const submitFormData = new FormData();
      submitFormData.append('name', formData.name.trim());
      submitFormData.append('description', formData.description.trim());
      submitFormData.append('productAndServiceImage', formData.image);
      submitFormData.append('priceExclusiveGST', formData.priceExclusiveGST);
      submitFormData.append('gstApplicable', formData.gstApplicable ? 't' : 'f');
      submitFormData.append('modelNumber', formData.modelNumber);
      console.log(submitFormData);

      const token = Cookies.get('auth_token');

      // Debug the form data being sent
      console.log('Sending form data:', {
        name: formData.name,
        description: formData.description,
        imageSize: formData.image.size,
        imageType: formData.image.type,
      });

      // Use direct axios call with enhanced error handling
      const response = await axios.post(
        ` ${import.meta.env.VITE_API_BASE_URL}/api/v0/company/product-and-service`,
        submitFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Let the browser set the correct Content-Type with boundary for FormData
            // Don't manually set Content-Type for multipart/form-data
          },
        }
      );

      console.log('Product added successfully:', response.data);
      toast.success('Product added successfully');

      // Reset form
      resetForm();

      // After successful submission, refetch the products
      fetchProducts();
    } catch (error: any) {
      console.error('Error submitting product:', error);

      // Enhanced user-friendly error handling
      let errorMessage = 'Failed to save product';
      let errorDetails = '';

      if (error.response) {
        // Server responded with an error status
        console.error('Error response from server:', error.response.data);

        if (error.response.status === 400) {
          errorMessage = 'Invalid product information';
          // Extract specific validation errors if available
          if (error.response.data.message) {
            if (typeof error.response.data.message === 'string') {
              errorDetails = error.response.data.message;
            } else if (Array.isArray(error.response.data.message)) {
              errorDetails = error.response.data.message.join(', ');
            }
          }
        } else if (error.response.status === 401) {
          errorMessage = 'Authentication failed';
          errorDetails = 'Please sign in again to continue';
        } else if (error.response.status === 413) {
          errorMessage = 'Image is too large';
          errorDetails = 'Please choose a smaller image (max 5MB)';
        } else if (error.response.status === 403) {
          errorMessage = 'Permission denied';
          errorDetails = 'You do not have permission to add products';
        } else {
          errorMessage = `Server Error (${error.response.status})`;
          errorDetails = error.response.data.message || error.response.statusText;
        }
      } else if (error.request) {
        // Request made but no response
        errorMessage = 'Server not responding';
        errorDetails = 'Please check your internet connection and try again';
      } else {
        // Something else caused the error
        errorDetails = error.message || 'Unknown error occurred';
      }

      // Show a detailed toast error
      toast.error(
        <div>
          <div className="font-medium">{errorMessage}</div>
          {errorDetails && <div className="text-sm mt-1 text-gray-200">{errorDetails}</div>}
        </div>,
        {
          duration: 5000,
          style: {
            background: '#f44336',
            color: '#fff',
          },
          icon: <AlertCircle className="w-5 h-5" />,
        }
      );

      // For certain errors, don't close the form to allow the user to fix and retry
      if (![401, 403].includes(error.response?.status)) {
        // Keep form open for validation errors
        setSubmitting(false);
        return;
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      setDeleting(true);
      const token = Cookies.get('auth_token');

      await axios.delete(
        ` ${import.meta.env.VITE_API_BASE_URL}/api/v0/company/product-and-service?id=${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update products list by filtering out the deleted one
      setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
      toast.success('Product deleted successfully');

      // Close confirmation dialog
      setShowDeleteConfirm(null);
    } catch (error: any) {
      console.error('Error deleting product:', error);

      let errorMessage = 'Failed to delete product';
      if (error.response) {
        errorMessage = error.response.data.message || `Error: ${error.response.status}`;
      }

      toast.error(errorMessage);
    } finally {
      setDeleting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      image: null,
      priceExclusiveGST: '0',
      gstApplicable: true,
      modelNumber: '',
    });
    setImagePreview(null);
    setShowForm(false);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Package className="w-6 h-6 text-blue-600" />
            Products & Services
          </h2>
          <p className="text-gray-600 mt-1">Manage your company's products and services</p>
        </div>

        <motion.button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-4 h-4" />
          Add Product/Service
        </motion.button>
      </div>

      {/* Products Grid - Only show loading state during initial load */}
      {loading && products.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative w-full h-48">
                <div className="w-full h-full flex items-center justify-center bg-white">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain p-4"
                    onError={e => {
                      (e.target as HTMLImageElement).src =
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(product.name)}&background=3b82f6&color=fff&size=200`;
                    }}
                  />
                </div>

                {/* Add Delete Button */}
                <button
                  onClick={() => setShowDeleteConfirm(product.id)}
                  className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-red-50 hover:text-red-600 transition-colors"
                  title="Delete product"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Product Content */}
              <div className="p-5 border-t border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-3">{product.description}</p>
                <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                  INR {product.priceExclusiveGST} {product.gstApplicable && '(* GST Applicable)'}
                </p>
                <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                  Model Number: {product.modelNumber}
                </p>

                <div className="flex justify-between items-center">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                    Product #{product.id}
                  </span>
                  <a
                    href={product.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                  >
                    <span>View Image</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products or services yet</h3>
          <p className="text-gray-600">
            Click the button above to add your first product or service.
          </p>
        </div>
      )}

      {/* Add Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={e => e.target === e.currentTarget && resetForm()}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mt-[40vh]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Add Product/Service</h3>
                <button
                  onClick={resetForm}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter product/service name"
                    required
                  />
                </div>

                {/* Description Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Enter product/service description"
                    required
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image *</label>

                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData(prev => ({ ...prev, image: null }));
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`flex flex-col items-center justify-center w-full h-40 border-2 ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} border-dashed rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors`}
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                    >
                      <label className="flex flex-col items-center justify-center w-full h-full">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price in INR (Exclusive of GST) *
                  </label>
                  <input
                    type="number"
                    value={formData.priceExclusiveGST}
                    onChange={e => {
                      setFormData(prev => ({ ...prev, priceExclusiveGST: e.target.value }));
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter Price in INR"
                    required
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GST Applicable *
                  </label>
                  <input
                    type="checkbox"
                    checked={formData.gstApplicable}
                    onChange={e => {
                      setFormData(prev => ({ ...prev, gstApplicable: e.target.checked }));
                    }}
                    className="mb-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Model Number
                  </label>
                  <input
                    type="text"
                    value={formData.modelNumber}
                    onChange={e => setFormData(prev => ({ ...prev, modelNumber: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter Model Number"
                  />
                </div>
                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {submitting ? 'Saving...' : 'Add'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={e => e.target === e.currentTarget && setShowDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6"
            >
              <div className="flex items-center mb-4 text-amber-600">
                <AlertTriangle className="w-8 h-8 mr-3" />
                <h3 className="text-lg font-semibold">Delete Product</h3>
              </div>

              <p className="text-gray-700 mb-6">
                Are you sure you want to delete this product? This action cannot be undone.
              </p>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteProduct(showDeleteConfirm)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                  disabled={deleting}
                >
                  {deleting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

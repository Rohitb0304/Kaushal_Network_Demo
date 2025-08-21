import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, FileText, Tag, DollarSign, Plus } from 'lucide-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';
import { TenderData } from './types';

interface TenderFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function TenderForm({ onClose, onSuccess }: TenderFormProps) {
  const [formData, setFormData] = useState<TenderData>({
    tenderName: '',
    objective: '',
    description: '',
    modelNumber: undefined,
    productsAndServicesRequired: '',
    aboutProductsAndServices: '',
    nomenclature: '',
    pricingCategory: 'PERUNIT',
    totalPrice: '',
    locationOfService: '',
    deliveryTerms: '',
    paymentTerms: '',
    otherConditions: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const authToken = Cookies.get('auth_token');
    if (!authToken) {
      toast.error('Authentication token not found');
      return;
    }

    const loadingToast = toast.loading('Creating tender...');

    try {
      // Validate price is a number
      const numericPrice = parseFloat(formData.totalPrice);
      if (isNaN(numericPrice)) {
        toast.error('Total price must be a valid number');
        return;
      }

      const payload = {
        ...formData,
        totalPrice: numericPrice.toString(),
      };

      const response = await axios.post(
        ` ${import.meta.env.VITE_API_BASE_URL}/api/v0/tender`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      toast.dismiss(loadingToast);

      if (response.data.message) {
        toast.success('Tender created successfully');
        onSuccess();
        onClose();
      }
    } catch (error: any) {
      toast.dismiss(loadingToast);
      console.error('Error creating tender:', error.response?.data || error);

      if (error.response?.data?.details) {
        const errorDetails = error.response.data.details;
        errorDetails.forEach((detail: any) => {
          toast.error(`${detail.path}: ${detail.message}`);
        });
      } else {
        toast.error(error.response?.data?.message || 'Failed to create tender');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white rounded-xl shadow-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6 pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Create New Tender</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-4 flex items-center">
              <Tag className="w-4 h-4 mr-2 text-blue-500" />
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tender Name</label>
                <input
                  type="text"
                  value={formData.tenderName}
                  onChange={e => setFormData({ ...formData, tenderName: e.target.value })}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Objective</label>
                <input
                  type="text"
                  value={formData.objective}
                  onChange={e => setFormData({ ...formData, objective: e.target.value })}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model Number:{' '}
                </label>
                <input
                  type="text"
                  value={formData.modelNumber}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      modelNumber: e.target.value ? parseInt(e.target.value) : undefined,
                    })
                  }
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Description & Requirements */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-4 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-blue-500" />
              Description & Requirements
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                required
              />
            </div>

            {/* Products section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Products Required
                </label>
                <input
                  type="text"
                  value={formData.productsAndServicesRequired}
                  onChange={e =>
                    setFormData({ ...formData, productsAndServicesRequired: e.target.value })
                  }
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  About Products
                </label>
                <input
                  type="text"
                  value={formData.aboutProductsAndServices}
                  onChange={e =>
                    setFormData({ ...formData, aboutProductsAndServices: e.target.value })
                  }
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Pricing & Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-4 flex items-center">
              <DollarSign className="w-4 h-4 mr-2 text-blue-500" />
              Pricing & Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomenclature</label>
                <input
                  type="text"
                  value={formData.nomenclature}
                  onChange={e => setFormData({ ...formData, nomenclature: e.target.value })}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pricing Category
                </label>
                <select
                  value={formData.pricingCategory}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      pricingCategory: e.target.value as 'PERUNIT' | 'MONTHLY',
                    })
                  }
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="PERUNIT">Per Unit</option>
                  <option value="MONTHLY">Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Price</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    ₹
                  </span>
                  <input
                    type="text"
                    value={formData.totalPrice}
                    onChange={e => setFormData({ ...formData, totalPrice: e.target.value })}
                    className="block w-full pl-8 rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location of Service
                </label>
                <input
                  type="text"
                  value={formData.locationOfService}
                  onChange={e => setFormData({ ...formData, locationOfService: e.target.value })}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Terms
                </label>
                <input
                  type="text"
                  value={formData.deliveryTerms}
                  onChange={e => setFormData({ ...formData, deliveryTerms: e.target.value })}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Terms
                </label>
                <input
                  type="text"
                  value={formData.paymentTerms}
                  onChange={e => setFormData({ ...formData, paymentTerms: e.target.value })}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Form actions */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Tender
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

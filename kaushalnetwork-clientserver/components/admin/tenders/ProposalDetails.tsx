import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, CheckCircle, Edit, Trash2, X, Save, AlertCircle } from 'lucide-react';
import { DetailedProposal } from './types';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';

interface ProposalDetailsProps {
  details: DetailedProposal[];
  isVisible: boolean;
  onRefresh?: () => void; // Callback to refresh data after updates
}

export default function ProposalDetails({ details, isVisible, onRefresh }: ProposalDetailsProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editPrice, setEditPrice] = useState<string>('');
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isVisible || details.length === 0) return null;

  // Start editing a proposal
  const handleEditStart = (detail: DetailedProposal) => {
    setEditingId(detail.id);
    setEditPrice(detail.proposedPrice || '');
  };

  // Cancel editing
  const handleEditCancel = () => {
    setEditingId(null);
  };

  // Save edited proposal
  const handleSaveEdit = async (id: number) => {
    if (!editPrice.trim()) {
      toast.error('Please enter a valid price');
      return;
    }

    setIsSubmitting(true);
    const token = Cookies.get('auth_token');

    try {
      await axios.put(
        ` ${import.meta.env.VITE_API_BASE_URL}/api/v0/tender-application`,
        {
          tenderApplicationId: id,
          proposedPrice: editPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success('Proposal updated successfully');
      setEditingId(null);
      // Refresh the data
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Error updating proposal:', error);
      toast.error('Failed to update proposal');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Start deletion process
  const handleDeleteStart = (id: number) => {
    setDeletingId(id);
  };

  // Cancel deletion
  const handleDeleteCancel = () => {
    setDeletingId(null);
  };

  // Confirm and delete proposal
  const handleDeleteConfirm = async (id: number) => {
    setIsSubmitting(true);
    const token = Cookies.get('auth_token');

    try {
      await axios.delete(
        ` ${import.meta.env.VITE_API_BASE_URL}/api/v0/tender-application?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Proposal deleted successfully');
      setDeletingId(null);
      // Refresh the data
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Error deleting proposal:', error);
      toast.error('Failed to delete proposal');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="ml-4 overflow-hidden"
      >
        <div className="bg-gray-50 rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h4 className="font-medium text-gray-700 flex items-center gap-2">
              <Package className="w-4 h-4" />
              Proposal Details
            </h4>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {details.map(detail => (
                <motion.div
                  key={detail.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 relative"
                >
                  {/* Management buttons positioned in top right */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    {editingId !== detail.id && deletingId !== detail.id && (
                      <>
                        <button
                          onClick={() => handleEditStart(detail)}
                          className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full transition-colors"
                          title="Edit proposal"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteStart(detail.id)}
                          className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-full transition-colors"
                          title="Delete proposal"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Edit form */}
                  {editingId === detail.id && (
                    <div className="bg-blue-50 p-4 mb-4 rounded-lg border border-blue-100">
                      <div className="flex justify-between items-center mb-3">
                        <h5 className="font-medium text-blue-700 flex items-center gap-1.5">
                          <Edit size={16} /> Edit Proposal
                        </h5>
                        <button
                          onClick={handleEditCancel}
                          className="p-1 hover:bg-blue-100 rounded-full"
                        >
                          <X size={16} className="text-blue-700" />
                        </button>
                      </div>

                      <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Proposed Price (₹)
                        </label>
                        <input
                          type="text"
                          value={editPrice}
                          onChange={e => setEditPrice(e.target.value)}
                          className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter new price"
                        />
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={() => handleSaveEdit(detail.id)}
                          disabled={isSubmitting}
                          className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-1.5 disabled:opacity-50"
                        >
                          <Save size={16} />
                          {isSubmitting ? 'Updating...' : 'Update Price'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Delete confirmation */}
                  {deletingId === detail.id && (
                    <div className="bg-red-50 p-4 mb-4 rounded-lg border border-red-100">
                      <div className="flex justify-between items-center mb-3">
                        <h5 className="font-medium text-red-700 flex items-center gap-1.5">
                          <AlertCircle size={16} /> Confirm Deletion
                        </h5>
                        <button
                          onClick={handleDeleteCancel}
                          className="p-1 hover:bg-red-100 rounded-full"
                        >
                          <X size={16} className="text-red-700" />
                        </button>
                      </div>

                      <p className="text-sm text-gray-700 mb-3">
                        Are you sure you want to delete this proposal? This action cannot be undone.
                      </p>

                      <div className="flex justify-end gap-2">
                        <button
                          onClick={handleDeleteCancel}
                          className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleDeleteConfirm(detail.id)}
                          disabled={isSubmitting}
                          className="px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-1.5 disabled:opacity-50"
                        >
                          <Trash2 size={16} />
                          {isSubmitting ? 'Deleting...' : 'Delete Proposal'}
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={
                            detail.Company?.logoUrl
                              ? detail.Company.logoUrl.startsWith('http')
                                ? detail.Company.logoUrl
                                : ` ${import.meta.env.VITE_API_BASE_URL}/${detail.Company.logoUrl}`
                              : 'https://placehold.co/400'
                          }
                          alt={detail.Company?.companyName || 'Company Logo'}
                          className="w-full h-full object-cover"
                          onError={e => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/400';
                          }}
                        />
                      </div>
                      {detail.Company?.verified && (
                        <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {detail.Company?.companyName || 'Unknown Company'}
                          </h3>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">
                              {detail.Company?.companyType || 'N/A'}
                            </span>
                            <span className="px-2 py-0.5 bg-purple-50 text-purple-700 text-xs rounded-full">
                              {detail.Company?.entityType || 'N/A'}
                            </span>
                            {detail.Company?.verified && (
                              <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-full flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                Verified
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="bg-blue-50 px-4 py-3 rounded-lg text-center sm:text-right">
                          <p className="text-xs text-blue-600 uppercase font-semibold">
                            Proposed Amount
                          </p>
                          <p className="text-xl font-bold text-blue-700">₹{detail.proposedPrice}</p>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-gray-50 p-2 rounded-md">
                          <p className="text-gray-500 text-xs">Business Type</p>
                          <p className="font-medium text-gray-800">
                            {detail.Company?.businessType || 'N/A'}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-md">
                          <p className="text-gray-500 text-xs">Entity Type</p>
                          <p className="font-medium text-gray-800">
                            {detail.Company?.entityType || 'N/A'}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-md">
                          <p className="text-gray-500 text-xs">Sector</p>
                          <p className="font-medium text-gray-800">
                            {detail.Company?.sector || 'N/A'}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-md">
                          <p className="text-gray-500 text-xs">Industry</p>
                          <p className="font-medium text-gray-800">
                            {detail.Company?.industry || 'N/A'}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <button className="flex-1 py-2 px-4 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                          View Company Profile
                        </button>
                        <button className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                          Contact Company
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

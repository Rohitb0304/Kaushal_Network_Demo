import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, X, Briefcase, AlertCircle, CheckCircle } from 'lucide-react';
import { TenderWithCompany, DetailedProposal } from './types';

interface TenderApplicationModalProps {
  tender: TenderWithCompany | null;
  applications: DetailedProposal[];
  loading: boolean;
  onClose: () => void;
  isOpen: boolean;
}

export default function TenderApplicationModal({
  tender,
  applications,
  loading,
  onClose,
  isOpen,
}: TenderApplicationModalProps) {
  if (!tender || !isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl shadow-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Tender Applications</h2>
                <p className="text-gray-600">{tender.tenderName}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-4 bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Tender ID</p>
                <p className="font-medium">{tender.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pricing Category</p>
                <p className="font-medium">
                  {tender.pricingCategory === 'PERUNIT' ? 'Per Unit' : 'Monthly'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Price</p>
                <p className="font-medium">₹{tender.totalPrice}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{tender.locationOfService || 'Not specified'}</p>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Loading applications...</p>
            </div>
          ) : applications.length > 0 ? (
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Companies Applied ({applications.length})
              </h3>

              {applications.map(application => (
                <motion.div
                  key={application.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg p-5 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={
                            application.Company?.logoUrl
                              ? application.Company.logoUrl.startsWith('http')
                                ? application.Company.logoUrl
                                : ` ${import.meta.env.VITE_API_BASE_URL}/${application.Company.logoUrl}`
                              : 'https://placehold.co/400'
                          }
                          alt={application.Company?.companyName || 'Company Logo'}
                          className="w-full h-full object-cover"
                          onError={e => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/400';
                          }}
                        />
                      </div>
                      {application.Company?.verified && (
                        <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {application.Company?.companyName || 'Unknown Company'}
                          </h3>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">
                              {application.Company?.companyType || 'N/A'}
                            </span>
                            <span className="px-2 py-0.5 bg-purple-50 text-purple-700 text-xs rounded-full">
                              {application.Company?.entityType || 'N/A'}
                            </span>
                            {application.Company?.verified && (
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
                          <p className="text-xl font-bold text-blue-700">
                            ₹{application.proposedPrice}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-gray-50 p-2 rounded-md">
                          <p className="text-gray-500 text-xs">Business Type</p>
                          <p className="font-medium text-gray-800">
                            {application.Company?.businessType || 'N/A'}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-md">
                          <p className="text-gray-500 text-xs">Entity Type</p>
                          <p className="font-medium text-gray-800">
                            {application.Company?.entityType || 'N/A'}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-md">
                          <p className="text-gray-500 text-xs">Sector</p>
                          <p className="font-medium text-gray-800">
                            {application.Company?.sector || 'N/A'}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-md">
                          <p className="text-gray-500 text-xs">Industry</p>
                          <p className="font-medium text-gray-800">
                            {application.Company?.industry || 'N/A'}
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
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <AlertCircle className="w-7 h-7 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No applications yet</h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                No companies have applied to this tender yet. Check back later.
              </p>
            </div>
          )}

          <div className="mt-6 pt-4 border-t flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

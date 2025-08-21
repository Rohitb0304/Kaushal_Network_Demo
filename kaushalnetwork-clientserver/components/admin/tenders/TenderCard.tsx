import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, MapPin, Building, Briefcase, CheckCircle, FileText } from 'lucide-react';
import { TenderWithCompany, getPricingCategoryColor } from './types';

interface TenderCardProps {
  tender: TenderWithCompany;
  onClick: (tender: TenderWithCompany) => void;
}

export default function TenderCard({ tender, onClick }: TenderCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <div className={`h-2 ${getPricingCategoryColor(tender.pricingCategory)}`}></div>
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="relative flex-shrink-0">
            <img
              src={
                tender.Company.logoUrl?.startsWith('http')
                  ? tender.Company.logoUrl
                  : ` ${import.meta.env.VITE_API_BASE_URL}/${tender.Company.logoUrl}`
              }
              alt={tender.Company.companyName}
              className="w-14 h-14 rounded-lg object-cover border border-gray-200"
              onError={e => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/400';
              }}
            />
            {tender.Company.verified && (
              <CheckCircle className="absolute -top-1 -right-1 w-5 h-5 text-green-500 bg-white rounded-full shadow-sm" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
              {tender.tenderName}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-500">{tender.Company.companyName}</span>
              {tender.Company.verified && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                  Verified
                </span>
              )}
            </div>
            <div className="flex gap-2 mt-2">
              <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
                {tender.Company.companyType}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  tender.pricingCategory === 'PERUNIT'
                    ? 'bg-purple-50 text-purple-700'
                    : 'bg-teal-50 text-teal-700'
                }`}
              >
                {tender.pricingCategory === 'PERUNIT' ? 'Per Unit' : 'Monthly'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <p className="text-gray-600 text-sm line-clamp-2">
            {tender.description || 'No description provided'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-100 rounded-md">
              <DollarSign className="w-3.5 h-3.5 text-blue-700" />
            </div>
            <span className="text-gray-900 font-semibold">₹{tender.totalPrice}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-green-100 rounded-md">
              <MapPin className="w-3.5 h-3.5 text-green-700" />
            </div>
            <span className="text-gray-600 truncate">
              {tender.locationOfService || 'Not specified'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-yellow-100 rounded-md">
              <Building className="w-3.5 h-3.5 text-yellow-700" />
            </div>
            <span className="text-gray-600 truncate">{tender.Company.sector}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-purple-100 rounded-md">
              <Briefcase className="w-3.5 h-3.5 text-purple-700" />
            </div>
            <span className="text-gray-600 truncate">{tender.Company.industry}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <button
            onClick={() => onClick(tender)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <FileText className="w-4 h-4" />
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}

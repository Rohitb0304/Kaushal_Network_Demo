import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  DollarSign,
  MapPin,
  ChevronRight,
  Calendar,
  Tag,
  Check,
  ShoppingBag,
  TrendingUp,
  Target,
  BarChart,
} from 'lucide-react';
import { ProposalBasic, TenderDetail, getPricingCategoryColor } from './types';

interface ProposalCardProps {
  proposal: ProposalBasic;
  tenderDetails?: TenderDetail;
  isSelected: boolean;
  onClick: (tenderId: number) => void;
}

export default function ProposalCard({
  proposal,
  tenderDetails,
  isSelected,
  onClick,
}: ProposalCardProps) {
  const handleClick = () => onClick(proposal.tenderId);

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(proposal.tenderId);
  };

  // Calculate the percentage of your proposal compared to the tender budget
  const calculatePercentage = () => {
    if (!tenderDetails) return 100;

    const budget = parseFloat(tenderDetails.totalPrice);
    const proposalAmount = parseFloat(proposal.proposedPrice);

    if (isNaN(budget) || isNaN(proposalAmount) || budget === 0) return 100;

    return Math.round((proposalAmount / budget) * 100);
  };

  const proposalPercentage = calculatePercentage();
  const isLowerThanBudget = proposalPercentage < 100;

  return (
    <motion.div
      className={`bg-white border ${isSelected ? 'border-blue-400 ring-2 ring-blue-100' : 'border-gray-200'} rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden`}
      onClick={handleClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {tenderDetails ? (
        <div className="flex flex-col w-full">
          {/* Enhanced header with gradient based on pricing category */}
          <div
            className={`h-1.5 w-full ${getPricingCategoryColor(tenderDetails.pricingCategory)}`}
          ></div>

          <div className="p-5">
            {/* Header section with tender name and price comparison */}
            <div className="flex justify-between items-start gap-4 mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-1 flex items-center">
                  <Target className="w-5 h-5 text-indigo-600 mr-2" />
                  {tenderDetails.tenderName}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-xs text-gray-600">
                      {new Date().toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">•</span>
                  <div className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-xs text-gray-600">
                      {tenderDetails.nomenclature || 'General'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                  onClick={handleExpandClick}
                >
                  <ChevronRight
                    className={`w-5 h-5 transition-transform ${isSelected ? 'rotate-90' : ''}`}
                  />
                </button>
              </div>
            </div>

            {/* Description with nice background */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-3 mb-4 border border-indigo-100">
              <p className="text-gray-700 text-sm line-clamp-2">
                {tenderDetails.description || 'No description provided'}
              </p>
            </div>

            {/* Metadata badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span
                className={`text-xs px-2.5 py-1.5 rounded-full font-medium flex items-center gap-1 
                ${
                  tenderDetails.pricingCategory === 'PERUNIT'
                    ? 'bg-purple-50 text-purple-700 ring-1 ring-purple-100'
                    : 'bg-teal-50 text-teal-700 ring-1 ring-teal-100'
                }`}
              >
                <ShoppingBag className="w-3 h-3" />
                {tenderDetails.pricingCategory === 'PERUNIT' ? 'Per Unit' : 'Monthly'}
              </span>

              {tenderDetails.locationOfService && (
                <span className="text-xs px-2.5 py-1.5 bg-green-50 text-green-700 rounded-full font-medium flex items-center gap-1 ring-1 ring-green-100">
                  <MapPin className="w-3 h-3" />
                  {tenderDetails.locationOfService}
                </span>
              )}

              <span
                className={`text-xs px-2.5 py-1.5 rounded-full font-medium flex items-center gap-1
                ${
                  isLowerThanBudget
                    ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100'
                    : 'bg-amber-50 text-amber-700 ring-1 ring-amber-100'
                }`}
              >
                <TrendingUp className="w-3 h-3" />
                {isLowerThanBudget ? 'Cost-effective' : 'Premium'}
              </span>
            </div>

            {/* Price comparison section with enhanced visuals */}
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700">Price Comparison</span>
                <span
                  className={`text-xs font-bold ${
                    isLowerThanBudget ? 'text-emerald-600' : 'text-amber-600'
                  }`}
                >
                  {proposalPercentage}% {isLowerThanBudget ? 'of budget' : 'over budget'}
                </span>
              </div>

              {/* Progress bar visualization */}
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${isLowerThanBudget ? 'bg-emerald-500' : 'bg-amber-500'}`}
                  style={{ width: `${Math.min(proposalPercentage, 150)}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-100 rounded-md">
                    <BarChart className="w-3.5 h-3.5 text-blue-700" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Tender Budget</p>
                    <p className="font-medium text-gray-900">₹{tenderDetails.totalPrice}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`p-1.5 rounded-md ${
                      isLowerThanBudget ? 'bg-emerald-100' : 'bg-amber-100'
                    }`}
                  >
                    <DollarSign
                      className={`w-3.5 h-3.5 ${
                        isLowerThanBudget ? 'text-emerald-700' : 'text-amber-700'
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Your Proposal</p>
                    <p className="font-medium text-gray-900">₹{proposal.proposedPrice}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with IDs and status badge */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <div className="flex gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" />
                  ID: {proposal.tenderId}
                </span>
                <span className="flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  Proposal: {proposal.id}
                </span>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                Submitted
              </span>
            </div>
          </div>
        </div>
      ) : (
        <></>
        // Fallback design for when tender details are not available
        // <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-4">
        //   <div className="flex items-center gap-3">
        //     <div className="p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg">
        //       <FileText className="w-6 h-6 text-indigo-600" />
        //     </div>
        //     {/* <div>
        //       <p className="font-medium text-gray-900 flex items-center gap-1">
        //         <Target className="w-4 h-4 text-indigo-500" />
        //         Tender ID: {proposal.tenderId}
        //       </p>
        //       <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
        //         <Tag className="w-3.5 h-3.5" />
        //         Proposal ID: {proposal.id}
        //       </p>
        //     </div> */}
        //   </div>
        //   <div className="flex items-center gap-3">
        //     <div className="text-right">
        //       <p className="font-bold text-lg text-blue-600 flex items-center gap-1">
        //         <DollarSign className="w-4 h-4" />
        //         ₹{proposal.proposedPrice}
        //       </p>
        //       <p className="text-xs text-gray-500">Your Proposed Amount</p>
        //     </div>
        //     <button
        //       className="p-2 bg-gray-100 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-full transition-all"
        //       onClick={handleExpandClick}
        //     >
        //       <ChevronRight className={`w-5 h-5 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
        //     </button>
        //   </div>
        // </div>
      )}
    </motion.div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router';
import {
  MagnifyingGlass,
  Buildings,
  Briefcase,
  Compass,
  X,
  ArrowRight,
  MapPin,
  Users,
} from '@phosphor-icons/react';
import { Button } from '../ui/button';

interface SearchSectionProps {
  queryParams: {
    keyword: string;
    sector: string;
    location: string;
    companyType: string;
    deliverableNames: string;
  };
  setQueryParams: React.Dispatch<
    React.SetStateAction<{
      keyword: string;
      sector: string;
      location: string;
      companyType: string;
      deliverableNames: string;
    }>
  >;
  searchResults: any[];
  loading: boolean;
}

const SearchSection = ({
  queryParams,
  setQueryParams,
  searchResults,
  loading,
}: SearchSectionProps) => {
  const navigate = useNavigate();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchResults.length > 0) {
      setShowResults(true);
    }
  }, [searchResults]);

  const handleSearch = () => {
    if (queryParams.keyword.trim()) {
      // Trigger search logic here
      console.log('Searching for:', queryParams.keyword);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearFilter = (filterType: keyof typeof queryParams) => {
    setQueryParams(prev => ({ ...prev, [filterType]: '' }));
  };

  const activeFilters = Object.entries(queryParams).filter(
    ([key, value]) => key !== 'keyword' && value !== ''
  );

  const highlightKeyword = (text: string, keyword: string) => {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 px-1 py-0.5 rounded">$1</mark>');
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="max-w-6xl mx-auto relative"
    >
      {/* Background decorative elements */}
      <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-100 rounded-full opacity-60 blur-lg"></div>
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-100 rounded-full opacity-50 blur-lg"></div>

      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 backdrop-blur-sm relative z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl inline-block"
          >
            <Compass weight="duotone" className="w-8 h-8 text-blue-600" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-4">
            Find Your Perfect Business Partner
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Connect with verified companies, explore partnerships, and grow your business network
            with confidence
          </p>
        </div>

        {/* Main Search Bar */}
        <div className="relative mb-8">
          <motion.div
            className={`relative transition-all duration-300 ${
              isSearchFocused
                ? 'shadow-2xl shadow-blue-500/20 scale-[1.02]'
                : 'shadow-lg hover:shadow-xl'
            }`}
            whileHover={{ scale: 1.01 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl opacity-5"></div>
            <div className="relative bg-white rounded-2xl border-2 border-gray-200 focus-within:border-blue-400 transition-all duration-300">
              {/* Search Icon */}
              <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10">
                <MagnifyingGlass
                  weight="bold"
                  className={`w-6 h-6 transition-colors duration-300 ${
                    isSearchFocused ? 'text-blue-600' : 'text-gray-400'
                  }`}
                />
              </div>

              {/* Search Input */}
              <input
                ref={searchRef}
                type="text"
                placeholder="Search for companies, sectors, or services..."
                value={queryParams.keyword}
                onChange={e => setQueryParams(prev => ({ ...prev, keyword: e.target.value }))}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                onKeyPress={handleKeyPress}
                className="w-full pl-16 pr-32 py-6 text-lg rounded-2xl bg-transparent focus:outline-none placeholder:text-gray-400 text-gray-800"
              />

              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <span className="hidden sm:inline">Search</span>
                <ArrowRight weight="bold" className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col gap-4">
            {/* Filter Controls */}
            <div className="flex flex-wrap gap-3">
              <div className="relative min-w-[200px]">
                <Buildings
                  weight="bold"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 z-10"
                />
                <select
                  value={queryParams.sector}
                  onChange={e => setQueryParams(prev => ({ ...prev, sector: e.target.value }))}
                  className="w-full appearance-none pl-10 pr-8 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                >
                  <option value="">All Sectors</option>
                  <option value="IT">Information Technology</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance & Banking</option>
                  <option value="Education">Education</option>
                  <option value="Retail">Retail & E-commerce</option>
                  <option value="Construction">Construction</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>

              <div className="relative min-w-[200px]">
                <Briefcase
                  weight="bold"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 z-10"
                />
                <select
                  value={queryParams.companyType}
                  onChange={e => setQueryParams(prev => ({ ...prev, companyType: e.target.value }))}
                  className="w-full appearance-none pl-10 pr-8 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                >
                  <option value="">All Company Types</option>
                  <option value="MSME">MSME</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Service Provider">Service Provider</option>
                  <option value="Bank">Bank</option>
                  <option value="Others">Others</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>

              <div className="relative min-w-[200px]">
                <MapPin
                  weight="bold"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 z-10"
                />
                <input
                  type="text"
                  placeholder="Location (optional)"
                  value={queryParams.location}
                  onChange={e => setQueryParams(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                />
              </div>
            </div>

            {/* Active Filters */}
            <AnimatePresence>
              {activeFilters.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-2"
                >
                  <span className="text-sm text-gray-500 py-2">Active filters:</span>
                  {activeFilters.map(([key, value]) => (
                    <motion.div
                      key={key}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full border border-blue-200 text-sm"
                    >
                      <span className="capitalize">{key}:</span>
                      <span className="font-medium">{value}</span>
                      <button
                        onClick={() => clearFilter(key as keyof typeof queryParams)}
                        className="hover:bg-blue-100 rounded-full p-0.5 transition-colors"
                      >
                        <X weight="bold" className="w-3 h-3" />
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12"
            >
              <div className="relative w-16 h-16 mx-auto mb-4">
                <motion.div
                  className="w-full h-full rounded-full border-4 border-blue-200"
                  style={{ borderTopColor: '#3b82f6' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <MagnifyingGlass weight="bold" className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-gray-600 font-medium">Searching for perfect matches...</p>
              <p className="text-gray-400 text-sm mt-1">This may take a few seconds</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Results */}
        <AnimatePresence>
          {!loading && showResults && searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Results Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                  <h3 className="text-xl font-bold text-gray-800">Search Results</h3>
                  <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">
                    {searchResults.length} found
                  </span>
                </div>
                {searchResults.length > 3 && (
                  <Button
                    variant="outline"
                    onClick={() => navigate('/network', { state: { searchParams: queryParams } })}
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    View All Results
                  </Button>
                )}
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.slice(0, 6).map((company: any, index: number) => (
                  <motion.div
                    key={company.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{
                      y: -8,
                      boxShadow: '0 20px 40px -12px rgba(0,0,0,0.15)',
                    }}
                    className="group p-6 rounded-2xl bg-white border border-gray-100 hover:border-blue-200 shadow-sm transition-all duration-300 cursor-pointer overflow-hidden relative"
                    onClick={() => navigate(`/company/${company.id}`)}
                  >
                    {/* Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative">
                      {/* Company Avatar & Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {company.companyName?.[0]?.toUpperCase() || 'C'}
                          </div>
                          <div>
                            <h4
                              className="font-bold text-gray-800 group-hover:text-blue-700 transition-colors text-lg leading-tight"
                              dangerouslySetInnerHTML={{
                                __html: highlightKeyword(
                                  company.companyName || 'Company Name',
                                  queryParams.keyword
                                ),
                              }}
                            />
                            <div className="flex items-center gap-1 mt-1">
                              <Buildings weight="fill" className="w-3 h-3 text-gray-400" />
                              <p className="text-sm text-gray-500">
                                {company.sector || 'Sector not specified'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Company Details */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Briefcase weight="fill" className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-gray-600 font-medium">
                            {company.companyType || 'Type not specified'}
                          </span>
                        </div>

                        {company.location && (
                          <div className="flex items-center gap-2">
                            <MapPin weight="fill" className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-600">{company.location}</span>
                          </div>
                        )}

                        {company.employeeCount && (
                          <div className="flex items-center gap-2">
                            <Users weight="fill" className="w-4 h-4 text-purple-500" />
                            <span className="text-sm text-gray-600">
                              {company.employeeCount} employees
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Action Indicator */}
                      <div className="mt-4 pt-4 border-t border-gray-100 group-hover:border-blue-200 transition-colors">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400 font-medium">View Profile</span>
                          <ArrowRight
                            weight="bold"
                            className="w-4 h-4 text-blue-500 transform group-hover:translate-x-1 transition-transform"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Show More Button */}
              {searchResults.length > 6 && (
                <div className="text-center pt-6">
                  <Button
                    onClick={() => navigate('/network', { state: { searchParams: queryParams } })}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <span>View All {searchResults.length} Results</span>
                    <ArrowRight weight="bold" className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!loading && !showResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
              <MagnifyingGlass weight="duotone" className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Ready to Find Partners?</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Start by typing a company name, sector, or service you're looking for in the search
              bar above.
            </p>
          </motion.div>
        )}

        {/* No Results State */}
        {!loading && showResults && searchResults.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center">
              <MagnifyingGlass weight="duotone" className="w-12 h-12 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Results Found</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              We couldn't find any companies matching your search criteria. Try adjusting your
              filters or search terms.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setQueryParams({
                  keyword: '',
                  sector: '',
                  location: '',
                  companyType: '',
                  deliverableNames: '',
                });
                setShowResults(false);
              }}
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              Clear All Filters
            </Button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default SearchSection;

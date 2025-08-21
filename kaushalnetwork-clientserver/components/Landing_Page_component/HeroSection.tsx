import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router';
import { Button } from '../ui/button';
import {
  MagnifyingGlass,
  Buildings,
  MapPin,
  Users,
  ArrowRight,
  X,
  Briefcase,
} from '@phosphor-icons/react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useDebounce } from '../../hooks/useDebounce';
import MultiLanguageText from '../ui/MultiLanguageText';

// Define the stats data
const stats = [
  { number: '40K+', label: 'MSMEs', icon: <Buildings weight="bold" /> },
  { number: '20K+', label: 'Service Providers', icon: <Briefcase weight="bold" /> },
  { number: '1K+', label: 'Corporate Partners', icon: <Users weight="bold" /> },
];

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery.trim()) {
        setSearchResults([]);
        setShowResults(false);
        return;
      }

      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append('keyword', debouncedQuery);

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v0/company/all?${params.toString()}`
        );
        setSearchResults(response.data.slice(0, 8));
        setShowResults(true);
      } catch (error) {
        console.error('Search error:', error);
        toast.error('Error fetching results');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node) &&
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate('/network', { state: { searchParams: { keyword: searchQuery } } });
      setShowResults(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleCompanyClick = (companyId: string) => {
    navigate(`/company/${companyId}`);
    setShowResults(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
    searchRef.current?.focus();
  };

  const highlightKeyword = (text: string, keyword: string) => {
    if (!keyword.trim()) return text;
    const regex = new RegExp(`(${keyword.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<strong class="font-semibold text-indigo-600">$1</strong>');
  };

  return (
    // IMPROVEMENT: Full-screen container with vertical centering for an immersive feel.
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-white bg-grid">
      {/* Background Elements - IMPROVED: Larger and more dynamic for a richer background */}
      <div className="absolute top-0 -left-64 w-[40rem] h-[40rem] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute -top-32 right-0 w-[40rem] h-[40rem] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-64 left-1/4 w-[36rem] h-[36rem] bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

      <motion.section
        className="text-center w-full max-w-6xl mx-auto py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6"
        >
          <span className="px-5 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full text-indigo-700 text-sm font-semibold border border-indigo-100 shadow-sm">
            India's Premier Business Network
          </span>
        </motion.div>

        {/* IMPROVEMENT: Larger, more impactful headline for a full-screen layout */}
        <motion.h1
          className="text-6xl md:text-8xl font-extrabold tracking-tighter"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, type: 'spring' }}
        >
          <div className="flex justify-center items-center gap-2 sm:gap-4 mb-3">
            <MultiLanguageText duration={2000} />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Network
            </span>
          </div>
          <span className="block text-gray-800 text-4xl md:text-6xl">
            Connecting Growth Across India
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-600 mt-8 max-w-3xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Find clients, partners, and opportunities. A one-stop platform for exponential business
          growth across MSMEs, Corporates, and Service Providers.
        </motion.p>

        {/* IMPROVEMENT: Larger vertical margin for better visual separation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="max-w-3xl mx-auto my-12 relative"
        >
          <div className="relative">
            <motion.div
              className={`relative transition-all duration-300 ${
                isSearchFocused || showResults
                  ? 'shadow-2xl shadow-indigo-500/20 scale-[1.02]'
                  : 'shadow-lg hover:shadow-xl'
              }`}
              whileHover={{ scale: 1.01 }}
            >
              {/* IMPROVEMENT: Larger search bar for emphasis */}
              <div className="relative bg-white rounded-full border border-gray-200 focus-within:ring-4 focus-within:ring-blue-400/50 focus-within:border-blue-400 transition-all duration-300">
                <div className="absolute left-7 top-1/2 -translate-y-1/2 z-10">
                  <MagnifyingGlass
                    weight="bold"
                    className={`w-7 h-7 transition-colors duration-300 ${
                      isSearchFocused ? 'text-blue-600' : 'text-gray-400'
                    }`}
                  />
                </div>

                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search for companies, services, or people..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    setIsSearchFocused(true);
                    if (searchQuery) setShowResults(true);
                  }}
                  onBlur={() => setIsSearchFocused(false)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-20 pr-28 h-[72px] text-xl rounded-full bg-transparent focus:outline-none placeholder:text-gray-400 text-gray-800"
                />

                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    aria-label="Clear search"
                    className="absolute right-[88px] top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                  >
                    <X weight="bold" className="w-5 h-5" />
                  </button>
                )}

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSearch}
                  aria-label="Search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ArrowRight weight="bold" className="w-7 h-7" />
                </motion.button>
              </div>
            </motion.div>

            <AnimatePresence>
              {(showResults || loading) && (
                <motion.div
                  ref={resultsRef}
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 max-h-96 overflow-y-auto"
                >
                  {loading ? (
                    <div className="p-6 text-center">
                      <div className="w-8 h-8 mx-auto border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="py-2">
                      {searchResults.map((company: any, index: number) => (
                        <motion.div
                          key={company.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleCompanyClick(company.id)}
                          className="px-5 py-4 hover:bg-indigo-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0 group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-sm flex-shrink-0">
                              {company.companyName?.[0]?.toUpperCase() || 'C'}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4
                                className="font-semibold text-gray-800 transition-colors text-base leading-tight truncate"
                                dangerouslySetInnerHTML={{
                                  __html: highlightKeyword(
                                    company.companyName || 'Company Name',
                                    debouncedQuery
                                  ),
                                }}
                              />
                              <div className="flex items-center gap-x-3 gap-y-1 flex-wrap mt-1 text-sm text-gray-500">
                                {company.sector && (
                                  <div className="flex items-center gap-1.5">
                                    <Buildings className="w-4 h-4" />
                                    <span>{company.sector}</span>
                                  </div>
                                )}
                                {company.location && (
                                  <div className="flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4" />
                                    <span>{company.location}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <ArrowRight
                              weight="bold"
                              className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-transform group-hover:translate-x-1"
                            />
                          </div>
                        </motion.div>
                      ))}

                      {searchResults.length >= 8 && (
                        <div
                          onClick={handleSearch}
                          className="px-4 py-4 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors border-t border-gray-200 text-center"
                        >
                          <div className="flex items-center justify-center gap-2 text-blue-600 font-medium text-sm">
                            <span>View all results for "{searchQuery}"</span>
                            <ArrowRight weight="bold" className="w-4 h-4" />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <MagnifyingGlass weight="light" className="w-10 h-10 text-gray-400" />
                      </div>
                      <p className="font-semibold text-gray-700">No results found</p>
                      <p className="text-gray-500 text-sm mt-1">
                        Try checking for typos or using different keywords.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          {/* IMPROVEMENT: Larger buttons with more prominent hover effects */}
          <Button
            className="w-full sm:w-auto h-16 text-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2.5 group"
            onClick={onGetStarted}
          >
            Get Started Free
            <ArrowRight
              weight="bold"
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
            />
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto h-16 text-lg border-2 border-indigo-200/80 text-indigo-700 font-semibold px-10 rounded-xl hover:bg-indigo-50/70 hover:border-indigo-300 transform hover:-translate-y-1 transition-all duration-300"
          >
            Learn More
          </Button>
        </motion.div>

        {/* IMPROVEMENT: Enhanced visual styling for the stats section */}
        <motion.div
          className="mt-24"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 1.2 } },
            hidden: { opacity: 0 },
          }}
        >
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16 text-gray-600 font-medium">
            {stats.map(stat => (
              <motion.div
                key={stat.label}
                className="flex items-center gap-4 text-left"
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 10 },
                }}
              >
                <div className="text-indigo-500 bg-indigo-100 p-4 rounded-full shadow-inner">
                  {React.cloneElement(stat.icon, { className: 'w-7 h-7' })}
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-800">{stat.number}</p>
                  <p className="text-sm tracking-wide text-gray-500">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default HeroSection;

/* 
  Make sure these animation keyframes and helper classes are in your global CSS (e.g., index.css):
  
  .animate-blob {
    animation: blob-bounce 8s infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }
  @keyframes blob-bounce {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }

  // NEW: Add this class for the subtle background grid
  .bg-grid {
    background-image:
        linear-gradient(to right, theme('colors.gray.100') 1px, transparent 1px),
        linear-gradient(to bottom, theme('colors.gray.100') 1px, transparent 1px);
    background-size: 4rem 4rem; // 64px
    background-position: -1px -1px;
  }
*/

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import {
  TrendingUp,
  Building2,
  GraduationCap, // Keeping GraduationCap as per original request scope
  BadgeCheck,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Star,
  Award,
  Shield,
} from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

// Premium Business Categories with images
const topSearchCategories = [
  {
    name: 'Electronics Manufacturing',
    image: '/images/categories/electronics.jpg',
    count: '2.5K+',
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Electronics Manufacturing',
    image: '/images/categories/electronics.jpg',
    count: '2.5K+',
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Electronics Manufacturing',
    image: '/images/categories/electronics.jpg',
    count: '2.5K+',
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Electronics Manufacturing',
    image: '/images/categories/electronics.jpg',
    count: '2.5K+',
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Electronics Manufacturing',
    image: '/images/categories/electronics.jpg',
    count: '2.5K+',
    color: 'from-blue-500 to-blue-600',
  },
  // { name: 'Software Solutions', image: '/images/categories/software.jpg', count: '1.8K+', color: 'from-purple-500 to-purple-600' },
  {
    name: 'Industrial Manufacturing',
    image: '/images/categories/manufacturing.jpg',
    count: '3.2K+',
    color: 'from-gray-600 to-gray-700',
  },
  // { name: 'Logistics & Supply Chain', image: '/images/categories/logistics.jpg', count: '1.9K+', color: 'from-green-500 to-green-600' },
  // { name: 'Business Consultancy', image: '/images/categories/consultancy.jpg', count: '1.4K+', color: 'from-indigo-500 to-indigo-600' },
  // { name: 'IT Services & Support', image: '/images/categories/it-services.jpg', count: '2.1K+', color: 'from-cyan-500 to-cyan-600' },
  {
    name: 'Renewable Energy',
    image: '/images/categories/renewable-energy.jpg',
    count: '950+',
    color: 'from-emerald-500 to-emerald-600',
  },
  // { name: 'Export & International Trade', image: '/images/categories/export.jpg', count: '1.6K+', color: 'from-orange-500 to-orange-600' },
];

// B2B Suppliers and Service Providers - What businesses actually search for
const topBusinesses = [
  {
    name: 'Steel & Metal Suppliers',
    image: '/images/companies/steel-suppliers.png',
    sector: 'Raw Materials',
    verified: true,
  },
  {
    name: 'Packaging Solutions Ltd',
    image: '/images/companies/packaging-company.png',
    sector: 'Packaging & Printing',
    verified: true,
  },
  {
    name: 'Industrial Machinery Co',
    image: '/images/companies/machinery-supplier.png',
    sector: 'Manufacturing Equipment',
    verified: true,
  },
  {
    name: 'Industrial Machinery Co',
    image: '/images/companies/machinery-supplier.png',
    sector: 'Manufacturing Equipment',
    verified: true,
  },
  // { name: 'Chemical Industries Pvt Ltd', image: '/images/companies/chemical-supplier.png', sector: 'Chemical & Petrochemicals', verified: true },
  // { name: 'Electronics Components Hub', image: '/images/companies/electronics-supplier.png', sector: 'Electronic Components', verified: true },
  // { name: 'Textile Manufacturing Co', image: '/images/companies/textile-manufacturer.png', sector: 'Textiles & Garments', verified: true },
  // { name: 'Logistics & Transportation', image: '/images/companies/logistics-provider.png', sector: 'Freight & Logistics', verified: true },
  // { name: 'Construction Materials Ltd', image: '/images/companies/construction-supplier.png', sector: 'Building Materials', verified: true },
  // { name: 'Food Processing Equipment', image: '/images/companies/food-equipment.png', sector: 'Food & Beverage', verified: true },
  // { name: 'IT Solutions & Services', image: '/images/companies/it-services.png', sector: 'Software & IT', verified: true },
  // { name: 'Pharmaceutical Suppliers', image: '/images/companies/pharma-supplier.png', sector: 'Healthcare & Pharma', verified: true },
  // { name: 'Auto Parts & Components', image: '/images/companies/auto-parts.png', sector: 'Automotive Parts', verified: true },
];

// Premier Educational Institutions with logos (Updated to Indian Bank Institutions)
const topInstitutions = [
  {
    name: 'State Bank of India',
    image: '/images/institutions/iit-bombay-logo.png',
    type: 'Banking',
    ranking: '#1',
  },
  {
    name: 'HDFC Bank',
    image: '/images/institutions/iit-delhi-logo.png',
    type: 'Banking',
    ranking: '#2',
  },
  // { name: 'IIM Ahmedabad', image: '/images/institutions/iim-ahmedabad-logo.png', type: 'Management', ranking: '#1' },
  // { name: 'AIIMS Delhi', image: '/images/institutions/aiims-logo.png', type: 'Medical', ranking: '#1' },
  // { name: 'University of Delhi', image: '/images/institutions/du-logo.png', type: 'Comprehensive', ranking: '#3' },
  // { name: 'NIT Trichy', image: '/images/institutions/nit-trichy-logo.png', type: 'Technology', ranking: '#5' },
  {
    name: 'ICICI Bank',
    image: '/images/institutions/bits-logo.png',
    type: 'Banking',
    ranking: '#3',
  },
  {
    name: 'Punjab National Bank',
    image: '/images/institutions/iisc-logo.png',
    type: 'Banking',
    ranking: '#4',
  },
];

// Premium Sponsored Solutions with product images
const sponsoredItems = [
  {
    name: 'Kibou Systems.',
    image: '/images/solutions/kibou-systems.png',
    badge: 'Featured',
    premium: true,
  },
  // { name: 'AI-Powered Procurement', image: '/images/solutions/ai-procurement.jpg', badge: 'New', premium: true },
  // { name: 'Global Supply Chain Network', image: '/images/solutions/supply-chain.jpg', badge: 'Trending', premium: true },
  // { name: 'Smart Manufacturing Hub', image: '/images/solutions/smart-manufacturing.jpg', badge: 'Popular', premium: true },
  // { name: 'Business Intelligence Suite', image: '/images/solutions/business-intelligence.jpg', badge: 'Premium', premium: true },
];

const ModernCarouselSection = ({
  title,
  subtitle,
  icon,
  items,
  type = 'default',
  sectionId,
  isFirst = false,
}) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const renderCard = (item, index) => {
    const cardVariants = {
      hidden: { opacity: 0, y: 30, scale: 0.9 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.6,
          delay: index * 0.08,
          ease: [0.25, 0.8, 0.25, 1],
        },
      },
    };

    // Increased card width and maintained height for better proportions
    const baseCardClasses =
      'bg-white ml-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer border border-gray-100/50 backdrop-blur-sm flex flex-col';
    // Increased width from 280px to 320px for more breathing room
    const cardDimensions = 'w-[320px] h-[280px]';

    switch (type) {
      case 'categories':
        return (
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            whileHover={{ scale: 1.03, y: -8 }}
            onHoverStart={() => setHoveredCard(index)}
            onHoverEnd={() => setHoveredCard(null)}
            className={`${baseCardClasses} ${cardDimensions}`}
          >
            {/* Reduced Image Container */}
            <div className="relative h-[140px] overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={e => {
                  e.target.style.display = 'none';
                  e.target.parentElement.className += ` bg-gradient-to-br ${item.color}`;
                  e.target.parentElement.innerHTML +=
                    '<div class="absolute inset-0 flex items-center justify-center text-white font-bold text-xl"><svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 9.939 5.16-.2 9-4.389 9-9.939V7l-10-5z"/></svg></div>';
                }}
              />
              <div className="absolute inset-0  bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 "></div>

              {/* Smaller Count Badge */}
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md rounded-xl px-2 py-1 text-xs font-bold text-gray-800 shadow-lg border border-white/20">
                <span className="text-blue-600">{item.count}</span> companies
              </div>

              {/* Smaller Trending Indicator */}
              <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full px-2 py-1 text-xs font-semibold shadow-lg">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                Trending
              </div>
            </div>

            {/* Compact Content Area */}
            <div className="p-4 flex-1 flex flex-col  justify-between min-h-[140px]">
              <div className="flex-1 ">
                <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-blue-600 transition-colors duration-300 leading-tight line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-xs mb-3">Business Category</p>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-medium text-gray-700">Top Rated</span>
                </div>
                <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </motion.div>
        );

      case 'businesses':
        return (
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            whileHover={{ scale: 1.03, y: -8 }}
            onHoverStart={() => setHoveredCard(index)}
            onHoverEnd={() => setHoveredCard(null)}
            className={`${baseCardClasses} ${cardDimensions}`}
          >
            {/* Compact Logo Container */}
            <div className="relative h-[100px] bg-gradient-to-br from-gray-50 to-blue-50 m-4 rounded-xl overflow-hidden flex items-center justify-center p-3 border border-gray-100 flex-shrink-0">
              <img
                src={item.image}
                alt={`${item.name} logo`}
                loading="lazy"
                className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                onError={e => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `<div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">${item.name.charAt(0)}</div>`;
                }}
              />

              {/* Verified Badge */}
              {item.verified && (
                <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1 shadow-lg">
                  <BadgeCheck className="w-3 h-3" />
                </div>
              )}
            </div>

            {/* Compact Content Layout */}
            <div className="px-4 pb-4 flex-1 flex flex-col justify-between min-h-[140px]">
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-blue-600 transition-colors duration-300 leading-tight line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-xs mb-3">{item.sector}</p>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-2 py-1 rounded-full font-semibold shadow-sm">
                  <Shield className="w-3 h-3 inline mr-1" />
                  Verified
                </span>
                <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </motion.div>
        );

      case 'institutions':
        return (
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            whileHover={{ scale: 1.03, y: -8 }}
            onHoverStart={() => setHoveredCard(index)}
            onHoverEnd={() => setHoveredCard(null)}
            className={`${baseCardClasses} ${cardDimensions}`}
          >
            {/* Compact Logo Container */}
            <div className="relative h-[100px] bg-gradient-to-br from-emerald-50 to-green-50 m-4 rounded-xl overflow-hidden flex items-center justify-center p-3 border border-emerald-100 flex-shrink-0">
              <img
                src={item.image}
                alt={`${item.name} logo`}
                loading="lazy"
                className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                onError={e => {
                  e.target.style.display = 'none';
                  // Fallback for missing image - uses initials
                  const initials = item.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')
                    .substring(0, 2);
                  e.target.parentElement.innerHTML = `<div class="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">${initials}</div>`;
                }}
              />

              {/* Ranking Badge */}
              <div className="absolute -top-1 -right-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                {item.ranking}
              </div>
            </div>

            {/* Compact Content Layout */}
            <div className="px-4 pb-4 flex-1 flex flex-col justify-between min-h-[140px]">
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-emerald-600 transition-colors duration-300 leading-tight line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-xs mb-3">{item.type} Institution</p>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs bg-gradient-to-r from-emerald-500 to-green-600 text-white px-2 py-1 rounded-full font-semibold shadow-sm">
                  <Award className="w-3 h-3 inline mr-1" />
                  Top Ranked
                </span>
                <div className="w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </motion.div>
        );

      case 'sponsored':
        return (
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            whileHover={{ scale: 1.03, y: -8 }}
            onHoverStart={() => setHoveredCard(index)}
            onHoverEnd={() => setHoveredCard(null)}
            className={`${baseCardClasses} ${cardDimensions} border-2 border-amber-200 relative overflow-hidden`}
          >
            {/* Premium Indicator */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 flex-shrink-0"></div>

            {/* Compact Image Container */}
            <div className="relative h-[100px] bg-gradient-to-br from-amber-50 to-orange-50 m-4 mt-6 rounded-xl overflow-hidden flex items-center justify-center p-3 border border-amber-100 flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                onError={e => {
                  e.target.style.display = 'none';
                  e.target.parentElement.className +=
                    ' bg-gradient-to-r from-amber-500 to-orange-600';
                  e.target.parentElement.innerHTML +=
                    '<div class="absolute inset-0 flex items-center justify-center text-white"><svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg></div>';
                }}
              />

              {/* Featured Badge */}
              <div className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                {item.badge}
              </div>
            </div>

            {/* Compact Content Layout */}
            <div className="px-4 pb-4 flex-1 flex flex-col justify-between min-h-[140px]">
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-amber-600 transition-colors duration-300 leading-tight line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-xs mb-3">Premium Solution</p>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs bg-gradient-to-r from-amber-500 to-orange-600 text-white px-2 py-1 rounded-full font-semibold shadow-sm">
                  <Sparkles className="w-3 h-3 inline mr-1" />
                  Premium
                </span>
                <div className="w-8 h-0.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      className={`w-full bg-transparent py-16 ${!isFirst ? 'border-t border-gray-200/30' : ''} relative overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-purple-50/30"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)',
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Enhanced Header Design with more spacing */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
        >
          {/* Icon and Badge - Increased spacing */}
          <motion.div
            className="flex items-center justify-center gap-6 mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <motion.div
              className="relative p-3 rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg border border-white/50"
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl"></div>
              <div className="relative">{icon}</div>
            </motion.div>
          </motion.div>

          {/* Enhanced Typography with more spacing */}
          <div className="max-w-3xl mx-auto">
            <motion.h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700 mb-4 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {title}
            </motion.h2>
            {subtitle && (
              <motion.p
                className="text-gray-600 text-base md:text-lg leading-relaxed font-medium max-w-2xl mx-auto mb-6"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>

          {/* Status Indicators with more spacing */}
          <motion.div
            className="flex items-center justify-center gap-4 mt-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xl rounded-xl px-4 py-2 shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold text-gray-800">Live Updates</span>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-white/90 backdrop-blur-xl rounded-xl px-4 py-2 shadow-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-xs font-semibold text-gray-800">{items.length} Items</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Swiper Carousel with increased spacing */}
        <div className="relative">
          {/* Enhanced gradient overlays with more width */}
          <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-gray-50/60 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-gray-50/60 to-transparent z-10 pointer-events-none"></div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={32}
            slidesPerView="auto"
            navigation={{
              nextEl: `.swiper-button-next-${sectionId}`,
              prevEl: `.swiper-button-prev-${sectionId}`,
            }}
            pagination={{
              clickable: true,
              el: `.swiper-pagination-${sectionId}`,
              bulletClass: 'swiper-pagination-bullet modern-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active modern-bullet-active',
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={items.length > 3}
            grabCursor={true}
            className="!overflow-visible premium-carousel"
          >
            {items.map((item, index) => (
              <SwiperSlide key={index} className="!w-auto">
                {renderCard(item, index)}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows with adjusted positioning */}
          <motion.div
            className={`swiper-button-prev-${sectionId} absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/95 backdrop-blur-xl rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-110`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0.7 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </motion.div>

          <motion.div
            className={`swiper-button-next-${sectionId} absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/95 backdrop-blur-xl rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-110`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0.7 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </motion.div>
        </div>

        {/* Pagination for Mobile with more spacing */}
        <div className={`swiper-pagination-${sectionId} flex justify-center mt-8 md:hidden`}></div>
      </div>
    </motion.div>
  );
};

const TopSearchBanner = () => {
  return (
    <div className="bg-transparent">
      {/* Top Search Goods & Services */}
      <ModernCarouselSection
        title="Top Search Goods & Services"
        subtitle="Most searched business categories this month"
        icon={<TrendingUp size={24} className="text-blue-600" />}
        items={topSearchCategories}
        type="categories"
        sectionId="categories"
        isFirst={true}
      />

      {/* Top Search Businesses */}
      <ModernCarouselSection
        title="Top Search Businesses"
        subtitle="Most searched suppliers and service providers"
        icon={<Building2 size={24} className="text-indigo-600" />}
        items={topBusinesses}
        type="businesses"
        sectionId="businesses"
      />

      {/* Top Search Institutions (now showing Indian Banks) */}
      <ModernCarouselSection
        title="Top Search Institutions" // Keeping original title as per request
        subtitle="Top-ranked institutions collaborating with us" // Keeping original subtitle as per request
        icon={<GraduationCap size={24} className="text-emerald-600" />} // Keeping original icon as per request
        items={topInstitutions}
        type="institutions"
        sectionId="institutions"
      />

      {/* Sponsored */}
      <ModernCarouselSection
        title="Sponsored"
        subtitle="Premium business solutions and services"
        icon={<Sparkles size={24} className="text-amber-600" />}
        items={sponsoredItems}
        type="sponsored"
        sectionId="sponsored"
      />

      <style jsx global>{`
        .modern-bullet {
          width: 12px !important;
          height: 12px !important;
          background: rgba(156, 163, 175, 0.4) !important;
          border-radius: 50% !important;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
          border: 2px solid white !important;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
        }

        .modern-bullet-active {
          background: rgb(59, 130, 246) !important;
          width: 32px !important;
          border-radius: 16px !important;
          box-shadow: 0 6px 12px rgba(59, 130, 246, 0.3) !important;
        }

        .swiper-button-disabled {
          opacity: 0.3 !important;
          cursor: not-allowed !important;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Enhanced premium carousel styling with more spacing */
        .premium-carousel {
          padding: 24px 0;
        }

        .premium-carousel .swiper-wrapper {
          align-items: stretch;
          padding: 0 8px;
        }

        .premium-carousel .swiper-slide {
          height: auto;
          display: flex;
          margin: 0 4px;
        }

        .premium-carousel .swiper-slide > div {
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.08),
            0 4px 16px rgba(0, 0, 0, 0.04) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          backdrop-filter: blur(20px) !important;
        }

        .premium-carousel .swiper-slide > div:hover {
          box-shadow:
            0 32px 64px rgba(0, 0, 0, 0.12),
            0 16px 32px rgba(0, 0, 0, 0.08) !important;
          transform: translateY(-8px) !important;
        }

        /* Custom shadow utility */
        .shadow-3xl {
          box-shadow: 0 32px 64px -12px rgba(0, 0, 0, 0.25) !important;
        }
      `}</style>
    </div>
  );
};

export default TopSearchBanner;

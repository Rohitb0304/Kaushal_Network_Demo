/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axiosInstance from '../../utils/axiosConfig';
import { tokenManager } from '../../utils/tokenManager';
import UsersTab from '../../components/admin/UsersTab';
import CompanyUserList from '../../components/admin/CompanyUserList';
import CompanyBuzzList from '../../components/admin/CompanyBuzzList';
import CompanyDetailsTab from '../../components/admin/CompanyDetailsTab';
import TenderListTab from '../../components/admin/TenderListTab';
import CompanyChatTab from '../../components/admin/CompanyChatTab';
import ProductServicesTab from '../../components/admin/ProductServicesTab';
import {
  Building2,
  Users,
  UserPlus,
  MessageSquare,
  FileText,
  MessageCircle,
  Menu,
  X,
  Package,
} from 'lucide-react';
import Ecommerce from '../../components/admin/Ecommerce';

interface CompanyData {
  id: number;
  verified: boolean;
  companyName: string;
  tradeName: string;
  legalName: string;
  companyType: string;
  email: string;
  logoUrl: string;
  bannerUrl: string | null;
  tagline: string | null;
  entityType: string;
  incorporationYear: number;
  registeredOfficeAddress: string;
  websiteUrl: string;
  businessType: string;
  deliverableNames: string;
  sector: string;
  industry: string;
  minEmployeeCount: number;
  maxEmployeeCount: number;
  msmeRegistrationNumber: string;
  msmeRegistrationDocumentUrl: string;
  cin: string;
  cinDocumentUrl: string;
  pan: string;
  panUrl: string;
  gstin: string;
  gstinDocumentUrl: string;
  tradeLicenseNumber: string;
  tradeLicenseDocumentUrl: string | null;
  iecNumber: string;
  iecDocumentUrl: string | null;
  aadharNumber: string;
  aadharDocumentUrl: string;
  aboutCompany: string | null;
  aboutFounderAndTeam: string | null;
  expertise: string | null;
  productAndServices?: Array<{
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    companyId: number;
  }>;
  branches: Array<{ id: number; branchAddress: string }>;
  brands: Array<{ id: number; brandName: string }>;
}

// Premium animation variants for different content types
const pageTransitions = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 1.02,
    filter: 'blur(2px)',
    transition: {
      duration: 0.3,
    },
  },
};

const headerTransitions = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.2 },
  },
};

// Tab button hover and active animations
const tabButtonVariants = {
  idle: { scale: 1, backgroundColor: 'rgba(0,0,0,0)' },
  hover: {
    scale: 1.02,
    backgroundColor: 'rgba(243, 244, 246, 1)',
    transition: { duration: 0.2 },
  },
  active: {
    scale: 1,
    backgroundColor: 'rgba(239, 246, 255, 1)',
    transition: { duration: 0.3 },
  },
};

const iconVariants = {
  idle: { rotate: 0, scale: 1 },
  hover: {
    rotate: 5,
    scale: 1.1,
    transition: { duration: 0.2 },
  },
  active: {
    rotate: 0,
    scale: 1.05,
    transition: { duration: 0.2 },
  },
};

export default function AdminView() {
  const [company, setCompany] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    'company' | 'users' | 'allusers' | 'buzz' | 'tenders' | 'chats' | 'products'
  >('company');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/company/admin-view');
        setCompany(response.data);

        // Store company name in localStorage
        if (response.data && response.data.companyName) {
          localStorage.setItem('companyName', response.data.companyName);
        }

        // Extract email from token
        const token = tokenManager.getToken();
        if (token) {
          try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            decodeURIComponent(
              atob(base64)
                .split('')
                .map(function (c) {
                  return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
            );
          } catch (e) {
            console.error('Error decoding token:', e);
          }
        }
      } catch (error: any) {
        console.error('Error:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  // Toggle sidebar for mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Enhanced tab switching with transition state
  const handleNavItemClick = async (tabKey: typeof activeTab) => {
    if (tabKey === activeTab) return;

    setIsTransitioning(true);

    // Small delay to ensure smooth transition
    setTimeout(() => {
      setActiveTab(tabKey);
      setSidebarOpen(false); // Close sidebar on mobile after clicking
      setIsTransitioning(false);
    }, 150);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md text-center w-full max-w-md">
          <div className="text-red-500 text-lg font-medium mb-2">No company data available</div>
          <p className="text-gray-600">
            Please check your account configuration or contact support.
          </p>
        </div>
      </div>
    );
  }

  const navigationItems = [
    { key: 'company', label: 'Company Details', icon: Building2 },
    { key: 'products', label: 'Products & Services', icon: Package },
    { key: 'users', label: 'Create User', icon: UserPlus },
    { key: 'allusers', label: 'All Users', icon: Users },
    { key: 'buzz', label: 'Buzz Posts', icon: MessageSquare },
    { key: 'tenders', label: 'Tenders', icon: FileText },
    { key: 'chats', label: 'Chat ', icon: MessageCircle },
    { key:'ecommerce', label:'E-Commerce', icon: Package}
  ];

  // Component mapper for cleaner code
  const getTabComponent = (tab: string) => {
    switch (tab) {
      case 'company':
        return <CompanyDetailsTab company={company} />;
      case 'users':
        return <UsersTab />;
      case 'allusers':
        return <CompanyUserList />;
      case 'buzz':
        return <CompanyBuzzList />;
      case 'chats':
        return <CompanyChatTab />;
      case 'tenders':
        return <TenderListTab />;
      case 'products':
        return <ProductServicesTab companyId={company?.id} />;
      case 'ecommerce':
        return <Ecommerce/>
      default:
        return <CompanyDetailsTab company={company} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Mobile Menu Button with subtle animation */}
      <motion.div
        className="md:hidden sticky top-0 left-0 right-0 bg-white z-40 px-4 py-3 flex items-center shadow-sm"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 text-gray-700 flex items-center justify-center"
          aria-label="Toggle menu"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {sidebarOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
        <motion.div
          className="ml-4 font-medium text-gray-800"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {company?.companyName || 'Company Name'}
        </motion.div>
      </motion.div>

      {/* Enhanced overlay with smooth backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Enhanced sidebar with premium animations */}
      <motion.div
        className={`
          ${sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'} 
          md:translate-x-0 
          fixed md:sticky 
          top-0 md:top-0 
          left-0 
          h-screen
          w-64 
          md:flex-shrink-0
          bg-white 
          md:shadow-md
          z-40 
          transition-all
          duration-300 
          ease-in-out
          overflow-y-auto
          md:self-start
          mt-[53px] md:mt-0
          border-r border-gray-200
        `}
        initial={{ x: -256 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Company Info Header with animation */}
        <motion.div
          className="p-6 border-b border-gray-200 bg-white sticky top-0 z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="flex items-center">
            <motion.div
              className="w-10 h-10 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              {company?.logoUrl ? (
                <img src={company.logoUrl} alt="logo" />
              ): (company.companyName.charAt(0))}
            </motion.div>
            <div className="ml-3 overflow-hidden">
              <motion.div
                className="font-medium text-gray-800 truncate"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {company?.companyName || 'Company Name'}
              </motion.div>
              <motion.div
                className="text-xs text-gray-500 truncate"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {company.email || 'email@example.com'}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Navigation Links with premium interactions */}
        <motion.nav
          className="p-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {navigationItems.map((item, index) => (
            <motion.button
              key={item.key}
              onClick={() => handleNavItemClick(item.key as any)}
              className={`w-full flex items-center px-4 py-3 rounded-md mb-2 text-left transition-all relative overflow-hidden
                ${
                  activeTab === item.key
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }
              `}
              variants={tabButtonVariants}
              initial="idle"
              whileHover="hover"
              animate={activeTab === item.key ? 'active' : 'idle'}
              transition={{ duration: 0.2 }}
              style={{
                animationDelay: `${index * 0.1}s`,
                opacity: isTransitioning ? 0.6 : 1,
              }}
            >
              <motion.div
                variants={iconVariants}
                initial="idle"
                whileHover="hover"
                animate={activeTab === item.key ? 'active' : 'idle'}
              >
                <item.icon
                  size={18}
                  className={`mr-3 ${activeTab === item.key ? 'text-blue-600' : 'text-gray-500'}`}
                />
              </motion.div>
              <span className="truncate">{item.label}</span>
              {activeTab === item.key && (
                <motion.div
                  className="ml-auto w-1.5 h-5 bg-blue-600 rounded-full"
                  layoutId="activeTab"
                  transition={{ duration: 0.3 }}
                />
              )}

              {/* Subtle ripple effect on click */}
              {activeTab === item.key && (
                <motion.div
                  className="absolute inset-0 bg-blue-100 opacity-20 rounded-md"
                  initial={{ scale: 0, opacity: 0.3 }}
                  animate={{ scale: 1, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              )}
            </motion.button>
          ))}
        </motion.nav>

        {/* Company Status with animation */}
        <motion.div
          className="p-4 border-t border-gray-100 bg-white sticky bottom-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <div className="flex items-center">
            <div
              className={`w-3 h-3 rounded-full ${
                company?.verified ? 'bg-green-500' : 'bg-yellow-500'
              } mr-2`}
            ></div>
            <span
              className={`text-sm ${
                company?.verified ? 'text-green-600' : 'text-yellow-600'
              } font-medium`}
            >
              {company?.verified ? 'Verified Account' : 'Pending Verification'}
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {company?.companyType} • {company?.sector}
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content with enhanced transitions */}
      <div className="flex-1 w-full md:w-auto pt-[53px] md:pt-0">
        {/* Animated header */}
        <motion.header className="bg-white shadow-sm sticky top-[53px] md:top-0 z-30" layout>
          <div className="px-4 md:px-6 py-4 md:py-4 flex justify-between items-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={activeTab}
                className="text-xl font-semibold text-gray-900"
                variants={headerTransitions}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {navigationItems.find(item => item.key === activeTab)?.label}
              </motion.h1>
            </AnimatePresence>

            {/* Mobile indicator with smooth transition */}
            <motion.div
              className="md:hidden flex items-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="w-2.5 h-2.5 rounded-full bg-blue-600 mr-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-gray-700">
                {company?.verified ? 'Verified' : 'Pending'}
              </span>
            </motion.div>
          </div>
        </motion.header>

        {/* Content area with premium page transitions */}
        <main className="p-4 pt-6 md:p-6 md:pt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="bg-white rounded-lg shadow"
              variants={pageTransitions}
              initial="initial"
              animate="animate"
              exit="exit"
              layout
            >
              {getTabComponent(activeTab)}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

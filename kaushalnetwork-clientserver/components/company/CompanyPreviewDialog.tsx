import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  X,
  Building,
  MapPin,
  Globe,
  Users,
  Briefcase,
  Phone,
  Mail,
  Package,
  Calendar,
  BadgeCheck,
  Building2,
  Award,
  FileText,
  TrendingUp,
  Users2,
  Boxes,
  Clock,
  BookOpen,
  Info,
  ChevronRight,
  ExternalLink,
  Check,
  Shield,
  Star,
  Truck,
  Workflow,
  Zap,
  BarChart4,
  PieChart,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CompanyData } from '../../types/company.types';
import { Button } from '../ui/button';
import { ChatTeardropDots, Envelope } from '@phosphor-icons/react';
import axios from 'axios';
import { TenderCard } from '../company/TenderCard';
import { TenderDetailsModal } from '../company/TenderDetailsModal';
import Cookies from 'js-cookie';

interface CompanyPreviewDialogProps {
  companyId: number | undefined;
  isOpen: boolean;
  onClose: () => void;
}

// Helper for missing fields
const MissingField = ({ text }: { text: string }) => <span className=""> {} </span>;

// Custom tab interface
interface TabProps {
  label: string;
  icon: any;
  children: React.ReactNode;
}

interface Tender {
  id: number;
  tenderName: string;
  objective: string;
  description: string;
  productsAndServicesRequired: string;
  aboutProductsAndServices: string;
  nomenclature: string;
  pricingCategory: string;
  totalPrice: string;
  locationOfService: string;
  deliveryTerms: string;
  paymentTerms: string;
  otherConditions: string;
  company: {
    id: number;
    verified: boolean;
    companyName: string;
    companyType: string;
    logoUrl: string;
    entityType: string;
    businessType: string;
    sector: string;
    industry: string;
  };
}

export default function CompanyPreviewDialog({
  companyId,
  isOpen,
  onClose,
}: CompanyPreviewDialogProps) {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);
  const [loadingTenders, setLoadingTenders] = useState(false);
  const [company, setCompany] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(company?.productAndServices);
  }, [company]);
  // Fetch company details when dialog opens and companyId changes
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      if (!companyId || !isOpen) return;

      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v0/company/user-view?id=${companyId}`
        );
        setCompany(response.data);
      } catch (error) {
        console.error('Error fetching company details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [companyId, isOpen]);

  // Fetch tenders when company changes
  useEffect(() => {
    const fetchTenders = async () => {
      if (!company || !isOpen) return;

      try {
        setLoadingTenders(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v0/tender/user-view/all?companyName=${encodeURIComponent(company?.companyName || '')}`
        );
        setTenders(response.data);
        console.log('====================================');
        console.log('Fetched tenders:', response.data);
        console.log('====================================');
      } catch (error) {
        console.error('Error fetching tenders:', error);
      } finally {
        setLoadingTenders(false);
      }
    };

    fetchTenders();
  }, [company, isOpen]);

  if (!isOpen) return null;

  const handleViewProfile = () => {
    if (company) {
      navigate(`/company/${company.id}`);
      onClose();
    }
  };

  // Define tabs for better organization with enhanced icons
  const tabs = [
    { name: 'Overview', icon: Info },
    { name: 'Products', icon: Package },
    { name: 'Business', icon: Briefcase },
    { name: 'Locations', icon: MapPin },
    { name: 'Contact', icon: Phone },
    { name: 'Tenders', icon: Calendar },
  ];

  if (loading) {
    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 "
              onClick={onClose}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 400 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden relative z-10 flex items-center justify-center p-12"
            >
              <div className="text-center">
                <div className="inline-block mx-auto mb-6 w-12 h-12 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin"></div>
                <p className="text-gray-600 font-medium text-lg">Loading company details...</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && company && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden relative z-10"
          >
            {/* Enhanced Banner Section with Dynamic Overlay */}
            <div className="relative h-64 bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-800 flex items-end overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                  <div className="absolute top-10 left-10 w-60 h-60 rounded-full bg-white/10 blur-3xl"></div>
                  <div className="absolute top-40 right-20 w-80 h-80 rounded-full bg-indigo-300/10 blur-3xl"></div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="absolute right-4 top-4 bg-white/10 backdrop-blur-md rounded-full p-2 text-white hover:bg-white/20 transition-colors z-20 cursor-pointer" //cursor pointer added on close
              >
                <X className="w-5 h-5" />
              </button>

              {/* Banner Content with Enhanced Visual Hierarchy - Mobile Responsive */}
              <div className="w-full flex flex-col sm:flex-row items-start sm:items-end justify-start px-4 sm:px-8 pb-4 sm:pb-8 relative z-10">
                <div className="flex items-center gap-3 sm:gap-6 w-full sm:w-auto">
                  <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-white shadow-xl overflow-hidden bg-white">
                      <img
                        src={
                          company?.logoUrl &&
                          (company.logoUrl.startsWith('http://') ||
                            company.logoUrl.startsWith('https://'))
                            ? company.logoUrl
                            : `${import.meta.env.VITE_API_BASE_URL}/${company?.logoUrl}`
                        }
                        alt={company?.companyName}
                        className="w-full h-full object-cover"
                        onError={e => {
                          (e.target as HTMLImageElement).src =
                            'https://ui-avatars.com/api/?name=' +
                            encodeURIComponent(company.companyName) +
                            '&background=0D8ABC&color=fff';
                        }}
                      />
                      {/* Glossy overlay effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
                    </div>
                    {company?.verified && (
                      <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-green-500 rounded-full p-1 sm:p-1.5 border-2 border-white shadow-lg">
                        <Shield className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
                      </div>
                    )}
                    {/* Shadow effect */}
                    <div className="absolute -bottom-2 sm:-bottom-4 left-1/2 -translate-x-1/2 w-16 sm:w-20 md:w-24 h-2 sm:h-3 md:h-4 bg-black/20 rounded-full blur-lg"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white drop-shadow-md tracking-tight line-clamp-2">
                        {company?.companyName}
                      </h1>
                      {company?.verified && (
                        <div className="flex items-center bg-green-500/20 backdrop-blur-sm px-2 py-0.5 sm:px-3 sm:py-1 rounded-full w-fit">
                          <BadgeCheck className="text-green-300 w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          <span className="text-xs font-medium text-green-100">Verified</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1 sm:mt-2">
                      <p className="text-sm sm:text-lg md:text-xl text-blue-100 font-medium line-clamp-1">
                        {company?.tradeName || company?.legalName}
                      </p>
                      <div className="hidden sm:block h-4 w-px bg-blue-300/30"></div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-300 mr-1" />
                        <span className="text-xs sm:text-sm text-blue-100">Premium Member</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-4">
                      <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-blue-800/40 backdrop-blur-sm text-blue-100 rounded-full text-xs font-medium border border-blue-700/50">
                        {company.companyType}
                      </span>
                      <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-indigo-800/40 backdrop-blur-sm text-blue-100 rounded-full text-xs font-medium border border-indigo-700/50">
                        {company.sector}
                      </span>
                      <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-violet-800/40 backdrop-blur-sm text-blue-100 rounded-full text-xs font-medium border border-violet-700/50 whitespace-nowrap">
                        Est. {company.incorporationYear}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats Panel - Mobile Responsive */}
                <div className="mt-4 sm:mt-0 sm:ml-auto w-full sm:w-auto bg-white/10 backdrop-blur-md rounded-lg p-2.5 sm:p-3 flex items-center justify-around sm:justify-start sm:gap-4 md:gap-6 border border-white/20">
                  <div className="text-center px-2 sm:px-3 md:px-4">
                    <p className="text-xs text-blue-200 font-medium">Experience</p>
                    <p className="text-sm sm:text-lg md:text-xl font-bold text-white">
                      {new Date().getFullYear() -
                        (company.incorporationYear || new Date().getFullYear())}
                      + yrs
                    </p>
                  </div>
                  <div className="h-8 sm:h-10 w-px bg-blue-300/20"></div>
                  <div className="text-center px-2 sm:px-3 md:px-4">
                    <p className="text-xs text-blue-200 font-medium">Team</p>
                    <p className="text-sm sm:text-lg md:text-xl font-bold text-white">
                      {company.minEmployeeCount}+
                    </p>
                  </div>
                  <div className="h-8 sm:h-10 w-px bg-blue-300/20"></div>
                  <div className="text-center px-2 sm:px-3 md:px-4">
                    <p className="text-xs text-blue-200 font-medium">Response</p>
                    <p className="text-sm sm:text-lg md:text-xl font-bold text-white">96%</p>
                  </div>
                </div>
              </div>

              {/* Enhanced background overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            </div>

            {/* Main content with tabs */}
            <div className="flex flex-col h-[calc(90vh-256px)]">
              {/* Enhanced Tab Navigation */}
              <div className="flex px-1 pt-1 border-b sticky top-0 bg-white z-10 overflow-x-auto shadow-sm scrollbar-hide">
                {' '}
                {/* Removed the x- direction scrollbar */}
                {tabs.map((tab, index) => {
                  const isActive = selectedTab === index;
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedTab(index)}
                      className={`
                        flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all
                        ${
                          isActive
                            ? 'text-blue-700 border-b-2 border-blue-600 bg-blue-50/50'
                            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                        }
                      `}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Scrollable content area with enhanced styling  and vertical scrollbar fixed*/}
              <div className="flex-1 overflow-y-auto bg-gray-50/50 scrollbar-hide">
                {/* Overview Tab - Enhanced */}
                {selectedTab === 0 && (
                  <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
                    {/* Enhanced Quick Actions - Responsive Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                      {' '}
                      {/* Chat Box Fixed*/}
                      <ActionButton
                        icon={ChatTeardropDots}
                        label="Chat Now"
                        onClick={async () => {
                          // const url = '${import.meta.env.VITE_CHAT_BASE_URL}/api/chat';
                          const url = `${import.meta.env.VITE_CHAT_BASE_URL}/api/chat`;
                          console.log('====================================');
                          console.log('====================================');
                          axios
                            .post(
                              url,
                              { receiverUserId: company.CompanyUsers[0].id },
                              { headers: { Authorization: `Bearer ${Cookies.get('auth_token')}` } }
                            )
                            .then(data => console.log(data))
                            .catch(err => {
                              console.log(err);
                            });
                          alert(
                            'You can chat with the company now! go admin dashboard to see the chat'
                          );
                        }}
                      />
                      <ActionButton icon={Mail} label="Send Inquiry" />
                      <ActionButton icon={Calendar} label="Schedule Call" />
                      <ActionButton icon={Phone} label="Contact Info" />
                    </div>

                    {/* Main Content - Responsive Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                      {/* Enhanced About Section - Left Column */}
                      <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                        <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center">
                              <Info className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
                              About Company
                            </h2>
                            <div className="flex items-center bg-blue-50 px-2 py-1 rounded-md text-xs text-blue-700 w-fit">
                              <Clock className="w-3 h-3 mr-1" />
                              Updated {Math.floor(Math.random() * 20) + 1} days ago
                            </div>
                          </div>
                          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                            {company?.aboutCompany || <MissingField text="Company Description" />}
                          </p>

                          {/* Key Metrics - Responsive Grid */}
                          <div className="mt-4 sm:mt-6 grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t">
                            <MetricCard
                              icon={Truck}
                              label="Delivery Time"
                              value={`${Math.floor(Math.random() * 10) + 2}-${Math.floor(Math.random() * 10) + 12} days`}
                            />
                            <MetricCard
                              icon={Workflow}
                              label="Production"
                              value={`${Math.floor(Math.random() * 1000) + 100}/mo`}
                            />
                            <MetricCard
                              icon={Zap}
                              label="Response"
                              value={`${Math.floor(Math.random() * 12) + 1} hrs`}
                            />
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <BarChart4 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-indigo-600" />
                            Business Information
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-6 gap-x-4 sm:gap-x-8">
                            <EnhancedInfoItem
                              icon={Building2}
                              label="Legal Name"
                              value={company?.legalName}
                            />
                            <EnhancedInfoItem
                              icon={Briefcase}
                              label="Company Type"
                              value={company?.companyType}
                            />
                            <EnhancedInfoItem
                              icon={Users}
                              label="Employees"
                              value={`${company?.minEmployeeCount || 0} - ${company?.maxEmployeeCount || 0}`}
                            />
                            <EnhancedInfoItem
                              icon={Clock}
                              label="Year Est."
                              value={company?.incorporationYear?.toString()}
                            />
                            <EnhancedInfoItem
                              icon={Boxes}
                              label="Business Type"
                              value={company?.businessType}
                            />
                            <EnhancedInfoItem
                              icon={TrendingUp}
                              label="Sector"
                              value={company?.sector}
                            />

                            {/* Use correct field names from API response */}
                            {company.gstin ? (
                              <EnhancedInfoItem
                                icon={FileText}
                                label="GST Number"
                                value={company.gstin}
                              />
                            ) : (
                              <EnhancedInfoItem icon={FileText} label="GST Number" missing />
                            )}
                            {company.pan ? (
                              <EnhancedInfoItem
                                icon={FileText}
                                label="PAN Number"
                                value={company.pan}
                              />
                            ) : (
                              <EnhancedInfoItem icon={FileText} label="PAN Number" missing />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right Sidebar with Contact and Highlights - Mobile Responsive */}
                      <div className="space-y-4 sm:space-y-6">
                        {/* Contact Card - Enhanced */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 sm:p-4 text-white">
                            <h3 className="text-sm sm:text-base font-medium flex items-center">
                              <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                              Contact Information
                            </h3>
                          </div>
                          <div className="p-3 sm:p-4 space-y-3">
                            <ContactItem icon={Mail} value={company?.email} />
                            <ContactItem
                              icon={Phone}
                              value={`${company?.countryCode || ''} ${company?.contactNumber || ''}`}
                            />
                            <ContactItem icon={Globe} value={company?.websiteUrl} isLink />
                            <ContactItem icon={MapPin} value={company.registeredOfficeAddress} />

                            <Button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2 py-2 text-sm">
                              <Envelope className="w-4 h-4" />
                              Send Inquiry
                            </Button>
                          </div>
                        </div>

                        {/* Business Highlights - Mobile Responsive */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 sm:p-4 text-white">
                            <h3 className="text-sm sm:text-base font-medium flex items-center">
                              <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                              Business Highlights
                            </h3>
                          </div>
                          <div className="p-3 sm:p-4 space-y-2">
                            <HighlightItem text="Verified Supplier" />
                            <HighlightItem text="ISO 9001 Certified" />
                            <HighlightItem text="Export Experience" />
                            <HighlightItem text="Custom Manufacturing" />
                            <HighlightItem text="Bulk Orders Accepted" />
                          </div>
                        </div>

                        {/* Membership Badge - Mobile Responsive */}
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-3 sm:p-4 text-center">
                          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-amber-500 to-orange-400 rounded-full mx-auto mb-3">
                            <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                          </div>
                          <h3 className="text-amber-800 font-bold text-sm sm:text-base">
                            Premium Member
                          </h3>
                          <p className="text-xs sm:text-sm text-amber-700 mt-1">
                            Since {company.incorporationYear || '2020'}
                          </p>
                          <div className="flex justify-center gap-1 mt-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500"
                                fill="#f59e0b"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Data Visualization - Mobile Responsive */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                      <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm lg:col-span-2 overflow-hidden relative">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                          <PieChart className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-600" />
                          Business Performance
                        </h3>

                        {/* Enhanced Beautiful Coming Soon Section */}
                        <div className="h-36 sm:h-52 relative overflow-hidden rounded-lg">
                          {/* Animated background gradients */}
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50"></div>
                          <div className="absolute top-0 left-0 w-full h-full">
                            <div className="absolute top-0 left-1/4 w-24 h-24 bg-purple-200/30 rounded-full animate-pulse"></div>
                            <div
                              className="absolute bottom-8 right-1/4 w-16 h-16 bg-blue-200/40 rounded-full animate-pulse"
                              style={{ animationDelay: '1s' }}
                            ></div>
                            <div
                              className="absolute top-1/2 left-1/3 w-12 h-12 bg-indigo-200/30 rounded-full animate-pulse"
                              style={{ animationDelay: '1.5s' }}
                            ></div>
                          </div>

                          {/* Beautiful content */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mb-3 shadow-lg">
                              <BarChart4 className="w-8 h-8 text-white" />
                            </div>

                            <h4 className="text-xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
                              Coming Soon!
                            </h4>

                            <p className="text-center text-gray-700 font-medium mb-3 max-w-md">
                              Stay tuned for detailed analytics and business performance insights
                            </p>

                            {/* Animated progress indicator */}
                            <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden mt-2">
                              <div
                                className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-full animate-pulse"
                                style={{ width: '60%' }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Under Development</p>
                          </div>

                          {/* Decorative elements */}
                          <div className="absolute bottom-4 left-4 w-48 h-8 bg-white/50 backdrop-blur-sm rounded-full"></div>
                          <div className="absolute top-6 right-6 w-24 h-24 rounded-full border-4 border-indigo-100/60 border-dashed"></div>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm overflow-hidden relative">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                          <Globe className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-emerald-600" />
                          Top Markets
                        </h3>

                        {/* Enhanced Beautiful Top Markets Coming Soon */}
                        <div className="relative h-36 sm:h-52 rounded-lg overflow-hidden">
                          {/* Background with world map pattern */}
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50"></div>
                          <div
                            className="absolute inset-0 opacity-10 bg-repeat"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%2316a34a' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                            }}
                          ></div>

                          {/* Content */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10">
                            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-3 shadow-lg">
                              <Globe className="w-8 h-8 text-white" />
                            </div>

                            <h4 className="text-xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent mb-2">
                              Global Insights
                            </h4>

                            <p className="text-center text-gray-700 font-medium mb-2 max-w-md">
                              Market distribution analytics coming soon
                            </p>

                            {/* Sample charts preview */}
                            <div className="flex gap-1 mt-2 mb-3">
                              {['emerald', 'teal', 'cyan', 'blue'].map((color, i) => (
                                <div
                                  key={i}
                                  className="h-6 w-1.5 rounded-full animate-pulse"
                                  style={{
                                    backgroundColor: `var(--${color}-500, #10b981)`,
                                    animationDelay: `${i * 0.2}s`,
                                  }}
                                ></div>
                              ))}
                            </div>

                            <div className="flex items-center justify-center gap-1 text-xs text-emerald-700">
                              <span className="flex items-center">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-1"></div>
                                Development
                              </span>
                              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                              <span className="flex items-center">
                                <div className="w-2 h-2 bg-teal-500 rounded-full mr-1"></div>
                                In Progress
                              </span>
                            </div>
                          </div>

                          {/* Decorative circles */}
                          <div className="absolute top-4 left-4 w-12 h-12 rounded-full border-2 border-emerald-100/70"></div>
                          <div className="absolute bottom-6 right-6 w-16 h-16 rounded-full border border-teal-100/90 border-dashed"></div>
                        </div>
                      </div>
                    </div>

                    {/* Founder & Team - Mobile Responsive */}
                    {company.aboutFounderAndTeam && (
                      <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                          <Users2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
                          Leadership & Team
                        </h2>
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                          {company.aboutFounderAndTeam}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Products & Services Tab */}
                {selectedTab === 1 && (
                  <div className="p-6 space-y-6">
                    {/* Products and Services */}
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <div className="border-b border-gray-200 bg-gray-50 p-4">
                        <h2 className="text-xl font-bold text-gray-900">Products & Services</h2>
                      </div>
                      <div className="p-6">
                        {company.productAndServices && company.productAndServices.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {company.productAndServices.map((product, index) => (
                              <div
                                key={product.id}
                                className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden flex flex-col"
                              >
                                {/* Image Container */}
                                <div className="relative w-full bg-white">
                                  <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-48 object-contain p-4"
                                    onError={e => {
                                      (e.target as HTMLImageElement).src =
                                        `https://ui-avatars.com/api/?name=${encodeURIComponent(product.name)}&background=3b82f6&color=fff&size=200&format=svg`;
                                    }}
                                  />
                                </div>

                                {/* Product Content */}
                                <div className="p-5 flex-grow flex flex-col gap-3">
                                  <div className="flex justify-between items-center p-">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                      Product #{index + 1}
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
                                  <div className="mb-4 flex flex-col gap-3">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                      {product.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm">{product.description}</p>
                                  </div>
                                  <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                                    INR {product.priceExclusiveGST}
                                    {product.gstApplicable && ' ( *excluding GST )'}
                                  </p>
                                  <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                                    Model Number: {product.modelNumber}
                                  </p>
                                  <button
                                    className="cursor-pointer p-2 bg-blue-500 rounded-lg border-none text-white text-[18px] transition-transform duration-[800ms] hover:scale-105"
                                    onClick={async () => {
                                      // const url = '${import.meta.env.VITE_CHAT_BASE_URL}/api/chat';
                                      const url = `${import.meta.env.VITE_CHAT_BASE_URL}/api/chat`;
                                      console.log('====================================');
                                      console.log('====================================');
                                      axios
                                        .post(
                                          url,
                                          { receiverUserId: company.CompanyUsers[0].id },
                                          {
                                            headers: {
                                              Authorization: `Bearer ${Cookies.get('auth_token')}`,
                                            },
                                          }
                                        )
                                        .then(data => console.log(data))
                                        .catch(err => {
                                          console.log(err);
                                        });
                                      alert(
                                        'You can chat with the company now! go admin dashboard to see the chat'
                                      );
                                    }}
                                  >
                                    Chat Now
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : company.deliverableNames ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {company.deliverableNames.split(',').map((item, index) => (
                              <div
                                key={index}
                                className="group relative bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all duration-300 p-6"
                              >
                                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg mb-4 mx-auto">
                                  <Package className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-center font-medium text-gray-900 mb-2">
                                  {item.trim()}
                                </h3>
                                <p className="text-center text-sm text-gray-500">Service/Product</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            No products or services information available
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Brands Section */}
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <div className="border-b border-gray-200 bg-gray-50 p-4">
                        <h2 className="text-xl font-bold text-gray-900">Featured Brands</h2>
                      </div>
                      <div className="p-6">
                        {company.brands && company.brands.length > 0 ? (
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {company.brands.map(brand => (
                              <div
                                key={brand.id}
                                className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 text-center border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all duration-300"
                              >
                                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3 mx-auto">
                                  <Award className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="font-medium text-gray-900">{brand.brandName}</h3>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6 text-gray-500">No brands available</div>
                        )}
                      </div>
                    </div>

                    {/* Certifications */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-blue-600" />
                        Certifications
                      </h2>
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mb-3 mx-auto">
                          <Clock className="w-6 h-6 text-amber-600" />
                        </div>
                        <p className="text-amber-800 font-medium">
                          Certification information coming soon
                        </p>
                        <p className="text-amber-600 text-sm mt-1">
                          This feature is being enhanced
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Business Tab - Fixed with proper null checks and error handling */}
                {selectedTab === 2 && (
                  <div className="p-8 space-y-6">
                    {/* Business Details */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">Business Information</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ContactItem
                          icon={TrendingUp}
                          label="Sector"
                          value={company.sector || 'Not specified'}
                        />
                        <ContactItem
                          icon={Briefcase}
                          label="Industry"
                          value={company.industry || 'Not specified'}
                        />
                        <ContactItem
                          icon={Building2}
                          label="Entity Type"
                          value={company.entityType || 'Not specified'}
                        />
                        <ContactItem
                          icon={Boxes}
                          label="Business Type"
                          value={company.businessType || 'Not specified'}
                        />
                        <ContactItem
                          icon={Clock}
                          label="Incorporation Year"
                          value={
                            company.incorporationYear
                              ? company.incorporationYear.toString()
                              : 'Not specified'
                          }
                        />
                        <ContactItem
                          icon={Users}
                          label="Employee Count"
                          value={`${company.minEmployeeCount || 0} - ${company.maxEmployeeCount || 0}`}
                        />
                      </div>
                    </div>

                    {/* Financial Details */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        Financial & Registration Details
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Use correct field names from API response */}
                        <ContactItem
                          icon={FileText}
                          label="GST Number"
                          value={company.gstin || 'Not available'}
                        />
                        <ContactItem
                          icon={FileText}
                          label="PAN Number"
                          value={company.pan || 'Not available'}
                        />
                        <ContactItem
                          icon={FileText}
                          label="MSME Registration"
                          value={company.msmeRegistrationNumber || 'Not available'}
                        />
                        <ContactItem
                          icon={FileText}
                          label="CIN Number"
                          value={company.cin || 'Not available'}
                        />
                        {company.tradeLicenseNumber && (
                          <ContactItem
                            icon={FileText}
                            label="Trade License"
                            value={company.tradeLicenseNumber}
                          />
                        )}
                        {company.iecNumber && (
                          <ContactItem
                            icon={FileText}
                            label="IEC Number"
                            value={company.iecNumber}
                          />
                        )}
                        {company.aadharNumber && (
                          <ContactItem
                            icon={FileText}
                            label="Aadhaar"
                            value={company.aadharNumber}
                          />
                        )}
                        <ContactItem
                          icon={Award}
                          label="Annual Turnover"
                          value={company.annualTurnover || 'Not available'}
                        />
                      </div>
                    </div>

                    {/* Markets & Activities */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <div className="grid grid-cols-1 gap-6">
                        <div></div>

                        {/* Specialty/Expertise */}
                        <div>
                          <div className=""></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Locations Tab */}
                {selectedTab === 3 && (
                  <div className="space-y-6">
                    {/* Head Office */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">Head Office</h2>
                      <div className="bg-blue-50/50 p-4 rounded-lg">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-blue-500 mt-1" />
                          <div>
                            <h4 className="font-medium text-gray-900">Registered Office</h4>
                            <p className="text-gray-700 mt-1">{company.registeredOfficeAddress}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Branches */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">Branch Locations</h2>
                      {company.branches && company.branches.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4">
                          {company.branches.map(branch => (
                            <div
                              key={branch.id}
                              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                            >
                              <div className="flex items-start gap-3">
                                <Building2 className="w-5 h-5 text-blue-500 mt-1" />
                                <div>
                                  <h4 className="font-medium text-gray-900">Branch Office</h4>
                                  <p className="text-gray-700 mt-1">{branch.branchAddress}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">No branches available</p>
                      )}
                    </div>

                    {/* Operating Locations */}
                  </div>
                )}

                {/* Contact Tab - Fixed with null checks */}
                {selectedTab === 4 && (
                  <div className="p-8 space-y-6">
                    {/* Primary Contact */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
                      <div className="grid grid-cols-2 gap-4">
                        <ContactItem icon={Mail} value={company?.email || 'Not available'} />
                        <ContactItem
                          icon={Phone}
                          value={
                            company?.contactNumber
                              ? `${company?.countryCode || ''} ${company.contactNumber}`
                              : 'Not available'
                          }
                        />
                        <ContactItem
                          icon={Globe}
                          value={company?.websiteUrl || 'Not available'}
                          isLink={!!company?.websiteUrl}
                        />
                        <ContactItem
                          icon={MapPin}
                          value={company?.registeredOfficeAddress || 'Not available'}
                        />
                      </div>
                    </div>

                    {/* Primary Contact Person - Simplified */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        Primary Contact Person <MissingField text="(missing)" />
                      </h2>

                      <div className="mt-4 text-gray-500 italic">
                        Contact person details are not available for this company.
                      </div>
                    </div>

                    {/* Contact Actions */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Options</h2>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['Send Message', 'Request Callback', 'Schedule Meeting', 'Send RFQ'].map(
                          action => (
                            <Button
                              key={action}
                              variant="outline"
                              className="py-6 hover:bg-blue-50 hover:border-blue-300 transition-all font-medium text-blue-700"
                            >
                              {action}
                            </Button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tenders Tab */}
                {selectedTab === 5 && (
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">Active Tenders</h2>
                          <p className="text-gray-500 mt-1">
                            Browse and respond to available opportunities
                          </p>
                        </div>
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                          {tenders.length} {tenders.length === 1 ? 'tender' : 'tenders'}
                        </span>
                      </div>

                      {loadingTenders ? (
                        <div className="flex justify-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        </div>
                      ) : tenders.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-6">
                          {tenders.map(tender => (
                            <TenderCard
                              key={tender.id}
                              tender={tender}
                              onViewDetails={tender => setSelectedTender(tender)}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900">No active tenders</h3>
                          <p className="text-gray-500 mt-2">
                            This company hasn't posted any tenders yet.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Action footer */}
            <div className="border-t border-gray-200 bg-white p-4 flex items-center justify-between shadow-md">
              <div className="flex items-center">
                <div className="mr-4 flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className="w-4 h-4 text-amber-400" fill="#FBBF24" />
                  ))}
                </div>
                <span className="text-sm text-gray-700 font-medium">
                  Top Rated Supplier in {company.industry}
                </span>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Close
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 flex items-center gap-2"
                  onClick={handleViewProfile}
                >
                  View Full Profile
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {/* Tender Details Modal */}
      {selectedTender && (
        <TenderDetailsModal
          tender={selectedTender}
          isOpen={!!selectedTender}
          onClose={() => setSelectedTender(null)}
        />
      )}
    </AnimatePresence>
  );
}

// Enhanced helper components for better visual presentation
const ActionButton = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <Button
    variant="outline"
    className="py-7 hover:bg-blue-50 hover:border-blue-300 transition-all font-medium bg-white border-gray-200 shadow-sm"
  >
    <div className="flex flex-col items-center">
      <Icon weight="duotone" className="w-6 h-6 text-blue-600 mb-2" />
      <span className="text-gray-800">{label}</span>
    </div>
  </Button>
);

const MetricCard = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="bg-blue-50/50 rounded-lg p-3 text-center">
    <Icon className="w-5 h-5 mb-1 mx-auto text-blue-600" />
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-semibold text-blue-800">{value}</p>
  </div>
);

const EnhancedInfoItem = ({ icon: Icon, label, value, missing = false }) => (
  <div className={`flex items-start gap-3 ${missing ? 'opacity-70' : ''}`}>
    <div className={`mt-0.5 p-2 rounded-full ${missing ? 'bg-red-50' : 'bg-blue-50'}`}>
      <Icon className={`w-4 h-4 ${missing ? 'text-red-400' : 'text-blue-600'}`} />
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      {missing ? (
        <span className="text-red-500 italic text-sm font-medium">Not Available</span>
      ) : (
        <p className="font-medium text-gray-900">{value || 'N/A'}</p>
      )}
    </div>
  </div>
);

const ContactItem = ({ icon: Icon, value, isLink = false }) => (
  <div className="flex items-center gap-3">
    <div className="p-2 bg-blue-50 rounded-full">
      <Icon className="w-4 h-4 text-blue-600" />
    </div>
    <div className="flex-1 truncate">
      {isLink && value && value !== 'Not available' ? (
        <a
          href={value.startsWith('http') ? value : `https://${value}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline truncate block"
        >
          {value}
        </a>
      ) : (
        <p className="text-gray-800 truncate">{value}</p>
      )}
    </div>
  </div>
);

const HighlightItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-2">
    <div className="p-1 bg-green-100 rounded-full">
      <Check className="w-3 h-3 text-green-600" />
    </div>
    <span className="text-sm text-gray-800">{text}</span>
  </div>
);

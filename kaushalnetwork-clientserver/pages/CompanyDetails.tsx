import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import {
  Building2,
  Users,
  MapPin,
  Globe,
  BadgeCheck,
  Mail,
  Phone,
  Award,
  BriefcaseIcon,
  FileText,
  TrendingUp,
  Boxes,
  Clock,
  Package,
  Lock,
  Eye,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import axios from 'axios';
import { TenderCard } from '../components/company/TenderCard';
import { TenderDetailsModal } from '../components/company/TenderDetailsModal';
import { toast } from 'react-hot-toast';

interface CompanyDetails {
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
  branches: Array<{
    id: number;
    branchAddress: string;
  }>;
  brands: Array<{
    id: number;
    brandName: string;
  }>;
}

interface MissingFields {
  // 🔴 Financial Information
  gstNumber?: string;
  panNumber?: string;
  annualTurnover?: string;
  registrationNumber?: string;

  // 🔴 Business Information
  majorMarkets?: string[];
  importExportCode?: string;
  businessActivities?: string[];

  // 🔴 Additional Details
  certifications?: string[];
  qualityStandards?: string[];
  machineryEquipment?: string[];
  infrastructureDetails?: string[];

  // 🔴 Key Statistics
  totalEmployees?: number;
  factorySize?: string;
  monthlyCapacity?: string;
  annualProduction?: string;

  // 🔴 Media & Documents
  productImages?: string[];
  factoryImages?: string[];
  catalogues?: string[];
  brochures?: string[];

  // 🔴 Company History
  milestones?: Array<{
    year: number;
    achievement: string;
  }>;
  awards?: string[];

  // 🔴 Location Details
  registrationState?: string;
  operatingLocations?: string[];

  // 🔴 Contact Person Details
  primaryContact?: {
    name: string;
    designation: string;
    phone: string;
    email: string;
  };
}

interface ExtendedCompanyDetails extends CompanyDetails, MissingFields {
  countryCode: string;
  contactNumber: string;
  msmeRegistrationDocumentUrl: any;
  cinDocumentUrl: any;
  panUrl: any;
  gstinDocumentUrl: any;
  aadharDocumentUrl: any;
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

// Helper for missing fields in red
const MissingField = ({ text }: { text: string }) => (
  <span className="text-red-500 italic text-sm">🔴 {text} (missing)</span>
);

export default function CompanyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [company, setCompany] = useState<ExtendedCompanyDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [comingFromSearch, setComingFromSearch] = useState(false);

  // Check if user is coming from search results
  useEffect(() => {
    if (location.state?.fromSearch) {
      setComingFromSearch(true);
    }

    // Check if user is logged in
    const token = Cookies.get('auth_token');
    setIsUserLoggedIn(!!token);
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = Cookies.get('auth_token');

        // Company details request with error handling
        let companyResponse;
        try {
          companyResponse = await axios.get(
            ` ${import.meta.env.VITE_API_BASE_URL}/api/v0/company/user-view?id=${id}`,
            {
              headers: token ? { Authorization: `Bearer ${token}` } : {},
              timeout: 8000, // Add timeout to prevent hanging
            }
          );

          setCompany(companyResponse.data);

          // After getting company name, fetch related tenders
          if (companyResponse.data?.companyName) {
            try {
              const tendersResponse = await axios.get(
                ` ${import.meta.env.VITE_API_BASE_URL}/api/v0/tender/user-view/all?companyName=${encodeURIComponent(
                  companyResponse.data.companyName
                )}`,
                {
                  headers: token ? { Authorization: `Bearer ${token}` } : {},
                }
              );
              setTenders(tendersResponse.data || []);
            } catch (error) {
              console.error('Error fetching tenders:', error);
              // Don't show toast for tenders error - non-critical
              setTenders([]);
            }
          }
        } catch (error) {
          console.error('Error fetching company details:', error);
          toast.error('Could not load company details. Please try again later.');
          setCompany(null);
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  // Back button handler - if from search, go back or navigate to network
  const handleBackClick = () => {
    if (comingFromSearch && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/network');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Company not found</h1>
        <Button onClick={() => navigate('/network')}>Back to Network</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Back Navigation for search journey */}
      {comingFromSearch && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <button
            onClick={handleBackClick}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span>Back to search results</span>
          </button>
        </div>
      )}

      {/* Banner Section */}
      <div className="relative h-64 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 flex items-end">
        {/* Banner Content */}
        <div className="w-full flex items-end justify-start px-8 pb-6 relative z-10">
          <div className="flex items-end gap-6">
            <div className="relative">
              <img
                src={company?.logoUrl}
                alt={company?.companyName}
                className="w-36 h-36 rounded-2xl border-4 border-white shadow-lg object-cover bg-white"
                onError={e => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Logo';
                }}
              />
              <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-28 h-3 bg-black/10 rounded-full blur-sm"></div>
            </div>
            <div className="mb-2">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
                  {company?.companyName || <MissingField text="Company Name" />}
                </h1>
                {company?.verified && (
                  <BadgeCheck className="text-green-300 w-8 h-8 drop-shadow-lg" />
                )}
              </div>
              <p className="text-lg text-blue-100/90 drop-shadow-md mt-2 font-medium">
                {company?.tradeName || <MissingField text="Trade Name" />}
              </p>
            </div>
          </div>
        </div>
        {/* Decorative background overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions - Only for logged in users */}
            {isUserLoggedIn ? (
              <div className="grid grid-cols-4 gap-4">
                {['Chat', 'Mail', 'Schedule Meet', 'Send Query'].map(action => (
                  <Button
                    key={action}
                    variant="outline"
                    className="py-6 hover:bg-blue-50 hover:border-blue-300 transition-all font-semibold text-blue-700"
                  >
                    {action}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-blue-600" />
                  <p className="text-blue-800">Sign in to contact this company</p>
                </div>
                <Button
                  onClick={() => navigate('/login')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Sign In
                </Button>
              </div>
            )}

            {/* About Section */}
            <motion.div
              className="bg-white rounded-xl p-8 shadow-sm space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2 className="text-2xl font-bold text-gray-900">About Company</h2>
              <p className="text-gray-700">
                {company?.aboutCompany || (
                  <span className="text-gray-500 italic">
                    Information about {company.companyName} is not yet available.
                  </span>
                )}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem icon={Building2} label="Legal Name" value={company?.legalName} />
                <InfoItem icon={BriefcaseIcon} label="Company Type" value={company?.companyType} />
                <InfoItem
                  icon={Users}
                  label="Employee Count"
                  value={`${company?.minEmployeeCount || 0} - ${company?.maxEmployeeCount || 0}`}
                />
                <InfoItem
                  icon={Clock}
                  label="Year of Establishment"
                  value={company?.incorporationYear?.toString()}
                />
                <InfoItem icon={Boxes} label="Business Type" value={company?.businessType} />
                <InfoItem icon={TrendingUp} label="Sector" value={company?.sector} />

                {/* Sensitive information - only for logged in users */}
                {isUserLoggedIn && (
                  <>
                    <InfoItem
                      icon={FileText}
                      label="GST Number"
                      value={company?.gstin || company?.gstNumber}
                    />
                    <InfoItem
                      icon={FileText}
                      label="PAN Number"
                      value={company?.pan || company?.panNumber}
                    />
                    <InfoItem
                      icon={Award}
                      label="Annual Turnover"
                      value={company?.annualTurnover}
                      missing={!company?.annualTurnover}
                    />
                  </>
                )}
              </div>
            </motion.div>

            {/* Products & Services Section */}
            <motion.div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-200 bg-gray-50 p-6">
                <h2 className="text-2xl font-bold text-gray-900">Products & Services</h2>
              </div>
              <div className="p-6">
                {company?.productAndServices && company.productAndServices.length > 0 ? (
                  <div className="rounded-lg border border-gray-200">
                    <div className="max-h-[350px] overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thumb-rounded">
                      {company.productAndServices.map(product => (
                        <div
                          key={product.id}
                          className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-100 hover:border-blue-200 transition-all hover:shadow-sm"
                        >
                          <div className="w-20 h-20 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              onError={e => {
                                (e.target as HTMLImageElement).src =
                                  'https://via.placeholder.com/80?text=Product';
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{product.name}</h3>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {company.productAndServices.length > 3 && (
                      <div className="text-xs text-gray-500 p-2 border-t border-gray-100 bg-gray-50 text-center">
                        Showing all {company.productAndServices.length} products and services
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-6">
                    {(company?.deliverableNames?.split(',') || []).map((item, index) => (
                      <div
                        key={index}
                        className="group relative bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all duration-300"
                      >
                        <div className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Boxes className="w-8 h-8 text-gray-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {item.trim()}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">
                                {company.companyType} • {company.sector}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Brands Section - Updated */}
            {company?.brands && company.brands.length > 0 && (
              <motion.div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 p-6">
                  <h2 className="text-2xl font-bold text-gray-900">Featured Brands</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {company.brands.map(brand => (
                      <div
                        key={brand.id}
                        className="group flex flex-col items-center p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all duration-300"
                      >
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <Building2 className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="font-semibold text-gray-900 text-center group-hover:text-blue-600 transition-colors">
                          {brand.brandName}
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Branches Section - Only show if branches exist */}
            {company?.branches && company.branches.length > 0 && (
              <motion.div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 p-6">
                  <h2 className="text-2xl font-bold text-gray-900">Business Locations</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {company.branches.map(branch => (
                      <div
                        key={branch.id}
                        className="group flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all duration-300"
                      >
                        <MapPin className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-gray-900">Branch Office</h3>
                          <p className="text-gray-600 mt-1">{branch.branchAddress}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tenders - Only for logged in users */}
            {isUserLoggedIn && tenders.length > 0 && (
              <motion.div
                className="bg-white rounded-xl p-8 shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Active Tenders</h2>
                    <p className="text-gray-500 mt-1">
                      Browse and respond to available opportunities
                    </p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {tenders.length} {tenders.length === 1 ? 'tender' : 'tenders'}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {tenders.map(tender => (
                    <TenderCard
                      key={tender.id}
                      tender={tender}
                      onViewDetails={tender => setSelectedTender(tender)}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Add Modal */}
            <TenderDetailsModal
              tender={selectedTender}
              isOpen={!!selectedTender}
              onClose={() => setSelectedTender(null)}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <motion.div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Contact Information</h2>
              <div className="space-y-4">
                <InfoItem icon={MapPin} label="Address" value={company?.registeredOfficeAddress} />

                {isUserLoggedIn ? (
                  <>
                    <InfoItem icon={Mail} label="Email" value={company?.email} />
                    <InfoItem
                      icon={Phone}
                      label="Phone"
                      value={`${company?.countryCode || ''} ${company?.contactNumber || 'Not provided'}`}
                    />
                  </>
                ) : (
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Contact details hidden</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate('/login')}
                      className="text-blue-600 border-blue-200"
                    >
                      Sign in to view
                    </Button>
                  </div>
                )}

                <InfoItem icon={Globe} label="Website" value={company?.websiteUrl} isLink />
              </div>
            </motion.div>

            {/* Documents - Only for logged in users */}
            {isUserLoggedIn ? (
              <motion.div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Documents</h2>
                <div className="space-y-4">
                  {company?.msmeRegistrationDocumentUrl && (
                    <div>
                      <p className="text-sm text-gray-500">MSME Registration:</p>
                      <a
                        href={company.msmeRegistrationDocumentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <FileText className="w-4 h-4" />
                        <span>View Document</span>
                      </a>
                    </div>
                  )}
                  {company?.cinDocumentUrl && (
                    <div>
                      <p className="text-sm text-gray-500">CIN Document:</p>
                      <a
                        href={company.cinDocumentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <FileText className="w-4 h-4" />
                        <span>View Document</span>
                      </a>
                    </div>
                  )}
                  {company?.panUrl && (
                    <div>
                      <p className="text-sm text-gray-500">PAN Document:</p>
                      <a
                        href={company.panUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <FileText className="w-4 h-4" />
                        <span>View Document</span>
                      </a>
                    </div>
                  )}
                  {company?.gstinDocumentUrl && (
                    <div>
                      <p className="text-sm text-gray-500">GSTIN Document:</p>
                      <a
                        href={company.gstinDocumentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <FileText className="w-4 h-4" />
                        <span>View Document</span>
                      </a>
                    </div>
                  )}
                  {company?.aadharDocumentUrl && (
                    <div>
                      <p className="text-sm text-gray-500">Aadhar Document:</p>
                      <a
                        href={company.aadharDocumentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <FileText className="w-4 h-4" />
                        <span>View Document</span>
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Documents</h2>
                  <Lock className="w-4 h-4 text-gray-400" />
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                  <Eye className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-4">Sign in to view company documents</p>
                  <Button
                    onClick={() => navigate('/login')}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Sign In to View
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Branches in Sidebar - Only if they exist */}
            {company?.branches && company.branches.length > 0 && (
              <motion.div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Branches</h2>
                <div className="space-y-2">
                  {company.branches.map(branch => (
                    <div key={branch.id} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-700">{branch.branchAddress}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for consistent info display with missing field support
import { FC, SVGProps } from 'react';

type InfoItemProps = {
  icon: FC<SVGProps<SVGSVGElement>>;
  label: string;
  value?: string;
  isLink?: boolean;
  missing?: boolean;
};

const InfoItem = ({ icon: Icon, label, value, isLink = false, missing = false }: InfoItemProps) => (
  <div className="flex items-start gap-3">
    <Icon className={`w-5 h-5 ${missing ? 'text-red-400' : 'text-gray-400'} mt-0.5`} />
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      {missing ? (
        <span className="text-red-500 italic text-sm">🔴 {label} (missing)</span>
      ) : isLink && value ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {value}
        </a>
      ) : (
        <p className="font-medium text-gray-900">
          {value || <span className="text-red-500">Not Available</span>}
        </p>
      )}
    </div>
  </div>
);

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import {
  Building2,
  Users,
  FileText,
  Globe,
  MapPin,
  Briefcase,
  Building,
  CheckCircle,
  User,
  Mail,
  Phone,
  Shield,
  Clock,
  BadgeCheck,
} from 'lucide-react';

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

interface UserProfile {
  id: number;
  username: string;
  name: string;
  designation: string;
  email: string;
  countryCode: string;
  contactNumber: string;
  admin: boolean;
}

export default function CompanyView() {
  const [company, setCompany] = useState<CompanyData | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('auth_token');
        if (!token) {
          toast.error('Authentication token not found');
          return;
        }

        // Fetch both company and user data in parallel
        const [companyResponse, userResponse] = await Promise.all([
          axios.get(` ${import.meta.env.VITE_API_BASE_URL}/api/v0/company/company-user-view`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(` ${import.meta.env.VITE_API_BASE_URL}/api/v0/company-user/me`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setCompany(companyResponse.data);
        setUserProfile(userResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="w-16 h-16 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 font-medium">Loading your profile...</p>
      </div>
    );
  }

  if (!company || !userProfile) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="text-red-500 text-xl font-medium mb-2">Data not available</div>
          <p className="text-gray-600">
            Unable to load profile information. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header with User and Company Info */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600" />
          <div className="px-4 sm:px-8 py-6 -mt-16">
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              {/* Company Logo */}
              <div className="relative">
                <img
                  src={company.logoUrl}
                  alt={company.companyName}
                  className="h-24 w-24 rounded-xl border-4 border-white shadow-lg bg-white object-cover"
                  onError={e => {
                    (e.target as HTMLImageElement).src =
                      'https://via.placeholder.com/150?text=Logo';
                  }}
                />
                {company.verified && (
                  <div className="absolute -right-2 -bottom-2">
                    <CheckCircle className="w-6 h-6 text-green-500 bg-white rounded-full" />
                  </div>
                )}
              </div>

              {/* Company Information */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
                      {company.companyName}
                    </h2>
                    <div className="flex items-center gap-2 text-gray-500 mt-1">
                      <Building2 className="h-4 w-4" />
                      <span>{company.tradeName}</span>
                    </div>
                  </div>

                  {/* User Profile Summary */}
                  <div className="bg-blue-50 rounded-lg p-3 flex items-center gap-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{userProfile.name}</p>
                      <p className="text-xs text-gray-600">{userProfile.designation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - User Profile and Company Info */}
          <div className="space-y-6">
            {/* User Profile Card */}
            <motion.div
              className="bg-white rounded-xl shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-white">
                <h3 className="font-semibold flex items-center gap-2">
                  <User className="h-5 w-5" /> Your Profile
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
                    {userProfile.name.charAt(0).toUpperCase()}
                  </div>
                </div>

                <div className="text-center">
                  <h4 className="font-bold text-lg text-gray-900">{userProfile.name}</h4>
                  <p className="text-gray-600">{userProfile.designation}</p>
                  <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {userProfile.admin ? 'Admin' : 'Team Member'}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{userProfile.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">
                        +{userProfile.countryCode} {userProfile.contactNumber}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Username</p>
                      <p className="font-medium text-gray-900">@{userProfile.username}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Company Status & Documents */}
            <motion.div
              className="bg-white rounded-xl shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-blue-600" /> Company Status
                </h3>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`p-2 rounded-full ${company.verified ? 'bg-green-100' : 'bg-yellow-100'}`}
                  >
                    {company.verified ? (
                      <CheckCircle
                        className={`h-5 w-5 ${company.verified ? 'text-green-600' : 'text-yellow-600'}`}
                      />
                    ) : (
                      <Clock
                        className={`h-5 w-5 ${company.verified ? 'text-green-600' : 'text-yellow-600'}`}
                      />
                    )}
                  </div>
                  <div>
                    <p
                      className={`font-medium ${company.verified ? 'text-green-700' : 'text-yellow-700'}`}
                    >
                      {company.verified ? 'Verified Company' : 'Verification Pending'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {company.verified
                        ? 'All documents have been verified'
                        : 'Your company documents are under review'}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Key Documents</h4>
                  <DocumentLink
                    label="MSME Registration"
                    url={company.msmeRegistrationDocumentUrl}
                  />
                  <DocumentLink label="CIN Document" url={company.cinDocumentUrl} />
                  <DocumentLink label="PAN Document" url={company.panUrl} />
                  <DocumentLink label="GSTIN Document" url={company.gstinDocumentUrl} />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Company Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Information */}
            <motion.div
              className="bg-white rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Building className="h-5 w-5 text-blue-600" /> Company Information
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoItem icon={Building} label="Legal Name" value={company.legalName} />
                  <InfoItem icon={Briefcase} label="Company Type" value={company.companyType} />
                  <InfoItem icon={Shield} label="Entity Type" value={company.entityType} />
                  <InfoItem icon={Globe} label="Website" value={company.websiteUrl} isLink />
                  <InfoItem icon={Briefcase} label="Business Type" value={company.businessType} />
                  <InfoItem
                    icon={Users}
                    label="Team Size"
                    value={`${company.minEmployeeCount} - ${company.maxEmployeeCount} employees`}
                  />
                  <InfoItem
                    icon={Building2}
                    label="Industry"
                    value={`${company.sector} - ${company.industry}`}
                  />
                  <InfoItem
                    icon={Clock}
                    label="Founded"
                    value={company.incorporationYear.toString()}
                  />
                  <InfoItem
                    icon={MapPin}
                    label="Registered Office"
                    value={company.registeredOfficeAddress}
                    className="md:col-span-2"
                  />
                </div>

                {/* Products & Services - Enhanced Section */}
                {(company.productAndServices && company.productAndServices.length > 0) ||
                company.deliverableNames ? (
                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md">
                        <Briefcase className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">Products & Services</h4>
                        <p className="text-sm text-gray-600">Our core offerings and expertise</p>
                      </div>
                    </div>

                    {/* Enhanced Products Display */}
                    {company.productAndServices && company.productAndServices.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {company.productAndServices.map((product, index) => (
                          <motion.div
                            key={product.id}
                            className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-2"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                          >
                            {/* Product Image Container - Fixed Height with Proper Object Fit */}
                            <div className="relative w-full h-48 bg-white border-b border-gray-100 overflow-hidden">
                              <div className="flex items-center justify-center p-4">
                                <img
                                  src={product.imageUrl}
                                  alt={product.name}
                                  className="max-w-full max-h-full object-contain rounded-md group-hover:scale-105 transition-transform duration-500"
                                  onError={e => {
                                    (e.target as HTMLImageElement).src =
                                      `https://ui-avatars.com/api/?name=${encodeURIComponent(product.name)}&background=3b82f6&color=fff&size=200&format=svg`;
                                  }}
                                />
                              </div>
                              {/* Gradient Overlay on Hover */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                              {/* Product Badge */}
                              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-blue-700 shadow-sm border border-blue-200">
                                  Featured
                                </span>
                              </div>
                            </div>

                            {/* Product Content */}
                            <div className="p-5">
                              <div className="mb-3">
                                <h5 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200 line-clamp-1">
                                  {product.name}
                                </h5>
                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                                  {product.description}
                                </p>
                              </div>

                              {/* Product Footer */}
                              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                  Product
                                </span>
                                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors group/btn">
                                  <span className="flex items-center gap-1">
                                    Learn More
                                    <svg
                                      className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                      />
                                    </svg>
                                  </span>
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      /* Enhanced Service Cards for deliverableNames */
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {company.deliverableNames.split(',').map((item, index) => (
                          <motion.div
                            key={index}
                            className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.4 }}
                          >
                            {/* Service Icon */}
                            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg mb-4 group-hover:from-blue-100 group-hover:to-indigo-200 transition-all duration-300">
                              <Briefcase className="w-6 h-6 text-blue-600" />
                            </div>

                            {/* Service Name */}
                            <h5 className="text-base font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                              {item.trim()}
                            </h5>

                            {/* Service Badge */}
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-700 group-hover:bg-blue-50 group-hover:text-blue-700 transition-all duration-200">
                              Service
                            </span>

                            {/* Hover Effect Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* Call-to-Action Section */}
                    <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-center sm:text-left">
                          <h5 className="text-lg font-semibold text-gray-900 mb-1">
                            Interested in our offerings?
                          </h5>
                          <p className="text-gray-600 text-sm">
                            Get in touch to learn more about how we can help your business grow.
                          </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm hover:shadow-md">
                            Contact Us
                          </button>
                          <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium">
                            View Portfolio
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Fallback when no products/services */
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h4 className="text-base font-medium text-gray-800 mb-3">
                      Products & Services
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {company.deliverableNames &&
                        company.deliverableNames.split(',').map((item, index) => (
                          <span
                            key={index}
                            className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                          >
                            {item.trim()}
                          </span>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Branches & Brands */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Branches */}
              <motion.div
                className="bg-white rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" /> Branches
                  </h3>
                </div>
                <div className="p-6">
                  {company.branches.length > 0 ? (
                    <div className="space-y-3">
                      {company.branches.map(branch => (
                        <div
                          key={branch.id}
                          className="p-3 bg-gray-50 rounded-lg flex items-start gap-3"
                        >
                          <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <p className="text-gray-700">{branch.branchAddress}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No branch offices listed</p>
                  )}
                </div>
              </motion.div>

              {/* Brands */}
              <motion.div
                className="bg-white rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-blue-600" /> Brands
                  </h3>
                </div>
                <div className="p-6">
                  {company.brands.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {company.brands.map(brand => (
                        <div key={brand.id} className="p-4 bg-gray-50 rounded-lg text-center">
                          <Building2 className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                          <p className="font-medium text-gray-800">{brand.brandName}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No brands listed</p>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { ComponentType } from 'react';

interface InfoItemProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  isLink?: boolean;
  className?: string;
}

const InfoItem = ({ icon: Icon, label, value, isLink = false, className = '' }: InfoItemProps) => (
  <div className={`flex items-start gap-3 ${className}`}>
    <Icon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
    <div className="flex-1 min-w-0">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      {isLink && value ? (
        <a
          href={value.startsWith('http') ? value : `https://${value}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline truncate block"
        >
          {value}
        </a>
      ) : (
        <p className="font-medium text-gray-900 truncate">{value || 'N/A'}</p>
      )}
    </div>
  </div>
);

interface DocumentLinkProps {
  label: string;
  url?: string | null;
}

const DocumentLink = ({ label, url }: DocumentLinkProps) => {
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <FileText className="w-5 h-5 text-blue-500" />
      <span className="text-gray-700">{label}</span>
    </a>
  );
};

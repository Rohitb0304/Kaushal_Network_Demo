/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import {
  CheckCircle,
  Search,
  Filter,
  RefreshCw,
  Building,
  Globe,
  Users,
  LogOut,
  Bell,
  Settings,
  ArrowUpRight,
  XCircle,
  ShoppingBag,
} from 'lucide-react';

// Interfaces for data types
interface Company {
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
}

interface EcommerceRegistration {
  id: number;
  ecommerceName: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  isPaid: boolean;
  razorpayPaymentId: string | null;
  createdAt: string;
}

// Dummy components to replace external imports
// NOTE: These are stubs to make the code compile. You should replace them with your actual components.
function SuperadminLogin({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  // Dummy login logic
  useEffect(() => {
    // Simulate a successful login
    setTimeout(() => {
      onLoginSuccess();
    }, 1000);
  }, []);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <p>This is a placeholder for your login component.</p>
      </div>
    </div>
  );
}

function SuperAdminCompanyModal({ companyId, isOpen, onClose }: { companyId: number | null, isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full">
        <h3 className="text-lg font-bold mb-4">Company Details</h3>
        <p>This is a placeholder for the company details modal for company ID: {companyId}</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg">Close</button>
      </div>
    </div>
  );
}

// Define the base URL using the environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api/v0`,
});

// Main Dashboard Component
export default function SuperAdminDashboard() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [ecommerceRegistrations, setEcommerceRegistrations] = useState<EcommerceRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'verified' | 'unverified'>('all');
  const [refreshing, setRefreshing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);
  const [activeView, setActiveView] = useState('grid');
  const [activeDataType, setActiveDataType] = useState<'companies' | 'registrations'>('companies');

  // Stats for Companies
  const totalCompanies = companies.length;
  const verifiedCompanies = companies.filter(c => c.verified).length;
  const pendingCompanies = totalCompanies - verifiedCompanies;

  // Stats for Registrations
  const totalRegistrations = ecommerceRegistrations.length;
  const paidRegistrations = ecommerceRegistrations.filter(r => r.isPaid).length;
  const unpaidRegistrations = totalRegistrations - paidRegistrations;

  useEffect(() => {
    const token = Cookies.get('admin_token');
    if (!token) {
      // NOTE: Temporarily comment out navigation for demonstration
      // navigate('/superadmin/login');
      // return;
      setIsAuthenticated(true); // For demonstration, assume authenticated
    } else {
      setIsAuthenticated(true);
    }
    fetchData();
  }, [navigate]);

  useEffect(() => {
    if (activeDataType === 'companies') {
      filterCompanies();
    }
  }, [searchTerm, filterStatus, companies, activeDataType]);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchCompanies(), fetchEcommerceRegistrations()]);
    setLoading(false);
  };

  const fetchCompanies = async () => {
    try {
      const response = await axiosInstance.get('/company/all');
      setCompanies(response.data);
    } catch (error) {
      toast.error('Failed to fetch companies');
    }
  };

  const fetchEcommerceRegistrations = async () => {
    try {
      const token = Cookies.get('admin_token');
      if (!token) {
        return;
      }
      const response = await axios.get(`${API_BASE_URL}/api/v0/superadmin/registrations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEcommerceRegistrations(response.data);
    } catch (error) {
      toast.error('Failed to fetch e-commerce registrations');
      console.error('Failed to fetch e-commerce registrations:', error);
    }
  };

  const refreshData = async () => {
    try {
      setRefreshing(true);
      await fetchData();
      toast.success('Data refreshed');
    } catch (error) {
      toast.error('Failed to refresh');
    } finally {
      setRefreshing(false);
    }
  };

  const filterCompanies = () => {
    let filtered = [...companies];
    if (searchTerm) {
      filtered = filtered.filter(
        company =>
          company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.sector.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus === 'verified') {
      filtered = filtered.filter(company => company.verified);
    } else if (filterStatus === 'unverified') {
      filtered = filtered.filter(company => !company.verified);
    }
    setFilteredCompanies(filtered);
  };

  const handleVerify = async (companyId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const adminToken = Cookies.get('admin_token');
      const loadingToastId = toast.loading('Verifying company...');
      await axios.put(
        `${API_BASE_URL}/api/v0/company/verify?companyId=${companyId}`, // Use the environment variable
        {},
        {
          headers: {
            Authorization: adminToken ? `Bearer ${adminToken}` : '',
          },
        }
      );
      toast.dismiss(loadingToastId);
      toast.success('Company verified successfully');
      setCompanies(prev =>
        prev.map(company => (company.id === companyId ? { ...company, verified: true } : company))
      );
    } catch (error) {
      toast.error('Failed to verify company');
      console.error('Verification error:', error);
    }
  };

  const getImageUrl = (path: string) => {
    // This function now returns a dummy URL as we cannot resolve paths
    // in this environment. Replace this with your actual image logic.
    return `https://placehold.co/64x64/E2E8F0/1A202C?text=Logo`;
  };

  const handleLogout = () => {
    Cookies.remove('admin_token');
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  if (!isAuthenticated) {
    return <SuperadminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center bg-white p-8 rounded-xl shadow-lg">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full animate-ping opacity-25"></div>
            <div className="relative flex items-center justify-center w-24 h-24 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <h3 className="mt-6 text-xl font-semibold text-gray-800">Loading Dashboard</h3>
          <p className="mt-2 text-gray-600">Please wait while we fetch data</p>
        </div>
      </div>
    );
  }


  return (
    <>
      <div className="min-h-screen bg-gray-50 font-sans">
        {/* Top navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <img src="https://placehold.co/40x40/E2E8F0/1A202C?text=Logo" alt="Kaushal Network" className="h-10 w-auto mr-3" />
                <h1 className="text-xl font-bold text-indigo-600">SuperAdmin Portal</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button className="p-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                    <Bell size={18} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                </div>
                <div className="relative">
                  <button className="p-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                    <Settings size={18} />
                  </button>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut size={16} className="mr-1.5" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Dashboard Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h1 className="text-2xl font-bold text-gray-900 mb-2 md:mb-0">SuperAdmin Dashboard</h1>
              <div className="flex items-center gap-3">
                <button
                  onClick={refreshData}
                  disabled={refreshing}
                  className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
                <div className="bg-white border border-gray-200 rounded-lg p-1 flex">
                  <button
                    onClick={() => setActiveView('grid')}
                    className={`p-1.5 rounded ${activeView === 'grid' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => setActiveView('list')}
                    className={`p-1.5 rounded ${activeView === 'list' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs to switch between data types */}
          <div className="flex space-x-2 mb-8">
            <button
              onClick={() => setActiveDataType('companies')}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeDataType === 'companies'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-700 bg-white hover:bg-gray-100'
              }`}
            >
              <Building className="w-4 h-4 mr-2" />
              Companies
            </button>
            <button
              onClick={() => setActiveDataType('registrations')}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeDataType === 'registrations'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-700 bg-white hover:bg-gray-100'
              }`}
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              E-commerce Registrations
            </button>
          </div>

          {/* Conditional rendering based on activeDataType */}
          {activeDataType === 'companies' && (
            <>
              {/* Stats Cards for Companies */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                  <div className="px-5 py-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                        <Building className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="ml-5">
                        <p className="text-sm font-medium text-gray-500">Total Companies</p>
                        <h3 className="text-2xl font-bold text-gray-900">{totalCompanies}</h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                  <div className="px-5 py-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-5">
                        <p className="text-sm font-medium text-gray-500">Verified Companies</p>
                        <h3 className="text-2xl font-bold text-gray-900">{verifiedCompanies}</h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                  <div className="px-5 py-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-amber-100 rounded-md p-3">
                        <XCircle className="h-6 w-6 text-amber-600" />
                      </div>
                      <div className="ml-5">
                        <p className="text-sm font-medium text-gray-500">Pending Verification</p>
                        <h3 className="text-2xl font-bold text-gray-900">{pendingCompanies}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search and Filters for Companies */}
              <div className="bg-white p-5 rounded-xl shadow-sm mb-6 border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search by company name, email, industry or sector..."
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative inline-block">
                      <div className="flex items-center">
                        <Filter className="h-5 w-5 text-gray-400 mr-2" />
                        <select
                          className="block pl-3 pr-10 py-2.5 text-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
                          value={filterStatus}
                          onChange={e =>
                            setFilterStatus(e.target.value as 'all' | 'verified' | 'unverified')
                          }
                        >
                          <option value="all">All Companies</option>
                          <option value="verified">Verified Only</option>
                          <option value="unverified">Unverified Only</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {filteredCompanies.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100">
                    <Building className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="mt-3 text-lg font-medium text-gray-900">No companies found</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {searchTerm
                      ? `No companies match "${searchTerm}"`
                      : 'There are no companies to display'}
                  </p>
                </div>
              ) : (
                <>
                  {/* Grid View for Companies */}
                  {activeView === 'grid' && (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {filteredCompanies.map(company => (
                        <div
                          key={company.id}
                          onClick={() => setSelectedCompanyId(company.id)}
                          className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-md cursor-pointer"
                        >
                          {/* Company card header with logo */}
                          <div className="relative h-36 bg-gradient-to-r from-gray-100 to-gray-50 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 to-blue-50/80"></div>
                            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                              <div className="flex items-center space-x-3">
                                <div className="relative h-16 w-16 flex-shrink-0">
                                  <div className="absolute inset-0 bg-white rounded-lg shadow-sm"></div>
                                  <img
                                    src={getImageUrl(company.logoUrl)}
                                    alt={company.companyName}
                                    className="h-16 w-16 rounded-lg object-contain p-1 relative z-10"
                                    onError={e => {
                                      (e.target as HTMLImageElement).onerror = null;
                                      (e.target as HTMLImageElement).src =
                                        'https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?semt=ais_hybrid&w=740';
                                    }}
                                  />
                                </div>
                                <div>
                                  <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                                    {company.companyName}
                                  </h3>
                                  <p className="text-sm text-gray-600">{company.companyType}</p>
                                </div>
                              </div>
                              {company.verified && (
                                <span className="bg-green-100 rounded-full p-1 flex items-center justify-center">
                                  <CheckCircle className="w-5 h-5 text-green-600" />
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Company card content */}
                          <div className="p-5">
                            <div className="flex flex-wrap gap-2 mb-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                {company.industry}
                              </span>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">
                                {company.sector}
                              </span>
                            </div>

                            <div className="space-y-3">
                              <div className="flex items-center text-sm">
                                <Building className="w-4 h-4 text-gray-400 mr-2" />
                                <span className="text-gray-600">
                                  {company.entityType} · Est. {company.incorporationYear}
                                </span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Globe className="w-4 h-4 text-gray-400 mr-2" />
                                <a
                                  href={company.websiteUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-indigo-600 hover:underline truncate"
                                  onClick={e => e.stopPropagation()}
                                >
                                  {company.websiteUrl?.replace(/^https?:\/\/(www\.)?/, '')}
                                </a>
                              </div>
                              <div className="flex items-center text-sm">
                                <Users className="w-4 h-4 text-gray-400 mr-2" />
                                <span className="text-gray-600">
                                  {company.minEmployeeCount === company.maxEmployeeCount
                                    ? `${company.minEmployeeCount} employees`
                                    : `${company.minEmployeeCount}-${company.maxEmployeeCount} employees`}
                                </span>
                              </div>
                            </div>

                            <div className="mt-5 pt-5 border-t border-gray-100">
                              <button
                                onClick={e => handleVerify(company.id, e)}
                                disabled={company.verified}
                                className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center ${
                                  company.verified
                                    ? 'bg-gray-50 text-gray-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 shadow-sm'
                                }`}
                              >
                                {company.verified ? (
                                  <>
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Verified
                                  </>
                                ) : (
                                  'Verify Company'
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* List View for Companies */}
                  {activeView === 'list' && (
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Company
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Industry/Sector
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredCompanies.map(company => (
                            <tr key={company.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10">
                                    <img
                                      className="h-10 w-10 rounded-full object-cover border border-gray-200"
                                      src={getImageUrl(company.logoUrl)}
                                      alt=""
                                      onError={e => {
                                        (e.target as HTMLImageElement).onerror = null;
                                        (e.target as HTMLImageElement).src =
                                          'https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?semt=ais_hybrid&w=740';
                                      }}
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900 line-clamp-1">
                                      {company.companyName}
                                    </div>
                                    <div className="text-sm text-gray-500">{company.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{company.industry}</div>
                                <div className="text-sm text-gray-500">{company.sector}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    company.verified
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-yellow-100 text-yellow-800'
                                  }`}
                                >
                                  {company.verified ? 'Verified' : 'Pending'}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center space-x-3">
                                  <button
                                    onClick={() => setSelectedCompanyId(company.id)}
                                    className="flex items-center text-indigo-600 hover:text-indigo-900"
                                  >
                                    <span>View</span>
                                    <ArrowUpRight size={14} className="ml-1" />
                                  </button>
                                  {!company.verified && (
                                    <button
                                      onClick={e => handleVerify(company.id, e)}
                                      className="text-green-600 hover:text-green-900"
                                    >
                                      Verify
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {/* Conditional rendering for Ecommerce Registrations */}
          {activeDataType === 'registrations' && (
            <>
              {/* Stats Cards for Registrations */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                  <div className="px-5 py-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                        <ShoppingBag className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="ml-5">
                        <p className="text-sm font-medium text-gray-500">Total Registrations</p>
                        <h3 className="text-2xl font-bold text-gray-900">{totalRegistrations}</h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                  <div className="px-5 py-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-5">
                        <p className="text-sm font-medium text-gray-500">Paid Registrations</p>
                        <h3 className="text-2xl font-bold text-gray-900">{paidRegistrations}</h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                  <div className="px-5 py-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-amber-100 rounded-md p-3">
                        <XCircle className="h-6 w-6 text-amber-600" />
                      </div>
                      <div className="ml-5">
                        <p className="text-sm font-medium text-gray-500">Unpaid Registrations</p>
                        <h3 className="text-2xl font-bold text-gray-900">{unpaidRegistrations}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {ecommerceRegistrations.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100">
                    <ShoppingBag className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="mt-3 text-lg font-medium text-gray-900">No e-commerce registrations found</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    There are no e-commerce registrations to display.
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-commerce Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone No</th>
                        {/* New Header for Payment ID */}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered On</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {ecommerceRegistrations.map((reg) => (
                        <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reg.fullName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.ecommerceName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.phoneNumber}</td>
                          {/* New Data Cell for Payment ID */}
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.razorpayPaymentId || 'N/A'}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${reg.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {reg.isPaid ? 'Paid' : 'Unpaid'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(reg.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Company Modal */}
      <SuperAdminCompanyModal
        companyId={selectedCompanyId}
        isOpen={!!selectedCompanyId}
        onClose={() => setSelectedCompanyId(null)}
      />
    </>
  );
}

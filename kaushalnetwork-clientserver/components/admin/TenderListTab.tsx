/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Package, Plus, Search, FileText, AlertCircle } from 'lucide-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';

// Import types
import { TenderWithCompany, DetailedProposal, TenderDetail, ProposalBasic } from './tenders/types';

// Import components
import TenderForm from './tenders/TenderForm';
import TenderCard from './tenders/TenderCard';
import TenderApplicationModal from './tenders/TenderApplicationModal';
import ProposalCard from './tenders/ProposalCard';
import ProposalDetails from './tenders/ProposalDetails';
import EmptyState from './tenders/EmptyState';

export default function TenderListTab() {
  const [tenders, setTenders] = useState<TenderWithCompany[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Update activeSubTab to include 'yourTenders' option
  const [activeSubTab, setActiveSubTab] = useState<'allTenders' | 'yourTenders' | 'proposals'>(
    'allTenders'
  );
  const [proposals, setProposals] = useState<ProposalBasic[]>([]);
  const [selectedTenderId, setSelectedTenderId] = useState<number | null>(null);
  const [proposalDetails, setProposalDetails] = useState<DetailedProposal[]>([]);

  const [tenderApplications, setTenderApplications] = useState<DetailedProposal[]>([]);
  const [showTenderApplications, setShowTenderApplications] = useState(false);
  const [selectedTender, setSelectedTender] = useState<TenderWithCompany | null>(null);
  const [loadingApplications, setLoadingApplications] = useState(false);

  const [tenderDetails, setTenderDetails] = useState<Record<number, TenderDetail>>({});

  // Add state for editing and deleting tenders
  const [editingTender, setEditingTender] = useState<TenderWithCompany | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [deletingTenderId, setDeletingTenderId] = useState<number | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (activeSubTab === 'allTenders') {
      fetchTenders();
    } else if (activeSubTab === 'yourTenders') {
      const companyName = localStorage.getItem('companyName');
      if (companyName) {
        fetchTenders(companyName);
      } else {
        toast.error('Company information not found');
        setTenders([]);
      }
    } else if (activeSubTab === 'proposals') {
      fetchProposals();
    }
  }, [activeSubTab]);

  const fetchTenders = async (companyName?: string) => {
    try {
      const authToken = Cookies.get('auth_token');
      const url = companyName
        ? ` ${import.meta.env.VITE_API_BASE_URL}/api/v0/tender/user-view/all?companyName=${companyName}`
        : ` ${import.meta.env.VITE_API_BASE_URL}/api/v0/tender/user-view/all`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setTenders(response.data as TenderWithCompany[]);
    } catch (error) {
      console.error('Error fetching tenders:', error);
      toast.error('Failed to fetch tenders');
    } finally {
      setLoading(false);
    }
  };

  const fetchTenderDetail = async (tenderId: number) => {
    try {
      const token = Cookies.get('auth_token');
      const response = await axios.get(
        ` ${import.meta.env.VITE_API_BASE_URL}/api/v0/tender?id=${tenderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTenderDetails(prev => ({
        ...prev,
        [tenderId]: response.data,
      }));

      return response.data;
    } catch (error) {
      console.error(`Failed to fetch details for tender ${tenderId}:`, error);
      return null;
    }
  };

  const fetchProposals = async () => {
    try {
      const token = Cookies.get('auth_token');
      const response = await axios.get(
        ` ${import.meta.env.VITE_API_BASE_URL}/api/v0/tender-application/proposed/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProposals(response.data);

      if (response.data && response.data.length > 0) {
        const tenderIds = [...new Set(response.data.map(p => p.tenderId))];

        const detailsMap: Record<number, TenderDetail> = {};

        await Promise.all(
          tenderIds.map(async id => {
            const details = await fetchTenderDetail(id);
            if (details) {
              detailsMap[id] = details;
            }
          })
        );

        setTenderDetails(detailsMap);
      }
    } catch (error) {
      toast.error('Failed to fetch proposals');
      console.error('Error fetching proposals:', error);
    }
  };

  const fetchProposalDetails = async (tenderId: number) => {
    try {
      const token = Cookies.get('auth_token');

      const companyName = localStorage.getItem('companyName');

      const url = companyName
        ? ` ${import.meta.env.VITE_API_BASE_URL}/api/v0/tender-application/all?companyName=${encodeURIComponent(companyName)}&tenderId=${tenderId}`
        : ` ${import.meta.env.VITE_API_BASE_URL}/api/v0/tender-application/all?tenderId=${tenderId}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProposalDetails(response.data);
      setSelectedTenderId(tenderId === selectedTenderId ? null : tenderId); // Toggle behavior
    } catch (error) {
      toast.error('Failed to fetch proposal details');
      console.error('Error fetching proposal details:', error);
    }
  };

  const fetchTenderApplications = async (tender: TenderWithCompany) => {
    setLoadingApplications(true);
    setSelectedTender(tender);
    setShowTenderApplications(true);

    try {
      const token = Cookies.get('auth_token');
      const response = await axios.get(
        ` ${import.meta.env.VITE_API_BASE_URL}/api/v0/tender-application/all?tenderId=${tender.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTenderApplications(response.data);
    } catch (error) {
      toast.error('Failed to fetch tender applications');
      console.error('Error fetching tender applications:', error);
    } finally {
      setLoadingApplications(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      fetchTenders(value);
    } else {
      fetchTenders();
    }
  };

  const handleTenderFormSuccess = () => {
    fetchTenders();
  };

  // Handle editing a tender
  const handleEditTender = (tender: TenderWithCompany) => {
    setEditingTender(tender);
    setShowEditForm(true);
  };

  // Update tender function
  const handleUpdateTender = async (id: number, pricingCategory: string) => {
    setIsProcessing(true);
    try {
      const token = Cookies.get('auth_token');
      await axios.put(
        ` ${import.meta.env.VITE_API_BASE_URL}/api/v0/tender`,
        {
          id,
          pricingCategory,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success('Tender updated successfully');
      setShowEditForm(false);

      // Refresh the tenders list
      if (activeSubTab === 'allTenders') {
        fetchTenders();
      } else if (activeSubTab === 'yourTenders') {
        const companyName = localStorage.getItem('companyName');
        if (companyName) {
          fetchTenders(companyName);
        }
      }
    } catch (error) {
      console.error('Error updating tender:', error);
      toast.error('Failed to update tender');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle deleting a tender
  const handleDeleteClick = (tenderId: number) => {
    setDeletingTenderId(tenderId);
    setShowDeleteConfirm(true);
  };

  // Delete tender function
  const handleDeleteTender = async () => {
    if (!deletingTenderId) return;

    setIsProcessing(true);
    try {
      const token = Cookies.get('auth_token');
      await axios.delete(
        ` ${import.meta.env.VITE_API_BASE_URL}/api/v0/tender?id=${deletingTenderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Tender deleted successfully');
      setShowDeleteConfirm(false);
      setDeletingTenderId(null);

      // Refresh the tenders list
      if (activeSubTab === 'allTenders') {
        fetchTenders();
      } else if (activeSubTab === 'yourTenders') {
        const companyName = localStorage.getItem('companyName');
        if (companyName) {
          fetchTenders(companyName);
        }
      }
    } catch (error) {
      console.error('Error deleting tender:', error);
      toast.error('Failed to delete tender');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with background gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-lg shadow-inner">
              <Package className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Tenders Management</h1>
              <p className="text-blue-100 mt-1">Publish and manage procurement opportunities</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by company..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2.5 w-full rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-blue-100 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition shadow-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Create Tender
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Sub Tab Navigation with three options */}
      <div className="bg-white rounded-xl shadow-sm p-1.5 border border-gray-200">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveSubTab('allTenders')}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-center transition ${
              activeSubTab === 'allTenders'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Package className="w-4 h-4" />
              <span>All Tenders</span>
            </div>
          </button>
          <button
            onClick={() => setActiveSubTab('yourTenders')}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-center transition ${
              activeSubTab === 'yourTenders'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Package className="w-4 h-4" />
              <span>Your Tenders</span>
            </div>
          </button>
          <button
            onClick={() => setActiveSubTab('proposals')}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-center transition ${
              activeSubTab === 'proposals'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Your applied Proposals</span>
            </div>
          </button>
        </div>
      </div>

      {/* Content based on active subtab */}
      {activeSubTab === 'allTenders' || activeSubTab === 'yourTenders' ? (
        <>
          {/* Tender Form Modal */}
          <AnimatePresence>
            {showForm && (
              <TenderForm onClose={() => setShowForm(false)} onSuccess={handleTenderFormSuccess} />
            )}
          </AnimatePresence>

          {/* Tenders List with dynamic title based on active subtab */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Loading tenders...</p>
            </div>
          ) : (
            <>
              {activeSubTab === 'yourTenders' && (
                <div className="bg-indigo-50 rounded-lg p-4 mb-4 border border-indigo-100 flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-full">
                    <Package className="w-5 h-5 text-indigo-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-indigo-700">
                      {localStorage.getItem('companyName') || 'Your'} Tenders
                    </h3>
                    <p className="text-sm text-indigo-600">
                      Showing tenders created by your company
                    </p>
                  </div>
                </div>
              )}

              {tenders.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {tenders.map(tender => (
                    <div key={tender.id} className="relative">
                      {/* Show edit/delete buttons only for "Your Tenders" tab */}
                      {activeSubTab === 'yourTenders' && (
                        <div className="absolute top-3 right-3 z-10 flex gap-2">
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              handleEditTender(tender);
                            }}
                            className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full transition-colors"
                            title="Edit tender"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                          </button>
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              handleDeleteClick(tender.id);
                            }}
                            className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-full transition-colors"
                            title="Delete tender"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                          </button>
                        </div>
                      )}
                      <TenderCard tender={tender} onClick={fetchTenderApplications} />
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={<Package className="h-10 w-10 text-blue-500" />}
                  title={
                    activeSubTab === 'yourTenders'
                      ? 'No tenders found for your company'
                      : 'No tenders found'
                  }
                  description={
                    activeSubTab === 'yourTenders'
                      ? "You haven't created any tenders yet"
                      : searchTerm
                        ? 'Try different search terms'
                        : 'Start by creating a new tender to see it here'
                  }
                  actionButton={
                    <button
                      onClick={() => setShowForm(true)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm font-medium"
                    >
                      <Plus className="w-4 h-4" />
                      Create Tender
                    </button>
                  }
                />
              )}
            </>
          )}

          {/* Tender Applications Modal */}
          <TenderApplicationModal
            tender={selectedTender}
            applications={tenderApplications}
            loading={loadingApplications}
            onClose={() => setShowTenderApplications(false)}
            isOpen={showTenderApplications}
          />

          {/* Edit Tender Modal */}
          <AnimatePresence>
            {showEditForm && editingTender && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
                  <div className="flex justify-between items-center mb-6 pb-4 border-b">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <svg
                          className="w-6 h-6 text-blue-600"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">Edit Tender</h2>
                    </div>
                    <button
                      onClick={() => setShowEditForm(false)}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                    >
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {editingTender.tenderName}
                    </h3>
                    <p className="text-sm text-gray-600">{editingTender.description}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pricing Category
                      </label>
                      <select
                        defaultValue={editingTender.pricingCategory}
                        id="pricingCategory"
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="PERUNIT">Per Unit</option>
                        <option value="MONTHLY">Monthly</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t flex justify-end gap-3">
                    <button
                      onClick={() => setShowEditForm(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      disabled={isProcessing}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        const select = document.getElementById(
                          'pricingCategory'
                        ) as HTMLSelectElement;
                        handleUpdateTender(editingTender.id, select.value);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-2"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Updating...
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-4 h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                            <polyline points="17 21 17 13 7 13 7 21"></polyline>
                            <polyline points="7 3 7 8 15 8"></polyline>
                          </svg>
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>

          {/* Delete Confirmation Modal */}
          <AnimatePresence>
            {showDeleteConfirm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
                  <div className="flex justify-between items-center mb-6 pb-4 border-b">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <svg
                          className="w-6 h-6 text-red-600"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                          <line x1="12" y1="9" x2="12" y2="13"></line>
                          <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">Delete Tender</h2>
                    </div>
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                    >
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Confirm Deletion</h3>
                    <p className="text-sm text-gray-600">
                      Are you sure you want to delete this tender? This action cannot be undone and
                      all associated proposals will also be removed.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t flex justify-end gap-3">
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      disabled={isProcessing}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteTender}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-sm flex items-center gap-2"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Deleting...
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-4 h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                          Delete Tender
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </>
      ) : (
        // Proposals Tab Content
        <div className="bg-white rounded-xl shadow-md">
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Your Applied Proposals</h2>
            </div>
          </div>

          <div className="p-6">
            {proposals.length > 0 ? (
              <div className="space-y-6">
                {proposals.map(proposal => (
                  <div key={proposal.id} className="flex flex-col space-y-4">
                    <ProposalCard
                      proposal={proposal}
                      tenderDetails={tenderDetails[proposal.tenderId]}
                      isSelected={selectedTenderId === proposal.tenderId}
                      onClick={fetchProposalDetails}
                    />

                    <ProposalDetails
                      details={proposalDetails}
                      isVisible={selectedTenderId === proposal.tenderId}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<FileText className="w-8 h-8 text-gray-400" />}
                title="No proposals yet"
                description="You haven't submitted any proposals for tenders yet."
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

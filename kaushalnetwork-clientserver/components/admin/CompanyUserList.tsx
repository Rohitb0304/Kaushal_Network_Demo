/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { User, Search, UserCircle, Briefcase, Mail, Phone, Users, Edit, X } from 'lucide-react';

interface CompanyUser {
  id: number;
  username: string;
  name: string;
  designation: string;
  email: string;
  countryCode: string;
  contactNumber: string;
  imageUrl: string;
}

const CompanyUserList: React.FC = () => {
  const [users, setUsers] = useState<CompanyUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [editUserModal, setEditUserModal] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<CompanyUser | null>(null);
  const [newUsername, setNewUsername] = useState<string>('');
  const [updating, setUpdating] = useState<boolean>(false);
  const [deleteUserModal, setDeleteUserModal] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<CompanyUser | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  // Get company name from localStorage to check against user's name
  const companyName = localStorage.getItem('companyName');

  // Function to check if this user should have edit/delete disabled
  const isCompanyOwner = (user: CompanyUser) => {
    return user.name === companyName;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const token = Cookies.get('auth_token');
      if (!token) {
        toast.error('Auth token not found.');
        return;
      }
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v0/company-user/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data);
      } catch (error: any) {
        console.error('Error fetching users:', error);
        toast.error('Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Function to handle opening the edit modal
  const handleEditUser = (user: CompanyUser) => {
    setCurrentUser(user);
    setNewUsername(user.username);
    setEditUserModal(true);
  };

  // Function to handle opening the delete modal
  const handleDeleteUser = (user: CompanyUser) => {
    setUserToDelete(user);
    setDeleteUserModal(true);
  };

  // Function to update username
  const updateUsername = async () => {
    if (!currentUser) return;

    const token = Cookies.get('auth_token');
    if (!token) {
      toast.error('Auth token not found.');
      return;
    }

    if (!newUsername.trim()) {
      toast.error('Username cannot be empty');
      return;
    }

    setUpdating(true);

    try {
      const response = await axios.put(
        ` ${import.meta.env.VITE_API_BASE_URL}/api/v0/company-user`,
        {
          id: currentUser.id,
          username: newUsername.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the local state
      setUsers(
        users.map(user =>
          user.id === currentUser.id ? { ...user, username: newUsername.trim() } : user
        )
      );

      toast.success('Username updated successfully');
      setEditUserModal(false);
    } catch (error: any) {
      console.error('Error updating username:', error);
      toast.error(error.response?.data?.message || 'Failed to update username');
    } finally {
      setUpdating(false);
    }
  };

  // Function to delete user
  const deleteUser = async () => {
    if (!userToDelete) return;

    const token = Cookies.get('auth_token');
    if (!token) {
      toast.error('Auth token not found.');
      return;
    }

    setDeleting(true);

    try {
      await axios.delete(
        ` ${import.meta.env.VITE_API_BASE_URL}/api/v0/company-user?id=${userToDelete.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the local state to remove the deleted user
      setUsers(users.filter(user => user.id !== userToDelete.id));

      toast.success(`User ${userToDelete.username} deleted successfully`);
      setDeleteUserModal(false);
    } catch (error: any) {
      console.error('Error deleting user:', error);
      toast.error(error.response?.data?.message || 'Failed to delete user');
    } finally {
      setDeleting(false);
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-36">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-6"></div>
        <p className="text-xl font-medium text-gray-700">Loading company users...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-md">
              <Users className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Company Team Members</h1>
          </div>

          <div className="flex gap-3 items-center">
            {/* View Toggle */}
            <div className="flex p-1 bg-gray-100 rounded-lg">
              <button
                className={`px-3 py-1.5 rounded-md flex items-center ${view === 'grid' ? 'bg-white shadow-sm' : ''}`}
                onClick={() => setView('grid')}
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
                  className="mr-1"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                Grid
              </button>
              <button
                className={`px-3 py-1.5 rounded-md flex items-center ${view === 'list' ? 'bg-white shadow-sm' : ''}`}
                onClick={() => setView('list')}
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
                  className="mr-1"
                >
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
                List
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full sm:w-64"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-4 rounded-xl border border-blue-100 mb-6">
          <p className="text-blue-800">
            <span className="font-medium">{filteredUsers.length}</span> team members found
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>
      </div>

      {/* Grid View */}
      {view === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUsers.map(user => (
            <div
              key={user.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200"
            >
              <div className="p-6 flex flex-col items-center text-center border-b border-gray-100">
                <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-full p-1 mb-3">
                  <div className="bg-white rounded-full p-1">
                    {user?.imageUrl ? (
                      <img src={user.imageUrl} alt="Profile" className='rounded-full h-20 w-20 text-blue-500'/>
                    ): (user.name.charAt(0))}
                  </div>
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-1">{user.name}</h3>
                <p className="text-gray-600 font-medium mb-1">{user.designation}</p>
                <p className="text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1 flex items-center gap-1">
                  @{user.username}
                  {!isCompanyOwner(user) && (
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-blue-600 hover:text-blue-800 ml-1"
                    >
                      <Edit className="h-3 w-3" />
                    </button>
                  )}
                </p>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-500 mr-2" />
                  <a
                    href={`mailto:${user.email}`}
                    className="text-sm text-blue-600 hover:underline truncate"
                  >
                    {user.email}
                  </a>
                </div>

                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-500 mr-2" />
                  <p className="text-sm text-gray-800">
                    {user.countryCode} {user.contactNumber}
                  </p>
                </div>

                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 text-gray-500 mr-2" />
                  <p className="text-sm text-gray-800">{user.designation}</p>
                </div>
              </div>

              <div className="bg-gray-50 border-t border-gray-100 px-4 py-3 flex justify-between items-center">
                <span className="text-xs text-gray-500 font-mono">ID: {user.id}</span>
                {!isCompanyOwner(user) && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="text-xs text-red-600 hover:text-red-800 font-medium flex items-center"
                    >
                      <svg
                        className="h-3 w-3 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-blue-50">
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  User
                </th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Role
                </th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Contact
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
                <th className="py-4 px-6 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  ID
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-blue-50/50 transition-colors duration-150">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          @{user.username}
                          {!isCompanyOwner(user) && (
                            <button
                              onClick={() => handleEditUser(user)}
                              className="text-blue-600 hover:text-blue-800 ml-2"
                            >
                              <Edit className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {user.designation}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-900">{user.email}</div>
                    <div className="text-sm text-gray-500">
                      {user.countryCode} {user.contactNumber}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {!isCompanyOwner(user) ? (
                      <>
                        <button
                          onClick={() => handleEditUser(user)}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium inline-flex items-center mr-2"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user)}
                          className="text-xs text-red-600 hover:text-red-800 font-medium inline-flex items-center"
                        >
                          <svg
                            className="h-3 w-3 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-gray-400 italic">Company Owner</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right text-sm font-mono text-gray-500">
                    {user.id}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <UserCircle className="mx-auto h-16 w-16 text-gray-300" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? 'Try adjusting your search term' : 'Start by creating a new user'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Edit Username Modal */}
      {editUserModal && currentUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Edit Username</h3>
              <button
                onClick={() => setEditUserModal(false)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Username
                </label>
                <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
                  @{currentUser.username}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">New Username</label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={e => setNewUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter new username"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setEditUserModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  disabled={updating}
                >
                  Cancel
                </button>
                <button
                  onClick={updateUsername}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                  disabled={updating}
                >
                  {updating ? (
                    <span className="flex items-center">
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
                    </span>
                  ) : (
                    'Update Username'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete User Confirmation Modal */}
      {deleteUserModal && userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
              <button
                onClick={() => setDeleteUserModal(false)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-red-100 p-3 rounded-full">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="text-lg font-medium text-center text-gray-900 mb-2">Delete User</h3>

              <p className="text-center text-gray-600 mb-6">
                Are you sure you want to delete{' '}
                <span className="font-semibold">@{userToDelete.username}</span> ({userToDelete.name}
                )? This action cannot be undone.
              </p>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setDeleteUserModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  onClick={deleteUser}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:bg-red-400 min-w-[100px]"
                  disabled={deleting}
                >
                  {deleting ? (
                    <span className="flex items-center justify-center">
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
                    </span>
                  ) : (
                    'Delete User'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyUserList;

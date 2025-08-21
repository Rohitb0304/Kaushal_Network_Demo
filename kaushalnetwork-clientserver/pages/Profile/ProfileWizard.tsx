import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Shield,
  Edit,
  Save,
  X,
  Check,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';

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

interface ProfileWizardProps {
  onClose?: () => void;
  embedded?: boolean;
}

const ProfileWizard: React.FC<ProfileWizardProps> = ({ onClose, embedded = false }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);
  const [saving, setSaving] = useState(false);

  const totalSteps = 3;

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = Cookies.get('auth_token');
      if (!token) {
        toast.error('Authentication required');
        return;
      }

      const response = await axios.get(
        ` ${import.meta.env.VITE_API_BASE_URL}/api/v0/company-user/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProfile(response.data);
      setEditedProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile information');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile({ ...profile! });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile({ ...profile! });
  };

  const handleSave = async () => {
    if (!editedProfile) return;

    setSaving(true);
    try {
      const token = Cookies.get('auth_token');
      await axios.put(
        ` ${import.meta.env.VITE_API_BASE_URL}/api/v0/company-user/me`,
        editedProfile,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProfile(editedProfile);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: string | boolean) => {
    if (!editedProfile) return;
    setEditedProfile({ ...editedProfile, [field]: value });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (loading) {
    return (
      <div
        className={`${embedded ? 'p-8' : 'min-h-screen'} bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading your profile...</p>
        </motion.div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div
        className={`${embedded ? 'p-8' : 'min-h-screen'} bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center`}
      >
        <div className="text-center">
          <p className="text-gray-600">Failed to load profile information</p>
          <Button onClick={fetchProfile} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const containerClass = embedded
    ? 'bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'
    : 'min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8';

  return (
    <div className={containerClass}>
      {!embedded && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-4">
              Your Profile
            </h1>
            <p className="text-gray-600 text-lg">
              Manage your personal information and account settings
            </p>
          </motion.div>
        </div>
      )}

      <div className={embedded ? 'p-8' : 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'}>
        {/* Wizard Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Progress Steps */}
          <div className="flex items-center space-x-4 mb-8">
            {[1, 2, 3].map(step => (
              <React.Fragment key={step}>
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all duration-300 ${
                    step <= currentStep
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                      step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step Labels */}
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div className={currentStep >= 1 ? 'text-blue-600 font-semibold' : 'text-gray-500'}>
              Personal Info
            </div>
            <div className={currentStep >= 2 ? 'text-blue-600 font-semibold' : 'text-gray-500'}>
              Contact Details
            </div>
            <div className={currentStep >= 3 ? 'text-blue-600 font-semibold' : 'text-gray-500'}>
              Account Status
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
        >
          {/* Avatar Header */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 px-8 py-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative z-10 flex items-center gap-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold border-2 border-white/30 shadow-xl"
              >
                {profile.name.charAt(0).toUpperCase()}
              </motion.div>

              <div>
                <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
                <p className="text-blue-100 font-medium">{profile.designation}</p>
                <div className="flex items-center gap-2 mt-2">
                  {profile.admin && (
                    <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Admin
                    </span>
                  )}
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Wizard Content */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <User className="w-6 h-6 text-blue-600" />
                        Personal Details
                      </h3>
                      {!isEditing ? (
                        <Button onClick={handleEdit} size="sm" className="bg-blue-600 text-white">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Button onClick={handleCancel} variant="outline" size="sm">
                            Cancel
                          </Button>
                          <Button
                            onClick={handleSave}
                            disabled={saving}
                            size="sm"
                            className="bg-green-600 text-white"
                          >
                            {saving ? 'Saving...' : 'Save'}
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Full Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedProfile?.name || ''}
                            onChange={e => handleInputChange('name', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                          />
                        ) : (
                          <p className="px-4 py-3 bg-white rounded-xl font-medium text-gray-800 border border-gray-200">
                            {profile.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Username
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedProfile?.username || ''}
                            onChange={e => handleInputChange('username', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                          />
                        ) : (
                          <p className="px-4 py-3 bg-white rounded-xl font-medium text-gray-800 border border-gray-200">
                            {profile.username}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Designation
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedProfile?.designation || ''}
                            onChange={e => handleInputChange('designation', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                          />
                        ) : (
                          <p className="px-4 py-3 bg-white rounded-xl font-medium text-gray-800 border border-gray-200">
                            {profile.designation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Contact Information */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                      <Mail className="w-6 h-6 text-green-600" />
                      Contact Information
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Email Address
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={editedProfile?.email || ''}
                            onChange={e => handleInputChange('email', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
                          />
                        ) : (
                          <p className="px-4 py-3 bg-white rounded-xl font-medium text-gray-800 border border-gray-200">
                            {profile.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Phone Number
                        </label>
                        {isEditing ? (
                          <div className="flex gap-2">
                            <select
                              value={editedProfile?.countryCode || ''}
                              onChange={e => handleInputChange('countryCode', e.target.value)}
                              className="px-4 py-3 rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
                            >
                              <option value="+91">+91</option>
                              <option value="+1">+1</option>
                              <option value="+44">+44</option>
                            </select>
                            <input
                              type="tel"
                              value={editedProfile?.contactNumber || ''}
                              onChange={e => handleInputChange('contactNumber', e.target.value)}
                              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
                            />
                          </div>
                        ) : (
                          <p className="px-4 py-3 bg-white rounded-xl font-medium text-gray-800 border border-gray-200">
                            {profile.countryCode} {profile.contactNumber}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Account Status */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-2xl border border-purple-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                      <Shield className="w-6 h-6 text-purple-600" />
                      Account Status
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
                        <span className="text-gray-600 font-medium">User ID</span>
                        <span className="font-bold text-gray-800">#{profile.id}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
                        <span className="text-gray-600 font-medium">Account Type</span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-bold ${
                            profile.admin
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {profile.admin ? 'Administrator' : 'Standard User'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
                        <span className="text-gray-600 font-medium">Status</span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                onClick={prevStep}
                disabled={currentStep === 1}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <div className="flex gap-2">
                {currentStep < totalSteps ? (
                  <Button
                    onClick={nextStep}
                    className="bg-blue-600 text-white flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  onClose && (
                    <Button
                      onClick={onClose}
                      className="bg-green-600 text-white flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Complete
                    </Button>
                  )
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileWizard;

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Shield,
  Edit,
  Save,
  X,
  Eye,
  EyeOff,
  Check,
  FileInput,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';
import { createClient } from '@supabase/supabase-js';
import api from '../../services/api';

interface UserProfile {
  id: number;
  username: string;
  name: string;
  designation: string;
  email: string;
  countryCode: string;
  contactNumber: string;
  admin: boolean;
  imageUrl: string;
}

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/company-user/me');
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
      // Note: This endpoint may not exist yet - you'll need to implement it on the backend
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
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (field: keyof UserProfile, value: string | boolean) => {
    if (!editedProfile) return;
    setEditedProfile({ ...editedProfile, [field]: value });
  };
  const uploadImageAndGetURL = async (file: File): Promise<string | null> => {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from('profile').upload(fileName, file);

    if (error) {
      console.error('Upload error:', error);
      return null;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from('profile').getPublicUrl(fileName);

    return publicUrl;
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !profile) return;
    setIsUploading(true);
    const previousImageUrl = profile.imageUrl;
    let previousFileName: string | null = null;
    if (previousImageUrl) {
      const parts = previousImageUrl.split('/');
      previousFileName = parts[parts.length - 1]; // e.g. "1_123456789.png"
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${profile.id}_${Date.now()}.${fileExt}`;
    const filePath = `profile/${fileName}`;

    const { data, error } = await supabase.storage.from('profile').upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

    if (error) {
      console.error('Upload error:', error);
      return;
    }

    const { publicUrl } = supabase.storage.from('profile').getPublicUrl(filePath).data;

    if (previousFileName) {
      const { error: deleteError } = await supabase.storage
        .from('profile')
        .remove([`profile/${previousFileName}`]);

      if (deleteError) {
        console.warn('Failed to delete previous image:', deleteError.message);
      }
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/v0/company-user`,
        { id: profile.id, imageUrl: publicUrl },
        {
          headers: { Authorization: `Bearer ${Cookies.get('auth_token')}` },
        }
      );
      // 7. Update local state
      setProfile(prev => (prev ? { ...prev, imageUrl: publicUrl } : prev));
    } catch (err) {
      console.error('Error updating user:', err);
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Failed to load profile information</p>
          <Button onClick={fetchProfile} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
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

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
        >
          {/* Header with Avatar */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 px-8 py-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <label htmlFor="profileUpload" className="cursor-pointer relative group">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl font-bold border-4 border-white/30 shadow-2xl hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
                >
                  {isUploading ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : profile.imageUrl ? (
                    <img
                      src={profile.imageUrl}
                      alt={profile.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-4xl font-bold text-white">
                      {profile.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-40 transition duration-300 rounded-full flex items-center justify-center">
                    <div className="text-white text-sm px-2 py-1 rounded ">Edit</div>
                  </div>
                </motion.div>
                <input
                  id="profileUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                />
              </label>

              <div className="text-center md:text-left">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-3xl font-bold mb-2"
                >
                  {profile.name}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-blue-100 text-lg font-medium"
                >
                  {profile.designation}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center gap-2 mt-4"
                >
                  {profile.admin && (
                    <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Admin
                    </span>
                  )}
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Verified
                  </span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800">Personal Information</h3>
              {!isEditing ? (
                <Button
                  onClick={handleEdit}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white flex items-center gap-2"
                  >
                    {saving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Details */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Personal Details
                  </h4>

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

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-green-600" />
                    Contact Information
                  </h4>

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

                {/* Account Status */}
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-2xl border border-purple-100">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-purple-600" />
                    Account Status
                  </h4>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">User ID</span>
                      <span className="font-bold text-gray-800">#{profile.id}</span>
                    </div>
                    <div className="flex items-center justify-between">
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
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Status</span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;

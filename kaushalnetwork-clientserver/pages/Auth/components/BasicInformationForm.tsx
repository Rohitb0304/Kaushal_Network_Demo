import React, { useState } from 'react';
import { Building, Mail, Lock, Users, Eye, EyeOff } from 'lucide-react';

interface BasicInformationFormProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  updateValidationState: (fieldName: string, isValid: boolean) => void;
  touchedFields: Record<string, boolean>;
}

const BasicInformationForm: React.FC<BasicInformationFormProps> = ({
  formData,
  handleInputChange,
  updateValidationState,
  touchedFields,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation functions
  const validateBusinessName = (name: string) => {
    return name.trim().length >= 2;
  };

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password: string) => {
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[@$!%*?&]/.test(password);
    return password.length >= 8 && hasLower && hasUpper && hasNumber && hasSpecial;
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    return confirmPassword === formData.password && confirmPassword.length > 0;
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 shadow-lg">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-500 rounded-xl shadow-md">
          <Building className="w-7 h-7 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Basic Information</h3>
          <p className="text-gray-600">Tell us about your business to get started</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Enterprise Type */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Enterprise Type <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              name="enterpriseType"
              value={formData.enterpriseType}
              onChange={e => {
                handleInputChange(e);
                updateValidationState('enterpriseType', e.target.value !== '');
              }}
              className="w-full px-4 py-4 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white font-medium appearance-none cursor-pointer hover:border-gray-400"
              required
              aria-describedby="enterprise-type-description"
            >
              <option value="" disabled className="text-gray-400">
                Select your enterprise type
              </option>
              <option value="MSME">MSME</option>
              <option value="Service Provider">Service Provider</option>
              <option value="Corporate">Corporate</option>
              <option value="Bank">Bank</option>
              <option value="Others">Others</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <Users className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <p id="enterprise-type-description" className="text-sm text-gray-500">
            This helps us understand your business size and requirements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Business Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Business Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <Building
                  className={`w-5 h-5 transition-colors duration-200 ${
                    validateBusinessName(formData.businessName) ? 'text-green-500' : 'text-gray-400'
                  }`}
                />
              </div>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={e => {
                  handleInputChange(e);
                  updateValidationState('businessName', validateBusinessName(e.target.value));
                }}
                className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all duration-300 
                  placeholder:text-gray-400 text-gray-900 bg-white font-medium
                  focus:outline-none focus:ring-4 ${
                    validateBusinessName(formData.businessName)
                      ? 'border-green-400 focus:border-green-500 focus:ring-green-100'
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'
                  }`}
                placeholder="Enter your business name"
                autoComplete="organization"
                required
              />
            </div>
            <p className="text-sm text-gray-500">
              Enter your registered business name as it appears on official documents
            </p>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Business Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <Mail
                  className={`w-5 h-5 transition-colors duration-200 ${
                    validateEmail(formData.email) ? 'text-green-500' : 'text-gray-400'
                  }`}
                />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={e => {
                  handleInputChange(e);
                  updateValidationState('email', validateEmail(e.target.value));
                }}
                className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all duration-300 
                  placeholder:text-gray-400 text-gray-900 bg-white font-medium
                  focus:outline-none focus:ring-4 ${
                    validateEmail(formData.email)
                      ? 'border-green-400 focus:border-green-500 focus:ring-green-100'
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'
                  }`}
                placeholder="business@example.com"
                autoComplete="email"
                required
              />
            </div>
            <p className="text-sm text-gray-500">
              This will be your primary contact email and login username
            </p>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <Lock
                  className={`w-5 h-5 transition-colors duration-200 ${
                    validatePassword(formData.password) ? 'text-green-500' : 'text-gray-400'
                  }`}
                />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={e => {
                  handleInputChange(e);
                  updateValidationState('password', validatePassword(e.target.value));
                }}
                className={`w-full pl-12 pr-12 py-4 rounded-xl border-2 transition-all duration-300 
                  placeholder:text-gray-400 text-gray-900 bg-white font-medium
                  focus:outline-none focus:ring-4 ${
                    validatePassword(formData.password)
                      ? 'border-green-400 focus:border-green-500 focus:ring-green-100'
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'
                  }`}
                placeholder="Create a strong password"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-sm text-gray-500">
              Must include uppercase, lowercase, number, and special character
            </p>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <Lock
                  className={`w-5 h-5 transition-colors duration-200 ${
                    validateConfirmPassword(formData.confirmPassword)
                      ? 'text-green-500'
                      : 'text-gray-400'
                  }`}
                />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={e => {
                  handleInputChange(e);
                  updateValidationState('confirmPassword', validateConfirmPassword(e.target.value));
                }}
                className={`w-full pl-12 pr-12 py-4 rounded-xl border-2 transition-all duration-300 
                  placeholder:text-gray-400 text-gray-900 bg-white font-medium
                  focus:outline-none focus:ring-4 ${
                    validateConfirmPassword(formData.confirmPassword)
                      ? 'border-green-400 focus:border-green-500 focus:ring-green-100'
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'
                  }`}
                placeholder="Confirm your password"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-sm text-gray-500">Re-enter the same password to confirm</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInformationForm;

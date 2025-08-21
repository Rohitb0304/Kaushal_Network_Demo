import React from 'react';
import { Building2, Globe, MapPin, Users, Calendar, Briefcase } from 'lucide-react';

interface EnterpriseDetails {
  tradeName: string;
  legalName: string;
  logo: File | null;
  brandNames: string[];
  entityType: string;
  incorporationYear: string;
  registeredOffice: string;
  branchAddress: string;
  websiteLink: string;
  involveInBusiness: string[];
  nameOfGoods: string;
  nameOfServices: string;
  sector: string;
  industry: string;
  numberOfEmployees: string;
  experience: string;
}

interface EnterpriseDetailsFormProps {
  details: EnterpriseDetails;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    section: string
  ) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, section: string) => void;
  addBrandName: () => void;
  updateValidationState: (fieldName: string, isValid: boolean) => void;
  touchedFields: Record<string, boolean>;
}

const EnterpriseDetailsForm: React.FC<EnterpriseDetailsFormProps> = ({
  details,
  handleInputChange,
  handleFileChange,
  addBrandName,
  updateValidationState,
  touchedFields,
}) => {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100 shadow-lg">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-purple-500 rounded-xl shadow-md">
          <Building2 className="w-7 h-7 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Enterprise Details</h3>
          <p className="text-gray-600">Complete your business profile information</p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Trade Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Trade Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <Building2 className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="tradeName"
                value={details.tradeName}
                onChange={e => handleInputChange(e, 'details')}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 placeholder:text-gray-400 text-gray-900 bg-white font-medium focus:outline-none"
                placeholder="Enter trade name"
                required
              />
            </div>
          </div>

          {/* Legal Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Legal Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <Building2 className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="legalName"
                value={details.legalName}
                onChange={e => handleInputChange(e, 'details')}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 placeholder:text-gray-400 text-gray-900 bg-white font-medium focus:outline-none"
                placeholder="Enter legal name"
                required
              />
            </div>
          </div>

          {/* Entity Type */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Entity Type <span className="text-red-500">*</span>
            </label>
            <select
              name="entityType"
              value={details.entityType}
              onChange={e => handleInputChange(e, 'details')}
              className="w-full px-4 py-4 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 bg-white font-medium appearance-none cursor-pointer hover:border-gray-400"
              required
            >
              <option value="">Select Entity Type</option>
              <option value="Private Limited Company">Private Limited Company</option>
              <option value="Public Limited Company">Public Limited Company</option>
              <option value="Partnership">Partnership</option>
              <option value="LLP">Limited Liability Partnership (LLP)</option>
              <option value="Sole Proprietorship">Sole Proprietorship</option>
              <option value="Trust">Trust</option>
              <option value="Society">Society</option>
            </select>
          </div>

          {/* Incorporation Year */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Incorporation Year <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                name="incorporationYear"
                value={details.incorporationYear}
                onChange={e => handleInputChange(e, 'details')}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 placeholder:text-gray-400 text-gray-900 bg-white font-medium focus:outline-none"
                placeholder="YYYY"
                min="1900"
                max={new Date().getFullYear()}
                required
              />
            </div>
          </div>

          {/* Sector */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Sector <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <Briefcase className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="sector"
                value={details.sector}
                onChange={e => handleInputChange(e, 'details')}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 placeholder:text-gray-400 text-gray-900 bg-white font-medium focus:outline-none"
                placeholder="e.g., Technology, Manufacturing"
                required
              />
            </div>
          </div>

          {/* Industry */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Industry <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <Briefcase className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="industry"
                value={details.industry}
                onChange={e => handleInputChange(e, 'details')}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 placeholder:text-gray-400 text-gray-900 bg-white font-medium focus:outline-none"
                placeholder="e.g., Software Development, Textiles"
                required
              />
            </div>
          </div>
        </div>

        {/* Registered Office */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Registered Office Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-4 top-4 z-10 pointer-events-none">
              <MapPin className="w-5 h-5 text-gray-400" />
            </div>
            <textarea
              name="registeredOffice"
              value={details.registeredOffice}
              onChange={e => handleInputChange(e as any, 'details')}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 placeholder:text-gray-400 text-gray-900 bg-white font-medium focus:outline-none resize-none"
              placeholder="Enter complete registered office address"
              rows={3}
              required
            />
          </div>
        </div>

        {/* Website Link */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Website URL</label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <Globe className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="url"
              name="websiteLink"
              value={details.websiteLink}
              onChange={e => handleInputChange(e, 'details')}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 placeholder:text-gray-400 text-gray-900 bg-white font-medium focus:outline-none"
              placeholder="https://www.yourwebsite.com"
            />
          </div>
        </div>

        {/* Logo Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Company Logo <span className="text-red-500"></span>
          </label>
          <div className="relative">
            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={e => handleFileChange(e, 'details')}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              id="logo-upload"
              required
            />
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="space-y-2">
                <Building2 className="w-12 h-12 text-gray-400 mx-auto" />
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-purple-600 hover:text-purple-500">
                    Click to upload
                  </span>{' '}
                  or drag and drop
                </div>
                <div className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</div>
                {details.logo && (
                  <div className="text-sm text-green-600 font-medium">
                    ✓ File selected: {details.logo.name}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseDetailsForm;

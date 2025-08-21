import React from 'react';
import { FileText, Upload, Shield } from 'lucide-react';

interface StatutoryDetailsFormProps {
  statutory: any;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    section?: string
  ) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, section?: string) => void;
  updateValidationState: (fieldName: string, isValid: boolean) => void;
  touchedFields: Record<string, boolean>;
}

const StatutoryDetailsForm: React.FC<StatutoryDetailsFormProps> = ({
  statutory,
  handleInputChange,
  handleFileChange,
  updateValidationState,
  touchedFields,
}) => {
  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl border border-orange-100 shadow-lg">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-orange-500 rounded-xl shadow-md">
          <Shield className="w-7 h-7 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Statutory Details</h3>
          <p className="text-gray-600">Upload required legal documents and registration numbers</p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* MSME Registration */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                MSME Registration Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                  <FileText className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="msmeRegNo"
                  value={statutory.msmeRegNo}
                  onChange={e => handleInputChange(e, 'statutory')}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 placeholder:text-gray-400 text-gray-900 bg-white font-medium focus:outline-none"
                  placeholder="Enter MSME registration number"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                MSME Document <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  name="msmeDoc"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={e => handleFileChange(e, 'statutory')}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  id="msme-doc-upload"
                  required
                />
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-orange-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-orange-600">Click to upload</span> MSME
                    Document
                  </div>
                  <div className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</div>
                  {statutory.msmeDoc && (
                    <div className="text-sm text-green-600 font-medium mt-2">
                      ✓ File selected: {statutory.msmeDoc.name}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* CIN */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                CIN Number <span className="text-red-500"></span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                  <FileText className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="cinNumber"
                  value={statutory.cinNumber}
                  onChange={e => handleInputChange(e, 'statutory')}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 placeholder:text-gray-400 text-gray-900 bg-white font-medium focus:outline-none"
                  placeholder="Enter CIN number"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                CIN Document <span className="text-red-500"></span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  name="cinDoc"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={e => handleFileChange(e, 'statutory')}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  id="cin-doc-upload"
                  required
                />
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-orange-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-orange-600">Click to upload</span> CIN
                    Document
                  </div>
                  <div className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</div>
                  {statutory.cinDoc && (
                    <div className="text-sm text-green-600 font-medium mt-2">
                      ✓ File selected: {statutory.cinDoc.name}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* PAN */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                PAN Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                  <FileText className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="panNumber"
                  value={statutory.panNumber}
                  onChange={e => handleInputChange(e, 'statutory')}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 placeholder:text-gray-400 text-gray-900 bg-white font-medium focus:outline-none"
                  placeholder="Enter PAN number"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                PAN Document <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  name="panDoc"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={e => handleFileChange(e, 'statutory')}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  id="pan-doc-upload"
                  required
                />
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-orange-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-orange-600">Click to upload</span> PAN
                    Document
                  </div>
                  <div className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</div>
                  {statutory.panDoc && (
                    <div className="text-sm text-green-600 font-medium mt-2">
                      ✓ File selected: {statutory.panDoc.name}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* GSTIN */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                GSTIN Number <span className="text-red-500"></span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                  <FileText className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="gstinNo"
                  value={statutory.gstinNo}
                  onChange={e => handleInputChange(e, 'statutory')}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 placeholder:text-gray-400 text-gray-900 bg-white font-medium focus:outline-none"
                  placeholder="Enter GSTIN number"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                GSTIN Document <span className="text-red-500"></span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  name="gstinDoc"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={e => handleFileChange(e, 'statutory')}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  id="gstin-doc-upload"
                  required
                />
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-orange-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-orange-600">Click to upload</span> GSTIN
                    Document
                  </div>
                  <div className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</div>
                  {statutory.gstinDoc && (
                    <div className="text-sm text-green-600 font-medium mt-2">
                      ✓ File selected: {statutory.gstinDoc.name}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Aadhar */}
          <div className="space-y-4 md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Aadhar Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                    <FileText className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="aadharNo"
                    value={statutory.aadharNo}
                    onChange={e => handleInputChange(e, 'statutory')}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 placeholder:text-gray-400 text-gray-900 bg-white font-medium focus:outline-none"
                    placeholder="Enter 12-digit Aadhar number"
                    maxLength={12}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Aadhar Document <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="aadharDoc"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={e => handleFileChange(e, 'statutory')}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    id="aadhar-doc-upload"
                    required
                  />
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-orange-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">
                      <span className="font-medium text-orange-600">Click to upload</span> Aadhar
                      Document
                    </div>
                    <div className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</div>
                    {statutory.aadharDoc && (
                      <div className="text-sm text-green-600 font-medium mt-2">
                        ✓ File selected: {statutory.aadharDoc.name}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatutoryDetailsForm;

import React, { useState } from 'react';
import logoImage from '../../logo/image.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AlertCircle } from 'lucide-react';

// Import components
import RegistrationHeader from './components/RegistrationHeader';
import ProgressSteps from './components/ProgressSteps';
import BasicInformationForm from './components/BasicInformationForm';
import ContactDetailsForm from './components/ContactDetailsForm';
import EnterpriseDetailsForm from './components/EnterpriseDetailsForm';
import StatutoryDetailsForm from './components/StatutoryDetailsForm';
import NavigationButtons from './components/NavigationButtons';

// Define the types for your state to ensure type safety
interface Contact {
  name: string;
  designation: string;
  email: string;
  contactNo: string;
}

interface FileType {
  logo: File | null;
  msmeDoc: File | null;
  cinDoc: File | null;
  panDoc: File | null;
  gstinDoc: File | null;
  tradeLicenseDoc: File | null;
  iecDoc: File | null;
  aadharDoc: File | null;
}

interface FormDataState {
  enterpriseType: string;
  businessName: string;
  email: string;
  password: string;
  confirmPassword: string;
  details: {
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
  };
  contacts: Contact[];
  statutory: {
    msmeRegNo: string;
    msmeDoc: File | null;
    cinNumber: string;
    cinDoc: File | null;
    panNumber: string;
    panDoc: File | null;
    gstinNo: string;
    gstinDoc: File | null;
    tradeLicenseNo: string;
    tradeLicenseDoc: File | null;
    iecNo: string;
    iecDoc: File | null;
    aadharNo: string;
    aadharDoc: File | null;
  };
}

const Register = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [validationState, setValidationState] = useState<Record<string, boolean>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormDataState>({
    // First page data
    enterpriseType: '',
    businessName: '',
    email: '',
    password: '',
    confirmPassword: '',

    // Second page data
    details: {
      tradeName: '',
      legalName: '',
      logo: null,
      brandNames: [],
      entityType: '',
      incorporationYear: '',
      registeredOffice: '',
      branchAddress: '',
      websiteLink: '',
      involveInBusiness: [],
      nameOfGoods: '',
      nameOfServices: '',
      sector: '',
      industry: '',
      numberOfEmployees: '',
      experience: '',
    },
    contacts: [
      {
        name: '',
        designation: '',
        email: '',
        contactNo: '',
      },
    ],
    statutory: {
      msmeRegNo: '',
      msmeDoc: null,
      cinNumber: '',
      cinDoc: null,
      panNumber: '',
      panDoc: null,
      gstinNo: '',
      gstinDoc: null,
      tradeLicenseNo: '',
      tradeLicenseDoc: null,
      iecNo: '',
      iecDoc: null,
      aadharNo: '',
      aadharDoc: null,
    },
  });

  const updateValidationState = (fieldName: string, isValid: boolean) => {
    setValidationState(prev => ({
      ...prev,
      [fieldName]: isValid,
    }));

    if (isValid && formErrors[fieldName]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const markFieldAsTouched = (fieldName: string) => {
    setTouchedFields(prev => ({
      ...prev,
      [fieldName]: true,
    }));
  };

  const isPageValid = (pageNum: number) => {
    if (pageNum === 1) {
      const requiredFields = [
        'businessName',
        'email',
        'password',
        'confirmPassword',
        'contactName0',
        'contactEmail0',
        'contactNumber0',
        'contactDesignation0',
      ];

      const isValid = requiredFields.every(field => validationState[field] === true);

      const hasEnterpriseType = formData.enterpriseType && formData.enterpriseType.trim() !== '';

      return isValid && hasEnterpriseType;
    }
    return true;
  };

  const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  section?: string,
  index?: number
) => {
  const { name, value } = e.target;

  // Mark field as touched
  markFieldAsTouched(name);

  // Handle enterprise type validation
  if (name === 'enterpriseType') {
    setFormErrors(prev => {
      const newErrors = { ...prev };
      if (value) {
        delete newErrors.enterpriseType;
      }
      return newErrors;
    });
  }

  setFormData(prev => {
    if (section === 'contacts' && typeof index !== 'undefined') {
      const newContacts = [...prev.contacts];
      newContacts[index] = { ...newContacts[index], [name]: value };
      return { ...prev, contacts: newContacts };
    }
    
    // The fix is here
    if (section === 'details' || section === 'statutory') {
      return {
        ...prev,
        [section]: { 
          ...prev[section], 
          [name]: value 
        },
      };
    }

    return { ...prev, [name]: value };
  });
};

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, section?: string) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error(
          `File size must be less than 10MB. Selected file is ${(file.size / 1024 / 1024).toFixed(2)}MB`
        );
        return;
      }

      const validTypes = {
        logo: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
        document: ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'],
      };

      const isLogo = name === 'logo';
      const allowedTypes = isLogo ? validTypes.logo : validTypes.document;

      if (!allowedTypes.includes(file.type)) {
        toast.error(
          `Invalid file type. Please select ${isLogo ? 'an image' : 'a PDF or image'} file.`
        );
        return;
      }

      if (section === 'statutory') {
        setFormData(prev => ({
          ...prev,
          statutory: { ...prev.statutory, [name]: file },
        }));
        toast.success(`${name} uploaded successfully`);
      } else if (section === 'details') {
        setFormData(prev => ({
          ...prev,
          details: { ...prev.details, [name]: file },
        }));
        toast.success(`${name} uploaded successfully`);
      }
    }
  };

  const addPerson = () => {
    setFormData(prev => ({
      ...prev,
      contacts: [...prev.contacts, { name: '', designation: '', email: '', contactNo: '' }],
    }));
  };

  const removePerson = (index: number) => {
    if (formData.contacts.length > 1) {
      setFormData(prev => ({
        ...prev,
        contacts: prev.contacts.filter((_, i) => i !== index),
      }));
    }
  };

  const addBrandName = () => {
    const brandName = prompt('Enter brand name');
    if (brandName) {
      setFormData(prev => ({
        ...prev,
        details: {
          ...prev.details,
          brandNames: [...prev.details.brandNames, brandName],
        },
      }));
    }
  };

  const validateRequiredFiles = () => {
    if (!formData.statutory.msmeDoc) {
      toast.error('MSME registration document is required');
      return false;
    }
    if (!formData.statutory.panDoc) {
      toast.error('PAN document is required');
      return false;
    }
    if (!formData.statutory.aadharDoc) {
      toast.error('Aadhar document is required');
      return false;
    }
    return true;
  };

  const formatWebsiteUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting || hasSubmitted) {
      return;
    }

    if (!validateRequiredFiles()) {
      return;
    }

    setIsSubmitting(true);
    setHasSubmitted(true);

    try {
      const formDataToSend = new FormData();

      formDataToSend.append('companyName', formData.businessName);
      formDataToSend.append('companyType', formData.enterpriseType || 'MSME');
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('countryCode', '+91');
      formDataToSend.append('contactNumber', formData.contacts[0]?.contactNo || '');
      formDataToSend.append('tradeName', formData.details.tradeName);
      formDataToSend.append('legalName', formData.details.legalName);
      formDataToSend.append('entityType', formData.details.entityType || 'Company');
      formDataToSend.append('brandNames', formData.details.brandNames.join(','));
      formDataToSend.append('incorporationYear', formData.details.incorporationYear);
      formDataToSend.append('registeredOfficeAddress', formData.details.registeredOffice);
      formDataToSend.append('businessType', formData.details.involveInBusiness[0] || 'GOODS');
      formDataToSend.append(
        'deliverableNames',
        `${formData.details.nameOfGoods},${formData.details.nameOfServices}`
      );
      formDataToSend.append('sector', formData.details.sector);
      formDataToSend.append('industry', formData.details.industry);
      formDataToSend.append('minEmployeeCount', '1');
      formDataToSend.append('maxEmployeeCount', '10');

      formDataToSend.append('username', formData.contacts[0]?.email || formData.email || '');
      formDataToSend.append('name', formData.contacts[0]?.name || '');
      formDataToSend.append('designation', formData.contacts[0]?.designation || '');

      formDataToSend.append('msmeRegistrationNumber', formData.statutory.msmeRegNo);
      formDataToSend.append('pan', formData.statutory.panNumber);
      formDataToSend.append('aadharNumber', formData.statutory.aadharNo);

      if (formData.statutory.cinNumber) {
        formDataToSend.append('cin', formData.statutory.cinNumber);
      }
      if (formData.statutory.gstinNo) {
        formDataToSend.append('gstin', formData.statutory.gstinNo);
      }

      if (formData.details.branchAddress) {
        formDataToSend.append('branchAddress', formData.details.branchAddress);
      }
      if (formData.details.websiteLink) {
        formDataToSend.append('websiteUrl', formatWebsiteUrl(formData.details.websiteLink));
      }
      if (formData.statutory.tradeLicenseNo) {
        formDataToSend.append('tradeLicenseNumber', formData.statutory.tradeLicenseNo);
      }
      if (formData.statutory.iecNo) {
        formDataToSend.append('iecNumber', formData.statutory.iecNo);
      }

      if (formData.details.logo) formDataToSend.append('logo', formData.details.logo);
      if (formData.statutory.msmeDoc)
        formDataToSend.append('msmeRegistrationDocument', formData.statutory.msmeDoc);
      if (formData.statutory.panDoc)
        formDataToSend.append('panDocument', formData.statutory.panDoc);
      if (formData.statutory.aadharDoc)
        formDataToSend.append('aadhar', formData.statutory.aadharDoc);

      if (formData.statutory.cinDoc)
        formDataToSend.append('cinDocument', formData.statutory.cinDoc);
      if (formData.statutory.gstinDoc)
        formDataToSend.append('gstinDocument', formData.statutory.gstinDoc);
      if (formData.statutory.tradeLicenseDoc) {
        formDataToSend.append('tradeLicenseDocument', formData.statutory.tradeLicenseDoc);
      }
      if (formData.statutory.iecDoc) {
        formDataToSend.append('iecDocument', formData.statutory.iecDoc);
      }

      const response = await axios.post(
        ` ${import.meta.env.VITE_API_BASE_URL}/api/v0/company`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        toast.success('Registration successful! 🎉', {
          duration: 4000,
          icon: '✅',
        });
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    } catch (error) {
      setHasSubmitted(false);
      if (axios.isAxiosError(error)) {
        console.error('Registration error:', error.response?.data);
        const errorMessage =
          error.response?.data?.message || 'Registration failed. Please try again.';
        toast.error(errorMessage, {
          duration: 6000,
          icon: '❌',
        });
      } else {
        toast.error('An unexpected error occurred. Please try again.', {
          duration: 6000,
          icon: '❌',
        });
        console.error('Registration error:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.enterpriseType || formData.enterpriseType.trim() === '') {
      setFormErrors(prev => ({
        ...prev,
        enterpriseType: 'Please select an enterprise type',
      }));
      toast.error('Please select an enterprise type');
      return;
    }
    if (!isPageValid(1)) {
      toast.error('Please fill in all required fields correctly', {
        duration: 4000,
        icon: '⚠️',
      });
      return;
    }
    setPage(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (page === 1) {
        handleNext(e as any);
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-50 py-8 relative overflow-hidden"
      onKeyDown={handleKeyDown}
    >
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-blue-500 to-indigo-600 transform -skew-y-6 -translate-y-24 z-0 opacity-20"></div>

      <RegistrationHeader logoImage={logoImage} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <ProgressSteps currentPage={page} />

        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-100 transition-all duration-300 transform hover:shadow-xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Business Registration</h2>
            <p className="text-gray-600">
              {page === 1
                ? "Let's start with your basic business information"
                : 'Complete your business profile and documentation'}
            </p>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <span className="mr-2">Progress:</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(page / 2) * 100}%` }}
                />
              </div>
              <span>{page}/2</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10" noValidate>
            {page === 1 && (
              <div className="space-y-8 transition-all duration-500 animate-fadeIn">
                {formErrors.enterpriseType && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span className="text-red-700 text-sm font-medium">
                      {formErrors.enterpriseType}
                    </span>
                  </div>
                )}

                <BasicInformationForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  updateValidationState={updateValidationState}
                  touchedFields={touchedFields}
                />

                <ContactDetailsForm
                  contacts={formData.contacts}
                  handleInputChange={handleInputChange}
                  addPerson={addPerson}
                  removePerson={removePerson}
                  updateValidationState={updateValidationState}
                  touchedFields={touchedFields}
                />
              </div>
            )}

            {page === 2 && (
              <div className="space-y-10 transition-all duration-500 animate-fadeIn">
                <EnterpriseDetailsForm
                  details={formData.details}
                  handleInputChange={handleInputChange}
                  handleFileChange={handleFileChange}
                  addBrandName={addBrandName}
                  updateValidationState={updateValidationState}
                  touchedFields={touchedFields}
                />

                <StatutoryDetailsForm
                  statutory={formData.statutory}
                  handleInputChange={handleInputChange}
                  handleFileChange={handleFileChange}
                  updateValidationState={updateValidationState}
                  touchedFields={touchedFields}
                />
              </div>
            )}

            <div className="pt-8 border-t border-gray-100">
              <NavigationButtons
                page={page}
                onBack={handleBack}
                onNext={handleNext}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                isPageValid={isPageValid(page)}
                hasSubmitted={hasSubmitted}
              />
            </div>
          </form>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            By registering, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-blue-300 to-indigo-400 rounded-full filter blur-3xl opacity-10 transform translate-x-1/3 translate-y-1/3 z-0"></div>
    </div>
  );
};

export default Register;
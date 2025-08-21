import React from 'react';
import { User, Mail, Phone, Briefcase, Plus, X } from 'lucide-react';
import { Button } from '../../../components/ui/button';

interface Contact {
  name: string;
  designation: string;
  email: string;
  contactNo: string;
}

interface ContactDetailsFormProps {
  contacts: Contact[];
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    section: string,
    index: number
  ) => void;
  addPerson: () => void;
  removePerson: (index: number) => void;
  updateValidationState: (fieldName: string, isValid: boolean) => void;
  touchedFields: Record<string, boolean>;
}

const ContactDetailsForm: React.FC<ContactDetailsFormProps> = ({
  contacts,
  handleInputChange,
  addPerson,
  removePerson,
  updateValidationState,
  touchedFields,
}) => {
  const removePersonHandler = (index: number) => {
    // This would need to be implemented in the parent component
    console.log('Remove person at index:', index);
  };

  // Simple validation patterns
  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePhone = (phone: string) => {
    const phonePattern = /^[\+]?[0-9\s\-\(\)]{10,15}$/;
    return phonePattern.test(phone);
  };

  const validateName = (name: string) => {
    return name.trim().length >= 2;
  };

  const validateDesignation = (designation: string) => {
    return designation.trim().length >= 2;
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100 shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-500 rounded-xl shadow-md">
            <User className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Contact Information</h3>
            <p className="text-gray-600">Primary contact person details</p>
          </div>
        </div>

        {contacts.length < 3 && (
          <button
            type="button"
            onClick={addPerson}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            aria-label="Add another contact person"
          >
            <Plus className="w-4 h-4" />
            Add Contact
          </button>
        )}
      </div>

      <div className="space-y-8">
        {contacts.map((contact, index) => (
          <div
            key={index}
            className="relative bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* Remove button for additional contacts */}
            {index > 0 && (
              <button
                type="button"
                onClick={() => removePerson(index)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                aria-label={`Remove contact ${index + 1}`}
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-800">
                {index === 0 ? 'Primary Contact' : `Contact Person ${index + 1}`}
              </h4>
              {index === 0 && (
                <p className="text-sm text-gray-600">
                  This person will be the admin user for your account
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                    <User
                      className={`w-5 h-5 transition-colors duration-200 ${
                        validateName(contact.name) ? 'text-green-500' : 'text-gray-400'
                      }`}
                    />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={contact.name}
                    onChange={e => {
                      handleInputChange(e, 'contacts', index);
                      updateValidationState(`contactName${index}`, validateName(e.target.value));
                    }}
                    className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all duration-300 
                      placeholder:text-gray-400 text-gray-900 bg-white font-medium
                      focus:outline-none focus:ring-4 ${
                        validateName(contact.name)
                          ? 'border-green-400 focus:border-green-500 focus:ring-green-100'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'
                      }`}
                    placeholder="Enter full name"
                    autoComplete="name"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500">Enter the contact person's full name</p>
              </div>

              {/* Designation */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Designation <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                    <Briefcase
                      className={`w-5 h-5 transition-colors duration-200 ${
                        validateDesignation(contact.designation)
                          ? 'text-green-500'
                          : 'text-gray-400'
                      }`}
                    />
                  </div>
                  <input
                    type="text"
                    name="designation"
                    value={contact.designation}
                    onChange={e => {
                      handleInputChange(e, 'contacts', index);
                      updateValidationState(
                        `contactDesignation${index}`,
                        validateDesignation(e.target.value)
                      );
                    }}
                    className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all duration-300 
                      placeholder:text-gray-400 text-gray-900 bg-white font-medium
                      focus:outline-none focus:ring-4 ${
                        validateDesignation(contact.designation)
                          ? 'border-green-400 focus:border-green-500 focus:ring-green-100'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'
                      }`}
                    placeholder="e.g., CEO, Manager, Director"
                    autoComplete="organization-title"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500">Job title or position in the organization</p>
              </div>

              {/* Contact Email */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                    <Mail
                      className={`w-5 h-5 transition-colors duration-200 ${
                        validateEmail(contact.email) ? 'text-green-500' : 'text-gray-400'
                      }`}
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={contact.email}
                    onChange={e => {
                      handleInputChange(e, 'contacts', index);
                      updateValidationState(`contactEmail${index}`, validateEmail(e.target.value));
                    }}
                    className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all duration-300 
                      placeholder:text-gray-400 text-gray-900 bg-white font-medium
                      focus:outline-none focus:ring-4 ${
                        validateEmail(contact.email)
                          ? 'border-green-400 focus:border-green-500 focus:ring-green-100'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'
                      }`}
                    placeholder="contact@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500">
                  {index === 0
                    ? 'This email will be used for account notifications'
                    : 'Contact email for this person'}
                </p>
              </div>

              {/* Contact Number */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                    <Phone
                      className={`w-5 h-5 transition-colors duration-200 ${
                        validatePhone(contact.contactNo) ? 'text-green-500' : 'text-gray-400'
                      }`}
                    />
                  </div>
                  <input
                    type="tel"
                    name="contactNo"
                    value={contact.contactNo}
                    onChange={e => {
                      handleInputChange(e, 'contacts', index);
                      updateValidationState(`contactNumber${index}`, validatePhone(e.target.value));
                    }}
                    className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all duration-300 
                      placeholder:text-gray-400 text-gray-900 bg-white font-medium
                      focus:outline-none focus:ring-4 ${
                        validatePhone(contact.contactNo)
                          ? 'border-green-400 focus:border-green-500 focus:ring-green-100'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'
                      }`}
                    placeholder="+91 9999999999"
                    autoComplete="tel"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Include country code for international numbers
                </p>
              </div>
            </div>
          </div>
        ))}

        {contacts.length >= 3 && (
          <div className="text-center p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-700 text-sm font-medium">
              Maximum of 3 contact persons allowed. You can add more after registration.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactDetailsForm;

import { useState } from 'react';
import { Camera, Mail, Phone, AlertCircle } from 'lucide-react';

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+233 24 123 4567',
    alternativeEmail: '',
    alternativePhone: '',
    company: 'Acme Inc',
    role: 'Event Manager'
  });

  const [errors, setErrors] = useState({});

  const validatePhone = (phone) => {
    // Basic Ghanaian phone number validation
    const phoneRegex = /^(\+233|0)(20|24|23|26|27|23|54|55|59)\d{7}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate primary email
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate alternative email if provided
    if (formData.alternativeEmail && !validateEmail(formData.alternativeEmail)) {
      newErrors.alternativeEmail = 'Please enter a valid email address';
    }

    // Validate primary phone
    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid Ghanaian phone number';
    }

    // Validate alternative phone if provided
    if (formData.alternativePhone && !validatePhone(formData.alternativePhone)) {
      newErrors.alternativePhone = 'Please enter a valid Ghanaian phone number';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Handle form submission
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="p-6">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm text-gray-500">
            Update your personal information and how others see you on the platform.
          </p>
        </div>

        {/* Profile Photo */}
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 
              flex items-center justify-center text-white text-3xl font-medium">
              {formData.firstName[0]}{formData.lastName[0]}
            </div>
            <button className="absolute -bottom-2 -right-2 p-2 rounded-full bg-white shadow-lg
              hover:bg-gray-50 transition-colors border border-gray-200">
              <Camera className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">Profile Photo</h3>
            <p className="text-sm text-gray-500">
              JPG, GIF or PNG. Max size of 800K
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2
                  focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2
                  focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primary Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`block w-full pl-10 rounded-lg border ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    } px-3 py-2 focus:outline-none focus:ring-1 ${
                      errors.email 
                        ? 'focus:border-red-500 focus:ring-red-500' 
                        : 'focus:border-blue-500 focus:ring-blue-500'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Alternative Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Alternative Email
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={formData.alternativeEmail}
                    onChange={(e) => handleChange('alternativeEmail', e.target.value)}
                    className={`block w-full pl-10 rounded-lg border ${
                      errors.alternativeEmail ? 'border-red-300' : 'border-gray-300'
                    } px-3 py-2 focus:outline-none focus:ring-1 ${
                      errors.alternativeEmail 
                        ? 'focus:border-red-500 focus:ring-red-500' 
                        : 'focus:border-blue-500 focus:ring-blue-500'
                    }`}
                  />
                </div>
                {errors.alternativeEmail && (
                  <p className="mt-1 text-sm text-red-600">{errors.alternativeEmail}</p>
                )}
              </div>

              {/* Primary Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+233 24 123 4567"
                    className={`block w-full pl-10 rounded-lg border ${
                      errors.phone ? 'border-red-300' : 'border-gray-300'
                    } px-3 py-2 focus:outline-none focus:ring-1 ${
                      errors.phone 
                        ? 'focus:border-red-500 focus:ring-red-500' 
                        : 'focus:border-blue-500 focus:ring-blue-500'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* Alternative Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Alternative Phone
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    value={formData.alternativePhone}
                    onChange={(e) => handleChange('alternativePhone', e.target.value)}
                    placeholder="+233 24 123 4567"
                    className={`block w-full pl-10 rounded-lg border ${
                      errors.alternativePhone ? 'border-red-300' : 'border-gray-300'
                    } px-3 py-2 focus:outline-none focus:ring-1 ${
                      errors.alternativePhone 
                        ? 'focus:border-red-500 focus:ring-red-500' 
                        : 'focus:border-blue-500 focus:ring-blue-500'
                    }`}
                  />
                </div>
                {errors.alternativePhone && (
                  <p className="mt-1 text-sm text-red-600">{errors.alternativePhone}</p>
                )}
              </div>
            </div>

            {/* Phone Number Format Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-600">
                <p className="font-medium">Phone Number Format</p>
                <p>Please enter phone numbers in the format: +233 XX XXX XXXX or 0XX XXX XXXX</p>
                <p>Example: +233 24 123 4567 or 024 123 4567</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 
                rounded-lg border border-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 
                hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings; 
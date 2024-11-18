import { useState } from 'react';
import { Camera, Mail, Phone, MapPin, User, Briefcase } from 'lucide-react';
import { currencies, getDefaultCurrencyByLocation } from '../../utils/currencyConverter';

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+233 24 123 4567',
    title: 'Event Manager',
    company: 'Acme Events',
    bio: 'Experienced event manager with a passion for creating memorable experiences.',
    location: 'Accra, Ghana',
    preferredCurrency: getDefaultCurrencyByLocation('Accra, Ghana')
  });

  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Profile Settings</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your personal information and preferences.
          </p>
        </div>

        {/* Profile Photo */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <button className="absolute -bottom-2 -right-2 p-2 rounded-full bg-white 
              shadow-md border border-gray-200 hover:bg-gray-50 transition-colors">
              <Camera className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">Profile Photo</h3>
            <p className="mt-1 text-sm text-gray-500">
              Recommended: Square image, at least 400x400px
            </p>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-4 sm:space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  firstName: e.target.value
                }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg 
                  shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 
                  focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  lastName: e.target.value
                }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg 
                  shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 
                  focus:border-blue-500"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 flex rounded-lg shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-lg border 
                  border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    email: e.target.value
                  }))}
                  className="flex-1 block w-full px-3 py-2 rounded-none rounded-r-lg 
                    border border-gray-300 focus:outline-none focus:ring-1 
                    focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1 flex rounded-lg shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-lg border 
                  border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <Phone className="w-4 h-4" />
                </span>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    phone: e.target.value
                  }))}
                  className="flex-1 block w-full px-3 py-2 rounded-none rounded-r-lg 
                    border border-gray-300 focus:outline-none focus:ring-1 
                    focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Title
              </label>
              <div className="mt-1 flex rounded-lg shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-lg border 
                  border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <Briefcase className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    title: e.target.value
                  }))}
                  className="flex-1 block w-full px-3 py-2 rounded-none rounded-r-lg 
                    border border-gray-300 focus:outline-none focus:ring-1 
                    focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  company: e.target.value
                }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg 
                  shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 
                  focus:border-blue-500"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <div className="mt-1 flex rounded-lg shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-lg border 
                border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                <MapPin className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  location: e.target.value
                }))}
                className="flex-1 block w-full px-3 py-2 rounded-none rounded-r-lg 
                  border border-gray-300 focus:outline-none focus:ring-1 
                  focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                bio: e.target.value
              }))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg 
                shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 
                focus:border-blue-500"
              placeholder="Tell us about yourself..."
            />
            <p className="mt-2 text-sm text-gray-500">
              Brief description for your profile.
            </p>
          </div>

          {/* Preferred Currency */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Preferred Currency
            </label>
            <select
              value={formData.preferredCurrency}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                preferredCurrency: e.target.value
              }))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              {Object.entries(currencies).map(([code, { name, symbol }]) => (
                <option key={code} value={code}>
                  {code} - {name} ({symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3">
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
import { useState } from 'react';
import { Building, Mail, Phone, AlertCircle, Camera, MapPin, Ellipsis, Trash2 } from 'lucide-react';
import DeleteOrganizationModal from '../../components/modals/DeleteOrganizationModal';

const OrganizationSettings = () => {
  const [showDeleteDropdown, setShowDeleteDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: 'Acme Events',
    registrationNumber: 'REG123456789',
    email: 'contact@acmeevents.com',
    phone: '+233 24 123 4567',
    alternativeEmail: '',
    alternativePhone: '',
    address: '123 Event Street',
    city: 'Accra',
    region: 'Greater Accra',
    description: 'Premier event management and ticketing services'
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-4 sm:space-y-6">
        {/* Header with More Options */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Organization Profile</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage your organization's information and contact details.
            </p>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowDeleteDropdown(!showDeleteDropdown)}
              className="p-2 rounded-lg hover:bg-gray-100/80 transition-colors"
            >
              <Ellipsis className="w-5 h-5 text-gray-600" />
            </button>

            {showDeleteDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg 
                border border-gray-200/80 py-1 z-50">
                <button
                  onClick={() => {
                    setShowDeleteModal(true);
                    setShowDeleteDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 
                    hover:bg-red-50 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Account
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Organization Logo */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center">
              <Camera className="w-8 h-8 text-gray-400" />
            </div>
            <button className="absolute -bottom-2 -right-2 p-2 rounded-full bg-white 
              shadow-md border border-gray-200 hover:bg-gray-50 transition-colors">
              <Camera className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">Organization Logo</h3>
            <p className="mt-1 text-sm text-gray-500">
              Recommended size: 400x400px. Max file size: 2MB.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Organization Name
              </label>
              <input
                type="text"
                value={formData.organizationName}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  organizationName: e.target.value
                }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg 
                  shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 
                  focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Registration Number
              </label>
              <input
                type="text"
                value={formData.registrationNumber}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  registrationNumber: e.target.value
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
                Primary Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  email: e.target.value
                }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg 
                  shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 
                  focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Primary Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  phone: e.target.value
                }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg 
                  shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 
                  focus:border-blue-500"
              />
            </div>
          </div>

          {/* Alternative Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Alternative Email (Optional)
              </label>
              <input
                type="email"
                value={formData.alternativeEmail}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  alternativeEmail: e.target.value
                }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg 
                  shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 
                  focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Alternative Phone (Optional)
              </label>
              <input
                type="tel"
                value={formData.alternativePhone}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  alternativePhone: e.target.value
                }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg 
                  shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 
                  focus:border-blue-500"
              />
            </div>
          </div>

          {/* Address Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  address: e.target.value
                }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg 
                  shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 
                  focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  city: e.target.value
                }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg 
                  shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 
                  focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Region
              </label>
              <select
                value={formData.region}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  region: e.target.value
                }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg 
                  shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 
                  focus:border-blue-500"
              >
                <option>Greater Accra</option>
                <option>Ashanti</option>
                <option>Western</option>
                <option>Eastern</option>
                <option>Central</option>
                <option>Northern</option>
                {/* Add other regions */}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                description: e.target.value
              }))}
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg 
                shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 
                focus:border-blue-500"
            />
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

      {/* Delete Modal */}
      <DeleteOrganizationModal 
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={() => {
          // Handle delete
          setShowDeleteModal(false);
        }}
      />
    </div>
  );
};

export default OrganizationSettings; 
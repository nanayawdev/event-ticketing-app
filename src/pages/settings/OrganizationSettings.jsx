import { useState, useRef } from 'react';
import { Building, Mail, Phone, AlertCircle, Camera, MapPin, Ellipsis, Trash2 } from 'lucide-react';
import { currencies, getDefaultCurrencyByLocation } from '../../utils/currencyConverter';
import DeleteOrganizationModal from '../../components/modals/DeleteOrganizationModal';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { generateRegistrationNumber } from '../../utils/generateRegistrationNumber';

const OrganizationSettings = () => {
  const [showDeleteDropdown, setShowDeleteDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: '',
    registrationNumber: generateRegistrationNumber(),
    email: '',
    phone: '',
    alternativeEmail: '',
    alternativePhone: '',
    address: '',
    city: '',
    region: '',
    description: '',
    preferredCurrency: getDefaultCurrencyByLocation('Greater Accra')
  });

  const [errors, setErrors] = useState({});
  const [logoUrl, setLogoUrl] = useState({
    file: null,
    url: null
  });
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const organizerData = {
        Organizers_Name: formData.organizationName || '',
        Organizers_Phone_Number: formData.phone ? parseInt(formData.phone.replace(/\D/g, ''), 10) : 0,
        Organizers_Email: formData.email || '',
        Organizers_Logo: null,
        Events_Name: null,
        Address: formData.address || '',
        City: formData.city || '',
        Region: formData.region || '',
        Description: formData.description || '',
        Alt_Phone: formData.alternativePhone || '',
        Alt_Email: formData.alternativeEmail || '',
        Reg_Number: formData.registrationNumber || ''
      };

      if (logoUrl.file) {
        const formDataWithFile = new FormData();
        formDataWithFile.append('Organizers_Logo', logoUrl.file);
        
        Object.keys(organizerData).forEach(key => {
          formDataWithFile.append(key, organizerData[key]);
        });

        const response = await fetch('https://api-server.krontiva.africa/api:BnSaGAXN/ticket_organizers', {
          method: 'POST',
          body: formDataWithFile
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to save organization data');
        }
      } else {
        const response = await fetch('https://api-server.krontiva.africa/api:BnSaGAXN/ticket_organizers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(organizerData)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to save organization data');
        }
      }

      alert('Organization details saved successfully!');
      
    } catch (error) {
      console.error('Error saving organization data:', error);
      alert(`Failed to save organization details: ${error.message}`);
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) { // 2MB limit
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoUrl({
          file: file,
          url: reader.result
        });
      };
      reader.readAsDataURL(file);
    } else {
      toast.error('File size should be less than 2MB', {
        position: 'top-center'
      });
    }
  };

  const handlePhoneChange = (e, field) => {
    // Only allow digits and basic formatting characters
    const value = e.target.value.replace(/[^\d\s+-]/g, '');
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="p-4 sm:p-6">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
        }}
      />
      <div className="space-y-4 sm:space-y-6">
        {/* Header with More Options */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Organization Profile</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage your organization's information and contact details.
            </p>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowDeleteDropdown(!showDeleteDropdown)}
              className="p-2 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors"
            >
              <Ellipsis className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>

            {showDeleteDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg 
                border border-gray-200/80 dark:border-gray-700/80 py-1 z-50">
                <button
                  onClick={() => {
                    setShowDeleteModal(true);
                    setShowDeleteDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400
                    hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
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
            <div className="w-24 h-24 rounded-xl bg-gray-100 dark:bg-gray-800 dark:border dark:border-gray-700 flex items-center justify-center overflow-hidden">
              {logoUrl.url ? (
                <img 
                  src={logoUrl.url} 
                  alt="Organization logo" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <button 
              onClick={() => fileInputRef.current?.click()} 
              className="absolute -bottom-2 -right-2 p-2 rounded-full bg-white dark:bg-gray-800
                shadow-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Camera className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleLogoUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Organization Logo</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Recommended size: 400x400px. Max file size: 2MB.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Organization Name
              </label>
              <input
                type="text"
                value={formData.organizationName}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  organizationName: e.target.value
                }))}
                className="mt-1 block w-full px-3 py-2 
                  bg-white dark:bg-gray-800 
                  text-gray-900 dark:text-white
                  border border-gray-300 dark:border-gray-600 
                  rounded-lg shadow-sm 
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                  placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                Registration Number
              </label>
              <input
                type="text"
                value={formData.registrationNumber}
                disabled
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                  rounded-lg shadow-sm bg-gray-50 dark:bg-gray-800 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                Primary Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  email: e.target.value
                }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                  rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 
                  focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                  placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                Primary Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handlePhoneChange(e, 'phone')}
                placeholder="Enter primary phone number"
                className="mt-1 block w-full px-3 py-2 
                  bg-white dark:bg-gray-800 
                  text-gray-900 dark:text-white
                  border border-gray-300 dark:border-gray-600 
                  rounded-lg shadow-sm 
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                  placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
          </div>

          {/* Alternative Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                Alternative Email (Optional)
              </label>
              <input
                type="email"
                value={formData.alternativeEmail}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  alternativeEmail: e.target.value
                }))}
                className="mt-1 block w-full px-3 py-2 
                  bg-white dark:bg-gray-800 
                  text-gray-900 dark:text-white
                  border border-gray-300 dark:border-gray-600 
                  rounded-lg shadow-sm 
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                  placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                Alternative Phone (Optional)
              </label>
              <input
                type="tel"
                value={formData.alternativePhone}
                onChange={(e) => handlePhoneChange(e, 'alternativePhone')}
                placeholder="Enter alternative phone number (optional)"
                className="mt-1 block w-full px-3 py-2 
                  bg-white dark:bg-gray-800 
                  text-gray-900 dark:text-white
                  border border-gray-300 dark:border-gray-600 
                  rounded-lg shadow-sm 
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                  placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
          </div>

          {/* Address Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  address: e.target.value
                }))}
                className="mt-1 block w-full px-3 py-2 
                  bg-white dark:bg-gray-800 
                  text-gray-900 dark:text-white
                  border border-gray-300 dark:border-gray-600 
                  rounded-lg shadow-sm 
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  city: e.target.value
                }))}
                className="mt-1 block w-full px-3 py-2 
                  bg-white dark:bg-gray-800 
                  text-gray-900 dark:text-white
                  border border-gray-300 dark:border-gray-600 
                  rounded-lg shadow-sm 
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                Region
              </label>
              <select
                value={formData.region}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  region: e.target.value
                }))}
                className="mt-1 block w-full px-3 py-2 
                  bg-white dark:bg-gray-800 
                  text-gray-900 dark:text-white
                  border border-gray-300 dark:border-gray-600 
                  rounded-lg shadow-sm 
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>Ahafo</option>
                <option>Ashanti</option>
                <option>Bono</option>
                <option>Bono East</option>
                <option>Central</option>
                <option>Eastern</option>
                <option>Greater Accra</option>
                <option>North East</option>
                <option>Northern</option>
                <option>Oti</option>
                <option>Savannah</option>
                <option>Upper East</option>
                <option>Upper West</option>
                <option>Volta</option>
                <option>Western</option>
                <option>Western North</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                description: e.target.value
              }))}
              rows={4}
              className="mt-1 block w-full px-3 py-2 
                bg-white dark:bg-gray-800 
                text-gray-900 dark:text-white
                border border-gray-300 dark:border-gray-600 
                rounded-lg shadow-sm 
                focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          {/* Currency Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                Default Currency
              </label>
              <select
                value={formData.preferredCurrency}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  preferredCurrency: e.target.value
                }))}
                className="mt-1 block w-full px-3 py-2 
                  bg-white dark:bg-gray-800 
                  text-gray-900 dark:text-white
                  border border-gray-300 dark:border-gray-600 
                  rounded-lg shadow-sm 
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.entries(currencies).map(([code, { name, symbol }]) => (
                  <option key={code} value={code}>
                    {code} - {name} ({symbol})
                  </option>
                ))}
              </select>
              <p className="mt-1 text-sm text-gray-500">
                This will be the default currency for all transactions
              </p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                hover:bg-gray-50 dark:hover:bg-gray-700/20 rounded-lg border 
                border-gray-300 dark:border-gray-600 transition-colors"
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
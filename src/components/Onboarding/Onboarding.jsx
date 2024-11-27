import { useState, useRef, useEffect } from 'react';
import { Camera, Trash2, BadgeCheck } from 'lucide-react';
import { useCountryList } from '../../hooks/useCountryList';
import { useCountryStates } from '../../hooks/useCountryStates';
import { generateRegistrationNumber } from '../../utils/generateRegistrationNumber';
import { toast, Toaster } from 'react-hot-toast';
import OtpInput from '../ui/OtpInput';

const Onboarding = () => {
  const countries = useCountryList();
  const { getStatesForCountry } = useCountryStates();
  const fileInputRef = useRef(null);
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    organizationName: '',
    registrationNumber: generateRegistrationNumber(),
    email: 'support@krontiva.africa',
    phone: '',
    alternativeEmail: '',
    alternativePhone: '',
    address: '',
    city: '',
    region: '',
    country: 'GH',
    state: '',
    description: ''
  });

  const [logoUrl, setLogoUrl] = useState({
    file: null,
    url: null
  });

  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);

  const DEFAULT_OTP = '123456';

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
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

  const handleLogoClick = (e) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handlePhoneChange = (e, field) => {
    const value = e.target.value.replace(/[^\d\s+-]/g, '');
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVerifyPhone = async () => {
    setIsVerifying(true);
    setShowOtpInput(true);
    toast.success('Verification code sent to your phone');
  };

  const handleVerifyOtp = async () => {
    try {
      setIsVerifying(true);
      
      if (otpValue === DEFAULT_OTP) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsPhoneVerified(true);
        setShowOtpInput(false);
        toast.success('Phone number verified successfully!');
      } else {
        toast.error('Invalid verification code. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to verify OTP. Please try again.');
    } finally {
      setIsVerifying(false);
      setOtpValue('');
    }
  };

  useEffect(() => {
    if (otpValue.length === 6) {
      handleVerifyOtp();
    }
  }, [otpValue]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    try {
      const organizerData = {
        Organizers_Name: formData.organizationName || '',
        Organizers_Phone_Number: formData.phone ? parseInt(formData.phone.replace(/\D/g, ''), 10) : 0,
        Organizers_Email: formData.email || '',
        Organizers_Logo: null,
        Events_Name: null,
        Address: formData.address || '',
        City: formData.city || '',
        Region: formData.state || '',
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

      setShowFinalModal(true);
      
    } catch (error) {
      console.error('Error saving organization data:', error);
      toast.error(`Failed to save organization details: ${error.message}`);
    }
  };

  const renderProgressIndicator = () => {
    return (
      <div className="mb-6">
        <div className="inline-flex px-2 py-1 bg-red-100 rounded-full mb-4">
          <span className="text-xs font-medium text-red-600">
            Step {step} of 3
          </span>
        </div>
        <div className="h-1 w-full bg-gray-200 rounded-full">
          <div
            className="h-1 bg-red-500 rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>
    );
  };

  const renderPhoneInput = () => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Primary Phone
        </label>
        <div className="mt-1 relative">
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => {
              if (!isPhoneVerified) {
                handlePhoneChange(e, 'phone');
              }
            }}
            disabled={isPhoneVerified}
            placeholder="Enter primary phone number"
            className={`block w-full px-3 py-2 
              bg-white border border-gray-300 
              rounded-lg shadow-sm 
              focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
              ${formData.phone.length === 10 && !isPhoneVerified ? 'pr-20' : ''}
              ${isPhoneVerified ? 'pr-28 bg-gray-50 border-green-500' : ''}`}
          />
          {isPhoneVerified ? (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center text-green-600">
              <BadgeCheck className="w-4 h-4 mr-1" />
              <span className="text-sm">Verified</span>
            </div>
          ) : (
            formData.phone.length === 10 && (
              <button
                type="button"
                onClick={handleVerifyPhone}
                className="absolute right-2 top-1/2 -translate-y-1/2
                  px-3 py-1 text-sm font-medium text-white
                  bg-blue-500 rounded-md hover:bg-blue-600
                  transition-colors duration-200"
              >
                Verify
              </button>
            )
          )}
        </div>
      </div>
    );
  };

  const renderOtpModal = () => {
    if (!showOtpInput) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
               onClick={() => setShowOtpInput(false)} />

          <div className="relative transform overflow-hidden rounded-lg bg-white 
            w-full max-w-md p-6 text-left shadow-xl transition-all">
            <div className="mt-3 text-center sm:mt-0 sm:text-left">
              <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                Verify Your Phone Number
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Enter the 6-digit verification code sent to {formData.phone}
              </p>
              
              <div className="mb-8">
                <OtpInput
                  length={6}
                  value={otpValue}
                  onChange={setOtpValue}
                />
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowOtpInput(false);
                    setOtpValue('');
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 
                    bg-white border border-gray-300 rounded-lg 
                    hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFinalModal = () => {
    if (!showFinalModal) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

          <div className="relative transform overflow-hidden rounded-lg bg-white 
            w-full max-w-md p-6 text-left shadow-xl transition-all">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                Organization Created Successfully!
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Would you like to set up your settlement details now?
              </p>
              
              <div className="mt-5 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = '/settlement-details';
                  }}
                  className="w-full px-4 py-2 text-sm font-medium text-white 
                    bg-red-500 rounded-lg hover:bg-red-600 
                    transition-colors duration-200"
                >
                  Enter Settlement Details
                </button>
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = '/dashboard';
                  }}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-700 
                    bg-white border border-gray-300 rounded-lg 
                    hover:bg-gray-50 transition-colors duration-200"
                >
                  Continue to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            {renderProgressIndicator()}
            <h2 className="text-xl font-semibold text-gray-900">Organization Profile</h2>
            <p className="text-sm text-gray-500">
              Manage your organization's information and contact details.
            </p>

            {/* Organization Logo */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
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
                  onClick={handleLogoClick} 
                  type="button"
                  className="absolute -bottom-2 -right-2 p-2 rounded-full bg-white
                    shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <Camera className="w-4 h-4 text-gray-600" />
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
                <h3 className="text-sm font-medium text-gray-900">Organization Logo</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Recommended size: 400x400px. Max file size: 2MB.
                </p>
              </div>
            </div>

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
                  className="mt-1 block w-full px-3 py-2 
                    bg-white border border-gray-300 
                    rounded-lg shadow-sm 
                    focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Registration Number
                </label>
                <input
                  type="text"
                  value={formData.registrationNumber}
                  disabled
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 
                    rounded-lg shadow-sm bg-gray-50 cursor-not-allowed"
                />
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
                placeholder="Tell us about your organization..."
                className="mt-1 block w-full px-3 py-2 
                  bg-white border border-gray-300 
                  rounded-lg shadow-sm 
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {renderProgressIndicator()}
            <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
            
            {/* Primary Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Primary Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="mt-1 block w-full px-3 py-2 
                    bg-gray-50 border border-gray-300 
                    rounded-lg shadow-sm cursor-not-allowed"
                />
              </div>
              {renderPhoneInput()}
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
                  className="mt-1 block w-full px-3 py-2 
                    bg-white border border-gray-300 
                    rounded-lg shadow-sm 
                    focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Alternative Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={formData.alternativePhone}
                  onChange={(e) => handlePhoneChange(e, 'alternativePhone')}
                  placeholder="Enter alternative phone number (optional)"
                  className="mt-1 block w-full px-3 py-2 
                    bg-white border border-gray-300 
                    rounded-lg shadow-sm 
                    focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {renderProgressIndicator()}
            <h2 className="text-xl font-semibold text-gray-900">Address Information</h2>
            
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
                  className="mt-1 block w-full px-3 py-2 
                    bg-white border border-gray-300 
                    rounded-lg shadow-sm 
                    focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    city: e.target.value
                  }))}
                  className="mt-1 block w-full px-3 py-2 
                    bg-white border border-gray-300 
                    rounded-lg shadow-sm 
                    focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">State</label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    state: e.target.value
                  }))}
                  className="mt-1 block w-full px-3 py-2 
                    bg-white border border-gray-300 
                    rounded-lg shadow-sm 
                    focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a state</option>
                  {getStatesForCountry(formData.country).map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[600px] mx-auto px-4">
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
          }}
        />
        <form onSubmit={handleSubmit} className="w-full">
          {renderStep()}
          {renderOtpModal()}
          {renderFinalModal()}
          
          <div className="mt-8 grid grid-cols-2 gap-4">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="w-full px-4 py-3 text-base font-medium text-gray-700 
                  bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className={`${step === 1 ? 'col-span-2' : ''} w-full px-4 py-3 text-base font-medium 
                text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors`}
            >
              {step === 3 ? 'Save and continue' : 'Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Onboarding; 
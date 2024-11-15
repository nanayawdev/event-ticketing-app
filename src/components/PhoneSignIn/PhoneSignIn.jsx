import React, { useState } from 'react';
import { X, ArrowLeft, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import logo from '../../assets/icons/nylogo.png';

const PhoneSignIn = ({ onBack, onClose, isSignUp = false }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api-server.krontiva.africa/api:BnSaGAXN/auth/phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      if (!response.ok) {
        throw new Error('Failed to send verification code');
      }

      setStep(2);
    } catch (err) {
      setError('Failed to send verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api-server.krontiva.africa/api:BnSaGAXN/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          phoneNumber, 
          code: verificationCode,
          isSignUp // Add this flag to differentiate between login and signup
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid verification code');
      }

      // Handle successful verification
      onClose(); // Close the modal after successful verification
    } catch (err) {
      setError('Invalid verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <img src={logo} alt="Logo" className="h-8" />
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-2">
            {step === 1 ? 'Enter Phone Number' : 'Verify Phone Number'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
            {step === 1 
              ? 'We will send you a verification code' 
              : 'Enter the verification code sent to your phone'
            }
          </p>

          {error && (
            <div className="mb-4 text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                    placeholder="+1 (555) 000-0000"
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Code'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerificationSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="block w-full px-3 py-3 border rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Verifying...' : 'Verify Code'}
              </Button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t dark:border-gray-700 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            By continuing, you agree to our{' '}
            <a href="/terms" className="text-indigo-600 hover:text-indigo-500">
              Terms
            </a>{' '}
            &{' '}
            <a href="/privacy" className="text-indigo-600 hover:text-indigo-500">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhoneSignIn; 
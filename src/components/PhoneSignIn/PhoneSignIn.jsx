import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, Phone, Timer } from 'lucide-react';
import { Button } from '../ui/button';
import logo from '../../assets/icons/nylogo.png';
import CountrySelector from './CountrySelector';
import { countries } from './countriesData';
import OtpInput from '../ui/OtpInput';

const PhoneSignIn = ({ onBack, onClose, isSignUp = false }) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer;
    if (step === 2 && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhoneNumber(value);
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const fullPhoneNumber = `${selectedCountry.dialCode}${phoneNumber}`;

    try {
      const response = await fetch('https://api-server.krontiva.africa/api:BnSaGAXN/auth/phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: fullPhoneNumber }),
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

  const handleResendCode = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('https://api-server.krontiva.africa/api:BnSaGAXN/auth/phone/resend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          phoneNumber: `${selectedCountry.dialCode}${phoneNumber}` 
        }),
      });

      if (!response.ok) throw new Error('Failed to resend code');
      
      setCountdown(30);
      setCanResend(false);
    } catch (err) {
      setError('Failed to resend code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Original modal structure remains unchanged */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
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
                  <div className="flex gap-2">
                    <CountrySelector
                      selectedCountry={selectedCountry}
                      onSelect={setSelectedCountry}
                    />
                    <div className="relative flex-1">
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        className="block w-full px-3 py-2 border rounded-md focus:ring-2 
                          focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                        placeholder="Enter phone number"
                        required
                      />
                    </div>
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
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We sent a verification code to
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {selectedCountry.dialCode} {phoneNumber}
                  </p>
                </div>

                <form onSubmit={handleVerificationSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-4 text-center">
                      Enter verification code
                    </label>
                    <OtpInput
                      length={6}
                      value={verificationCode}
                      onChange={setVerificationCode}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading || verificationCode.length !== 6}
                  >
                    {isLoading ? 'Verifying...' : 'Verify'}
                  </Button>

                  <div className="text-center space-y-2">
                    {!canResend ? (
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <Timer className="w-4 h-4" />
                        <span>Resend code in {countdown}s</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendCode}
                        disabled={isLoading}
                        className="text-sm text-indigo-600 hover:text-indigo-500 
                          dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        Resend verification code
                      </button>
                    )}
                  </div>
                </form>
              </div>
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
    </div>
  );
};

export default PhoneSignIn; 
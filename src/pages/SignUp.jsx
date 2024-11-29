import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/icons/nylogo.png';
import { Snackbar, Alert } from '@mui/material';
import PhoneSignIn from '../components/PhoneSignIn/PhoneSignIn';
import { FaPhoneAlt, FaGoogle } from 'react-icons/fa';
import { CircleUser, AtSign, Key, Eye, EyeClosed, ChevronDown, Search, X } from 'lucide-react';
import SocialButton from '../components/SocialButton/SocialButton';
import PhoneSignUp from '../components/PhoneSignUp/PhoneSignUp';
import { useCountryList } from '../hooks/useCountryList';
  
const SignUp = () => {
  const navigate = useNavigate();
  const countries = useCountryList();
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    password: '',
    country: '',
    agreedToTerms: false
  });
  const [fieldErrors, setFieldErrors] = useState({
    fullName: false,
    businessName: false,
    email: false,
    password: false,
    country: false,
    agreedToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    lowercase: false,
    uppercase: false,
    number: false,
    symbol: false,
    length: false,
  });
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPhoneSignUp, setShowPhoneSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signal, setSignal] = useState(" ");
  const [showPhoneSignIn, setShowPhoneSignIn] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    validatePassword(formData.password);
  }, [formData.password]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCountryOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const validatePassword = (password) => {
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasLength = password.length >= 8;

    setPasswordStrength({
      lowercase: hasLowerCase,
      uppercase: hasUpperCase,
      number: hasNumber,
      symbol: hasSymbol,
      length: hasLength,
    });

    if (!hasLowerCase) {
      setSignal("lowercase-error");
    } else if (!hasUpperCase) {
      setSignal("uppercase-error");
    } else if (!hasNumber) {
      setSignal("number-error");
    } else if (!hasSymbol) {
      setSignal("symbol-error");
    } else if (!hasLength) {
      setSignal("length-error");
    } else {
      setSignal("strong");
    }
  };

  const getPasswordStrength = () => {
    const metRequirements = Object.values(passwordStrength).filter(Boolean).length;
    return (metRequirements / 5) * 100;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setFieldErrors(prevState => ({
      ...prevState,
      [name]: false
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value.trim() === '') {
      setFieldErrors(prevState => ({
        ...prevState,
        [name]: true
      }));
    }
    if (name === 'password') {
      setIsPasswordFocused(false);
    }
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    if (name === 'password') {
      setIsPasswordFocused(true);
    }
  };

  const generateRegistrationNumber = () => {
    const word = 'TICKRFLY';
    let letters = '';
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * word.length);
      letters += word[randomIndex];
    }
    
    const numbers = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
    return `${letters}${numbers}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if terms are agreed to
    if (!formData.agreedToTerms) {
      setFieldErrors(prev => ({
        ...prev,
        agreedToTerms: true
      }));
      setError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    try {
      const registrationNumber = generateRegistrationNumber();
      
      const response = await fetch('https://api-server.krontiva.africa/api:BnSaGAXN/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: formData.fullName,
          Email: formData.email,
          Password: String(formData.password),
          BusinessName: formData.businessName,
          Country: formData.country,
          role: 'Admin',
          RegistrationNumber: registrationNumber,
        }),
      });

      if (response.ok) {
        setOpenSnackbar(true);
        console.log('User registered successfully');
        setFormData({ fullName: '', email: '', password: '' });
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500); // 1.5 seconds delay to show the success message
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to register user');
      }
    } catch (error) {
      setError('Error during registration. Please try again.');
      console.error('Error during registration:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handlePhoneSignUp = () => {
    setShowPhoneSignUp(true);
  };

  const handleBackToSignUp = () => {
    setShowPhoneSignUp(false);
  };

  const handlePhoneClick = () => {
    console.log('Phone button clicked');
    setShowPhoneSignIn(true);
  };

  const handleGoogleClick = () => {
    console.log('Google button clicked');
    // Add Google sign-up logic here
  };

  const socialButtons = [
    { 
      icon: FaGoogle, 
      name: 'Google', 
      color: 'hover:bg-red-50',
      onClick: handleGoogleClick 
    },
    { 
      icon: FaPhoneAlt, 
      name: 'Phone', 
      color: 'hover:bg-green-50',
      onClick: handlePhoneClick 
    }
  ];

  const getMessage = () => {
    switch (signal) {
      case "length-error":
        return "Password must be at least 8 characters long.";
      case "uppercase-error":
        return "Password must contain at least one uppercase letter.";
      case "lowercase-error":
        return "Password must contain at least one lowercase letter.";
      case "number-error":
        return "Password must contain at least one number.";
      case "symbol-error":
        return "Password must contain at least one special character.";
      default:
        return "Wow! Very strong password.";
    }
  };

  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClose = () => {
    navigate(-1);
  };

  // Add this function to check if all fields are filled and terms accepted
  const isFormValid = () => {
    return (
      formData.fullName.trim() !== '' &&
      formData.businessName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.password.trim() !== '' &&
      formData.country !== '' &&
      formData.agreedToTerms &&
      // Check if password meets all requirements
      Object.values(passwordStrength).every(value => value === true)
    );
  };

  return (
    <>
      {showPhoneSignIn ? (
        <PhoneSignIn 
          onBack={() => setShowPhoneSignIn(false)}
          onClose={() => setShowPhoneSignIn(false)}
          isSignUp={true}
        />
      ) : showPhoneSignUp ? (
        <PhoneSignUp 
          onBack={handleBackToSignUp}
          onClose={() => setShowPhoneSignUp(false)}
        />
      ) : (
        <>
          <div className="min-h-screen flex items-center justify-center px-4 py-8">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="h-6 w-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
            </button>
            <div className="max-w-sm w-full space-y-6">
              {/* Updated Header Section */}
              <div className="flex flex-col items-center text-center space-y-2">
                <img src={logo} alt="Logo" className="h-12 w-auto" />
                <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                <p className="text-sm text-gray-600">
                  Enter Details to magic with Tickrfly
                </p>
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
                {/* Full Name Input */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CircleUser className="h-5 w-5 text-primary-400" />
                    </div>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="Enter your name"
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                      required
                      className={`block w-full pl-10 pr-3 h-12 border ${
                        fieldErrors.fullName ? 'border-red-500' : 'border-gray-300'
                      } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:placeholder-gray-400`}
                    />
                  </div>
                </div>

                {/* Business Name Input */}
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Business Name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CircleUser className="h-5 w-5 text-primary-400" />
                    </div>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      placeholder="Enter your business name"
                      value={formData.businessName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={`block w-full pl-10 pr-3 h-12 border ${
                        fieldErrors.businessName ? 'border-red-500' : 'border-gray-300'
                      } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:placeholder-gray-400`}
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    E-mail
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <AtSign className="h-5 w-5 text-primary-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                      required
                      className={`block w-full pl-10 pr-3 h-12 border ${
                        fieldErrors.email ? 'border-red-500' : 'border-gray-300'
                      } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:placeholder-gray-400`}
                    />
                  </div>
                </div>

                {/* Country Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Country
                  </label>
                  <div className="mt-1 relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsCountryOpen(!isCountryOpen)}
                      className={`w-full flex items-center gap-2 px-3 h-12 border rounded-md hover:bg-gray-50 
                        dark:hover:bg-gray-800 transition-colors ${
                          fieldErrors.country ? 'border-red-500' : 'border-gray-300'
                        }`}
                    >
                      {formData.country ? (
                        <>
                          <img
                            src={`https://flagcdn.com/w20/${formData.country.toLowerCase()}.png`}
                            alt={countries.find(c => c.code === formData.country)?.name}
                            className="w-5 h-auto"
                          />
                          <span className="text-sm font-medium">
                            {countries.find(c => c.code === formData.country)?.name}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm text-gray-500">Select your country</span>
                      )}
                      <ChevronDown className="w-4 h-4 text-gray-500 ml-auto" />
                    </button>

                    {isCountryOpen && (
                      <div className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-900 rounded-md shadow-lg 
                        border dark:border-gray-700 max-h-96 overflow-hidden">
                        <div className="p-2 border-b dark:border-gray-700">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                              type="text"
                              placeholder="Search countries..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:outline-none 
                                focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                            />
                          </div>
                        </div>
                        <div className="overflow-y-auto max-h-72">
                          {filteredCountries.map((country) => (
                            <button
                              key={country.code}
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({ ...prev, country: country.code }));
                                setFieldErrors(prev => ({ ...prev, country: false }));
                                setIsCountryOpen(false);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 
                                dark:hover:bg-gray-800 transition-colors"
                            >
                              <img
                                src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                                alt={country.name}
                                className="w-5 h-auto"
                              />
                              <span className="text-sm">{country.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Key className="h-5 w-5 text-primary-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Your password"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                      required
                      className={`block w-full pl-10 pr-10 h-12 border ${
                        fieldErrors.password ? 'border-red-500' : 'border-gray-300'
                      } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:placeholder-gray-400`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                      ) : (
                        <EyeClosed className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                      )}
                    </button>
                  </div>

                  {isPasswordFocused && (
                    <div className="mt-4 space-y-2">
                      <div className="h-2 bg-gray-200 rounded">
                        <div
                          className="h-full bg-green-500 rounded transition-all"
                          style={{ width: `${getPasswordStrength()}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p className="font-medium">Password must contain:</p>
                        <ul className="mt-2 space-y-1">
                          {Object.entries(passwordStrength).map(([requirement, isMet]) => (
                            <li key={requirement} className={`flex items-center ${isMet ? 'text-green-500' : 'text-gray-500'}`}>
                              {isMet ? '✓' : '✗'} {requirement.charAt(0).toUpperCase() + requirement.slice(1)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* Terms and Conditions Checkbox */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agreedToTerms"
                      name="agreedToTerms"
                      type="checkbox"
                      checked={formData.agreedToTerms}
                      onChange={(e) => {
                        setFormData(prev => ({
                          ...prev,
                          agreedToTerms: e.target.checked
                        }));
                        setFieldErrors(prev => ({
                          ...prev,
                          agreedToTerms: false
                        }));
                      }}
                      className={`h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 
                        ${fieldErrors.agreedToTerms ? 'border-red-500' : ''}`}
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="agreedToTerms" className="text-sm text-gray-600">
                      I agree to the{' '}
                      <Link to="/terms" className="text-primary-400 hover:text-primary-500">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-primary-400 hover:text-primary-500">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                </div>

                {/* Updated submit button */}
                <button
                  type="submit"
                  disabled={!isFormValid() || isLoading}
                  className={`w-full flex justify-center items-center h-12 px-4 border border-transparent 
                    rounded-md shadow-sm text-sm font-medium text-white
                    ${isFormValid() 
                      ? 'bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500' 
                      : 'bg-gray-400 cursor-not-allowed'}
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 
                    disabled:opacity-50 transition-colors`}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>

              <div className="flex flex-col items-center space-y-4 mt-4">
                <p className="text-sm text-gray-600 text-center">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary-400 hover:text-primary-500">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="success"
              sx={{ width: '100%' }}
            >
              Registration successful!
            </Alert>
          </Snackbar>
        </>
      )}
    </>
  );
};

export default SignUp;
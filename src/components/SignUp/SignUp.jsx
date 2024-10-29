import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
/*import './SignUp.css';*/
import logo from '../../assets/icons/nylogo.png';
import googlelogo from '../../assets/icons/ggole.png';
import mobilelogo from '../../assets/icons/mobilebutton.png';
//import { Snackbar, Alert, LinearProgress } from '@mui/material';
import PhoneSignUp from '../PhoneSignUp/PhoneSignUp';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [fieldErrors, setFieldErrors] = useState({
    fullName: false, 
    email: false,
    password: false,
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

  useEffect(() => {
    validatePassword(formData.password);
  }, [formData.password]);

  const validatePassword = (password) => {
    setPasswordStrength({
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      length: password.length >= 8,
    });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if all fields are filled
    const newFieldErrors = Object.keys(formData).reduce((acc, key) => {
      acc[key] = formData[key].trim() === '';
      return acc;
    }, {});
    setFieldErrors(newFieldErrors);

    if (Object.values(newFieldErrors).some(Boolean)) {
      return; // Don't submit if there are errors
    }

    if (!Object.values(passwordStrength).every(Boolean)) {
      setError('Please meet all password requirements');
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api-server.krontiva.africa/api:BnSaGAXN/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: formData.fullName,
          Email: formData.email,
          Password: String(formData.password),
          role: 'Admin',
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

  if (showPhoneSignUp) {
    return <PhoneSignUp onBack={handleBackToSignUp} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <img src={logo} alt="Logo" className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Get Started</h2>
          <p className="mt-2 text-sm text-gray-600">Revolutionize your voting experience today.</p>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
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
              className={`mt-1 block w-full px-3 py-2 border ${
                fieldErrors.fullName ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
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
              className={`mt-1 block w-full px-3 py-2 border ${
                fieldErrors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              required
              className={`mt-1 block w-full px-3 py-2 border ${
                fieldErrors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />

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

          <div className="space-y-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <img src={googlelogo} alt="Google" className="h-5 w-5 mr-2" />
              Continue with Google
            </button>

            <button
              type="button"
              onClick={handlePhoneSignUp}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <img src={mobilelogo} alt="Phone" className="h-5 w-5 mr-2" />
              Continue with Phone Number
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          By signing up, you agree to our{' '}
          <Link to="/terms" className="text-indigo-600 hover:text-indigo-500">
            Terms of service
          </Link>{' '}
          &{' '}
          <Link to="/privacy" className="text-indigo-600 hover:text-indigo-500">
            Privacy Policy
          </Link>
        </p>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/icons/nylogo.png';
import { Snackbar, Alert } from '@mui/material';
import { AtSign, Key, Eye, EyeClosed } from 'lucide-react';
import { FaPhoneAlt, FaGoogle } from 'react-icons/fa';
import SocialButton from '../components/SocialButton/SocialButton';
import PhoneSignIn from '../components/PhoneSignIn/PhoneSignIn';
import { useAuth } from '../context/AuthContext';

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [fieldErrors, setFieldErrors] = useState({
    email: false,
    password: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPhoneSignIn, setShowPhoneSignIn] = useState(false);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Add validation for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Check if all fields are filled
    const newFieldErrors = Object.keys(formData).reduce((acc, key) => {
      acc[key] = formData[key].trim() === '';
      return acc;
    }, {});
    setFieldErrors(newFieldErrors);

    if (Object.values(newFieldErrors).some(Boolean)) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Log the request payload
      console.log('Sending login request with:', {
        Email: formData.email,
        Password: formData.password,
      });

      const response = await fetch('https://api-server.krontiva.africa/api:BnSaGAXN/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json', // Add Accept header
        },
        body: JSON.stringify({
          Email: formData.email,
          Password: formData.password,
        }),
      });

      // Log the raw response
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        // Debug logs
        console.log('Login successful, full response:', data);
        console.log('Auth token:', data.authToken);
        console.log('User data structure:', {
          id: data.id || data.ID || data._id,
          email: data.email || data.Email,
          businessName: data.businessName || data.BusinessName || data.business_name
        });

        // Store auth token
        localStorage.setItem('authToken', data.authToken);
        
        // Store business name (handle both cases)
        const businessName = data.BusinessName || data.businessName || data.business_name;
        localStorage.setItem('businessName', businessName);
        
        // Store full user data
        localStorage.setItem('user', JSON.stringify({
          businessName: businessName,
          email: data.Email || data.email,
          // ... any other user data
        }));

        // Add this line to update global auth state
        login({
          authToken: data.authToken,
          user: {
            businessName: businessName,
            email: data.Email || data.email,
            // ... any other user data
          }
        });

        setOpenSnackbar(true);
        navigate('/');
      } else {
        // Improved error handling
        const errorMessage = data.message || data.error || 'Login failed. Please check your credentials.';
        setError(errorMessage);
        console.error('Login failed:', errorMessage);
      }
    } catch (error) {
      console.error('Login error details:', error);
      setError('Network error or server is unreachable. Please try again later.');
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

  const handlePhoneClick = () => {
    setShowPhoneSignIn(true);
  };

  const handleGoogleClick = () => {
    console.log('Google button clicked');
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

  return (
    <>
      {showPhoneSignIn ? (
        <PhoneSignIn 
          onBack={() => setShowPhoneSignIn(false)}
          onClose={() => setShowPhoneSignIn(false)}
          isSignUp={false}
        />
      ) : (
        <>
          <div className="min-h-screen flex items-center justify-center px-4 py-8">
            <div className="max-w-sm w-full space-y-6">
              {/* Header Section */}
              <div className="flex flex-col items-center text-center space-y-2">
                <img src={logo} alt="Logo" className="h-12 w-auto" />
                <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                <p className="text-sm text-gray-600">
                  Sign in to continue to your account
                </p>
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
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
                      required
                      className={`block w-full pl-10 pr-3 h-12 border ${
                        fieldErrors.email ? 'border-red-500' : 'border-gray-300'
                      } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:placeholder-gray-400`}
                    />
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
                  <div className="mt-2 text-right">
                    <Link to="/forgot-password" className="text-sm text-primary-400 hover:text-primary-500">
                      Forgot Password?
                    </Link>
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center items-center h-12 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </button>

                  {/* Divider with text */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  {/* Social Login Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {socialButtons.map((props) => (
                      <SocialButton 
                        key={props.name} 
                        {...props} 
                      />
                    ))}
                  </div>
                </div>
              </form>

              <div className="flex flex-col items-center space-y-4 mt-4">
                <p className="text-sm text-gray-600 text-center">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-primary-400 hover:text-primary-500">
                    Sign Up
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
              Sign in successful!
            </Alert>
          </Snackbar>
        </>
      )}
    </>
  );
};

export default SignIn;

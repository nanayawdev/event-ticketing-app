import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
/*import './SignUp.css';*/
import logo from '../../assets/icons/nylogo.png';
import { Snackbar, Alert, LinearProgress } from '@mui/material';
import PhoneSignUp from '../PhoneSignUp/PhoneSignUp';
import { FaPhoneAlt, FaGoogle, FaGithub, FaFacebookF, FaApple} from 'react-icons/fa';
import { CircleUser, AtSign, Key, Eye, EyeClosed } from 'lucide-react';

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
  const [showPassword, setShowPassword] = useState(false);

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
    <>
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-8">
          <div className="flex flex-col items-center text-center space-y-2">
            <img src={logo} alt="Logo" className="h-12 w-auto" />
            <h2 className="text-3xl font-bold text-gray-900">Get Started</h2>
            <p className="text-sm text-gray-600">
              Revolutionize your voting experience today.
            </p>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
            {/* Full Name Input */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CircleUser className="h-5 w-5 text-gray-400" />
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
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    fieldErrors.fullName ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <AtSign className="h-5 w-5 text-gray-400" />
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
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    fieldErrors.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-gray-400" />
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
                  className={`block w-full pl-10 pr-10 py-2 border ${
                    fieldErrors.password ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
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

            <div className="space-y-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? 'Registering...' : 'Register'}
              </button>

              <div className="grid grid-cols-5 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center p-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                >
                  <FaGoogle className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center p-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                >
                  <FaGithub className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center p-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                >
                  <FaFacebookF className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center p-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                >
                  <FaApple className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={handlePhoneSignUp}
                  className="flex items-center justify-center p-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                >
                  <FaPhoneAlt className="h-5 w-5" />
                </button>
              </div>
            </div>
          </form>

          <div className="flex flex-col items-center space-y-4 mt-6">
            <p className="text-sm text-gray-600 text-center">
              By signing up, you agree to our{' '}
              <Link to="/terms" className="text-indigo-600 hover:text-indigo-500">
                Terms of service
              </Link>{' '}
              &{' '}
              <Link to="/privacy" className="text-indigo-600 hover:text-indigo-500">
                Privacy Policy
              </Link>
            </p>

            <p className="text-sm text-gray-600 text-center">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
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
  );
};

export default SignUp;
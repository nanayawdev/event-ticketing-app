import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaGoogle, FaPhoneAlt } from 'react-icons/fa';
import { AtSign, Key, EyeClosed, Eye } from 'lucide-react';
import logo from '../../assets/icons/nylogo.png';
import SocialButton from './SocialButton';
import PhoneSignIn from '../PhoneSignIn/PhoneSignIn';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPhoneSignIn, setShowPhoneSignIn] = useState(false);
  const navigate = useNavigate();

  const handlePhoneClick = () => {
    setShowPhoneSignIn(true);
  };

  const socialButtons = [
    { icon: FaGoogle, name: 'Google', color: 'hover:bg-red-50' },
    { icon: FaPhoneAlt, name: 'Phone', color: 'hover:bg-green-50', onClick: handlePhoneClick }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api-server.krontiva.africa/api:BnSaGAXN/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-white dark:bg-gray-900">
      <div className="max-w-sm w-full space-y-6">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center space-y-2">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Sign in to continue to your account
          </p>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AtSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full pl-10 pr-3 h-12 border border-gray-300 
                  rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                  dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                placeholder="name@example.com"
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
                <Key className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full pl-10 pr-10 h-12 border border-gray-300 
                  rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                  dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                placeholder="Your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" />
                ) : (
                  <EyeClosed className="h-5 w-5 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 
                  border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500 
                dark:text-indigo-400 dark:hover:text-indigo-300">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center h-12 px-4 
                border border-transparent rounded-md shadow-sm text-sm font-medium 
                text-white bg-indigo-600 hover:bg-indigo-700 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                disabled:opacity-50
                dark:focus:ring-offset-gray-900"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>

            {/* Divider with "Or login with" text */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                  Or login with
                </span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-3">
              {socialButtons.map((props) => (
                <SocialButton key={props.name} {...props} />
              ))}
            </div>
          </div>
        </form>

        {/* Updated Sign Up Link styling */}
        <div className="flex flex-col items-center space-y-4 mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500 
              dark:text-indigo-400 dark:hover:text-indigo-300">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      {showPhoneSignIn && (
        <PhoneSignIn 
          onBack={() => setShowPhoneSignIn(false)}
          onClose={() => setShowPhoneSignIn(false)}
          isSignUp={false}
        />
      )}
    </div>
  );
};

export default Login;

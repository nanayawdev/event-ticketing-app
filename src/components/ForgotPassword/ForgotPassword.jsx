import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AtSign } from 'lucide-react';
import logo from '../../assets/icons/nylogo.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch('https://api-server.krontiva.africa/api:BnSaGAXN/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send reset link');
      }

      setSuccessMessage('Password reset link has been sent to your email.');
      setEmail('');
    } catch (err) {
      setError('Failed to send reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-white dark:bg-gray-900">
      <div className="max-w-sm w-full space-y-6">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center space-y-2">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-12 w-auto" />
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Forgot Password?
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        {successMessage && (
          <div className="text-green-500 text-sm text-center">{successMessage}</div>
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

          {/* Submit Button */}
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
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>

          {/* Back to Login Link */}
          <div className="text-center">
            <Link 
              to="/login" 
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 
                dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword; 
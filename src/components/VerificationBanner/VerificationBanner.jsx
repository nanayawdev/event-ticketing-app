import React from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const VerificationBanner = ({ onClose }) => {
  return (
    <div className="sticky top-0 z-50 bg-red-600 text-white py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <div className="ml-3 font-medium">
              <span className="md:hidden">Welcome to Tickrfly!</span>
              <span className="hidden md:inline font-normal">Welcome to Tickrfly! Kindly provide the requested information to complete your account registration.</span>
            </div>
          </div>
          <div className="order-3 mt-1 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
            <Link
              to="/onboarding"
              className="flex items-center justify-center px-4 py-1 border border-transparent rounded-md shadow-sm text-xs font-normal text-red-600 bg-white hover:bg-red-400 hover:text-white transition-colors"
            >
              Verify Account
            </Link>
          </div>
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
              type="button"
              onClick={onClose}
              className="-mr-1 flex p-2 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2 transition-colors"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationBanner; 
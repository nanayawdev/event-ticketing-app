import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiSettings4Fill } from 'react-icons/ri';

const CookieConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(() => {
    return !localStorage.getItem('cookieConsent');
  });

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
  };

  const handleAllow = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleSettings = () => {
    window.location.href = '/cookie-settings';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 left-5 right-5 max-w-[1200px] mx-auto bg-gray-900 text-gray-50 p-6 flex justify-between items-center rounded-lg shadow-md z-[1000] md:flex-row flex-col">
      <div className="flex-1 mr-8">
        <h2 className="text-gray-50 mb-3 font-normal">
          This website uses cookies
        </h2>
        <p className="max-w-3xl text-gray-50 m-0 leading-relaxed">
          We use cookies for website functionality, to understand how you interact with the website, to improve your browsing experience, and for ad personalisation.
          Check our{' '}
          <Link 
            to="/cookie-declaration" 
            className="text-sea-green-400 underline font-bold hover:text-sea-400 transition-colors duration-300"
          >
            Cookie declaration
          </Link>{' '}
          for more information and preferences.
        </p>
      </div>
      
      <div className="flex gap-4 items-center">
        <button
          onClick={handleReject}
          className="px-6 py-3 border border-gray-50 rounded-lg text-tag font-normal hover:bg-white/10 transition-all duration-300"
        >
          Reject all
        </button>
        <button
          onClick={handleAllow}
          className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg text-tag font-normal hover:bg-gray-200 transition-all duration-300"
        >
          Allow all
        </button>
        <button
          onClick={handleSettings}
          className="p-[0.55rem] bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-all duration-300 flex items-center justify-center"
        >
          <RiSettings4Fill 
            className="w-6 h-6 transition-transform duration-300 hover:rotate-90 hover:text-primary-400" 
          />
        </button>
      </div>
    </div>
  );
};

export default CookieConsentBanner;

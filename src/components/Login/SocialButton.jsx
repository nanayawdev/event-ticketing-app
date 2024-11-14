import React, { useState } from 'react';

const SocialButton = ({ icon: Icon, name, onClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="w-full inline-flex items-center justify-center p-3 rounded-lg border border-gray-200 bg-white text-gray-500 hover:text-gray-700 transition-all duration-200 focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={onClick}
      >
        <Icon className="w-5 h-5" />
      </button>
      
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-md whitespace-nowrap dark:bg-gray-700">
          Sign up with {name}
          {/* Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
            <div className="w-0 h-0 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialButton; 
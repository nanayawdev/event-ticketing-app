import React, { useState } from 'react';

const SocialButton = ({ icon: Icon, name, color, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-2 w-full h-12 px-4 
        border border-gray-300 rounded-md shadow-sm text-sm font-medium 
        text-gray-700 bg-white hover:bg-gray-50 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
        dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 
        dark:hover:bg-gray-700 ${color}`}
    >
      <Icon className="h-5 w-5" />
      <span>Login with {name}</span>
    </button>
  );
};

export default SocialButton; 
import React from 'react';
import { UserPlus } from 'lucide-react';
import profilePlaceholder from '../../assets/images/jkstudiios3.jpeg';

const ProfileCard = () => {
  return (
    <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-lg max-w-sm">
      <div className="flex justify-between gap-3">
        <div className="flex-1">
          <div className="flex gap-2 mb-2">
            <img 
              src={profilePlaceholder} 
              alt="CharterHouse profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <h2 className="font-bold text-gray-900 dark:text-gray-50 leading-tight">CharterHouse</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-tight">@charterhouse</p>
            </div>
          </div>
          
          <p className="text-gray-500 dark:text-gray-200 text-sm pr-2">
            CharterHouse specializes in creating unforgettable experiences.
          </p>
          
          <div className="flex gap-3 mt-2 text-sm">
            <span className="text-gray-500 dark:text-gray-200">
              <span className="font-medium text-gray-900 dark:text-gray-50">4</span> Following
            </span>
            <span className="text-gray-500 dark:text-gray-200">
              <span className="font-medium text-gray-900 dark:text-gray-50">97.1K</span> Followers
            </span>
          </div>
        </div>

        <button className="flex items-center gap-1 px-3 h-8 bg-primary-600 dark:bg-gray-700 text-gray-50 dark:text-gray-50 rounded-md hover:bg-primary-700 dark:hover:bg-gray-300 transition-colors flex-shrink-0">
          <UserPlus size={16} />
          <span className="text-sm font-medium">Follow</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, CalendarPlus, ChevronDown } from 'lucide-react';
import LogoutModal from '../LogoutModal/LogoutModal';
import { checkAuthAndGetProfile } from '../../utils/auth';

const LoginProfileDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userData, setUserData] = useState({
    BusinessName: '',
    Email: ''
  });
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await checkAuthAndGetProfile();
        setUserData({
          BusinessName: response.BusinessName || '',
          Email: response.Email || ''
        });
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    setIsDropdownOpen(false);
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('businessName');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('authChange'));
    setShowLogoutModal(false);
    navigate('/');
  };

  const handleCreateEvent = () => {
    setIsDropdownOpen(false);
    navigate('/dashboard', { state: { activeTab: 'Create Event' } });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 px-2 sm:px-4 py-2 text-[13px] font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
      >
        <div className="w-7 h-7 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 
          flex items-center justify-center text-white font-medium shadow-lg shadow-blue-500/20
          group-hover:shadow-blue-500/30 transition-shadow">
          {userData.BusinessName ? userData.BusinessName.substring(0, 2).toUpperCase() : ''}
        </div>
        <span>{userData.BusinessName}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isDropdownOpen && (
        <div className="absolute top-full right-0 mt-1 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button
              onClick={handleCreateEvent}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <CalendarPlus className="h-4 w-4 mr-2" />
              Create Event
            </button>
            <button
              onClick={handleLogoutClick}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}

      <LogoutModal 
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
};

export default LoginProfileDropdown; 
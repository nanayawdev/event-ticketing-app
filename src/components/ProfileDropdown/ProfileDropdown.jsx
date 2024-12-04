import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import LogoutModal from '../LogoutModal/LogoutModal';
import { checkAuthAndGetProfile } from '../../utils/auth';
import { LogOut, Settings } from 'lucide-react';

const ProfileDropdown = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userData, setUserData] = useState({
    BusinessName: '',
    Email: ''
  });
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleSettingsClick = (e) => {
    e.preventDefault();
    console.log('1. Settings button clicked');
    try {
      setIsOpen(false);
      console.log('2. Dropdown closed');
      console.log('3. Attempting to navigate to /settings');
      navigate('/settings');
      console.log('4. Navigation completed');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    console.log('1. Logout button clicked');
    try {
      setIsOpen(false);
      console.log('2. Dropdown closed');
      console.log('3. Opening logout modal');
      setShowLogoutModal(true);
      console.log('4. Logout modal opened');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => {
          console.log('Profile button clicked, toggling dropdown');
          setIsOpen(!isOpen);
        }}
        className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-colors group"
      >
        <div className="w-7 h-7 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 
          flex items-center justify-center text-white font-medium shadow-lg shadow-blue-500/20
          group-hover:shadow-blue-500/30 transition-shadow">
          {userData.BusinessName ? userData.BusinessName.substring(0, 2).toUpperCase() : ''}
        </div>
        <span className="text-xs font-medium text-gray-700 dark:text-gray-200">
          {userData.BusinessName}
        </span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-lg 
            border border-gray-200/80 dark:border-gray-700/80 overflow-hidden z-[9999]"
        >
          <div className="py-1">
            {/* Settings Button */}
            <button
              type="button"
              onClick={handleSettingsClick}
              className="w-full flex items-center px-3 py-2 text-left hover:bg-gray-50/80 dark:hover:bg-gray-800/80"
            >
              <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-lg 
                bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                <Settings className="w-3 h-3" />
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Settings</span>
            </button>

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogoutClick}
              className="w-full flex items-center px-3 py-2 text-left text-red-600 dark:text-red-400 hover:bg-red-50/80 dark:hover:bg-red-950/50"
            >
              <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-lg 
                bg-red-50 dark:bg-red-950/50">
                <LogOut className="w-3 h-3" />
              </div>
              <span className="ml-2 text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}

      <LogoutModal 
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => {
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          if (onLogout) onLogout();
          navigate('/login');
        }}
      />
    </div>
  );
};

export default ProfileDropdown; 
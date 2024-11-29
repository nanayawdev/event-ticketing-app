import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import LogoutModal from '../LogoutModal/LogoutModal';
import { checkAuthAndGetProfile } from '../../utils/auth';
import { 
  Shield, 
  CreditCard, 
  Wallet, 
  Bell, 
  Building, 
  Link2, 
  Activity,
  LogOut,
  Ellipsis,
} from 'lucide-react';

const ProfileDropdown = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userData, setUserData] = useState({
    BusinessName: '',
    Email: ''
  });
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const profileMenuItems = [
    {
      title: 'Organization Profile',
      description: 'Manage your organization details',
      icon: Building,
      path: 'organization'
    },
    {
      title: 'Security Settings',
      description: 'Change password and 2FA settings',
      icon: Shield,
      path: 'security'
    },
    {
      title: 'Payment Methods',
      description: 'Manage your payment methods',
      icon: CreditCard,
      path: 'payments'
    },
    {
      title: 'Payout Settings',
      description: 'Configure your payout preferences',
      icon: Wallet,
      path: 'payouts'
    },
    {
      title: 'Notification Settings',
      description: 'Manage your notifications',
      icon: Bell,
      path: 'notifications'
    },
    {
      title: 'Connected Accounts',
      description: 'Link your social and platform accounts',
      icon: Link2,
      path: 'connected-accounts'
    },
    {
      title: 'Account Activity',
      description: 'View login history and recent actions',
      icon: Activity,
      path: 'activity'
    }
  ];

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

  const handleMenuItemClick = (path) => {
    setIsOpen(false);
    navigate(`/settings/${path}`);
  };

  const getDropdownPosition = () => {
    if (!dropdownRef.current) return { top: 0, left: 0 };
    const rect = dropdownRef.current.getBoundingClientRect();
    return {
      top: rect.bottom + window.scrollY,
      left: rect.right - 256,
    };
  };

  const handleLogoutClick = () => {
    setIsOpen(false);
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
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
        <Ellipsis className={`w-3.5 h-3.5 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && createPortal(
        <div
          style={{
            position: 'absolute',
            ...getDropdownPosition(),
          }}
          className="w-64 sm:w-64 bg-white dark:bg-gray-900 rounded-xl shadow-lg 
            border border-gray-200/80 dark:border-gray-700/80 backdrop-blur-xl overflow-hidden z-[9999] transition-all duration-200 ease-out"
        >
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto py-1">
            {/* User Info Section */}
            <div className="px-2.5 sm:px-3 py-1.5 sm:py-2 border-b border-gray-200/80 dark:border-gray-700/80">
              <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100">
                {userData.BusinessName}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                {userData.Email}
              </p>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              {profileMenuItems.map((item) => (
                <button
                  key={item.title}
                  className="w-full flex items-center px-2.5 sm:px-3 py-1.5 sm:py-2 hover:bg-gray-50/80 dark:hover:bg-gray-800/80 transition-colors"
                  onClick={() => handleMenuItemClick(item.path)}
                >
                  <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-lg 
                    bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                    <item.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                  <div className="ml-2 text-left">
                    <p className="text-[11px] sm:text-xs font-medium text-gray-900 dark:text-gray-100">{item.title}</p>
                    <p className="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400">{item.description}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Update Logout Button */}
            <div className="border-t border-gray-200/80 dark:border-gray-700/80 px-2 sm:px-3 py-1">
              <button
                onClick={handleLogoutClick}
                className="w-full flex items-center px-2.5 sm:px-3 py-1.5 sm:py-2 text-red-600 dark:text-red-400 
                  hover:bg-red-50/80 dark:hover:bg-red-950/50 rounded-lg transition-colors"
              >
                <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-lg 
                  bg-red-50 dark:bg-red-950/50">
                  <LogOut className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
                <span className="ml-2 text-[11px] sm:text-xs font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      <LogoutModal 
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
};

export default ProfileDropdown; 
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { 
  UserCircle, 
  Shield, 
  CreditCard, 
  Wallet, 
  Bell, 
  Building, 
  Key, 
  Link2, 
  FileText, 
  Activity,
  LogOut,
  Ellipsis,
  Settings,
  HelpCircle 
} from 'lucide-react';

const ProfileDropdown = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const profileMenuItems = [
    {
      title: 'Organization Profile',
      description: 'Manage your organization details',
      icon: Building,
      path: '/settings/organization'
    },
    {
      title: 'Security Settings',
      description: 'Change password and 2FA settings',
      icon: Shield,
      path: '/settings/security'
    },
    {
      title: 'Payment Methods',
      description: 'Manage your payment methods',
      icon: CreditCard,
      path: '/settings/payments'
    },
    {
      title: 'Payout Settings',
      description: 'Configure your payout preferences',
      icon: Wallet,
      path: '/settings/payouts'
    },
    {
      title: 'Notification Settings',
      description: 'Manage your notifications',
      icon: Bell,
      path: '/settings/notifications'
    },
    {
      title: 'Connected Accounts',
      description: 'Link your social and platform accounts',
      icon: Link2,
      path: '/settings/connected-accounts'
    },
    {
      title: 'Account Activity',
      description: 'View login history and recent actions',
      icon: Activity,
      path: '/settings/activity'
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

  const handleMenuItemClick = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  const getDropdownPosition = () => {
    if (!dropdownRef.current) return { top: 0, left: 0 };
    const rect = dropdownRef.current.getBoundingClientRect();
    return {
      top: rect.bottom + window.scrollY,
      left: rect.right - 256,
    };
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
          NY
        </div>
        <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Nana Yaw</span>
        <Ellipsis className={`w-3.5 h-3.5 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && createPortal(
        <div
          style={{
            position: 'absolute',
            ...getDropdownPosition(),
          }}
          className="w-64 sm:w-64 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-lg 
            border border-gray-200/80 dark:border-gray-700/80 backdrop-blur-xl overflow-hidden z-[9999] transition-all duration-200 ease-out"
        >
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto py-1">
            {/* User Info */}
            <div className="px-2.5 sm:px-3 py-1.5 sm:py-2 border-b border-gray-200/80 dark:border-gray-700/80">
              <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100">John Doe</p>
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">john.doe@example.com</p>
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

            {/* Logout Button */}
            <div className="border-t border-gray-200/80 dark:border-gray-700/80 px-2 sm:px-3 py-1">
              <button
                onClick={onLogout}
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
    </div>
  );
};

export default ProfileDropdown; 
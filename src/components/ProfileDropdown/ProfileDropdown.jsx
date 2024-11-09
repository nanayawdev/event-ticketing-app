import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { motion, AnimatePresence } from 'framer-motion';

const ProfileDropdown = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const profileMenuItems = [
    {
      title: 'Personal Information',
      description: 'Update your name, email, and photo',
      icon: UserCircle,
      path: '/settings/profile'
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
      title: 'Organization Profile',
      description: 'Manage your organization details',
      icon: Building,
      path: '/settings/organization'
    },
    {
      title: 'API & Integrations',
      description: 'Manage API keys and connections',
      icon: Key,
      path: '/settings/integrations'
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

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100/80 transition-colors group"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 
          flex items-center justify-center text-white font-medium shadow-lg shadow-blue-500/20
          group-hover:shadow-blue-500/30 transition-shadow">
          JD
        </div>
        <span className="text-sm font-medium text-gray-700">John Doe</span>
        <Ellipsis className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200/80 
              backdrop-blur-xl overflow-hidden z-50"
          >
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto py-2">
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-200/80">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">john.doe@example.com</p>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                {profileMenuItems.map((item, index) => (
                  <motion.button
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="w-full flex items-center px-4 py-2.5 hover:bg-gray-50/80 transition-colors"
                    onClick={() => handleMenuItemClick(item.path)}
                  >
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div className="ml-3 text-left">
                      <p className="text-sm font-medium text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Logout Button */}
              <div className="border-t border-gray-200/80 px-2 py-2">
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: profileMenuItems.length * 0.05 }}
                  onClick={onLogout}
                  className="w-full flex items-center px-4 py-2.5 text-red-600 hover:bg-red-50/80 rounded-lg transition-colors"
                >
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-red-50">
                    <LogOut className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-sm font-medium">Logout</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown; 
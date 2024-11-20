import { useState, useEffect } from 'react';
import { NavLink, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { 
  Building, Shield, CreditCard, Wallet, Bell, 
  Link2, Activity, Menu, X 
} from 'lucide-react';

// Import all settings pages (removed ProfileSettings)
import OrganizationSettings from './OrganizationSettings';
import SecuritySettings from './SecuritySettings';
import PaymentSettings from './PaymentSettings';
import PayoutSettings from './PayoutSettings';
import NotificationSettings from './NotificationSettings';
import ConnectedAccounts from './ConnectedAccounts';
import AccountActivity from './AccountActivity';

const SettingsLayout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const settingsNavigation = [
    {
      title: 'Event Organizer',
      path: 'organization',
      icon: Building
    },
    {
      title: 'Security',
      path: 'security',
      icon: Shield
    },
    {
      title: 'Payment Methods',
      path: 'payments',
      icon: CreditCard
    },
    {
      title: 'Payout Settings',
      path: 'payouts',
      icon: Wallet
    },
    {
      title: 'Notifications',
      path: 'notifications',
      icon: Bell
    },
    {
      title: 'Connected Accounts',
      path: 'connected-accounts',
      icon: Link2
    },
    {
      title: 'Account Activity',
      path: 'activity',
      icon: Activity
    }
  ];

  return (
    <div className="min-h-screen dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back to Dashboard Button with Tooltip */}
        <div className="flex items-center mb-6 gap-3">
          <div className="relative">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-800/80 dark:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            {showTooltip && (
              <div className="
                hidden md:block
                absolute top-1/2 -translate-y-1/2 z-50 animate-fade-in
                md:right-full md:mr-2
                lg:right-full lg:mr-2
                px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap
              ">
                Click to return to Dashboard
                <div className="
                  absolute top-1/2 -translate-y-1/2 -right-1 
                  w-2 h-2 bg-gray-900 rotate-45
                "/>
              </div>
            )}
          </div>
          <h1 className="text-xl font-semibold dark:text-white">Account Settings</h1>
        </div>

        {/* Mobile Menu Button - Only visible on mobile */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-800/80 dark:text-white transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <div className="md:flex md:gap-6">
          {/* Settings Navigation */}
          <aside className={`
            fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 lg:static lg:block
            transform rounded-xl ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0 transition-transform duration-200 ease-in-out
            ${isSidebarOpen ? 'block' : 'hidden'}
          `}>
            {/* Close button for mobile */}
            <div className="lg:hidden p-4 flex justify-end">
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-800/80 dark:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="space-y-1 sticky top-8 p-4">
              {settingsNavigation.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) => `
                    flex items-center px-4 py-3 text-sm font-medium rounded-xl
                    transition-all duration-200
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/80'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.title}
                </NavLink>
              ))}
            </nav>
          </aside>

          {/* Overlay for mobile */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Settings Content */}
          <main className="flex-1 w-full">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200/80 dark:border-gray-700/80">
              <Routes>
                <Route path="organization" element={<OrganizationSettings />} />
                <Route path="security" element={<SecuritySettings />} />
                <Route path="payments" element={<PaymentSettings />} />
                <Route path="payouts" element={<PayoutSettings />} />
                <Route path="notifications" element={<NotificationSettings />} />
                <Route path="connected-accounts" element={<ConnectedAccounts />} />
                <Route path="activity" element={<AccountActivity />} />
                <Route path="/" element={<Navigate to="organization" replace />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout; 
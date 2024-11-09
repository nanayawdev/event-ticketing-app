import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import { 
  Building, Shield, CreditCard, Wallet, Bell, 
  Key, Link2, Activity 
} from 'lucide-react';

// Import all settings pages (removed ProfileSettings)
import OrganizationSettings from './OrganizationSettings';
import SecuritySettings from './SecuritySettings';
import PaymentSettings from './PaymentSettings';
import PayoutSettings from './PayoutSettings';
import NotificationSettings from './NotificationSettings';
import APISettings from './APISettings';
import ConnectedAccounts from './ConnectedAccounts';
import AccountActivity from './AccountActivity';

const SettingsLayout = () => {
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
      title: 'API & Integrations',
      path: 'integrations',
      icon: Key
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
    <div className="min-h-screen bg-gray-50/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:gap-6">
          {/* Settings Navigation */}
          <aside className="md:w-64 flex-shrink-0">
            <nav className="space-y-1 sticky top-8">
              {settingsNavigation.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center px-4 py-3 text-sm font-medium rounded-xl
                    transition-all duration-200
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                      : 'text-gray-600 hover:bg-gray-100/80'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.title}
                </NavLink>
              ))}
            </nav>
          </aside>

          {/* Settings Content */}
          <main className="mt-6 md:mt-0 md:flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200/80">
              <Routes>
                <Route path="organization" element={<OrganizationSettings />} />
                <Route path="security" element={<SecuritySettings />} />
                <Route path="payments" element={<PaymentSettings />} />
                <Route path="payouts" element={<PayoutSettings />} />
                <Route path="notifications" element={<NotificationSettings />} />
                <Route path="integrations" element={<APISettings />} />
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
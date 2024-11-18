import { useState } from 'react';
import { 
  Facebook, Twitter, Instagram, Linkedin, Youtube, 
  CheckCircle2 
} from 'lucide-react';

const ConnectedAccounts = () => {
  const [socialAccounts] = useState([
    {
      name: 'Facebook',
      icon: Facebook,
      status: 'Connected as John Doe',
      connected: true
    },
    {
      name: 'Twitter',
      icon: Twitter,
      status: 'Not connected',
      connected: false
    },
    {
      name: 'Instagram',
      icon: Instagram,
      status: 'Connected as @johndoe',
      connected: true
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      status: 'Not connected',
      connected: false
    },
    {
      name: 'YouTube',
      icon: Youtube,
      status: 'Not connected',
      connected: false
    }
  ]);

  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Connected Accounts</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your connected social and service accounts.
          </p>
        </div>

        {/* Connected Accounts Grid - removed grid in favor of single column */}
        <div>
          {/* Social Media Accounts */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Social Media</h3>
            <div className="space-y-3">
              {socialAccounts.map((account) => (
                <div key={account.name} className="flex flex-col sm:flex-row sm:items-center 
                  justify-between gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <account.icon className="w-5 h-5 text-gray-600" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{account.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{account.status}</p>
                    </div>
                  </div>
                  <button className={`px-3 py-1.5 text-sm rounded-lg transition-colors
                    ${account.connected 
                      ? 'text-red-600 hover:bg-red-50' 
                      : 'text-blue-600 hover:bg-blue-50'
                    }`}>
                    {account.connected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectedAccounts; 
import { useState } from 'react';
import { Bell, Mail, Phone, MessageSquare } from 'lucide-react';

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    accountUpdates: true,
    newEvents: true,
    ticketSales: true,
    paymentUpdates: true,
    marketing: false
  });

  const [pushNotifications, setPushNotifications] = useState({
    accountUpdates: true,
    newEvents: false,
    ticketSales: true,
    paymentUpdates: true,
    marketing: false
  });

  const [smsNotifications, setSmsNotifications] = useState({
    accountUpdates: false,
    ticketSales: true,
    paymentUpdates: true,
    marketing: false
  });

  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Notification Settings</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage how you receive notifications and updates.
          </p>
        </div>

        {/* Email Notifications */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Email Notifications</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(emailNotifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 
                bg-white dark:bg-gray-800 
                rounded-lg border border-gray-200 dark:border-gray-700">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive email notifications for {key.toLowerCase().replace(/([A-Z])/g, ' $1')}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setEmailNotifications(prev => ({
                      ...prev,
                      [key]: e.target.checked
                    }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none 
                    peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer 
                    peer-checked:after:translate-x-full peer-checked:after:border-white 
                    after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                    after:bg-white after:border-gray-300 after:border after:rounded-full 
                    after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600">
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Push Notifications */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Push Notifications</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(pushNotifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 
                bg-white dark:bg-gray-800 
                rounded-lg border border-gray-200 dark:border-gray-700">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive push notifications for {key.toLowerCase().replace(/([A-Z])/g, ' $1')}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setPushNotifications(prev => ({
                      ...prev,
                      [key]: e.target.checked
                    }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none 
                    peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer 
                    peer-checked:after:translate-x-full peer-checked:after:border-white 
                    after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                    after:bg-white after:border-gray-300 after:border after:rounded-full 
                    after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600">
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* SMS Notifications */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">SMS Notifications</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(smsNotifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 
                bg-white dark:bg-gray-800 
                rounded-lg border border-gray-200 dark:border-gray-700">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive SMS notifications for {key.toLowerCase().replace(/([A-Z])/g, ' $1')}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setSmsNotifications(prev => ({
                      ...prev,
                      [key]: e.target.checked
                    }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none 
                    peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer 
                    peer-checked:after:translate-x-full peer-checked:after:border-white 
                    after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                    after:bg-white after:border-gray-300 after:border after:rounded-full 
                    after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600">
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 
            hover:bg-blue-700 rounded-lg shadow-sm transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings; 
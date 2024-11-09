import { useState } from 'react';
import { Shield, Smartphone, Key, AlertCircle } from 'lucide-react';

const SecuritySettings = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [show2FAForm, setShow2FAForm] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [sessions] = useState([
    {
      id: 1,
      device: 'Chrome on Windows',
      location: 'Accra, Ghana',
      lastActive: 'Active now',
      isCurrent: true
    },
    {
      id: 2,
      device: 'Safari on iPhone',
      location: 'Kumasi, Ghana',
      lastActive: '2 hours ago',
      isCurrent: false
    }
  ]);

  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Security Settings</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your account security and authentication methods.
          </p>
        </div>

        {/* Password Section */}
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
          <div className="flex items-center gap-3 mb-4">
            <Key className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">Password</h3>
          </div>

          <div className="space-y-4">
            {!showPasswordForm ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between 
                gap-3 p-3 bg-white rounded-lg border border-gray-200">
                <div>
                  <h4 className="font-medium text-gray-900">Change Password</h4>
                  <p className="text-sm text-gray-500">
                    Last changed 3 months ago
                  </p>
                </div>
                <button
                  onClick={() => setShowPasswordForm(true)}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 
                    rounded-lg transition-colors"
                >
                  Update
                </button>
              </div>
            ) : (
              <form className="p-3 bg-white rounded-lg border border-gray-200 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm(prev => ({
                      ...prev,
                      currentPassword: e.target.value
                    }))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 
                      rounded-lg shadow-sm focus:outline-none focus:ring-1 
                      focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm(prev => ({
                      ...prev,
                      newPassword: e.target.value
                    }))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 
                      rounded-lg shadow-sm focus:outline-none focus:ring-1 
                      focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm(prev => ({
                      ...prev,
                      confirmPassword: e.target.value
                    }))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 
                      rounded-lg shadow-sm focus:outline-none focus:ring-1 
                      focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPasswordForm(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 
                      hover:bg-gray-50 rounded-lg border border-gray-300 
                      transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white 
                      bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm 
                      transition-colors"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
          <div className="flex items-center gap-3 mb-4">
            <Smartphone className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">
              Two-Factor Authentication
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between 
            gap-3 p-3 bg-white rounded-lg border border-gray-200">
            <div>
              <h4 className="font-medium text-gray-900">
                {is2FAEnabled ? 'Two-Factor Authentication Enabled' : 'Enable Two-Factor Authentication'}
              </h4>
              <p className="text-sm text-gray-500">
                Add an extra layer of security to your account
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={is2FAEnabled}
                onChange={() => setIs2FAEnabled(!is2FAEnabled)}
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
        </div>

        {/* Active Sessions */}
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">Active Sessions</h3>
          </div>

          <div className="space-y-3">
            {sessions.map((session) => (
              <div key={session.id} className="flex flex-col sm:flex-row sm:items-center 
                justify-between gap-3 p-3 bg-white rounded-lg border border-gray-200">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-900">{session.device}</h4>
                    {session.isCurrent && (
                      <span className="px-2 py-0.5 text-xs font-medium text-green-600 
                        bg-green-50 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-sm text-gray-500 space-y-1">
                    <p>{session.location}</p>
                    <p>{session.lastActive}</p>
                  </div>
                </div>
                {!session.isCurrent && (
                  <button className="px-4 py-2 text-sm font-medium text-red-600 
                    hover:bg-red-50 rounded-lg transition-colors">
                    End Session
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Security Alert */}
        <div className="flex items-start gap-3 p-3 sm:p-4 bg-yellow-50 rounded-lg">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-yellow-800">
              Security Recommendation
            </h4>
            <p className="mt-1 text-sm text-yellow-700">
              Enable two-factor authentication to add an extra layer of security to your account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings; 
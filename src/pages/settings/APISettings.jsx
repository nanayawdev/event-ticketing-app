import { useState } from 'react';
import { Key, Copy, RefreshCw, Eye, EyeOff } from 'lucide-react';

const APISettings = () => {
  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">API & Integrations</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your API keys and third-party integrations.
          </p>
        </div>

        {/* API Keys Section */}
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
          <h3 className="text-lg font-medium text-gray-900">API Keys</h3>
          <div className="mt-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between 
              gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <div>
                <h4 className="font-medium text-gray-900">Production Key</h4>
                <p className="text-sm text-gray-500">Used for live transactions</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 
                  rounded-lg transition-colors">
                  View Key
                </button>
                <button className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 
                  rounded-lg transition-colors">
                  Revoke
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between 
              gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <div>
                <h4 className="font-medium text-gray-900">Test Key</h4>
                <p className="text-sm text-gray-500">Used for testing and development</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 
                  rounded-lg transition-colors">
                  View Key
                </button>
                <button className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 
                  rounded-lg transition-colors">
                  Revoke
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Integrations Section */}
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
          <h3 className="text-lg font-medium text-gray-900">Connected Services</h3>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Add your integration cards here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default APISettings; 
import { useState } from 'react';
import { Key, Copy, RefreshCw, Eye, EyeOff } from 'lucide-react';

const APISettings = () => {
  const [apiKeys, setApiKeys] = useState([
    {
      id: 1,
      name: 'Production API Key',
      key: 'pk_live_123456789',
      created: '2024-01-15',
      lastUsed: '2024-03-10'
    },
    {
      id: 2,
      name: 'Test API Key',
      key: 'pk_test_987654321',
      created: '2024-02-01',
      lastUsed: '2024-03-09'
    }
  ]);

  const [showKey, setShowKey] = useState({});

  const toggleKeyVisibility = (id) => {
    setShowKey(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Add toast notification here
  };

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">API & Integrations</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your API keys and integrate with external services.
          </p>
        </div>

        {/* API Keys Section */}
        <div className="space-y-4">
          {apiKeys.map(key => (
            <div key={key.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Key className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{key.name}</h3>
                    <div className="flex items-center space-x-2">
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {showKey[key.id] ? key.key : '•'.repeat(20)}
                      </code>
                      <button
                        onClick={() => toggleKeyVisibility(key.id)}
                        className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        {showKey[key.id] ? (
                          <EyeOff className="w-4 h-4 text-gray-500" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                      <button
                        onClick={() => copyToClipboard(key.key)}
                        className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <Copy className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <p>Created: {key.created}</p>
                  <p>Last used: {key.lastUsed}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Generate New Key */}
        <button
          className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-blue-600 
            hover:bg-blue-50 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Generate New API Key</span>
        </button>

        {/* Webhook Configuration */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900">Webhook Configuration</h3>
          <p className="mt-1 text-sm text-gray-500">
            Configure webhook endpoints to receive real-time event notifications.
          </p>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Webhook URL
            </label>
            <input
              type="url"
              placeholder="https://your-domain.com/webhook"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2
                focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default APISettings; 
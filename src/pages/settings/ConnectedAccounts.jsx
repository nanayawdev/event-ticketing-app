import { useState } from 'react';
import { 
  Facebook, Twitter, Instagram, Linkedin, Github, 
  CloudOff, Slack, Cable, Link2, CheckCircle2 
} from 'lucide-react';

const ConnectedAccounts = () => {
  const [connections, setConnections] = useState({
    google: true,
    facebook: false,
    twitter: true,
    instagram: false,
    linkedin: true,
    github: false,
    slack: true,
    discord: false
  });

  const toggleConnection = (platform) => {
    setConnections(prev => ({
      ...prev,
      [platform]: !prev[platform]
    }));
  };

  const platforms = [
    { id: 'google', name: 'Google', icon: CloudOff, color: 'text-red-500' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-600' },
    { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'text-blue-400' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-700' },
    { id: 'github', name: 'GitHub', icon: Github, color: 'text-gray-900' },
    { id: 'slack', name: 'Slack', icon: Slack, color: 'text-purple-500' },
    { id: 'discord', name: 'Discord', icon: Cable, color: 'text-indigo-500' }
  ];

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Connected Accounts</h2>
          <p className="mt-1 text-sm text-gray-500">
            Connect your accounts to enable single sign-on and share events across platforms.
          </p>
        </div>

        <div className="space-y-4">
          {platforms.map((platform) => (
            <div key={platform.id} 
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg bg-white flex items-center justify-center ${platform.color}`}>
                  <platform.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{platform.name}</h3>
                  <p className="text-sm text-gray-500">
                    {connections[platform.id] 
                      ? 'Connected' 
                      : `Connect your ${platform.name} account`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => toggleConnection(platform.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors
                  ${connections[platform.id]
                    ? 'text-red-600 hover:bg-red-50'
                    : 'text-blue-600 hover:bg-blue-50'
                  }`}
              >
                {connections[platform.id] ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectedAccounts; 
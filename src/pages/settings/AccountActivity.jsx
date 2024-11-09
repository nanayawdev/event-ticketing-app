import { useState } from 'react';
import { 
  Clock, Globe, Monitor, Smartphone, 
  AlertCircle, CheckCircle, XCircle, Key
} from 'lucide-react';

const AccountActivity = () => {
  const [activities] = useState([
    {
      id: 1,
      type: 'login',
      device: 'Desktop - Chrome',
      location: 'New York, USA',
      ip: '192.168.1.1',
      status: 'success',
      timestamp: '2024-03-10 14:30:00'
    },
    {
      id: 2,
      type: 'password_change',
      device: 'Mobile - Safari',
      location: 'Los Angeles, USA',
      ip: '192.168.1.2',
      status: 'success',
      timestamp: '2024-03-09 09:15:00'
    },
    {
      id: 3,
      type: 'login_attempt',
      device: 'Tablet - Firefox',
      location: 'London, UK',
      ip: '192.168.1.3',
      status: 'failed',
      timestamp: '2024-03-08 18:45:00'
    }
  ]);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'login': return Monitor;
      case 'password_change': return Key;
      case 'login_attempt': return AlertCircle;
      default: return Clock;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return CheckCircle;
      case 'failed': return XCircle;
      default: return AlertCircle;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-500';
      case 'failed': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Account Activity</h2>
          <p className="mt-1 text-sm text-gray-500">
            Review your recent account activity and security events.
          </p>
        </div>

        {/* Current Session */}
        <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
          <div className="flex items-center space-x-3">
            <Monitor className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">Current Session</h3>
              <p className="text-xs sm:text-sm text-gray-500">
                Chrome on Windows • New York, USA
              </p>
            </div>
          </div>
        </div>

        {/* Activity List */}
        <div className="space-y-3 sm:space-y-4">
          {activities.map((activity) => {
            const ActivityIcon = getActivityIcon(activity.type);
            const StatusIcon = getStatusIcon(activity.status);
            const statusColor = getStatusColor(activity.status);

            return (
              <div key={activity.id} className="bg-gray-50 rounded-lg p-3 sm:p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      <ActivityIcon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-medium text-gray-900">
                          {activity.type.replace('_', ' ').toUpperCase()}
                        </h3>
                        <StatusIcon className={`w-4 h-4 ${statusColor}`} />
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500">{activity.device}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Globe className="w-3 h-3 mr-1" />
                          {activity.location}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {activity.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-700">
                    Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center">
          <button className="px-4 py-2 text-sm font-medium text-blue-600 
            hover:bg-blue-50 rounded-lg transition-colors">
            Load More Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountActivity; 
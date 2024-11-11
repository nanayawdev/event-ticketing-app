import React from 'react';
import { Bell } from 'lucide-react';

const NotificationsDropdown = ({ 
  notifications, 
  isOpen, 
  onToggle, 
  onMarkAsRead 
}) => {
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="relative">
      <button 
        className="relative p-2 hover:bg-gray-100/80 rounded-xl transition-colors"
        onClick={onToggle}
      >
        <Bell className="w-5 h-5 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs 
            rounded-full w-4 h-4 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg 
          border border-gray-200/80 backdrop-blur-xl z-50">
          <div className="p-4 border-b border-gray-200/80">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-4 border-b border-gray-200/80 hover:bg-gray-50 
                    cursor-pointer transition-colors ${!notification.isRead ? 'bg-blue-50/50' : ''}`}
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900">{notification.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                    {!notification.isRead && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown; 
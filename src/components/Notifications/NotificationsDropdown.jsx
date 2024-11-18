import React from 'react';
import { Bell } from 'lucide-react';
import { useNotificationsManager } from '../../hooks/useNotificationsManager';

const NotificationsDropdown = ({ isOpen, onToggle }) => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
  } = useNotificationsManager();

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="relative p-2 rounded-xl hover:bg-gray-100/80 transition-colors"
      >
        <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 
            bg-red-500 text-white text-[10px] sm:text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 
            flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 bg-white rounded-xl 
          shadow-lg border border-gray-200/80 overflow-hidden z-50">
          <div className="p-3 sm:p-4 border-b border-gray-200/80 flex justify-between items-center">
            <h3 className="font-semibold text-sm sm:text-base">Notifications</h3>
            {notifications.length > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs sm:text-sm text-blue-600 hover:text-blue-700"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-[60vh] sm:max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 sm:p-4 border-b border-gray-200/80 hover:bg-gray-50 
                    ${!notification.isRead ? 'bg-blue-50/50' : ''}`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm sm:text-base">{notification.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-600">{notification.message}</p>
                      <span className="text-[10px] sm:text-xs text-gray-400">{notification.time}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-[10px] sm:text-xs text-blue-600 hover:text-blue-700 whitespace-nowrap"
                        >
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={() => removeNotification(notification.id)}
                        className="text-[10px] sm:text-xs text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown; 
import React from 'react';
import { BellDot, Check, Trash2 } from 'lucide-react';
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
        className="relative p-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
      >
        <BellDot className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute bottom-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        )}
      </button>

      {isOpen && (
        <div className="fixed sm:absolute left-0 sm:left-auto right-0 top-[60px] sm:top-auto sm:mt-2 
          w-full sm:w-80 bg-white sm:rounded-xl shadow-lg border border-gray-200/80 
          overflow-hidden z-50 h-[calc(100vh-60px)] sm:h-auto">
          <div className="sticky top-0 p-3 sm:p-4 border-b border-gray-200/80 flex justify-between 
            items-center bg-white z-10">
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

          <div className="overflow-y-auto h-full sm:max-h-[400px]">
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
                      <h4 className="font-medium text-[11px] sm:text-xs">{notification.title}</h4>
                      <p className="text-[10px] sm:text-[11px] text-gray-600">{notification.message}</p>
                      <span className="text-[8px] sm:text-[9px] text-gray-400">{notification.time}</span>
                    </div>
                    <div className="flex flex-row gap-1">
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"
                          title="Mark as read"
                        >
                          <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => removeNotification(notification.id)}
                        className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                        title="Remove"
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
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
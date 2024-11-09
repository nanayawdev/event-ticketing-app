import { useState } from 'react';
import { Bell, Mail, MessageSquare, Calendar, Ticket } from 'lucide-react';

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    email: {
      newBooking: true,
      eventReminders: true,
      marketing: false,
      updates: true
    },
    push: {
      newBooking: true,
      eventReminders: true,
      marketing: false,
      updates: false
    }
  });

  const toggleNotification = (type, setting) => {
    setNotifications(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [setting]: !prev[type][setting]
      }
    }));
  };

  const NotificationToggle = ({ type, setting, label, description }) => (
    <div className="flex items-center justify-between py-4">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <button
        onClick={() => toggleNotification(type, setting)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full 
          border-2 border-transparent transition-colors duration-200 ease-in-out 
          ${notifications[type][setting] ? 'bg-blue-600' : 'bg-gray-200'}`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full 
            bg-white shadow ring-0 transition duration-200 ease-in-out
            ${notifications[type][setting] ? 'translate-x-5' : 'translate-x-0'}`}
        />
      </button>
    </div>
  );

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notification Settings</h2>
          <p className="mt-1 text-sm text-gray-500">
            Choose how and when you want to be notified about activity on your account.
          </p>
        </div>

        {/* Email Notifications */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
          </div>
          <div className="mt-4 space-y-4 divide-y divide-gray-200">
            <NotificationToggle
              type="email"
              setting="newBooking"
              label="New Bookings"
              description="When someone books tickets for your event"
            />
            <NotificationToggle
              type="email"
              setting="eventReminders"
              label="Event Reminders"
              description="Reminders about upcoming events you're organizing"
            />
            <NotificationToggle
              type="email"
              setting="marketing"
              label="Marketing Communications"
              description="News, updates, and promotional offers"
            />
            <NotificationToggle
              type="email"
              setting="updates"
              label="Platform Updates"
              description="Important updates about our service"
            />
          </div>
        </div>

        {/* Push Notifications */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">Push Notifications</h3>
          </div>
          <div className="mt-4 space-y-4 divide-y divide-gray-200">
            <NotificationToggle
              type="push"
              setting="newBooking"
              label="New Bookings"
              description="When someone books tickets for your event"
            />
            <NotificationToggle
              type="push"
              setting="eventReminders"
              label="Event Reminders"
              description="Reminders about upcoming events you're organizing"
            />
            <NotificationToggle
              type="push"
              setting="marketing"
              label="Marketing Communications"
              description="News, updates, and promotional offers"
            />
            <NotificationToggle
              type="push"
              setting="updates"
              label="Platform Updates"
              description="Important updates about our service"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 
              hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
          >
            Save Notification Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings; 
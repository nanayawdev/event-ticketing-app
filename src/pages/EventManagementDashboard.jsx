import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  BarChart, 
  Ticket, 
  Banknote, 
  CirclePlus,
  Bell,
  Menu,
  X
} from 'lucide-react';
import LogoutModal from '../components/LogoutModal/LogoutModal';
import ProfileDropdown from '../components/ProfileDropdown/ProfileDropdown';
import NotificationsDropdown from '../components/Notifications/NotificationsDropdown';
import { useNotificationsManager } from '../hooks/useNotificationsManager';
import { useTheme } from '../context/ThemeContext';
import VerificationBanner from '../components/VerificationBanner/VerificationBanner';

// Import dashboard components
import Overview from '../components/dashboard/Overview';
import CreateEvent from '../components/dashboard/CreateEvent';
import ManageEvents from '../components/dashboard/ManageEvents';
import Attendees from '../components/dashboard/Attendees';
import Analytics from '../components/dashboard/Analytics';
import TicketsManagement from '../components/dashboard/TicketsManagement/TicketsManagement';
import Settlements from '../components/dashboard/Settlements';

const EventManagementDashboard = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('Overview');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { addNotification } = useNotificationsManager();
  const { theme } = useTheme();
  const [showVerificationBanner, setShowVerificationBanner] = useState(true);

  // Move the notification to useEffect
  useEffect(() => {
    // Example notification - you can remove this if it's just for testing
    addNotification({
      title: 'New Event Registration',
      message: 'John Doe registered for "Summer Music Festival"',
      time: '5 minutes ago',
      type: 'success'
    });
  }, []); // Empty dependency array means this runs once when component mounts

  const menuItems = [
    { name: 'Overview', icon: LayoutDashboard, component: <Overview /> },
    { name: 'Create Event', icon: CirclePlus, component: <CreateEvent /> },
    { name: 'Manage Events', icon: Calendar, component: <ManageEvents /> },
    { name: 'Attendees', icon: Users, component: <Attendees /> },
    { name: 'Analytics', icon: BarChart, component: <Analytics /> },
    { name: 'Tickets', icon: Ticket, component: <TicketsManagement /> },
    { name: 'Settlements', icon: Banknote, component: <Settlements /> }
  ];

  // Find the active component to render
  const activeComponent = menuItems.find(item => item.name === activeMenu)?.component;

  // Add logout handlers
  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    // Perform logout actions here
    localStorage.removeItem('token'); // Remove auth token
    localStorage.removeItem('user'); // Remove user data
    setIsLogoutModalOpen(false);
    navigate('/login'); // Redirect to login page
  };

  return (
    <>
      {showVerificationBanner && (
        <VerificationBanner onClose={() => setShowVerificationBanner(false)} />
      )}
      <div className="flex h-screen bg-gray-50/95 dark:bg-gray-900">
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navigation */}
          <header className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl border-b border-gray-200/80 dark:border-gray-700/80">
            <div className="flex items-center justify-between px-4">
              {/* Navigation Tabs */}
              <div className="flex overflow-x-auto">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeMenu === item.name;
                  return (
                    <button
                      key={item.name}
                      onClick={() => setActiveMenu(item.name)}
                      className={`
                        flex items-center space-x-2 px-4 py-4 border-b-2 
                        ${isActive 
                          ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400' 
                          : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-4">
                <NotificationsDropdown 
                  isOpen={isNotificationsOpen}
                  onToggle={() => setIsNotificationsOpen(!isNotificationsOpen)}
                />
                <ProfileDropdown onLogout={handleLogoutClick} />
              </div>
            </div>
          </header>

          {/* Content Area with Footer */}
          <main className="flex-1 overflow-y-auto dark:text-gray-200">
            <div className="p-6 min-h-[calc(100%-40px)]">
              {activeComponent || <Outlet />}
            </div>
            
            {/* Footer */}
            <div className="h-10 px-6 py-2">
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Powered by{' '}
                <span className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Krontiva
                </span>
              </p>
            </div>
          </main>
        </div>

        <LogoutModal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          onConfirm={handleLogoutConfirm}
        />
      </div>
    </>
  );
};

export default EventManagementDashboard;
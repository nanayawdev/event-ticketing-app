import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  BarChart, 
  Ticket, 
  Banknote, 
  CirclePlus,
  Bell,
  Search,
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
        {/* Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-20 lg:hidden transition-all duration-300"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 
          transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 transition duration-300 ease-in-out
          w-[280px] sm:w-[300px] md:w-20 xl:w-[300px] 
          bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl 
          border-r border-gray-200/80 dark:border-gray-700/80
          shadow-xl lg:shadow-none
          z-30
        `}>
          <div className="flex flex-col h-full">
            {/* Logo Section */}
            <div className="p-4 flex justify-between items-center">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 
                bg-clip-text text-transparent md:hidden xl:block dark:from-blue-400 dark:to-indigo-400">
                EventDash
              </h1>
              <button 
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100/80 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="mt-8 px-4">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeMenu === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActiveMenu(item.name);
                      setSidebarOpen(false);
                    }}
                    className={`
                      w-full flex items-center px-4 md:px-3 lg:px-4 py-3 text-sm group relative
                      rounded-xl transition-all duration-200 mb-1
                      ${isActive
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white dark:from-blue-500 dark:to-indigo-500'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/80'
                      }
                    `}
                  >
                    <Icon className={`
                      w-6 h-6 flex-shrink-0
                      transition-transform group-hover:scale-110 duration-200
                      lg:mr-4
                    `} />
                    <span className="md:hidden xl:inline font-medium tracking-wide">
                      {item.name}
                    </span>
                    
                    {/* Modern Tooltip */}
                    <div className="
                      hidden md:block xl:hidden 
                      absolute left-full ml-4 px-4 py-3
                      bg-gray-900 text-white text-sm rounded-lg
                      whitespace-nowrap opacity-0 
                      group-hover:opacity-100 
                      transition-all duration-200
                      pointer-events-none
                      z-50
                      before:content-[''] before:absolute before:left-[-6px]
                      before:top-1/2 before:-translate-y-1/2
                      before:border-[6px] before:border-transparent
                      before:border-r-gray-900
                    ">
                      {item.name}
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navigation */}
          <header className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl border-b border-gray-200/80 dark:border-gray-700/80">
            <div className="flex items-center justify-between p-4">
              {/* Left Side - Menu Button */}
              <div>
                <button 
                  className="lg:hidden p-2 rounded-xl hover:bg-gray-100/80 transition-colors"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="w-5 h-5" />
                </button>
              </div>

              {/* Right Side - Search, Notifications & Profile */}
              <div className="flex items-center space-x-4 ml-auto">
                {/* Search Bar */}
                <div className="hidden md:flex items-center relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 rounded-xl border border-gray-200/80 
                      focus:outline-none focus:border-blue-500 transition-colors
                      dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute left-3" />
                </div>

                {/* Notification Button */}
                <NotificationsDropdown 
                  isOpen={isNotificationsOpen}
                  onToggle={() => setIsNotificationsOpen(!isNotificationsOpen)}
                />

                {/* User Profile */}
                <ProfileDropdown onLogout={handleLogoutClick} />
              </div>
            </div>
          </header>

          {/* Content Area with Footer */}
          <main className="flex-1 overflow-y-auto dark:text-gray-200">
            <div className="p-6 min-h-[calc(100%-40px)]">
              {activeComponent}
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
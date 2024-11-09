import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  BarChart, 
  Ticket, 
  Banknote, 
  Settings, 
  UserCircle,
  CirclePlus,
  Bell,
  Search,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import LogoutModal from '../components/LogoutModal/LogoutModal';

// Import dashboard components
import Overview from '../components/dashboard/Overview';
import CreateEvent from '../components/dashboard/CreateEvent';
import ManageEvents from '../components/dashboard/ManageEvents';
import Attendees from '../components/dashboard/Attendees';
import Analytics from '../components/dashboard/Analytics';
import TicketsManagement from '../components/dashboard/TicketsManagement';
import Settlements from '../components/dashboard/Settlements';
import DashboardSettings from '../components/dashboard/DashboardSettings';
import Profile from '../components/dashboard/Profile';

const EventManagementDashboard = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('Overview');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  
  const menuItems = [
    { name: 'Overview', icon: LayoutDashboard, component: <Overview /> },
    { name: 'Create Event', icon: CirclePlus, component: <CreateEvent /> },
    { name: 'Manage Events', icon: Calendar, component: <ManageEvents /> },
    { name: 'Attendees', icon: Users, component: <Attendees /> },
    { name: 'Analytics', icon: BarChart, component: <Analytics /> },
    { name: 'Tickets', icon: Ticket, component: <TicketsManagement /> },
    { name: 'Settlements', icon: Banknote, component: <Settlements /> },
    { name: 'Settings', icon: Settings, component: <DashboardSettings /> },
    { name: 'Profile', icon: UserCircle, component: <Profile /> }
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
    <div className="flex h-screen bg-gray-50/95">
      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 lg:hidden transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 
        transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition duration-300 ease-in-out
        w-64 md:w-20 xl:w-64 
        bg-white/80 backdrop-blur-xl border-r border-gray-200/80 
        shadow-xl lg:shadow-none
        z-30
      `}>
        <div className="flex flex-col h-full justify-between">
          {/* Logo Section */}
          <div>
            <div className="p-4 flex justify-between items-center">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent md:hidden xl:block">
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
            <nav className="mt-8 px-4 space-y-3">
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
                      w-full flex items-center px-4 py-3 text-sm group relative
                      rounded-xl transition-all duration-200
                      ${isActive
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                        : 'text-gray-600 hover:bg-gray-100/80'
                      }
                    `}
                  >
                    <Icon className={`
                      w-5 h-5 md:mx-auto xl:mx-0 xl:mr-4 flex-shrink-0
                      transition-transform group-hover:scale-110 duration-200
                    `} />
                    <span className="md:hidden xl:inline font-medium tracking-wide">
                      {item.name}
                    </span>
                    
                    {/* Modern Tooltip */}
                    <div className="
                      hidden md:block xl:hidden 
                      absolute left-full ml-4 px-3 py-2
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

          {/* Logout Button */}
          <button
            onClick={handleLogoutClick}
            className="mx-4 mb-6 flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50/80 
              rounded-xl group relative transition-all duration-200"
          >
            <LogOut className="w-5 h-5 md:mx-auto xl:mx-0 xl:mr-4 flex-shrink-0 
              transition-transform group-hover:scale-110 duration-200" />
            <span className="md:hidden xl:inline font-medium tracking-wide">
              Logout
            </span>
            
            {/* Logout Tooltip */}
            <div className="
              hidden md:block xl:hidden 
              absolute left-full ml-4 px-3 py-2
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
              Logout
            </div>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/80">
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

            {/* Right Side - Notifications & Profile */}
            <div className="flex items-center space-x-4 ml-auto">
              {/* Search Bar (Optional) */}
              <div className="hidden md:flex items-center relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-xl border border-gray-200/80 
                    focus:outline-none focus:border-blue-500 transition-colors"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3" />
              </div>

              {/* Notification Button */}
              <button className="relative p-2 hover:bg-gray-100/80 rounded-xl transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 
                  flex items-center justify-center text-white font-medium shadow-lg shadow-blue-500/20">
                  JD
                </div>
                <span className="text-sm font-medium text-gray-700">John Doe</span>
              </div>

              {/* Mobile Logout */}
              <button
                onClick={handleLogoutClick}
                className="p-2 hover:bg-gray-100/80 rounded-xl lg:hidden transition-colors"
              >
                <LogOut className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeComponent}
        </main>
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
};

export default EventManagementDashboard;
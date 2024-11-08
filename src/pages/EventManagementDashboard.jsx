import React, { useState } from 'react';
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
  X
} from 'lucide-react';

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
  const [activeMenu, setActiveMenu] = useState('Overview');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
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

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 
        transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition duration-200 ease-in-out
        w-64 bg-white border-r border-gray-200 z-30
      `}>
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">EventDash</h1>
          <button 
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="mt-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => {
                  setActiveMenu(item.name);
                  setSidebarOpen(false); // Close sidebar on mobile after selection
                }}
                className={`w-full flex items-center px-4 py-3 text-sm ${
                  activeMenu === item.name
                    ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between p-4">
            {/* Menu button for mobile */}
            <button 
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">John Doe</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Render the active component */}
          {activeComponent}
        </main>
      </div>
    </div>
  );
};

export default EventManagementDashboard;
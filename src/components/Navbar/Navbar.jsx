import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Ellipsis, X, ChevronRight, ChevronDown, LogOut, CalendarPlus } from 'lucide-react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import EventNotice from '../EventNotice/EventNotice';
import LoginProfileDropdown from '../LoginProfileDropdown/LoginProfileDropdown';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [businessName, setBusinessName] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('authToken');
    const storedBusinessName = localStorage.getItem('businessName');
    
    if (token && storedBusinessName) {
      setBusinessName(storedBusinessName);
    } else if (token) {
      try {
        const response = await fetch('https://api-server.krontiva.africa/api:BnSaGAXN/auth/login', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const userData = await response.json();
          const businessName = userData.BusinessName || userData.businessName;
          setBusinessName(businessName);
          localStorage.setItem('businessName', businessName);
        } else {
          localStorage.removeItem('authToken');
          localStorage.removeItem('businessName');
          setBusinessName(null);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setBusinessName(null);
      }
    } else {
      setBusinessName(null);
    }
  };

  useEffect(() => {
    // Initial check
    checkAuthStatus();

    // Check when component mounts and when auth changes
    const handleAuthChange = () => {
      console.log('Auth change detected'); // Debug log
      checkAuthStatus();
    };

    window.addEventListener('authChange', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    // Cleanup
    return () => {
      window.removeEventListener('authChange', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'unset';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('businessName');
    setBusinessName(null);
    setIsDropdownOpen(false);
    window.dispatchEvent(new Event('authChange'));
    navigate('/');
  };

  const renderAuthSection = () => {
    if (businessName) {
      return <LoginProfileDropdown />;
    }

    return (
      <div className="hidden lg:flex items-center space-x-2 sm:space-x-4 xl:space-x-6">
        <Link
          to="/login"
          className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 px-2 sm:px-4 py-2 text-[13px] font-medium transition-all duration-300"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-gray-900 dark:bg-gray-200 text-gray-100 dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 px-3 sm:px-4 py-2 rounded-md text-[13px] font-medium transition-all duration-300 inline-flex items-center space-x-1 sm:space-x-2"
        >
          <span>Sign Up</span>
          <ChevronRight className="h-3 w-3" />
        </Link>
      </div>
    );
  };

  // Add click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  // Update the mobile menu section to show user status
  const renderMobileAuthSection = () => {
    if (businessName) {
      return (
        <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 py-2 text-base font-medium text-gray-900 dark:text-gray-100">
            {businessName}
          </div>
          <Link
            to="/create-event"
            onClick={closeMenu}
            className="flex items-center w-full px-4 py-3 text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
          >
            <CalendarPlus className="h-5 w-5 mr-2" />
            Create Event
          </Link>
          <button
            onClick={() => {
              closeMenu();
              handleLogout();
            }}
            className="flex items-center w-full px-4 py-3 text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        <Link
          to="/login"
          onClick={closeMenu}
          className="flex items-center justify-center w-full px-4 py-3 text-base font-medium text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
        >
          Login
        </Link>
        <Link
          to="/signup"
          onClick={closeMenu}
          className="flex items-center justify-center w-full px-4 py-3 text-base font-medium text-white dark:text-gray-900 bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200 rounded-md transition-colors"
        >
          Sign Up
          <ChevronRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    );
  };

  return (
    <nav className="fixed top-0 w-full z-[60] bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        <div className="flex justify-between h-14 sm:h-16">
          {/* Left section */}
          <div className="flex items-center">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                Tickrfly
              </span>
            </Link>

            {/* EventNotice - show on tablets, hide on mobile and 1024px screens */}
            <div className="hidden sm:block lg:hidden xl:block ml-3 md:ml-4">
              <EventNotice 
                primary="Introducing Tickrfly"
                secondary="Our new Event Platform"
              />
            </div>

            {/* Desktop menu - hidden on mobile/tablet */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-4 ml-6 xl:ml-8">
              <Link
                to="/events"
                className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 px-2 xl:px-3 py-2 text-[13px] font-medium"
              >
                Events
              </Link>
              <Link
                to="/services"
                className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 px-2 xl:px-3 py-2 text-[13px] font-medium"
              >
                Services
              </Link>
              <Link
                to="/pricing"
                className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 px-2 xl:px-3 py-2 text-[13px] font-medium"
              >
                Pricing
              </Link>
              <Link
                to="/event-organizer"
                className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 px-2 xl:px-3 py-2 text-[13px] font-medium rounded-md"
              >
                Organizers
              </Link>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile menu button - moved to start of right section */}
            <button
              onClick={toggleMenu}
              className="inline-flex lg:hidden items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Ellipsis className="h-5 w-5" />
              )}
            </button>

            {/* Auth buttons - hide on mobile */}
            {renderAuthSection()}

            {/* Theme toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-gray-800/50 dark:bg-gray-900/50 backdrop-blur-sm lg:hidden z-[60]"
          onClick={closeMenu}
        />
      )}

      {/* Mobile menu drawer */}
      <div 
        className={`
          fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-white dark:bg-gray-900 
          transform transition-transform duration-300 ease-in-out lg:hidden z-[61]
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          border-l border-gray-200 dark:border-gray-700
        `}
      >
        {/* Close button in drawer */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <span className="text-lg font-semibold text-gray-900 dark:text-white">Menu</span>
          <button
            onClick={closeMenu}
            className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-4 py-6 space-y-6 overflow-y-auto">
          {/* Mobile menu items */}
          <div className="space-y-2">
            <Link
              to="/"
              onClick={closeMenu}
              className="flex items-center w-full px-4 py-3 text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
            >
              Home
            </Link>
            <Link
              to="/events"
              onClick={closeMenu}
              className="flex items-center w-full px-4 py-3 text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
            >
              Events
            </Link>
            <Link
              to="/services"
              onClick={closeMenu}
              className="flex items-center w-full px-4 py-3 text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
            >
              Services
            </Link>
            <Link
              to="/pricing"
              onClick={closeMenu}
              className="flex items-center w-full px-4 py-3 text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
            >
              Pricing
            </Link>
            <Link
              to="/event-organizer"
              onClick={closeMenu}
              className="flex items-center w-full px-4 py-3 text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
            >
              For Organizers
            </Link>
          </div>

          {/* Mobile auth section */}
          {renderMobileAuthSection()}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

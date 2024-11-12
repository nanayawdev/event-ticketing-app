import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Ellipsis, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import tickrflyyLogo from '../../assets/icons/nylogo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <nav className="fixed w-full z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between h-16">
          {/* Logo section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <img
                className="h-8 w-auto"
                src={tickrflyyLogo}
                alt="Tickrflyy Logo"
              />
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-200 hover:text-sea-green-600 dark:hover:text-sea-green-400 px-3 py-2 text-sm font-medium relative group transition-colors duration-300"
            >
              Home
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sea-green-600 dark:bg-sea-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/events"
              className="text-gray-700 dark:text-gray-200 hover:text-sea-green-600 dark:hover:text-sea-green-400 px-3 py-2 text-sm font-medium relative group transition-colors duration-300"
            >
              Events
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sea-green-600 dark:bg-sea-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/services"
              className="text-gray-700 dark:text-gray-200 hover:text-sea-green-600 dark:hover:text-sea-green-400 px-3 py-2 text-sm font-medium relative group transition-colors duration-300"
            >
              Services
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sea-green-600 dark:bg-sea-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/pricing"
              className="text-gray-700 dark:text-gray-200 hover:text-sea-green-600 dark:hover:text-sea-green-400 px-3 py-2 text-sm font-medium relative group transition-colors duration-300"
            >
              Pricing
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sea-green-600 dark:bg-sea-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/event-organizer"
              className="text-gray-700 dark:text-gray-200 hover:text-sea-green-600 dark:hover:text-sea-green-400 px-3 py-2 text-sm font-medium rounded-md"
            >
              Organizers
            </Link>
          </div>

          {/* Auth buttons and theme toggle */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <Link
              to="/login"
              className="border border-gray-700 dark:border-gray-200 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-sea-green-500 dark:bg-sea-green-600 text-white hover:bg-sea-green-600 dark:hover:bg-sea-green-700 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Sign Up
            </Link>
            
            {/* Desktop Theme Toggle Switch */}
            <button
              onClick={toggleTheme}
              className="relative inline-flex h-7 w-12 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 ease-in-out ml-2"
              aria-label="Toggle theme"
            >
              <span
                className={`
                  ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}
                  pointer-events-none inline-block h-5 w-5 rounded-full
                  bg-white shadow-lg ring-0 transition-all
                  duration-300 ease-in-out
                `}
              >
                <span
                  className={`
                    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    transition-opacity duration-300 ease-in-out
                    ${theme === 'dark' ? 'opacity-0' : 'opacity-100'}
                  `}
                >
                  <Sun className="h-3.5 w-3.5 text-amber-500" />
                </span>
                <span
                  className={`
                    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    transition-opacity duration-300 ease-in-out
                    ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}
                  `}
                >
                  <Moon className="h-3.5 w-3.5 text-blue-500" />
                </span>
              </span>
            </button>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="lg:hidden flex items-center space-x-4">
            <Link
              to="/login"
              className="border border-gray-700 dark:border-gray-200 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-1 rounded-md text-sm font-medium transition-all duration-300"
            >
              Login
            </Link>
            <button
              onClick={toggleTheme}
              className="relative inline-flex h-7 w-12 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 ease-in-out"
              aria-label="Toggle theme"
            >
              <span
                className={`
                  ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}
                  pointer-events-none inline-block h-5 w-5 rounded-full
                  bg-white shadow-lg ring-0 transition-all
                  duration-300 ease-in-out
                `}
              >
                <span
                  className={`
                    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    transition-opacity duration-300 ease-in-out
                    ${theme === 'dark' ? 'opacity-0' : 'opacity-100'}
                  `}
                >
                  <Sun className="h-3.5 w-3.5 text-amber-500" />
                </span>
                <span
                  className={`
                    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    transition-opacity duration-300 ease-in-out
                    ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}
                  `}
                >
                  <Moon className="h-3.5 w-3.5 text-blue-500" />
                </span>
              </span>
            </button>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-sea-green-600 dark:hover:text-sea-green-400 focus:outline-none transition-colors duration-300"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Ellipsis className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - update with dark mode styles */}
      <div 
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-sm`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Link
              to="/"
              onClick={closeMenu}
              className="text-gray-700 dark:text-gray-200 hover:text-sea-green-600 dark:hover:text-sea-green-400 hover:bg-sea-green-100 px-3 py-2 text-base font-medium rounded-md transition-all duration-300"
            >
              Home
            </Link>
            <Link
              to="/events"
              onClick={closeMenu}
              className="text-gray-700 dark:text-gray-200 hover:text-sea-green-600 dark:hover:text-sea-green-400 hover:bg-sea-green-100 px-3 py-2 text-base font-medium rounded-md transition-all duration-300"
            >
              Events
            </Link>
            <Link
              to="/services"
              onClick={closeMenu}
              className="text-gray-700 dark:text-gray-200 hover:text-sea-green-600 dark:hover:text-sea-green-400 hover:bg-sea-green-100 px-3 py-2 text-base font-medium rounded-md transition-all duration-300"
            >
              Services
            </Link>
            <Link
              to="/pricing"
              onClick={closeMenu}
              className="text-gray-700 dark:text-gray-200 hover:text-sea-green-600 dark:hover:text-sea-green-400 hover:bg-sea-green-100 px-3 py-2 text-base font-medium rounded-md transition-all duration-300"
            >
              Pricing
            </Link>
            <Link
              to="/event-organizer"
              onClick={closeMenu}
              className="text-gray-700 dark:text-gray-200 hover:text-sea-green-600 dark:hover:text-sea-green-400 hover:bg-sea-green-100 px-3 py-2 text-base font-medium rounded-md transition-all duration-300"
            >
              For Organizers
            </Link>
          </div>
        </div>
        <div className="pt-4 pb-3 border-t border-sea-green-200">
          <div className="flex items-center justify-center px-5 space-x-4 sm:px-6">
            <Link
              to="/login"
              onClick={closeMenu}
              className="flex-1 sm:flex-none text-center border border-sea-green-600 text-sea-green-600 hover:bg-sea-green-50 px-4 py-2 rounded-md text-base font-medium transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={closeMenu}
              className="flex-1 sm:flex-none text-center bg-sea-green-600 text-white hover:bg-sea-green-700 px-4 py-2 rounded-md text-base font-medium transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

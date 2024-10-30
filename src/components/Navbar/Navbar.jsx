import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Ellipsis, X, Sun, Moon, Monitor } from 'lucide-react';
import tickrflyyLogo from '../../assets/icons/nylogo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [theme, setTheme] = useState('system');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setIsThemeOpen(!isThemeOpen);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    // Add your theme logic here
    setIsThemeOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-white/25 backdrop-blur-xl backdrop-saturate-200 border-b border-white/10 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              to="/"
              className="text-gray-800 hover:text-indigo-600 px-3 py-2 text-sm font-medium relative group transition-colors duration-300"
            >
              Home
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/events"
              className="text-gray-800 hover:text-indigo-600 px-3 py-2 text-sm font-medium relative group transition-colors duration-300"
            >
              Events
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/about"
              className="text-gray-800 hover:text-indigo-600 px-3 py-2 text-sm font-medium relative group transition-colors duration-300"
            >
              About
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/services"
              className="text-gray-800 hover:text-indigo-600 px-3 py-2 text-sm font-medium relative group transition-colors duration-300"
            >
              Services
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/pricing"
              className="text-gray-800 hover:text-indigo-600 px-3 py-2 text-sm font-medium relative group transition-colors duration-300"
            >
              Pricing
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/contact"
              className="text-gray-800 hover:text-indigo-600 px-3 py-2 text-sm font-medium relative group transition-colors duration-300"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/clientguide"
              className="text-gray-800 hover:text-indigo-600 px-3 py-2 text-sm font-medium relative group transition-colors duration-300"
            >
              Client Guide
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
          </div>

          {/* Theme Switcher and Auth buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {/* Theme Switcher */}
            <div className="relative">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-gray-800 hover:text-indigo-600 focus:outline-none transition-colors duration-300"
              >
                {theme === 'light' && <Sun className="h-5 w-5" />}
                {theme === 'dark' && <Moon className="h-5 w-5" />}
                {theme === 'system' && <Monitor className="h-5 w-5" />}
              </button>

              {/* Theme Dropdown */}
              {isThemeOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white/90 backdrop-blur-xl backdrop-saturate-200 ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <button
                      onClick={() => handleThemeChange('light')}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50/50"
                      role="menuitem"
                    >
                      <Sun className="h-4 w-4 mr-2" />
                      Light
                    </button>
                    <button
                      onClick={() => handleThemeChange('dark')}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50/50"
                      role="menuitem"
                    >
                      <Moon className="h-4 w-4 mr-2" />
                      Dark
                    </button>
                    <button
                      onClick={() => handleThemeChange('system')}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50/50"
                      role="menuitem"
                    >
                      <Monitor className="h-4 w-4 mr-2" />
                      System
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Auth buttons */}
            <Link
              to="/login"
              className="border border-indigo-600/80 text-indigo-600 hover:bg-indigo-50/30 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-indigo-600/90 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme Switcher for Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-800 hover:text-indigo-600 focus:outline-none transition-colors duration-300"
            >
              {theme === 'light' && <Sun className="h-5 w-5" />}
              {theme === 'dark' && <Moon className="h-5 w-5" />}
              {theme === 'system' && <Monitor className="h-5 w-5" />}
            </button>

            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-indigo-600 focus:outline-none transition-colors duration-300"
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

      {/* Mobile menu */}
      <div 
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } md:hidden bg-white/25 backdrop-blur-xl backdrop-saturate-200 border-t border-white/10 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="block text-gray-800 hover:text-indigo-600 hover:bg-indigo-50/30 px-3 py-2 text-base font-medium rounded-md transition-all duration-300"
          >
            Home
          </Link>
          <Link
            to="/events"
            className="block text-gray-800 hover:text-indigo-600 hover:bg-indigo-50/30 px-3 py-2 text-base font-medium rounded-md transition-all duration-300"
          >
            Events
          </Link>
          <Link
            to="/about"
            className="block text-gray-800 hover:text-indigo-600 hover:bg-indigo-50/30 px-3 py-2 text-base font-medium rounded-md transition-all duration-300"
          >
            About
          </Link>
          <Link
            to="/services"
            className="block text-gray-800 hover:text-indigo-600 hover:bg-indigo-50/30 px-3 py-2 text-base font-medium rounded-md transition-all duration-300"
          >
            Services
          </Link>
          <Link
            to="/pricing"
            className="block text-gray-800 hover:text-indigo-600 hover:bg-indigo-50/30 px-3 py-2 text-base font-medium rounded-md transition-all duration-300"
          >
            Pricing
          </Link>
          <Link
            to="/contact"
            className="block text-gray-800 hover:text-indigo-600 hover:bg-indigo-50/30 px-3 py-2 text-base font-medium rounded-md transition-all duration-300"
          >
            Contact
          </Link>
          <Link
            to="/clientguide"
            className="block text-gray-800 hover:text-indigo-600 hover:bg-indigo-50/30 px-3 py-2 text-base font-medium rounded-md transition-all duration-300"
          >
            Client Guide
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-white/10">
          <div className="flex items-center px-5 space-x-4">
            <Link
              to="/login"
              className="block border border-indigo-600/80 text-indigo-600 hover:bg-indigo-50/30 px-4 py-2 rounded-md text-base font-medium transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block w-full text-center bg-indigo-600/90 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-base font-medium transition-all duration-300 shadow-sm hover:shadow-md"
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

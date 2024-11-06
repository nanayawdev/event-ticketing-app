import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Ellipsis, X } from 'lucide-react';
import tickrflyyLogo from '../../assets/icons/nylogo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-sea-green-50 border-b border-sea-green-50 shadow-sm">
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
              className="text-sea-green-950 hover:text-sea-green-600 px-3 py-2 text-sm font-medium relative group transition-colors duration-300"
            >
              Home
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sea-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/events"
              className="text-sea-green-950 hover:text-sea-green-600 px-3 py-2 text-sm font-medium relative group transition-colors duration-300"
            >
              Events
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sea-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/services"
              className="text-sea-green-950 hover:text-sea-green-600 px-3 py-2 text-sm font-medium relative group transition-colors duration-300"
            >
              Services
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sea-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/pricing"
              className="text-sea-green-950 hover:text-sea-green-600 px-3 py-2 text-sm font-medium relative group transition-colors duration-300"
            >
              Pricing
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sea-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/event-organizer"
              className="text-sea-green-800 hover:text-sea-green-600 px-3 py-2 text-sm font-medium rounded-md"
            >
              Organizers
            </Link>
          </div>

          {/* Auth buttons */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <Link
              to="/login"
              className="border border-sea-green-950 text-sea-green-950 hover:bg-sea-green-50 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-sea-green-400 text-white hover:bg-sea-green-500 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile/Tablet menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-sea-green-800 hover:text-sea-green-600 focus:outline-none transition-colors duration-300"
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

      {/* Mobile/Tablet menu */}
      <div 
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } lg:hidden bg-sea-green-50 border-t border-sea-green-200 shadow-sm`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Link
              to="/"
              onClick={closeMenu}
              className="text-sea-green-800 hover:text-sea-green-600 hover:bg-sea-green-100 px-3 py-2 text-base font-medium rounded-md transition-all duration-300"
            >
              Home
            </Link>
            <Link
              to="/events"
              onClick={closeMenu}
              className="text-sea-green-800 hover:text-sea-green-600 hover:bg-sea-green-100 px-3 py-2 text-base font-medium rounded-md transition-all duration-300"
            >
              Events
            </Link>
            <Link
              to="/services"
              onClick={closeMenu}
              className="text-sea-green-800 hover:text-sea-green-600 hover:bg-sea-green-100 px-3 py-2 text-base font-medium rounded-md transition-all duration-300"
            >
              Services
            </Link>
            <Link
              to="/pricing"
              onClick={closeMenu}
              className="text-sea-green-800 hover:text-sea-green-600 hover:bg-sea-green-100 px-3 py-2 text-base font-medium rounded-md transition-all duration-300"
            >
              Pricing
            </Link>
            <Link
              to="/event-organizer"
              onClick={closeMenu}
              className="text-sea-green-800 hover:text-sea-green-600 hover:bg-sea-green-100 px-3 py-2 text-base font-medium rounded-md transition-all duration-300"
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

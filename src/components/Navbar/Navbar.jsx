import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Ellipsis, X } from 'lucide-react';
import tickrflyyLogo from '../../assets/icons/nylogo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
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

          {/* Desktop menu - Updated with underline hover effect */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/events"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium relative group"
            >
              Events
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/services"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium relative group"
            >
              Services
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/pricing"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium relative group"
            >
              Pricing
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/clientguide"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium relative group"
            >
              Client Guide
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
          </div>

          {/* Auth buttons - Updated Login button style */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              to="/login"
              className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none"
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

      {/* Mobile menu - Updated with underline hover effect */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="block text-gray-700 hover:text-indigo-600 px-3 py-2 text-base font-medium relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </Link>
          <Link
            to="/events"
            className="block text-gray-700 hover:text-indigo-600 px-3 py-2 text-base font-medium relative group"
          >
            Events
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </Link>
          <Link
            to="/about"
            className="block text-gray-700 hover:text-indigo-600 px-3 py-2 text-base font-medium relative group"
          >
            About
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </Link>
          <Link
            to="/services"
            className="block text-gray-700 hover:text-indigo-600 px-3 py-2 text-base font-medium relative group"
          >
            Services
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </Link>
          <Link
            to="/pricing"
            className="block text-gray-700 hover:text-indigo-600 px-3 py-2 text-base font-medium relative group"
          >
            Pricing
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </Link>
          <Link
            to="/contact"
            className="block text-gray-700 hover:text-indigo-600 px-3 py-2 text-base font-medium relative group"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </Link>
          <Link
            to="/clientguide"
            className="block text-gray-700 hover:text-indigo-600 px-3 py-2 text-base font-medium relative group"
          >
            Client Guide
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-5 space-x-4">
            <Link
              to="/login"
              className="block border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-md text-base font-medium transition-colors duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block w-full text-center bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-base font-medium transition-colors duration-300"
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

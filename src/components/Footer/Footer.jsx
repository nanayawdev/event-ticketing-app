import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-800 text-gray-300 dark:text-gray-50">
      {/* Main Footer */}
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold">About Us</h3>
            <p className="text-sm text-gray-50 dark:text-primary-100">
              We are focused on creating innovative solutions for event ticketing and management.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/krontiva" className="hover:text-white transition-colors">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/krontiva" className="hover:text-white transition-colors">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/krontiva/" className="hover:text-white transition-colors">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/krontiva/" className="hover:text-white transition-colors">
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/client-guide" className="text-sm hover:text-white transition-colors">
                  Client Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-sm">
                The Octagon, Accra
              </li>
              <li className="text-sm">
                Accra, Ghana
              </li>
              <li className="text-sm">
                  Phone: +233 555 123 456
              </li>
              <li className="text-sm">
                Email: info@tickrfly.com
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-4 text-gray-50 dark:text-primary-100">
              Subscribe to our newsletter for updates and offers.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 text-sm text-gray-900 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-medium text-gray-50 dark:text-primary-900 bg-primary-500 dark:bg-primary-200 rounded-md hover:bg-primary-400 dark:hover:bg-primary-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-sm text-center md:text-left">
              © {new Date().getFullYear()} Tickrfly. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0">
              <ul className="flex flex-wrap justify-center md:justify-end space-x-6">
                <li>
                  <Link to="/privacy" className="text-sm hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/cookies" className="text-sm hover:text-white transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

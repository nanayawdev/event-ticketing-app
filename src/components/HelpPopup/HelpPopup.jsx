import React, { useState, useEffect } from 'react';
import { X, Handshake, SquareArrowOutUpRight } from 'lucide-react';
import tickrflyevent from '../../assets/images/photoshoot2.jpeg'
import tickrflyevent2 from '../../assets/images/jkstudio.jpeg'
import tickrflyevent3 from '../../assets/images/jkstudiios3.jpeg'
import tickrflyevent4 from '../../assets/images/photoshoot.jpeg'
const HelpPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setShowIcon(true);
    }, 1500);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {/* Popup */}
      {isOpen && (
        <div className="mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-xl w-[280px] sm:w-full sm:max-w-sm p-4 sm:p-6 relative transition-all duration-1000 ease-in-out animate-slide-in">
          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute top-2 sm:top-4 right-2 sm:right-4 text-gray-400 hover:text-gray-600 transition-colors duration-300"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Icon and Content */}
          <div className="flex flex-col items-start text-left">            
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg">
                <Handshake className="w-6 h-6 text-gray-900 dark:text-gray-100" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Become a Partner
              </h2>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Join our growing network of event partners and reach thousands of potential attendees. Start hosting your events with us today.
            </p>

            <div className="flex items-center justify-between w-full">
              <button 
                onClick={() => {/* Add partner signup link/action */}}
                className="bg-gray-900 dark:bg-gray-200 text-gray-100 dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-700 px-4 py-2 rounded-md text-sm sm:text-base flex items-center gap-2"
              >
                <span>Join Us</span>
                <SquareArrowOutUpRight className="w-4 h-4" />
              </button>

              <div className="flex -space-x-2 overflow-hidden ml-4">
                <img
                  alt=""
                  src={tickrflyevent}
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                />
                <img
                  alt=""
                  src={tickrflyevent2}
                  className="inline-block h-8 w-8 sm:h-10 sm:w-10 rounded-full ring-2 ring-white object-cover"
                />
                <img
                  alt=""
                  src={tickrflyevent3}
                  className="inline-block h-8 w-8 sm:h-10 sm:w-10 rounded-full ring-2 ring-white object-cover"
                />
                <img
                  alt=""
                  src={tickrflyevent4}
                  className="inline-block h-8 w-8 sm:h-10 sm:w-10 rounded-full ring-2 ring-white object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Icon Button */}
      {showIcon && (
        <button
          onClick={() => {
            setShowIcon(false);
            setIsOpen(true);
          }}
          className="bg-white rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-1000 ease-in-out animate-fade-in"
        >
          <Handshake className="w-5 h-5 sm:w-6 sm:h-6 text-sea-green-600" />
        </button>
      )}
    </div>
  );
};

export default HelpPopup; 
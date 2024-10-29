import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const NoticeBar = () => {
  return (
    <Link 
      to="/events/tech-expo-2024" 
      className="sticky top-0 z-50 bg-black hover:bg-gray-900 block"
    >
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500 text-center py-4 px-4 text-base font-normal inline-block w-full animate-gradient">
        New Event: "Tech Expo 2024" Tickets Now Available - Book Yours Today!
        <FaArrowRight className="inline-block ml-2" />
      </span>
    </Link>
  );
};

export default NoticeBar;

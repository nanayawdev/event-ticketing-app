import React from 'react';
import { SquareArrowOutUpRight } from 'lucide-react';

const NoticeBar = () => {
  return (
    <div className="sticky top-0 z-50 bg-sea-green-900 flex items-center justify-center px-4 py-3 sm:py-2">
      <div className="flex items-center gap-x-4">
        <span className="text-gray-50 text-base font-normal">
          <strong>New Event:</strong> "Tech Expo 2024" Tickets Now Available
        </span>
        <a
          href="/events/tech-expo-2024"
          className="flex-none rounded-sm bg-sea-green-400 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-sea-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 flex items-center gap-x-1"
        >
          Reserve Ticket <SquareArrowOutUpRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default NoticeBar;

import React from 'react';
import { ChevronRight } from 'lucide-react';

const EventNotice = () => {
  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-gray-100">
      {/* Logo/Icon */}
      <div className="flex-shrink-0">
        <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">✦</span>
        </div>
      </div>

      {/* Text */}
      <div className="text-xs font-medium text-gray-700">
        Introducing Tickrfly
      </div>

      {/* Divider */}
      <div className="mx-1 w-px h-3 bg-gray-200"></div>

      {/* Secondary Text */}
      <div className="text-xs text-gray-500">
        Our new Event Platform
      </div>

      {/* Arrow */}
      <ChevronRight className="w-3 h-3 text-gray-400" />
    </div>
  );
};

export default EventNotice; 
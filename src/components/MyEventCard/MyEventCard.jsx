import React from 'react';

const MyEventCard = () => {
  return (
    <div className="w-[300px] h-[300px] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative h-[180px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
          alt="Nike Contest Show"
          className="w-full h-full object-cover"
        />
        {/* Price Tag */}
        <div className="absolute bottom-3 right-3 bg-red-600 text-white px-3 py-1 rounded-lg font-bold">
          <span className="text-xs">GHS</span>
          <span className="text-lg ml-1">450</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1">
          Nike Contest Show
        </h3>
        
        {/* Venue */}
        <p className="text-base text-gray-500 mb-2">
          Kempinski Hotel
        </p>
        
        {/* Date */}
        <div className="inline-block bg-gray-900 text-white px-3 py-1 rounded-lg text-sm">
          Nov 8, 2024
        </div>
      </div>
    </div>
  );
};

export default MyEventCard;
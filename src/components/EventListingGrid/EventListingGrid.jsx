import React from 'react';
import eventimg from '../../assets/images/eventplaceholder.jpg';

const EventListingGrid = () => {
  const events = [
    {
      id: 1,
      date: 'MAR 15',
      time: '19:00',
      title: 'Tech Innovation Summit 2024',
      location: 'Silicon Valley Convention Center',
      category: 'Technology',
      price: '299.00',
      image: eventimg,
      spots: '86'
    },
    // Add more events...
  ];

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-6">Trending Events</h1>
        <div className="flex justify-between items-center">
          <p className="text-gray-600 max-w-2xl">
            Join the most anticipated events of the year. Book early to secure your spot.
          </p>
          <div className="flex gap-4">
            <button className="p-2 rounded-full border border-gray-200 hover:border-sea-green-500 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="p-2 rounded-full border border-gray-200 hover:border-sea-green-500 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div key={event.id} className="flex flex-col bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-sea-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {event.category}
                </span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-2 text-sea-green-600 mb-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium">{event.date} - {event.time}</span>
              </div>

              <h3 className="text-xl font-bold mb-2 hover:text-sea-green-600 transition-colors">
                {event.title}
              </h3>

              <div className="flex items-center text-gray-500 mb-4">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-sm">{event.location}</p>
              </div>

              <div className="mt-auto flex items-center justify-between">
                <button className="bg-sea-green-500 text-white px-6 py-2 rounded hover:bg-sea-green-600 transition-colors">
                  Book Now
                </button>
                <div className="text-right">
                  <p className="text-sm text-gray-500">from</p>
                  <p className="text-xl font-bold text-sea-green-600">${event.price}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventListingGrid; 
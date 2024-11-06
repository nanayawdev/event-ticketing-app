import React from 'react';
import eventimg from '../../assets/images/eventplaceholder.jpg';
const EventListingAlt = () => {
  // Sample events data - you can move this to a separate file later
  const events = [
    {
      id: 1,
      day: '6',
      dayOfWeek: 'WED',
      title: 'Global business forum 2024',
      dateRange: 'May 24, 2024 @ 9:30 pm - May 2, 2025 @ 11:30 pm',
      location: 'Manhattan Club 350 5th Ave, New York, NY, United States',
      description: 'Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernaturaut odit aut fugit, sed quia consequuntur. Dicta sunt explicabo.',
      price: '275.00',
      image: eventimg
    },
    // Add more events as needed
  ];

  return (
    <div className="max-w-6xl mx-auto p-8 mt-16">
      {/* Heading Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-5xl font-bold mb-4">Upcoming Events</h1>
        <p className="text-gray-600">
          Discover and book tickets for the most exciting events happening near you.
        </p>
      </div>

      {/* Events List */}
      <div className="space-y-8">
        {events.map((event) => (
          <div key={event.id} className="max-w-7xl mx-auto p-6">
            <div className="flex gap-8">
              {/* Date Section - Simplified */}
              <div className="text-center">
                <p className="text-4xl font-bold leading-none">{event.day}</p>
                <p className="text-sm text-gray-600 uppercase mt-1">{event.dayOfWeek}</p>
              </div>

              <div className="flex-1">
                {/* Event Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-gray-600">
                      {event.dateRange}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold">{event.title}</h2>
                  <p className="text-gray-600">{event.location}</p>
                  <p className="text-gray-500">
                    {event.description}
                  </p>

                  <div className="flex items-center gap-4">
                    <button className="bg-sea-green-500 text-white px-6 py-2 rounded hover:bg-sea-green-600 transition-colors">
                      GET TICKETS
                    </button>
                    <span className="text-xl font-bold">${event.price}</span>
                  </div>
                </div>
              </div>

              {/* Image Section */}
              <div className="flex items-start">
                <div className="w-96 h-64">
                  <img
                    src={event.image}
                    alt={`${event.title} attendees`}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventListingAlt; 
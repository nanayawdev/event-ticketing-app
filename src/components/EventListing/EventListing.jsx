import React from 'react';
import { ChevronRight, MapPin, Clock, Search } from 'lucide-react';

const EventsList = () => {
  const events = [
    {
      date: { day: '18', month: 'August', year: '2024' },
      title: 'Social media conference',
      location: 'Apple Upper West Side, Brooklyn',
      time: '19:15 a.m. — 07:15 a.m.',
      status: 'BUY TICKETS'
    },
    {
      date: { day: '26', month: 'September', year: '2024' },
      title: 'International AI summit',
      location: 'Apple Upper West Side, Brooklyn',
      time: '09:15 a.m. — 01:15 p.m.',
      status: 'Free Event'
    },
    {
      date: { day: '21', month: 'October', year: '2024' },
      title: 'Apple event: introducing new iOS',
      location: 'Apple Upper West Side, Brooklyn',
      time: '11:15 a.m. — 12:15 p.m.',
      status: 'Sold Out'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-5xl font-bold">All Events</h1>
        <div className="flex items-center text-gray-500">
          <p className="mr-2">View All Events</p>
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-8">
        <p className="text-gray-500 max-w-[600px]">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
        </p>

        <div className="relative">
          <input
            type="text"
            placeholder="Search events..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sea-green-500 focus:border-transparent"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      <div className="space-y-8">
        {events.map((event, index) => (
          <div key={index} className="border-t border-gray-200 pt-8 flex justify-between items-center">
            <div className="flex items-center gap-12 min-w-[180px]">
              <div className="flex items-center gap-2">
                <span className="text-6xl font-bold leading-none">{event.date.day}</span>
                <div className="text-gray-500">
                  {event.date.month}
                  <span className="block">{event.date.year}</span>
                </div>
              </div>
            </div>
              
            <div className="flex-1 space-y-3 text-left">
              <h3 className="text-2xl font-semibold">{event.title}</h3>
              <div className="flex items-center text-gray-500 gap-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center min-w-[180px] justify-end">
              {event.status === 'BUY TICKETS' ? (
                <button className="bg-red-500 text-white px-4 py-2 rounded">
                  {event.status}
                </button>
              ) : (
                <span className={`${
                  event.status === 'Free Event' ? 'text-red-500' : 'text-gray-400'
                }`}>
                  {event.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsList;
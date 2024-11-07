import React, { useState, useEffect } from 'react';
import { ChevronRight, MapPin, Clock, Search } from 'lucide-react';
import { getEventStatus } from '../EventsCard/EventsCard';
import { useNavigate } from 'react-router-dom';

const EventListing = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api-server.krontiva.africa/api:BnSaGAXN/Get_All_Event')
      .then(response => response.json())
      .then(data => {
        const filteredEvents = data.filter(event => {
          if (!event || !event.Event_End_Time) return false;
          const endDateTime = new Date(event.Event_End_Time);
          return new Date() <= endDateTime;
        });
        setEvents(filteredEvents);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load events');
        setLoading(false);
      });
  }, []);

  const handleNavigation = (eventName) => {
    const eventSlug = eventName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/events/${eventSlug}`);
  };

  if (loading) return <div className="text-center py-10">Loading events...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

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
        {events.map((event, index) => {
          const eventDate = new Date(event.Event_Start_Date);
          const formattedDate = {
            day: eventDate.getDate().toString(),
            month: eventDate.toLocaleString('default', { month: 'long' }),
            year: eventDate.getFullYear().toString()
          };

          const status = getEventStatus(
            event.Event_Start_Date,
            event.Event_End_Date,
            event.Event_Start_Time,
            event.Event_End_Time,
            event.Event_Venue
          );

          return (
            <div key={index} className="border-t border-gray-200 pt-8 flex justify-between items-center">
              <div className="flex items-center gap-12 min-w-[180px]">
                <div className="flex items-center gap-2">
                  <span className="text-6xl font-bold leading-none">{formattedDate.day}</span>
                  <div className="text-gray-500">
                    {formattedDate.month}
                    <span className="block">{formattedDate.year}</span>
                  </div>
                </div>
              </div>
                
              <div className="flex-1 space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <h3 
                    onClick={() => handleNavigation(event.Event_Name)}
                    className="text-2xl font-semibold hover:text-sea-green-500 transition-colors cursor-pointer"
                  >
                    {event.Event_Name}
                  </h3>
                  <span className={`${status.className} text-white px-2 py-0.5 rounded-md text-xs font-normal`}>
                    {status.text}
                  </span>
                </div>
                <div className="flex items-center text-gray-500 gap-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.Event_Venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(event.Event_Start_Time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center min-w-[180px] justify-end">
                <button 
                  onClick={() => handleNavigation(event.Event_Name)}
                  className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  BUY TICKETS
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventListing;
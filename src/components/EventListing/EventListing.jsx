import React, { useState } from 'react';
import { ChevronRight, MapPin, Clock, Search } from 'lucide-react';
import { getEventStatus } from '../EventsCard/EventsCard';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../ui/LoadingSpinner'
import { toast } from 'sonner'
import { useEvents } from '../../hooks/useEvents';
import PriceDisplay from '../PriceDisplay/PriceDisplay';
import { ErrorMessage } from '../ui/ErrorMessage'

const EventListing = () => {
  const navigate = useNavigate();
  const { events, loading, error } = useEvents();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleNavigation = (eventName) => {
    const eventSlug = eventName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/events/${eventSlug}`);
  };

  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' }),
      year: date.getFullYear()
    };
  };

  const filteredEvents = events.filter(event => 
    event.Event_Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowDropdown(value.length > 0);
  };

  const getMinTicketPrice = (event) => {
    if (!event.Ticket_Price?.length) {
      return Number(event.Event_Price) || 0;
    }
    return Math.min(...event.Ticket_Price.map(ticket => Number(ticket.price)));
  };

  if (loading) return <LoadingSpinner />;
  if (error) {
    return (
      <ErrorMessage 
        title="Unable to Load Events"
        message="We're having trouble loading the events. Please check your internet connection and try again."
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-5xl font-bold dark:text-white">All Events</h1>
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <p className="mr-2">View All Events</p>
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-8">
        <p className="text-gray-500 dark:text-gray-400 max-w-[600px]">
          All events in Ghana and beyond. Get tickets to your favorite events.
        </p>

        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchInput}
            onFocus={() => setShowDropdown(searchTerm.length > 0)}
            placeholder="Search events..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent 
              w-[300px] dark:bg-gray-800 dark:border-gray-700 dark:text-white 
              dark:placeholder-gray-400"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          
          {showDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 
              border border-gray-200 dark:border-gray-700 rounded-md shadow-lg 
              max-h-60 overflow-auto">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      handleNavigation(event.Event_Name);
                      setShowDropdown(false);
                      setSearchTerm('');
                    }}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <div className="font-medium dark:text-white">{event.Event_Name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{event.Event_Venue}</div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500 dark:text-gray-400">No events found</div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-8">
        {events.map((event) => {
          const formattedDate = formatEventDate(event.Event_Start_Date);
          const status = getEventStatus(
            event.Event_Start_Date,
            event.Event_End_Date,
            event.Event_Start_Time,
            event.Event_End_Time,
            event.Event_Venue
          );

          return (
            <div 
              key={event.id || `event-${event.Event_Name}`} 
              className="border-t border-gray-200 dark:border-gray-700 pt-8 
                flex justify-between items-center"
            >
              <div className="flex items-center gap-12 min-w-[180px]">
                <div className="flex items-center gap-2">
                  <span className="text-6xl font-bold leading-none dark:text-white">
                    {formattedDate.day}
                  </span>
                  <div className="text-gray-500 dark:text-gray-400">
                    {formattedDate.month}
                    <span className="block">{formattedDate.year}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <h3 
                    onClick={() => handleNavigation(event.Event_Name)}
                    className="text-2xl font-semibold hover:text-primary-600 
                      transition-colors cursor-pointer dark:text-white 
                      dark:hover:text-primary-200"
                  >
                    {event.Event_Name}
                  </h3>
                  <span className={`${status.className} text-white px-2 py-0.5 
                    rounded-md text-xs font-normal`}>
                    {status.text}
                  </span>
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400 gap-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.Event_Venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>
                      {new Date(event.Event_Start_Time).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center min-w-[180px] justify-end">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleNavigation(event.Event_Name)}
                    className="px-4 py-2 rounded bg-primary-600 text-white 
                      hover:bg-primary-700 transition-colors
                      dark:bg-primary-600 dark:hover:bg-primary-700"
                  >
                    BUY TICKETS
                  </button>
                  <PriceDisplay priceInGHS={getMinTicketPrice(event)} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventListing;
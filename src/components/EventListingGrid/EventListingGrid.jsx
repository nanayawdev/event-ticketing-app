import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEventStatus } from '../EventsCard/EventsCard';
import eventplaceholder from '../../assets/images/eventplaceholder.jpg';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LoadingSpinner } from '../ui/LoadingSpinner'
import { useEvents } from '../../hooks/useEvents';
import PriceDisplay from '../PriceDisplay/PriceDisplay';
import { ErrorMessage } from '../ui/ErrorMessage'

const EventListingGrid = () => {
  const { events, loading, error } = useEvents();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  const handleViewEvent = (eventName) => {
    const eventSlug = eventName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/events/${eventSlug}`);
  };

  // Calculate pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
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
    <div className="max-w-7xl mx-auto p-8">
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-6">Trending Events</h1>
        <div className="flex justify-between items-center">
          <p className="text-gray-600 max-w-2xl">
            Join the most anticipated events of the year. Book early to secure your spot.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentEvents.map((event) => {
          const eventDate = new Date(event.Event_Start_Date);
          const status = getEventStatus(
            event.Event_Start_Date,
            event.Event_End_Date,
            event.Event_Start_Time,
            event.Event_End_Time,
            event.Event_Venue
          );

          // Get minimum price from Ticket_Price array
          const minPrice = event.Ticket_Price?.length > 0 
            ? Math.min(...event.Ticket_Price.map(ticket => Number(ticket.price)))
            : Number(event.Event_Price) || 0;

          return (
            <div 
              key={event.id || `event-${event.Event_Name}`} 
              className="flex flex-col bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={event.Event_Image?.url || eventplaceholder}
                  alt={event.Event_Name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`${status.className} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                    {status.text}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-sea-green-600 mb-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium">
                    {eventDate.toLocaleString('default', { month: 'short' }).toUpperCase()} {eventDate.getDate()} - {new Date(event.Event_Start_Time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <h3 
                  className="text-xl font-bold mb-2 hover:text-sea-green-600 transition-colors cursor-pointer"
                  onClick={() => handleViewEvent(event.Event_Name)}
                >
                  {event.Event_Name}
                </h3>

                <div className="flex items-center text-gray-500 mb-4">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm">{event.Event_Venue}</p>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <button 
                    onClick={() => handleViewEvent(event.Event_Name)}
                    className="bg-sea-green-500 text-white px-6 py-2 rounded hover:bg-sea-green-600 transition-colors"
                  >
                    Book Now
                  </button>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">from</p>
                    <PriceDisplay priceInGHS={minPrice} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-end items-center gap-2 mt-8">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg bg-white border ${
            currentPage === 1 
              ? 'text-gray-400 cursor-not-allowed border-gray-200' 
              : 'text-sea-green-500 hover:bg-sea-green-50 border-sea-green-500'
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-lg bg-white border ${
            currentPage === totalPages 
              ? 'text-gray-400 cursor-not-allowed border-gray-200' 
              : 'text-sea-green-500 hover:bg-sea-green-50 border-sea-green-500'
          }`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default EventListingGrid;
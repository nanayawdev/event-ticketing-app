import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEventStatus } from '../EventsCard/EventsCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import eventplaceholder from '../../assets/images/eventplaceholder.jpg';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { useEvents } from '../../hooks/useEvents';
import PriceDisplay from '../PriceDisplay/PriceDisplay';
import { ErrorMessage } from '../ui/ErrorMessage';

const EventListingAlt = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 3;
  const { events, loading, error } = useEvents();
  const navigate = useNavigate();

  const handleViewEvent = (eventName) => {
    const eventSlug = eventName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/events/${eventSlug}`);
  };

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
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 mt-8 sm:mt-12 lg:mt-16">
      <div className="max-w-7xl mx-auto mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 dark:text-gray-50">
          Upcoming Events
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Discover and book tickets for the most exciting events happening near you.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
        {currentEvents.map((event) => {
          const eventDate = new Date(event.Event_Start_Date);
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
              className="max-w-7xl mx-auto p-4 sm:p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm"
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8">
                <div className="flex sm:block items-center gap-2 sm:gap-0 sm:text-center sm:min-w-[80px]">
                  <p className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-none text-primary-950 dark:text-primary-200">
                    {eventDate.getDate()}
                  </p>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 uppercase mt-0 sm:mt-2 font-medium">
                    {eventDate.toLocaleString('default', { month: 'short' })}
                  </p>
                </div>

                <div className="flex-1 space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {new Date(event.Event_Start_Time).toLocaleString()} - {new Date(event.Event_End_Time).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <h2 
                      className="text-xl sm:text-2xl font-bold cursor-pointer hover:text-primary-600 
                        dark:text-gray-50 dark:hover:text-primary-200"
                      onClick={() => handleViewEvent(event.Event_Name)}
                    >
                      {event.Event_Name}
                    </h2>
                    <span className={`${status.className} text-white px-2 py-0.5 rounded-md text-xs font-normal`}>
                      {status.text}
                    </span>
                  </div>
                  
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{event.Event_Venue}</p>
                  <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 line-clamp-2 sm:line-clamp-none">
                    {event.Event_Description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <button 
                      onClick={() => handleViewEvent(event.Event_Name)}
                      className="bg-primary-600 text-white px-4 sm:px-6 py-2 rounded text-sm sm:text-base
                        hover:bg-primary-700 transition-colors
                        dark:bg-primary-600 dark:hover:bg-primary-500"
                    >
                      GET TICKETS
                    </button>
                    <PriceDisplay priceInGHS={getMinTicketPrice(event)} />
                  </div>
                </div>

                <div className="sm:flex items-start order-first sm:order-last">
                  <div className="w-full sm:w-72 lg:w-96 h-48 sm:h-56 lg:h-64">
                    <img
                      src={event.Event_Image?.url || eventplaceholder}
                      alt={event.Event_Name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center sm:justify-end items-center gap-2 mt-6 sm:mt-8">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`p-1.5 sm:p-2 rounded-lg bg-white border ${
            currentPage === 1 
              ? 'text-gray-400 cursor-not-allowed border-gray-200 dark:bg-gray-800 dark:border-gray-700' 
              : 'text-primary-200 hover:bg-primary-50 border-primary-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-primary-200'
          }`}
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`p-1.5 sm:p-2 rounded-lg bg-white border ${
            currentPage === totalPages 
              ? 'text-gray-400 cursor-not-allowed border-gray-200 dark:bg-gray-800 dark:border-gray-700' 
              : 'text-primary-200 hover:bg-primary-50 border-primary-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-primary-200'
          }`}
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
};

export default EventListingAlt; 
'use client'

import { useState, useEffect, useRef } from 'react'
import EventsCard from '../EventsCard/EventsCard'
import EventHeroCard from '../EventHeroCard/EventHeroCard'
import { ArrowRight, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { LoadingSpinner } from '../ui/LoadingSpinner'
import { useEvents } from '../../hooks/useEvents'
import { ErrorMessage } from '../ui/ErrorMessage'
import { getEventStatus } from '../../utils/eventStatus'

const EventsGrid = () => {
  const navigate = useNavigate()
  const [visibleEvents, setVisibleEvents] = useState(12)
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null)
  const { events, loading, error } = useEvents();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter events based on search and closed status (for grid only)
  const filteredEvents = events.filter(event => {
    if (!event) return false;
    const status = getEventStatus(
      event.Event_Start_Date,
      event.Event_End_Date,
      event.Event_Start_Time,
      event.Event_End_Time,
      event.Event_Venue
    );
    return status.text !== "Event Closed" && 
      (!searchTerm.trim() || event.Event_Name.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowDropdown(value.length > 0);
  };

  const handleLoadMore = () => {
    navigate('/events')
  }

  if (loading) return <LoadingSpinner />
  if (error) {
    console.error('EventsGrid error:', error);
    return (
      <ErrorMessage 
        title="Unable to Load Events"
        message={error || "We're having trouble loading the events. Please check your internet connection and try again."}
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No events available at this time.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8 mb-8 max-w-[1300px]">
      {/* Hero Card */}
      <div className="mb-12">
        <EventHeroCard events={events} />
      </div>

      {/* Search Section with Dropdown */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto" ref={searchRef}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchInput}
            onFocus={() => setShowDropdown(searchTerm.length > 0)}
            placeholder="Search events..."
            className="block w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
          
          {showDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
              {filteredEvents.length > 0 ? (
                filteredEvents.slice(0, 5).map((event, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      navigate(`/events/${event.Event_Name.toLowerCase().replace(/\s+/g, '-')}`);
                      setShowDropdown(false);
                      setSearchTerm('');
                    }}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <div className="text-sm font-medium">{event.Event_Name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        {event.Event_Venue}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500 dark:text-gray-400">No events found</div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Events Grid */}
      <div className="grid grid-cols-1 min-[375px]:grid-cols-2 min-[650px]:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4 sm:gap-x-3 sm:gap-y-5 md:gap-x-4 md:gap-y-6 justify-items-center">
        {filteredEvents.slice(0, visibleEvents).map((event) => (
          <div 
            key={event.id || `event-${event.Event_Name}-${event.Event_Start_Date}`} 
            className="col-span-1 w-full max-w-[280px]"
          >
            <EventsCard event={event} />
          </div>
        ))}
      </div>
      
      {/* No Results Message */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No events found for your search criteria
        </div>
      )}
      
      {/* Find More Events Button */}
      {visibleEvents < filteredEvents.length && (
        <div className="text-center mt-16">
          <button
            onClick={handleLoadMore}
            className="border border-sea-green-500 text-sea-green-500 font-semibold py-2 px-6 rounded-md transition-colors flex items-center gap-2 mx-auto hover:bg-sea-green-50"
          >
            View All Events
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}

export default EventsGrid

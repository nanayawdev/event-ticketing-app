'use client'

import { useState, useEffect, useRef } from 'react'
import EventsCard from '../EventsCard/EventsCard'
import EventHeroCard from '../EventHeroCard/EventHeroCard'
import { ArrowRight, Search, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { LoadingSpinner } from '../ui/LoadingSpinner'
import { useEvents } from '../../hooks/useEvents'

const EventsGrid = () => {
  const navigate = useNavigate()
  const [visibleEvents, setVisibleEvents] = useState(12)
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null)
  const { events, loading, error } = useEvents();

  // Filter events based on search and closed status (for grid only)
  const filteredEvents = events.filter(event => {
    if (!event || !event.Event_End_Time) return false;
    const endDateTime = new Date(event.Event_End_Time);
    const isNotClosed = new Date() <= endDateTime;
    
    if (!searchTerm.trim()) return isNotClosed;
    
    return isNotClosed && event.Event_Name.toLowerCase().includes(searchTerm.toLowerCase());
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
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>

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
            className="block w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sea-green-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          
          {showDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
              {filteredEvents.length > 0 ? (
                filteredEvents.slice(0, 5).map((event, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      navigate(`/events/${event.Event_Name.toLowerCase().replace(/\s+/g, '-')}`);
                      setShowDropdown(false);
                      setSearchTerm('');
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="font-medium">{event.Event_Name}</div>
                    <div className="text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {event.Event_Venue}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">No events found</div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4 sm:gap-x-3 sm:gap-y-5 md:gap-x-4 md:gap-y-6 justify-items-center">
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

'use client'

import { useState, useEffect } from 'react'
import EventsCard from '../EventsCard/EventsCard'
import EventHeroCard from '../EventHeroCard/EventHeroCard'
import { ArrowRight, Search } from 'lucide-react'

const EventsGrid = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [visibleEvents, setVisibleEvents] = useState(12)
  const [searchQuery, setSearchQuery] = useState('')

  // Fetch events
  useEffect(() => {
    fetch('https://api-server.krontiva.africa/api:BnSaGAXN/Get_All_Event')
      .then(response => response.json())
      .then(data => {
        setEvents(data)
        setLoading(false)
      })
      .catch(err => {
        setError('Failed to load events')
        setLoading(false)
      })
  }, [])

  // Filter events based on search and closed status (for grid only)
  const filteredEvents = events.filter(event => {
    if (!event || !event.Event_End_Time) return false;

    const endDateTime = new Date(event.Event_End_Time)
    const isNotClosed = new Date() <= endDateTime
    
    // If no search query, just check if event is not closed
    if (!searchQuery.trim()) return isNotClosed;

    // Search filter
    const searchLower = searchQuery.toLowerCase().trim()
    const eventName = String(event.Event_Name || '').toLowerCase()
    const eventVenue = String(event.Event_Venue || '').toLowerCase()
    const eventCategory = String(event.Event_Category || '').toLowerCase()

    const matchesSearch = 
      eventName.includes(searchLower) ||
      eventVenue.includes(searchLower) ||
      eventCategory.includes(searchLower)

    return isNotClosed && matchesSearch
  })

  const handleLoadMore = () => {
    setVisibleEvents(prev => prev + 12)
  }

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    setVisibleEvents(12) // Reset visible events when searching
  }

  if (loading) return <div className="text-center py-10">Loading events...</div>
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>

  return (
    <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8 mb-8 max-w-[1300px]">
      {/* Hero Card - using all events, not filtered ones */}
      <div className="mb-12">
        <EventHeroCard events={events} />
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search events by name, venue, or category..."
            className="block w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sea-green-500 focus:border-transparent"
          />
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
            Find More Events
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}

export default EventsGrid

'use client'

import { useState, useEffect } from 'react'
import EventsCard from '../EventsCard/EventsCard'
import { ArrowRight } from 'lucide-react'

const EventsGrid = ({ activeCategory }) => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [visibleEvents, setVisibleEvents] = useState(12)

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

  // Filter out closed events and apply category filter
  const filteredEvents = events.filter(event => {
    const endDateTime = new Date(event.Event_End_Time)
    const isNotClosed = new Date() <= endDateTime
    return isNotClosed && (activeCategory === 'All' ? true : event.Event_Category === activeCategory)
  });

  const handleLoadMore = () => {
    setVisibleEvents(prev => prev + 12)
  }

  if (loading) return <div className="text-center py-10">Loading events...</div>
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>

  return (
    <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8 mb-8 max-w-[1300px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4 sm:gap-x-3 sm:gap-y-5 md:gap-x-4 md:gap-y-6 justify-items-center">
        {filteredEvents.slice(0, visibleEvents).map((event, index) => (
          <div className="col-span-1 w-full max-w-[280px]">
            <EventsCard key={event.id || index} event={event} />
          </div>
        ))}
      </div>
      
      {/* Find More Events Button */}
      {visibleEvents < filteredEvents.length && (
        <div className="text-center mt-16">
          <button
            onClick={handleLoadMore}
            className="border border-sea-green-500 text-sea-green-500 font-semibold py-2 px-6 rounded-md transition-colors flex items-center gap-2 mx-auto"
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

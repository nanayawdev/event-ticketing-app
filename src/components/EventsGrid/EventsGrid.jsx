'use client'

import { useState, useEffect } from 'react'
import EventsCard from '../EventsCard/Eventscard'

const EventsGrid = ({ activeCategory }) => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  const filteredEvents = events.filter(event => 
    activeCategory === 'All' ? true : event.Event_Category === activeCategory
  );

  if (loading) return <div className="text-center py-10">Loading events...</div>
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>

  return (
    <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
        {filteredEvents.map((event, index) => (
          <EventsCard key={event.id || index} event={event} />
        ))}
      </div>
    </div>
  )
}

export default EventsGrid

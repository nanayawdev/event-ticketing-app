'use client'

import { useState, useEffect } from 'react'
import EventsCard from '../EventsCard/EventsCard'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const RelatedEvents = ({ currentEventCategory, currentEventId }) => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

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

  // Filter out closed events, current event, and limit to same category
  const filteredEvents = events.filter(event => {
    const endDateTime = new Date(event.Event_End_Time)
    const isNotClosed = new Date() <= endDateTime
    const isNotCurrentEvent = event.id !== currentEventId
    return isNotClosed && 
           isNotCurrentEvent && 
           event.Event_Category === currentEventCategory
  });

  const handleViewAllEvents = () => {
    navigate('/events', { 
      state: { category: currentEventCategory },
      replace: false 
    });
  }

  if (loading) return <div className="text-center py-10">Loading related events...</div>
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>
  if (filteredEvents.length === 0) return null // Don't show section if no related events

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Related Events</h2>
          <button
            onClick={handleViewAllEvents}
            className="border border-sea-green-500 text-sea-green-500 font-semibold py-2 px-4 rounded-md transition-colors flex items-center gap-2 hover:bg-sea-green-50"
          >
            View All Events
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {filteredEvents.slice(0, 8).map((event, index) => (
            <EventsCard key={event.id || index} event={event} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default RelatedEvents 
'use client'

import { useState, useEffect } from 'react'
import EventsCard from '../EventsCard/EventsCard'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { LoadingSpinner } from '../ui/LoadingSpinner'
import { toast } from 'sonner'
import { useEvents } from '../../hooks/useEvents'
import { ErrorMessage } from '../ui/ErrorMessage'

const RelatedEvents = ({ currentEventCategory, currentEventId }) => {
  const { events, loading, error } = useEvents();
  const navigate = useNavigate()

  const filteredEvents = events.filter(event => {
    const eventEndTime = new Date(event.Event_End_Time || event.Event_End_Date);
    const now = new Date();
    
    return (
      event.id !== currentEventId && 
      event.Event_Category === currentEventCategory &&
      eventEndTime > now // Only show future events
    );
  });

  const handleViewAllEvents = () => {
    navigate('/events', { 
      state: { category: currentEventCategory },
      replace: false 
    });
  }

  if (loading) return <LoadingSpinner />
  if (error) {
    return (
      <ErrorMessage 
        title="Unable to Load Related Events"
        message="We're having trouble loading related events. Please check your internet connection and try again."
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (filteredEvents.length === 0) return null // Don't show section if no related events

  // Sort events by start date
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const dateA = new Date(a.Event_Start_Time || a.Event_Start_Date);
    const dateB = new Date(b.Event_Start_Time || b.Event_Start_Date);
    return dateA - dateB;
  });

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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-4 sm:gap-x-3 sm:gap-y-5 md:gap-x-4 md:gap-y-6 justify-items-center">
          {sortedEvents.slice(0, 5).map((event) => (
            <div 
              key={event.id || `event-${event.Event_Name}`} 
              className="col-span-1 w-full max-w-[280px]"
            >
              <EventsCard event={event} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RelatedEvents
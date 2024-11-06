import { useState, useEffect } from 'react'
import EventsCard from '../EventsCard/EventsCard'
import EventHeroCard from '../EventHeroCard/EventHeroCard'
import { ArrowRight } from 'lucide-react'

const AllEventsGrid = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [visibleEvents, setVisibleEvents] = useState(12)
  const [activeCategory, setActiveCategory] = useState('All')

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
  })

  const handleLoadMore = () => {
    setVisibleEvents(prev => prev + 12)
  }

  const categories = ['All', ...new Set(events.map(event => event.Event_Category).filter(Boolean))]

  if (loading) return <div className="text-center py-10">Loading events...</div>
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>

  return (
    <section className="py-12">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Discover Events
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find and book the best events happening in your area
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${activeCategory === category
                ? 'bg-sea-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Hero Card */}
      {events && events.length > 0 && (
        <div className="mb-12">
          <EventHeroCard events={events} />
        </div>
      )}

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 justify-items-center">
        {filteredEvents.slice(0, visibleEvents).map((event) => (
          <div 
            key={event.id || `event-${event.Event_Name}-${event.Event_Start_Date}`}
            className="w-full max-w-[280px]"
          >
            <EventsCard event={event} />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleEvents < filteredEvents.length && (
        <div className="text-center mt-12">
          <button
            onClick={handleLoadMore}
            className="border border-sea-green-500 text-sea-green-500 font-semibold py-2 px-6 rounded-md transition-colors hover:bg-sea-green-50 flex items-center gap-2 mx-auto"
          >
            Find More Events
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </section>
  )
}

export default AllEventsGrid 
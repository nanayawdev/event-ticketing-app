import { useState, useEffect, useMemo } from 'react'
import { Calendar, ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import eventplaceholder from '../../assets/images/eventplaceholder.jpg'
import { getEventStatus } from '../../utils/eventStatus';
import { useNavigate } from 'react-router-dom'

export default function EventHeroCard({ events }) {
  console.log('Events received:', events) // Debug log

  const [currentIndex, setCurrentIndex] = useState(0)
  const [status, setStatus] = useState({})
  const navigate = useNavigate()

  // Get featured events once when events prop changes
  const featuredEvents = useMemo(() => {
    if (!events || !Array.isArray(events)) return []
    
    return events
      .filter(event => {
        if (!event || !event.Event_End_Time) return false
        const endDateTime = new Date(event.Event_End_Time)
        return new Date() <= endDateTime
      })
      .sort((a, b) => new Date(a.Event_Start_Time) - new Date(b.Event_Start_Time))
      .slice(0, 5)
  }, [events])

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? featuredEvents.length - 1 : prevIndex - 1
    )
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === featuredEvents.length - 1 ? 0 : prevIndex + 1
    )
  }

  // Update status when currentIndex or featuredEvents change
  useEffect(() => {
    if (featuredEvents.length > 0) {
      const currentEvent = featuredEvents[currentIndex]
      const eventStatus = getEventStatus(
        currentEvent.Event_Start_Date,
        currentEvent.Event_End_Date,
        currentEvent.Event_Start_Time,
        currentEvent.Event_End_Time,
        currentEvent.Event_Venue
      )
      setStatus(eventStatus)
    }
  }, [currentIndex, featuredEvents])

  // Autoplay effect
  useEffect(() => {
    if (featuredEvents.length <= 1) return; // Don't setup timer if there's only one or no events

    const autoplayTimer = setInterval(() => {
      setCurrentIndex(prevIndex => 
        prevIndex === featuredEvents.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(autoplayTimer)
  }, [featuredEvents.length]) // Only depend on the length

  const isPastEvent = () => {
    const currentEvent = featuredEvents[currentIndex]
    const endDateTime = new Date(currentEvent.Event_End_Time)
    return new Date() > endDateTime
  }

  const handleViewEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isPastEvent()) return; // Early return if event is past

    const currentEvent = featuredEvents[currentIndex]
    const eventSlug = currentEvent.Event_Name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/events/${eventSlug}`, { 
      state: { event: currentEvent },
      replace: false,
      preventScrollReset: true
    });
  };

  if (!featuredEvents.length) {
    console.log('No featured events available') // Debug log
    return null
  }

  const currentEvent = featuredEvents[currentIndex]
  if (!currentEvent) return null

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden mt-[72px] sm:mt-[80px]">
      {/* Background Image */}
      <img
        src={currentEvent.Event_Image?.url || eventplaceholder}
        alt={`Cover for ${currentEvent.Event_Name || 'Event'}`}
        className={`object-cover w-full h-full transition-opacity duration-500 ${
          !isPastEvent() ? 'cursor-pointer' : 'cursor-not-allowed opacity-75'
        }`}
        onClick={handleViewEvent}
        loading="eager"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

      {/* Content */}
      <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          {/* Event Status Badge */}
          <span className={`inline-block px-4 py-2 rounded-full ${status.className} backdrop-blur-sm border border-white/20 text-white text-sm font-medium`}>
            {status.text}
          </span>

          {/* Event counter */}
          <span className="text-white text-sm">
            {currentIndex + 1} / {featuredEvents.length}
          </span>
        </div>

        <div className="space-y-4">
          {/* Date Badge */}
          <div className="flex items-center gap-2 w-fit rounded-full bg-background/20 backdrop-blur-sm px-4 py-2 text-white">
            <Calendar className="h-4 w-4" />
            <time dateTime={currentEvent.Event_Start_Date} className="text-sm">
              {new Date(currentEvent.Event_Start_Date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </time>
          </div>

          {/* Title */}
          <h1 
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-2xl ${
              !isPastEvent() 
                ? 'cursor-pointer hover:text-gray-200' 
                : 'cursor-not-allowed'
            } transition-colors`}
            onClick={handleViewEvent}
          >
            {currentEvent.Event_Name}
          </h1>

          {/* Location */}
          <div className="flex items-center gap-2 text-white/90">
            <MapPin className="h-5 w-5" />
            <span>{currentEvent.Event_Venue}</span>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              size="icon"
              variant="outline"
              className="bg-background/20 backdrop-blur-sm border-white/20 hover:bg-background/30"
              onClick={handlePrevious}
              aria-label="Previous event"
            >
              <ChevronLeft className="h-4 w-4 text-white" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="bg-background/20 backdrop-blur-sm border-white/20 hover:bg-background/30"
              onClick={handleNext}
              aria-label="Next event"
            >
              <ChevronRight className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
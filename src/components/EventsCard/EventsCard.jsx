import { useState, useEffect } from 'react'
import { SlLike } from 'react-icons/sl'

const getEventStatus = (eventDate) => {
  const now = new Date()
  const event = new Date(eventDate)
  const diffTime = event - now
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffTime < 0) {
    return { text: "Past Event", className: "bg-red-500" }
  } else if (diffDays === 0) {
    return { text: "Event Due Today", className: "bg-green-500" }
  } else if (diffDays <= 5) {
    return { text: `${diffDays} days until event`, className: "bg-gray-800" }
  } else {
    return { text: "Currently Live", className: "bg-pink-500" }
  }
}

const EventsCard = ({ event }) => {
  const [status, setStatus] = useState(getEventStatus(event.Event_Start_Date))
  const [likes, setLikes] = useState(0)
  const [hasLiked, setHasLiked] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(getEventStatus(event.Event_Start_Date))
    }, 60000) // Update status every minute

    return () => clearInterval(timer)
  }, [event.Event_Start_Date])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return {
      month: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
      day: date.getDate()
    }
  }

  const { month, day } = formatDate(event.Event_Start_Date)

  const handleLike = () => {
    setLikes(prev => hasLiked ? prev - 1 : prev + 1)
    setHasLiked(prev => !prev)
    // Here you would typically make an API call to update likes in the backend
    // updateEventLikes(event.id, hasLiked ? likes - 1 : likes + 1)
  }

  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg">
      <div className="relative">
        <img 
          src={event.Event_Image?.url || "/placeholder.svg?height=200&width=400"} 
          alt={event.Event_Name}
          className="w-full h-48 object-cover"
        />
        <div className={`absolute top-2 right-2 ${status.className} text-white px-2 py-0.5 rounded-md text-xs font-normal`}>
          {status.text}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-normal">{event.Event_Name}</h2>
          <button 
            onClick={handleLike}
            className={`flex items-center gap-1 transition-colors ${
              hasLiked ? 'text-sea-green-500' : 'hover:text-sea-green-500'
            }`}
          >
            <SlLike className={`w-5 h-5 ${hasLiked ? 'fill-current' : ''}`} />
            {likes > 0 && <span>{likes}</span>}
          </button>
        </div>

        <div className="flex gap-4 mb-2">
          <div className="text-center">
            <div className="text-sea-green-500 font-bold">{month}</div>
            <div className="text-3xl font-normal text-sea-green-500">{day}</div>
          </div>
          <p className="text-gray-600 font-normal">{event.Event_Description}</p>
        </div>

        <div className="text-gray-500 mb-2 text-lg font-medium">
          {event.Event_Venue}
        </div>

        <div className="flex justify-between items-center">
          <div className="text-2xl font-normal border border-gray-200 rounded-md px-3 py-1">
            ₵{event.Event_Price || '456'}
          </div>
          <button className="bg-sea-green-400 text-white px-6 py-2 rounded-md hover:bg-sea-green-600 transition-colors">
            View Event
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventsCard
import { useState, useEffect } from 'react'
import { SlLike } from 'react-icons/sl'
import { isFuture, isPast, isToday, isTomorrow, differenceInDays, format } from 'date-fns'
import { useNavigate, Link } from 'react-router-dom';
import eventplaceholder from '../../assets/images/eventplaceholder.jpg';
import PriceDisplay from '../PriceDisplay/PriceDisplay';
import { getEventStatus } from '../../utils/eventStatus';


const EventsCard = ({ event }) => {
  console.log('Event Data:', {
    startDate: event.Event_Start_Date,
    endDate: event.Event_End_Date,
    startTime: event.Event_Start_Time,
    endTime: event.Event_End_Time,
    venue: event.Event_Venue
  });

  const [status, setStatus] = useState(getEventStatus(
    event.Event_Start_Date,
    event.Event_End_Date,
    event.Event_Start_Time,
    event.Event_End_Time,
    event.Event_Venue
  ))
  const [likes, setLikes] = useState(0)
  const [hasLiked, setHasLiked] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(getEventStatus(
        event.Event_Start_Date,
        event.Event_End_Date,
        event.Event_Start_Time,
        event.Event_End_Time,
        event.Event_Venue
      ))
    }, 60000)

    return () => clearInterval(timer)
  }, [event.Event_Start_Date, event.Event_End_Date, event.Event_Start_Time, event.Event_End_Time, event.Event_Venue])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return {
      month: date.toLocaleString('default', { month: 'short' }),
      day: date.getDate()
    }
  }

  const { month: startMonth, day: startDay } = formatDate(event.Event_Start_Date)
  const { month: endMonth, day: endDay } = formatDate(event.Event_End_Date)

  const handleLike = () => {
    if (isPastEvent()) return; // Early return if event is past
    
    setLikes(prev => hasLiked ? prev - 1 : prev + 1)
    setHasLiked(prev => !prev)
  }

  const isPastEvent = () => {
    const endDateTime = new Date(event.Event_End_Time)
    return new Date() > endDateTime
  }

  const handleViewEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isPastEvent()) return; // Early return if event is past

    const eventSlug = event.Event_Name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/events/${eventSlug}`, { 
      state: { event },
      replace: false,
      preventScrollReset: true
    });
  };

  // Get minimum ticket price from the Ticket_Price array
  const getMinTicketPrice = () => {
    if (!event.Ticket_Price?.length) {
      return Number(event.Event_Price) || 0;
    }
    
    return Math.min(...event.Ticket_Price.map(ticket => Number(ticket.price)));
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg max-w-[280px]">
      <div className="relative">
        <img 
          src={event.Event_Image?.url || eventplaceholder} 
          alt={event.Event_Name}
          className={`w-full h-32 object-cover ${!isPastEvent() ? 'cursor-pointer' : 'cursor-not-allowed opacity-75'}`}
          onClick={handleViewEvent}
          loading="eager"
        />
        <div className={`absolute top-2 right-2 ${status.className} text-white px-2 py-0.5 rounded-md text-xs font-normal`}>
          {status.text}
        </div>
      </div>

      <div className="p-2">
        <div className="flex justify-between items-start mb-2">
          <h2 
            onClick={handleViewEvent}
            className={`text-sm font-bold truncate max-w-[180px] ${
              !isPastEvent() 
                ? 'cursor-pointer hover:text-primary-500 dark:hover:text-primary-100' 
                : 'cursor-not-allowed text-gray-500'
            } transition-colors`}
          >
            {event.Event_Name}
          </h2>
          <button 
            onClick={handleLike}
            className={`flex items-center gap-1 transition-colors ${
              isPastEvent() 
                ? 'cursor-not-allowed text-gray-400' 
                : hasLiked 
                  ? 'text-primary-500 dark:text-primary-600' 
                  : 'hover:text-primary-500 dark:hover:text-primary-600'
            }`}
            disabled={isPastEvent()}
          >
            <SlLike className={`w-4 h-4 ${hasLiked && !isPastEvent() ? 'fill-current' : ''}`} />
            {likes > 0 && <span>{likes}</span>}
          </button>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <div className="bg-primary-950 dark:bg-primary-600 text-white px-2 py-0.5 rounded-sm text-xs font-normal">
            {startMonth} {startDay}
            {event.Event_Start_Date !== event.Event_End_Date && 
              <> - {endMonth} {endDay}</>
            }
          </div>
          <div className="h-5 w-px bg-gray-300"></div>
          <div className="flex-1 text-gray-500 font-normal text-xs truncate">
            {event.Event_Venue}
          </div>
          <div className="h-5 w-px bg-gray-300"></div>
          <div className="text-xs font-bold text-primary-500 dark:text-primary-600">
            <PriceDisplay priceInGHS={getMinTicketPrice()} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventsCard
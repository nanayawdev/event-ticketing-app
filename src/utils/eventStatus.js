import { isFuture, isPast, isToday, isTomorrow, differenceInDays } from 'date-fns';

export const getEventStatus = (eventStartDate, eventEndDate, eventStartTime, eventEndTime, eventVenue) => {
  const now = new Date();
  
  // Convert timestamps to Date objects
  const startDateTime = new Date(eventStartTime);
  const endDateTime = new Date(eventEndTime);

  if (now > endDateTime) {
    return { text: "Event Closed", className: "bg-red-500" };
  }

  // Check if event is ongoing
  if (now >= startDateTime && now <= endDateTime) {
    const hoursUntilEnd = (endDateTime - now) / (1000 * 60 * 60);
    
    if (hoursUntilEnd <= 3) {
      if (hoursUntilEnd <= 1) {
        const minutesLeft = Math.floor(hoursUntilEnd * 60);
        return { text: `Event ending in ${minutesLeft}m`, className: "bg-orange-500" };
      }
      const hours = Math.floor(hoursUntilEnd);
      const minutes = Math.floor((hoursUntilEnd - hours) * 60);
      return { text: `Event ending in ${hours}h ${minutes}m`, className: "bg-orange-500" };
    }
    return { text: `Happening now at ${eventVenue}`, className: "bg-green-500" };
  }

  // Calculate time until start
  const hoursUntil = (startDateTime - now) / (1000 * 60 * 60);
  
  if (hoursUntil <= 24 && hoursUntil > 0) {
    const hours = Math.floor(hoursUntil);
    const minutes = Math.floor((hoursUntil - hours) * 60);
    if (hours > 0) {
      return { text: `${hours}h ${minutes}m until event`, className: "bg-yellow-500" };
    }
    return { text: `${minutes}m until event`, className: "bg-yellow-500" };
  }

  if (isTomorrow(startDateTime)) {
    return { text: "Tomorrow", className: "bg-blue-500" };
  }

  if (isFuture(startDateTime)) {
    const daysUntil = differenceInDays(startDateTime, now);
    if (daysUntil <= 7) {
      return { text: `${daysUntil} days until event`, className: "bg-yellow-500" };
    }
    return { text: `${daysUntil} days away`, className: "bg-gray-500" };
  }

  return { text: "Check dates", className: "bg-gray-400" };
}; 
import React, { useState, useEffect } from 'react';
import { isFuture, parseISO, format } from 'date-fns';
import { Hand, WifiOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../../hooks/useEvents';

const NoticeBar = () => {
  const [nextEvent, setNextEvent] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const navigate = useNavigate();
  const { events, loading, error } = useEvents();

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Find next event whenever events array updates
  useEffect(() => {
    if (events.length > 0) {
      const futureEvents = events.filter(event => 
        isFuture(parseISO(event.Event_Start_Date))
      );

      const sortedEvents = futureEvents.sort((a, b) => 
        parseISO(a.Event_Start_Date) - parseISO(b.Event_Start_Date)
      );

      setNextEvent(sortedEvents[0] || null);
    }
  }, [events]);

  // Show offline message
  if (!isOnline) {
    return (
      <div className="sticky top-0 z-50 bg-yellow-50 text-yellow-800 py-2">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-center gap-2">
            <WifiOff className="w-4 h-4" />
            <span className="text-sm">
              You're offline. Some features may be limited.
            </span>
          </div>
        </div>
      </div>
    );
  }

  // If there's an error, loading, or no event, don't show the notice bar
  if (error || loading || !nextEvent) return null;

  return (
    <div className="sticky top-0 z-50 bg-sea-green-1000 text-black py-2">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-center gap-4">
          <div className="text-sm">
            <strong>New Event:</strong>{" "}
            {nextEvent ? (
              <>
                "{nextEvent.Event_Name}" - {format(parseISO(nextEvent.Event_Start_Date), 'MMM d, yyyy')}
              </>
            ) : (
              "Loading..."
            )}
          </div>
          <button 
            className="inline-flex items-center px-4 py-1 bg-gray-950 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
            onClick={() => {
              if (nextEvent) {
                const eventSlug = nextEvent.Event_Name.toLowerCase().replace(/\s+/g, '-');
                navigate(`/events/${eventSlug}`);
              }
            }}
          >
            Reserve Ticket
            <Hand className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeBar;

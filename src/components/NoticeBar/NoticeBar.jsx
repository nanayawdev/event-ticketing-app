import React, { useState, useEffect } from 'react';
import { isFuture, parseISO, format } from 'date-fns';
import { Hand } from 'lucide-react';

const NoticeBar = () => {
  const [nextEvent, setNextEvent] = useState(null);

  useEffect(() => {
    fetch('https://api-server.krontiva.africa/api:BnSaGAXN/Get_All_Event')
      .then(response => response.json())
      .then(events => {
        const futureEvents = events.filter(event => 
          isFuture(parseISO(event.Event_Start_Date))
        );

        const sortedEvents = futureEvents.sort((a, b) => 
          parseISO(a.Event_Start_Date) - parseISO(b.Event_Start_Date)
        );

        const upcoming = sortedEvents[0];
        if (upcoming) {
          setNextEvent(upcoming);
        }
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  return (
    <div className="sticky top-0 z-50 bg-gray-900 text-white py-2">
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
            className="inline-flex items-center px-4 py-1 bg-white text-gray-900 rounded-full text-sm font-medium hover:bg-rose-50 transition-colors"
            onClick={() => window.location.href = '/signup'}
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

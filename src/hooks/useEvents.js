import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export const useEvents = (filterClosed = true) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://api-server.krontiva.africa/api:BnSaGAXN/Get_All_Event');
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();

        // Filter out closed events if requested
        const filteredData = filterClosed ? data.filter(event => {
          if (!event || !event.Event_End_Time) return false;
          const endDateTime = new Date(event.Event_End_Time);
          return new Date() <= endDateTime;
        }) : data;

        setEvents(filteredData);
      } catch (err) {
        toast.error('Failed to load events', {
          description: 'Please try again later or contact support if the problem persists.',
        });
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [filterClosed]);

  return { events, loading, error };
}; 
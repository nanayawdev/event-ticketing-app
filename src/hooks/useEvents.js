import { useState, useEffect } from 'react';

export const useEvents = (filterClosed = true) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://api-server.krontiva.africa/api:BnSaGAXN/Get_All_Event');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();

        // Filter out closed events if filterClosed is true
        if (filterClosed) {
          data = data.filter(event => {
            if (!event || !event.Event_End_Time) return false;
            const endDateTime = new Date(event.Event_End_Time);
            return new Date() <= endDateTime;
          });
        }

        setEvents(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [filterClosed]);

  return { events, loading, error };
}; 
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export const useEvents = (filterClosed = true) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://api-server.krontiva.africa/api:BnSaGAXN/ticket_table');
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();

        // Transform the ticket table data to match expected event structure
        const transformedEvents = data.map(item => ({
          ...item.ticketEventTable,
          Ticket_Price: item.Ticket_Price
        }));

        // Filter closed events if requested
        const filteredEvents = filterClosed 
          ? transformedEvents.filter(event => new Date(event.Event_End_Time) > new Date())
          : transformedEvents;

        setEvents(filteredEvents);
      } catch (err) {
        console.error('Error fetching events:', err);
        toast.error('Failed to load events');
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [filterClosed]);

  return { events, loading, error };
}; 
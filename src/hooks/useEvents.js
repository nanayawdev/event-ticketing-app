import { useState, useEffect } from 'react';
import { eventService } from '../services/api';
import { handleApiError } from '../utils/errorHandler';

export const useEvents = (filterClosed = false) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching events...');
        const { data: eventsData } = await eventService.getAllEvents();
        
        // Ensure eventsData is an array
        const eventsArray = Array.isArray(eventsData) ? eventsData : [eventsData];
        
        // Fetch ticket details for each event
        const eventsWithTickets = await Promise.all(
          eventsArray.map(async (event) => {
            try {
              const { data: ticketData } = await eventService.getTicketsByEventId(event.id);
              return {
                ...event,
                ...ticketData.eventTable,
                Ticket_Price: ticketData.ticketTable?.Ticket_Price || [],
                ticketTableId: ticketData.ticketTable?.id,
                Event_Price: event.Event_Price || ticketData.eventTable?.Event_Price,
              };
            } catch (ticketError) {
              console.warn(`Error fetching tickets for event ${event.id}:`, ticketError);
              return event;
            }
          })
        );

        // Filter out closed events if needed
        const filteredEvents = filterClosed 
          ? eventsWithTickets.filter(event => {
              const endDate = new Date(event.Event_End_Time || event.Event_Start_Date);
              return endDate >= new Date();
            })
          : eventsWithTickets;

        setEvents(filteredEvents);
      } catch (err) {
        console.error('Error in useEvents hook:', err);
        const errorDetails = handleApiError(err);
        setError(errorDetails.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [filterClosed]);

  return { events, loading, error };
}; 
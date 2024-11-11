import { useState, useEffect } from 'react';

export const useEvents = (filterClosed = false) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch basic event data
        const eventsResponse = await fetch('https://api-server.krontiva.africa/api:BnSaGAXN/Get_All_Event');
        if (!eventsResponse.ok) {
          throw new Error(`HTTP error! status: ${eventsResponse.status}`);
        }
        let eventsData = await eventsResponse.json();

        // Fetch ticket details for each event
        const eventsWithTickets = await Promise.all(
          eventsData.map(async (event) => {
            try {
              const ticketResponse = await fetch(
                `https://api-server.krontiva.africa/api:BnSaGAXN/ticket_table/${event.id}`
              );
              
              if (ticketResponse.ok) {
                const ticketData = await ticketResponse.json();
                return {
                  ...event,
                  ...ticketData.eventTable, // Merge event table data
                  Ticket_Price: ticketData.ticketTable.Ticket_Price || [], // Add ticket prices
                  ticketTableId: ticketData.ticketTable.id, // Store ticket table ID
                  Event_Price: event.Event_Price || ticketData.eventTable.Event_Price, // Fallback price
                };
              }
              return event;
            } catch (error) {
              console.error(`Error fetching tickets for event ${event.id}:`, error);
              return event;
            }
          })
        );

        // Filter closed events if needed
        const filteredEvents = filterClosed 
          ? eventsWithTickets.filter(event => {
              const endDateTime = new Date(event.Event_End_Time);
              return new Date() <= endDateTime;
            })
          : eventsWithTickets;

        setEvents(filteredEvents);
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
import React, { useState, useEffect } from 'react';
import EventCard from '../EventCard/EventCard';
import './EventCardGrid.css';

const EventCardGrid = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://api-server.krontiva.africa/api:BnSaGAXN/Get_All_Event');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div className="loading-message">Loading events...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (events.length === 0) return <div className="no-events-message">No events found.</div>;

  return (
    <div className="event-card-grid">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventCardGrid;

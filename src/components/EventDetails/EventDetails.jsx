import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import EventLabel from '../EventLabel/EventLabel';
import './EventDetails.css';

const EventDetails = () => {
  const { eventName } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`https://api-server.krontiva.africa/api:BnSaGAXN/Get_All_Event`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const events = await response.json();
        const foundEvent = events.find(e => e.Event_Name.toLowerCase().replace(/\s+/g, '-') === eventName.toLowerCase());
        if (foundEvent) {
          setEvent(foundEvent);
        } else {
          setError('Event not found');
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventName]);

  if (loading) return <div className="event-details-container">Loading event details...</div>;
  if (error) return <div className="event-details-container">Error: {error}</div>;
  if (!event) return <div className="event-details-container">Event not found</div>;

  return (
    <div className="event-details-container">
      <Link to="/" className="back-button">← Back to Events</Link>
      <div className="event-details-content">
        <img src={event.Event_Image?.url || '/assets/images/herobg.jpg'} alt={event.Event_Name} className="event-details-image" />
        <div className="event-header">
          <EventLabel date={event.Event_Start_Date} className="event-label-above-title" />
          <h1 className="event-details-title">{event.Event_Name}</h1>
        </div>
        <p className="event-details-date">
          {event.Event_Start_Date 
            ? new Date(event.Event_Start_Date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) 
            : 'TBA'}
        </p>
        <p className="event-details-location">{event.Event_Venue || 'Venue TBA'}</p>
        <div className="event-details-description">
          <h2>Event Description</h2>
          <p>{event.Event_Description || 'No description available.'}</p>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;

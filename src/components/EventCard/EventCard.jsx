import React from 'react';
import { Link } from 'react-router-dom';
import EventLabel from '../EventLabel/EventLabel';
import './EventCard.css';

const EventCard = ({ event }) => {
  const { Event_Name, Event_Start_Date, Event_Image, Event_Venue } = event;

  const eventUrlName = Event_Name.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="event-card">
      <Link to={`/event/${eventUrlName}`} className="event-image-link">
        <div 
          className="event-image" 
          style={{ backgroundImage: `url(${Event_Image?.url || '/assets/images/herobg.jpg'})` }}
        >
          <EventLabel date={Event_Start_Date} />
        </div>
      </Link>
      <div className="event-details">
        <div className="event-date">
          {Event_Start_Date 
            ? new Date(Event_Start_Date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) 
            : 'TBA'}
        </div>
        <Link to={`/event/${eventUrlName}`} className="event-title-link">
          <h2 className="event-title">{Event_Name || 'Untitled Event'}</h2>
        </Link>
        <p className="event-location">{Event_Venue || 'Venue TBA'}</p>
      </div>
    </div>
  );
};

export default EventCard;

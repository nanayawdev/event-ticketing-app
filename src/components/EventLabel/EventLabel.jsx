import React from 'react';
import './EventLabel.css';

const EventLabel = ({ date }) => {
  console.log('Date received in EventLabel:', date);

  const calculateDaysFromNow = (dateString) => {
    if (!dateString) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to midnight for accurate day calculation
    
    const eventDate = new Date(dateString);
    eventDate.setHours(0, 0, 0, 0);
    
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (!date) {
    return <div className="event-label error">NO DATE</div>;
  }

  const days = calculateDaysFromNow(date);

  if (days === null || isNaN(days)) {
    return <div className="event-label error">INVALID DATE</div>;
  } else if (days < 0) {
    return <div className="event-label past-due">PAST EVENT</div>;
  } else if (days === 0) {
    return <div className="event-label today">TODAY</div>;
  } else if (days === 1) {
    return <div className="event-label upcoming">TOMORROW</div>;
  } else {
    return <div className="event-label upcoming">IN {days} DAYS</div>;
  }
};

export default EventLabel;

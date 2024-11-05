import React, { useState, useEffect } from 'react';

const EventLabel = ({ date }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = date - now;

      // If event has passed
      if (difference < 0) {
        return 'Event ended';
      }

      // Calculate days and hours
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);

      // If more than 24 hours away
      if (days > 0) {
        return `${days} days to event`;
      }

      // If less than 24 hours but more than 1 hour
      if (hours > 0) {
        return `${hours}h ${minutes}m to event`;
      }

      // If less than 1 hour
      if (minutes > 0) {
        return `${minutes}m to event`;
      }

      return 'Starting soon';
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every minute
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000);

    return () => clearInterval(timer);
  }, [date]);

  return (
    <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-2 rounded-md text-sm font-medium">
      <span>{timeLeft}</span>
    </div>
  );
};

export default EventLabel;

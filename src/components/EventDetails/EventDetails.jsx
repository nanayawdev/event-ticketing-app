import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import EventDetailsCard from '../EventDetailsCard/EventDetailsCard';
import RelatedEvents from '../RelatedEvents/RelatedEvents';

const EventDetails = () => {
  const { eventName } = useParams();
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

  if (loading) return <div className="pt-24 px-4 max-w-7xl mx-auto">Loading event details...</div>;
  if (error) return <div className="pt-24 px-4 max-w-7xl mx-auto">Error: {error}</div>;
  if (!event) return <div className="pt-24 px-4 max-w-7xl mx-auto">Event not found</div>;

  return (
    <>
      <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
        <Breadcrumb />
        <EventDetailsCard event={event} />
      </div>
      <RelatedEvents currentEventCategory={event.Event_Category} />
    </>
  );
};

export default EventDetails;

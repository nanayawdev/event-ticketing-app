import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import EventLabel from '../EventLabel/EventLabel';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import RelatedEvents from '../RelatedEvents/RelatedEvents';
import BuyTicket from '../BuyTicket/BuyTicket';

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

  if (loading) return <div className="pt-24 px-4 max-w-[1600px] mx-auto">Loading event details...</div>;
  if (error) return <div className="pt-24 px-4 max-w-[1600px] mx-auto">Error: {error}</div>;
  if (!event) return <div className="pt-24 px-4 max-w-[1600px] mx-auto">Event not found</div>;

  return (
    <>
      <div className="max-w-[1600px] mx-auto">
        <div className="pt-24 px-12">
          <Breadcrumb />
        </div>
        <BuyTicket event={event} />
      </div>

      <RelatedEvents 
        currentEventCategory={event.Event_Category} 
        currentEventId={event.id}
      />
    </>
  );
};

export default EventDetails;

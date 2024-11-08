import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import EventLabel from '../EventLabel/EventLabel';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import RelatedEvents from '../RelatedEvents/RelatedEvents';
import BuyTicket from '../BuyTicket/BuyTicket';
import { useEvents } from '../../hooks/useEvents';

const EventDetails = () => {
  const { events, loading, error } = useEvents(false);
  const { eventName } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (events.length > 0) {
      const foundEvent = events.find(e => 
        e.Event_Name.toLowerCase().replace(/\s+/g, '-') === eventName.toLowerCase()
      );
      if (foundEvent) {
        setEvent(foundEvent);
      } else {
        toast.error('Event not found');
      }
    }
  }, [events, eventName]);

  if (loading) {
    return (
      <div className="pt-24 px-4 max-w-[1600px] mx-auto">
        <LoadingSpinner />
      </div>
    );
  }

  if (!event) return null;

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

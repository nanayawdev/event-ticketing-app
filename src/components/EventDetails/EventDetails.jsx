import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import RelatedEvents from '../RelatedEvents/RelatedEvents';
import BuyTicket from '../BuyTicket/BuyTicket';
import { useEvents } from '../../hooks/useEvents';
import { ErrorMessage } from '../ui/ErrorMessage';

const EventDetails = () => {
  const { events, loading, error } = useEvents(false);
  const { eventName } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchEventData = async () => {
      if (!events.length) return;

      const foundEvent = events.find(e => 
        e.Event_Name.toLowerCase().replace(/\s+/g, '-') === eventName.toLowerCase()
      );
      
      if (!foundEvent) {
        toast.error('Event not found');
        navigate('/events');
        return;
      }

      try {
        const response = await fetch(
          `https://api-server.krontiva.africa/api:BnSaGAXN/ticket_table/${foundEvent.id}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch ticket data');
        }
        
        const data = await response.json();
        setEventData({
          ...foundEvent,
          ...data.eventTable,
          ticketDetails: data.ticketTable,
          Ticket_Price: data.ticketTable?.Ticket_Price || []
        });
      } catch (err) {
        setFetchError(err.message);
        setEventData(foundEvent); // Fallback to basic event data
        toast.error('Failed to load ticket information');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventData();
  }, [events, eventName, navigate]);

  if (loading || isLoading) {
    return (
      <div className="pt-24 px-4 max-w-[1600px] mx-auto min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !eventData) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <ErrorMessage 
          title={error ? "Unable to Load Event Details" : "Event Not Found"}
          message={error ? "Please check your connection and try again." : "Event may have been removed or URL is incorrect."}
          onRetry={() => error ? window.location.reload() : navigate('/events')}
        />
      </div>
    );
  }

  return (
    <>
      <div className="max-w-[1600px] mx-auto">
        <div className="pt-24 px-12">
          <Breadcrumb />
          <BuyTicket 
            event={eventData}
            loading={isLoading}
            error={fetchError}
          />
        </div>
      </div>
      <RelatedEvents 
        currentEventCategory={eventData.Event_Category} 
        currentEventId={eventData.id}
      />
    </>
  );
};

export default EventDetails;

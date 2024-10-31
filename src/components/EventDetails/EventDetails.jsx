import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import EventLabel from '../EventLabel/EventLabel';

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

  if (loading) return <div className="pt-24 px-4 max-w-7xl mx-auto">Loading event details...</div>;
  if (error) return <div className="pt-24 px-4 max-w-7xl mx-auto">Error: {error}</div>;
  if (!event) return <div className="pt-24 px-4 max-w-7xl mx-auto">Event not found</div>;

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <Link 
        to="/" 
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <span className="mr-2">←</span> Back to Events
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img 
          src={event.Event_Image?.url || '/assets/images/herobg.jpg'} 
          alt={event.Event_Name} 
          className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
        />
        
        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <EventLabel date={event.Event_Start_Date} className="mb-3" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {event.Event_Name}
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              {event.Event_Start_Date 
                ? new Date(event.Event_Start_Date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }) 
                : 'TBA'}
            </p>
            <p className="text-lg text-gray-600 mb-8">
              {event.Event_Venue || 'Venue TBA'}
            </p>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Description</h2>
            <p className="text-gray-600 whitespace-pre-line">
              {event.Event_Description || 'No description available.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;

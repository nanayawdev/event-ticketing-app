import React from 'react';
import EventLabel from '../EventLabel/EventLabel';

const EventDetailsCard = ({ event }) => {
  return (
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
  );
};

export default EventDetailsCard; 
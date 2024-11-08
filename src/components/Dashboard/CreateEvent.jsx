import React, { useState } from 'react';

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    Event_Name: '',
    Event_Description: '',
    Event_Venue: '',
    Event_Start_Time: '',
    Event_End_Time: '',
    Event_Category: '',
    Event_Price: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement event creation logic
    console.log('Event data:', eventData);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Event</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Name
          </label>
          <input
            type="text"
            value={eventData.Event_Name}
            onChange={(e) => setEventData({ ...eventData, Event_Name: e.target.value })}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={eventData.Event_Description}
            onChange={(e) => setEventData({ ...eventData, Event_Description: e.target.value })}
            className="w-full px-4 py-2 border rounded-md"
            rows="4"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date & Time
            </label>
            <input
              type="datetime-local"
              value={eventData.Event_Start_Time}
              onChange={(e) => setEventData({ ...eventData, Event_Start_Time: e.target.value })}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date & Time
            </label>
            <input
              type="datetime-local"
              value={eventData.Event_End_Time}
              onChange={(e) => setEventData({ ...eventData, Event_End_Time: e.target.value })}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent; 
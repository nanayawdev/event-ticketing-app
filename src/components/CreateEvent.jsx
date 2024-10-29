import React from 'react';
import AddEventBlank from './AddEventBlank';
import './CreateEvent.css';

const CreateEvent = () => {
  return (
    <div className="create-event">
      <h1>Create Event</h1>
      <AddEventBlank />
      {/* Add other create event content here */}
    </div>
  );
};

export default CreateEvent;


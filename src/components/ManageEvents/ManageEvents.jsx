import React from 'react';
import AddEventBlank from './AddEventBlank';
import './ManageEvents.css';

const ManageEvents = () => {
  return (
    <div className="manage-events">
      <h1>Manage Events</h1>
      <AddEventBlank />
      {/* Add other manage events content here */}
    </div>
  );
};

export default ManageEvents;


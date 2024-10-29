import React from 'react';
import { Link } from 'react-router-dom';
import { HiFolderPlus, HiOutlineRectangleStack } from 'react-icons/hi2';
import './AddEventBlank.css';

const AddEventBlank = () => {
  return (
    <div className="add-event-blank">
      <HiOutlineRectangleStack className="event-icon" />
      <h2>Add your event today</h2>
      <p>Elevate your events. Add new event and stay ahead of the curve.</p>
      <Link to="/dashboard/create-event" className="add-event-button">
        <HiFolderPlus className="add-event-icon" />
        Add New Event
      </Link>
    </div>
  );
};

export default AddEventBlank;

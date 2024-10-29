import React from 'react';
import './Tickets.css';
import AddEventBlank from '../AddEventBlank/AddEventBlank';

const Tickets = () => {
  return (
    <div className="tickets-container">
      <div className="events-grid">
        <AddEventBlank />
        {/* You can add more event cards here later */}
      </div>
    </div>
  );
};

export default Tickets;


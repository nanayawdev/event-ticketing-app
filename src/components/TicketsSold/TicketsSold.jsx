import React from 'react';
import { HiFolderMinus } from 'react-icons/hi2';
import './TicketsSold.css';

const TicketsSold = ({ count }) => {
  return (
    <div className="tickets-sold-card">
      <div className="tickets-sold-title">
        <HiFolderMinus className="tickets-sold-icon" />
        <span>Tickets Sold</span>
      </div>
      <div className="tickets-sold-count">{count}</div>
    </div>
  );
};

export default TicketsSold;

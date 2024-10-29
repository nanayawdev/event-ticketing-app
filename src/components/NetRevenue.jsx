import React from 'react';
import { HiBriefcase } from 'react-icons/hi2';
import './NetRevenue.css';

const NetRevenue = ({ amount }) => {
  return (
    <div className="net-revenue-card">
      <div className="net-revenue-content">
        <HiBriefcase className="net-revenue-icon" />
        <span className="net-revenue-title">Net Revenue</span>
      </div>
      <span className="net-revenue-amount">₵{amount.toLocaleString()}</span>
    </div>
  );
};

export default NetRevenue;

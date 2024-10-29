import React from 'react';
import { HiBanknotes } from 'react-icons/hi2';
import './GrossRevenue.css';

const GrossRevenue = ({ amount }) => {
  return (
    <div className="gross-revenue-card">
      <div className="gross-revenue-content">
        <HiBanknotes className="gross-revenue-icon" />
        <span className="gross-revenue-title">Gross Revenue</span>
      </div>
      <span className="gross-revenue-amount">₵{amount.toLocaleString()}</span>
    </div>
  );
};

export default GrossRevenue;

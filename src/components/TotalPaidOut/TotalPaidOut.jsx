import React from 'react';
import { HiMiniReceiptPercent } from 'react-icons/hi2';
import './TotalPaidOut.css';

const TotalPaidOut = ({ amount }) => {
  return (
    <div className="total-paid-out-card">
      <div className="total-paid-out-content">
        <HiMiniReceiptPercent className="total-paid-out-icon" />
        <span className="total-paid-out-title">Total Paid Out</span>
      </div>
      <span className="total-paid-out-amount">₵{amount.toLocaleString()}</span>
    </div>
  );
};

export default TotalPaidOut;

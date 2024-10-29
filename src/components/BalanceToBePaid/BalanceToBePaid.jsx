import React from 'react';
import { HiCreditCard } from 'react-icons/hi2';
import './BalanceToBePaid.css';

const BalanceToBePaid = ({ amount }) => {
  return (
    <div className="balance-to-be-paid-card">
      <div className="balance-to-be-paid-content">
        <HiCreditCard className="balance-to-be-paid-icon" />
        <span className="balance-to-be-paid-title">Balance To Be Paid</span>
      </div>
      <span className="balance-to-be-paid-amount">₵{amount.toLocaleString()}</span>
    </div>
  );
};

export default BalanceToBePaid;

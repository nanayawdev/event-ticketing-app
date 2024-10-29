import React from 'react';
import { HiMiniWallet } from 'react-icons/hi2';
import './Commission.css';

const Commission = ({ percentage }) => {
  return (
    <div className="commission-card">
      <div className="commission-content">
        <HiMiniWallet className="commission-icon" />
        <span className="commission-title">Commission</span>
      </div>
      <span className="commission-percentage">{percentage}%</span>
    </div>
  );
};

export default Commission;

import React from 'react';
import { HiOutlineInformationCircle } from 'react-icons/hi2';
import { Tooltip } from 'react-tooltip';
import './ReadyToWithdraw.css';

const ReadyToWithdraw = ({ amount }) => {
  return (
    <div className="ready-to-withdraw-card">
      <div className="ready-to-withdraw-header">
        <span>Ready to Withdraw</span>
        <HiOutlineInformationCircle 
          className="info-icon" 
          data-tooltip-id="ready-to-withdraw-tooltip"
          data-tooltip-content="This is the amount you can withdraw to your linked account."
        />
        <Tooltip id="ready-to-withdraw-tooltip" />
      </div>
      <div className="ready-to-withdraw-amount">
        <span className="currency">GHS</span>
        <span>{amount.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default ReadyToWithdraw;

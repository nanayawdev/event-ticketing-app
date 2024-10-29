import React from 'react';
import { HiOutlineInformationCircle } from 'react-icons/hi2';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import './PendingSettlement.css';

const PendingSettlement = ({ amount }) => {
  return (
    <div className="pending-settlement-card">
      <div className="pending-settlement-header">
        <span>Pending Settlement</span>
        <HiOutlineInformationCircle 
          className="info-icon" 
          data-tooltip-id="pending-settlement-tooltip"
          data-tooltip-content="Funds that are being processed and will be available for withdrawal soon"
        />
        <Tooltip id="pending-settlement-tooltip" />
      </div>
      <div className="pending-settlement-amount">
        <span className="currency">GHS</span>
        {amount.toFixed(2)}
      </div>
    </div>
  );
};

export default PendingSettlement;

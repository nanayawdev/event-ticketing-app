import React from 'react';
import { HiOutlineInformationCircle } from 'react-icons/hi2';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import './WithdrawnSettlements.css';

const WithdrawnSettlements = ({ amount }) => {
  return (
    <div className="withdrawn-settlements-card">
      <div className="withdrawn-settlements-header">
        <span>Withdrawn Settlements</span>
        <HiOutlineInformationCircle 
          className="info-icon" 
          data-tooltip-id="withdrawn-settlements-tooltip"
          data-tooltip-content="Total amount of funds withdrawn to your linked accounts"
        />
        <Tooltip id="withdrawn-settlements-tooltip" />
      </div>
      <div className="withdrawn-settlements-amount">
        <span className="currency">GHS</span>
        {amount.toFixed(2)}
      </div>
    </div>
  );
};

export default WithdrawnSettlements;

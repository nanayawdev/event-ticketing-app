import React from 'react';
import WithdrawnSettlements from '../WithdrawnSettlements/WithdrawnSettlements';
import PendingSettlement from '../PendingSettlement/PendingSettlement';
import ReadyToWithdraw from '../ReadyToWithdraw/ReadyToWithdraw';
import AddSettlementMethod from '../AddSettlementMethod/AddSettlementMethod';
import './Settlements.css';

const Settlements = ({ withdrawnSettlements, pendingSettlement, readyToWithdraw }) => {
  return (
    <div className="settlements-container">
      <h2>Settlements</h2>
      <div className="settlements-grid">
        <WithdrawnSettlements amount={withdrawnSettlements} />
        <PendingSettlement amount={pendingSettlement} />
        <ReadyToWithdraw amount={readyToWithdraw} />
      </div>
      <div className="add-settlement-method-wrapper">
        <AddSettlementMethod />
      </div>
    </div>
  );
};

export default Settlements;

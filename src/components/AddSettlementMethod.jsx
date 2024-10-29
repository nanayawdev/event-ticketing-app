import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { HiOutlineInformationCircle, HiBanknotes } from 'react-icons/hi2';
import AddPaymentMethod from './AddPaymentMethod'; // Import the AddPaymentMethod component
import './AddSettlementMethod.css';

const AddSettlementMethod = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="add-settlement-method">
      <div className="tooltip-container">
        <HiOutlineInformationCircle 
          className="info-icon" 
          data-tooltip-id="settlement-tooltip" 
          data-tooltip-content="Add a settlement method to receive your funds"
        />
        <Tooltip id="settlement-tooltip" place="left" />
      </div>
      <h2>Add Payment Method</h2>
      <p>
        In order to start withdrawing funds, you'll need to link your mobile money or bank account.
        Please connect the account where you'd like us to transfer your funds. Settlements take up
        to 24hrs or less to reflect.
      </p>
      <button className="settlement-method-button" onClick={toggleModal}>
        <HiBanknotes className="banknotes-icon" /> Add Payment Method
      </button>
      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <AddPaymentMethod />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSettlementMethod;

import React from 'react';
import Modal from './Modal';

const ManageTickets = ({ isOpen, onClose, event }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Manage Tickets: ${event.title}`}
    >
      {/* Your tickets management interface goes here */}
      <div className="space-y-4">
        {/* Add your ticket management content */}
      </div>
    </Modal>
  );
};

export default ManageTickets; 
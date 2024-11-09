import React from 'react';
import Modal from './Modal';

const ViewAttendees = ({ isOpen, onClose, event }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Attendees: ${event.title}`}
    >
      {/* Your attendees list goes here */}
      <div className="space-y-4">
        {/* Add your attendees table/list */}
      </div>
    </Modal>
  );
};

export default ViewAttendees; 
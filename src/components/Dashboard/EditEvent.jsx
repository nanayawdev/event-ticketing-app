import React from 'react';
import Modal from './Modal';

const EditEvent = ({ isOpen, onClose, event }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit Event: ${event.title}`}
    >
      {/* Your edit event form goes here */}
      <form className="space-y-6">
        {/* Add your form fields pre-populated with event data */}
      </form>
    </Modal>
  );
};

export default EditEvent; 
import React, { useState, useEffect } from 'react';
import './LogoutModal.css';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match this with the animation duration
  };

  const handleConfirm = () => {
    setIsClosing(true);
    setTimeout(() => {
      onConfirm();
    }, 300); // Match this with the animation duration
  };

  if (!isOpen && !isClosing) return null;

  return (
    <>
      <div className={`logout-modal-overlay ${isOpen ? 'open' : ''} ${isClosing ? 'closing' : ''}`} onClick={handleClose}></div>
      <div className={`logout-drawer ${isOpen ? 'open' : ''} ${isClosing ? 'closing' : ''}`}>
        <div className="logout-drawer-content">
          <h2>Confirm Logout</h2>
          <p>Are you sure you want to log out?</p>
          <div className="logout-drawer-buttons">
            <button onClick={handleConfirm}>Yes, Logout</button>
            <button onClick={handleClose}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoutModal;

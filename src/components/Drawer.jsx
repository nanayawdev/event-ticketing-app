import React from 'react';
import './Drawer.css';

const Drawer = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="drawer-overlay" onClick={onClose}>
          <div className="drawer" onClick={(e) => e.stopPropagation()}>
            <button className="drawer-close" onClick={onClose}>&times;</button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Drawer;

import React from 'react';
import './NoticeBar.css';

const NoticeBar = () => {
  return (
    <div className="notice-bar">
      <span role="img" aria-label="celebration">😍</span> New Event: "Tech Expo 2024" Tickets Now Available - Book Yours Today! 
      <span className="arrow">→</span>
    </div>
  );
};

export default NoticeBar;

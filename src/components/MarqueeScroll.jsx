import React from 'react';
import './MarqueeScroll.css';

const MarqueeScroll = () => {
  const textItems = [
    "Seamless User Experience",
    "Robust Features and Functionality",
    "Scalability and Growth",
    "Global Payment Processing",
    "Comprehensive Support",
    "Cost-Effective",
    "Seamless User Experience",
    "Robust Features and Functionality",
    "Scalability and Growth",
    "Global Payment Processing",
    "Comprehensive Support",
    "Cost-Effective",
  ];

  return (
    <div className="marquee-container">
      <div className="marquee-row">
        <div className="marquee-content">
          {textItems.map((item, index) => (
            <div key={index} className="marquee-item">
              <p>"{item}"</p>
            </div>
          ))}
        </div>
        <div className="marquee-content">
          {textItems.map((item, index) => (
            <div key={index} className="marquee-item">
              <p>"{item}"</p>
            </div>
          ))}
        </div>
      </div>
      <div className="marquee-row reverse">
        <div className="marquee-content">
          {textItems.map((item, index) => (
            <div key={index} className="marquee-item">
              <p>"{item}"</p>
            </div>
          ))}
        </div>
        <div className="marquee-content">
          {textItems.map((item, index) => (
            <div key={index} className="marquee-item">
              <p>"{item}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueeScroll;
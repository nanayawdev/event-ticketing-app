import React, { useState, useEffect } from 'react';
import './ScrollingHeader.css';

const ScrollingHeader = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollingTexts = [
    "musicians",
    "event organisers",
    "creative professionals",
    "industry leaders"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex + 1) % scrollingTexts.length
      );
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="scrolling-header">
      <h1 className="static-text">The ticketing platform trusted by 10k+</h1>
      <h2 className="scrolling-text">{scrollingTexts[currentIndex]}</h2>
    </div>
  );
};

export default ScrollingHeader;

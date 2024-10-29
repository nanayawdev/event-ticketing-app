import React from 'react';
import './Why.css';

const Why = () => {
  return (
    <div className="why-container">
      <h2 className="why-title">Why Choose Tickrfly?</h2>
      <div className="why-reasons">
        <div className="why-reason">
          <h3>Expertise</h3>
          <p>Our team of seasoned professionals brings years of experience in event planning and management.</p>
        </div>
        <div className="why-reason">
          <h3>Innovation</h3>
          <p>We leverage cutting-edge technology to create unique and memorable experiences for your guests.</p>
        </div>
        <div className="why-reason">
          <h3>Personalization</h3>
          <p>Every event is tailored to your specific needs, ensuring a perfect fit for your vision and goals.</p>
        </div>
      </div>
    </div>
  );
};

export default Why;


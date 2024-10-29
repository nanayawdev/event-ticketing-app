import React from 'react';

const Services = () => {
  return (
    <div className="services-container">
      <h1>Our Services</h1>
      <p>Krontiva offers a range of services to make your event planning and attendance seamless.</p>
      
      <div className="service-list">
        <div className="service-item">
          <h2>Event Ticketing</h2>
          <p>Easy-to-use platform for buying and selling event tickets.</p>
        </div>
        <div className="service-item">
          <h2>Event Management</h2>
          <p>Comprehensive tools for organizers to plan and manage events.</p>
        </div>
        <div className="service-item">
          <h2>Marketing Support</h2>
          <p>Promote your event to our wide network of attendees.</p>
        </div>
        <div className="service-item">
          <h2>Event Insurance</h2>
          <p>Pioneering insurance coverage for event attendees.</p>
        </div>
      </div>
    </div>
  );
};

export default Services;

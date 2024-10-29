import React from 'react';
import './ClientGuide.css';  // Import the CSS file

const ClientGuide = () => {
  return (
    <div className="client-guide-container">
      <h1>Client Guide</h1>
      <p>Welcome to Krontiva's Client Guide. Here you'll find everything you need to know about using our platform.</p>
      
      <section className="guide-section">
        <h2>Getting Started</h2>
        <ol>
          <li>Create an account on Krontiva</li>
          <li>Set up your profile</li>
          <li>Explore available events</li>
          <li>Purchase tickets or create your own event</li>
        </ol>
      </section>
      
      <section className="guide-section">
        <h2>Purchasing Tickets</h2>
        <ul>
          <li>Browse events by category or use our search function</li>
          <li>Select the event you're interested in</li>
          <li>Choose your ticket type and quantity</li>
          <li>Proceed to checkout and complete your payment</li>
          <li>Receive your e-ticket via email</li>
        </ul>
      </section>
      
      <section className="guide-section">
        <h2>Creating an Event</h2>
        <ul>
          <li>Click on 'Create Event' in your dashboard</li>
          <li>Fill in your event details</li>
          <li>Set up ticket types and pricing</li>
          <li>Add event description and images</li>
          <li>Publish your event</li>
        </ul>
      </section>
      
      <section className="guide-section">
        <h2>Need Help?</h2>
        <p>If you need any assistance, please don't hesitate to contact our support team at support@krontiva.com or call us at +233 123 456 789.</p>
      </section>
    </div>
  );
};

export default ClientGuide;

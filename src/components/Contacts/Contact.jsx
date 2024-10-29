import React from 'react';
import './Contact.css';
import ContactOptions from '../ContactOptions/ContactOptions'; // Import the ContactOptions component
import FAQ from '../FAQ/FAQ'; // Import the FAQ component
const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-info">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-description">
            Got a licensing, billing or technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.
          </p>
          <h2 className="contact-subtitle">We're here to help you out</h2>
          <p className="contact-info-text">
            If you have any questions, just reach out to us and we'll respond as soon as we can. Please provide as much information as possible.
          </p>
          <p className="contact-additional">
            For any issues with Tickrfly, you can also check our <a href="#" className="contact-link">status</a> at any time and sign-up to our updates.
          </p>
        </div>
        <div className="contact-options-wrapper">
          <ContactOptions />
        </div>
      </div>
      <FAQ />
    </div>
  );
};

export default Contact;

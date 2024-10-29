import React from 'react';

const Pricing = () => {
  return (
    <div className="pricing-container">
      <h1>Our Pricing Plans</h1>
      <div className="pricing-grid">
        <div className="pricing-card">
          <h2>Basic</h2>
          <p className="price">$9.99/month</p>
          <ul>
            <li>Up to 5 events</li>
            <li>Basic analytics</li>
            <li>Email support</li>
          </ul>
          <button className="select-plan">Select Plan</button>
        </div>
        <div className="pricing-card">
          <h2>Pro</h2>
          <p className="price">$19.99/month</p>
          <ul>
            <li>Up to 20 events</li>
            <li>Advanced analytics</li>
            <li>Priority email support</li>
            <li>Custom branding</li>
          </ul>
          <button className="select-plan">Select Plan</button>
        </div>
        <div className="pricing-card">
          <h2>Enterprise</h2>
          <p className="price">Contact Us</p>
          <ul>
            <li>Unlimited events</li>
            <li>Full analytics suite</li>
            <li>24/7 phone support</li>
            <li>Custom features</li>
            <li>Dedicated account manager</li>
          </ul>
          <button className="select-plan">Contact Sales</button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

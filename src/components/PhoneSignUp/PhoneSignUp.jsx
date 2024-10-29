import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './PhoneSignUp.css';
import logo from '../../assets/icons/nylogo.png'; // Make sure this path is correct

const PhoneSignUp = ({ onBack }) => {
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement phone number signup logic here
    console.log('Phone number submitted:', phone);
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <img src={logo} alt="Logo" className="logo" />
        <h2 className='signup-title'>Sign Up with Phone</h2>
        <p className='signup-subtitle'>Enter your phone number to get started</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <PhoneInput
              country={'gh'}
              value={phone}
              onChange={setPhone}
              inputProps={{
                name: 'phone',
                required: true,
                autoFocus: true
              }}
              containerClass="phone-input-container"
              inputClass="phone-input"
              buttonClass="country-dropdown"
            />
          </div>
          <button type="submit" className="continue-btn">
            Continue
          </button>
        </form>
        <button onClick={onBack} className="back-btn">
          Back to Sign Up
        </button>
      </div>
    </div>
  );
};

export default PhoneSignUp;

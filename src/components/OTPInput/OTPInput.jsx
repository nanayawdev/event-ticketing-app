import React, { useState, useRef, useEffect } from 'react';
import './OTPInput.css';

const OTPInput = ({ length = 6, onComplete }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    if (otp.every(digit => digit !== '')) {
      onComplete(otp.join(''));
    }
  }, [otp, onComplete]);

  return (
    <div className="otp-container">
      <p>Enter the 6-digit code sent to the phone number you provided.</p>
      <div className="otp-input-group">
        {otp.map((data, index) => (
          <input
            className="otp-input"
            type="text"
            name="otp"
            maxLength="1"
            key={index}
            value={data}
            onChange={e => handleChange(e.target, index)}
            onKeyDown={e => handleKeyDown(e, index)}
            onFocus={e => e.target.select()}
            ref={input => inputRefs.current[index] = input}
          />
        ))}
      </div>
      <p className="otp-hint">{6 - otp.filter(Boolean).length} digits left</p>
    </div>
  );
};

export default OTPInput;

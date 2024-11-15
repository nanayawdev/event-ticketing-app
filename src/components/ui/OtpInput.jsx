import React, { useRef, useState } from 'react';

const OtpInput = ({ length = 6, value, onChange }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Combine the OTP digits and call the parent's onChange
    const otpValue = newOtp.join('');
    onChange(otpValue);

    // Move to next input if current field is filled
    if (element.value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to previous input on backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, length);
    const newOtp = [...otp];
    
    for (let i = 0; i < pasteData.length; i++) {
      if (isNaN(pasteData[i])) continue;
      newOtp[i] = pasteData[i];
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = pasteData[i];
      }
    }
    
    setOtp(newOtp);
    onChange(newOtp.join(''));
    
    // Focus the next empty input after paste
    const nextEmptyIndex = newOtp.findIndex(val => !val);
    if (nextEmptyIndex !== -1 && inputRefs.current[nextEmptyIndex]) {
      inputRefs.current[nextEmptyIndex].focus();
    }
  };

  return (
    <div className="flex justify-between gap-2">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(ref) => inputRefs.current[index] = ref}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-xl font-semibold border rounded-lg 
            focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
            dark:bg-gray-800 dark:border-gray-600 dark:text-white
            transition-all duration-200"
          autoComplete="off"
        />
      ))}
    </div>
  );
};

export default OtpInput; 
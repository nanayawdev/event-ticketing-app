import React, { useState } from 'react';
import './AddPaymentMethod.css';
import OTPInput from './OTPInput';

const AddPaymentMethod = () => {
  const [channel, setChannel] = useState('');
  const [network, setNetwork] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [ghanaCardNumber, setGhanaCardNumber] = useState('');
  const [momoAccountName, setMomoAccountName] = useState('');
  const [bank, setBank] = useState('');
  const [bankBranch, setBankBranch] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [showOTP, setShowOTP] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form fields here
    setShowOTP(true);
  };

  const handleOTPComplete = (otp) => {
    console.log('OTP entered:', otp);
    // Handle OTP verification here
  };

  if (showOTP) {
    return <OTPInput length={6} onComplete={handleOTPComplete} />;
  }

  return (
    <div className="add-payment-method">
      <div className="header">
        <h2>Add Payment Method</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="channel">Channel</label>
          <select
            id="channel"
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            required
          >
            <option value="">Select a channel</option>
            <option value="mobile_money">Mobile Money</option>
            <option value="bank_account">Bank Account</option>
          </select>
        </div>

        {channel === 'mobile_money' && (
          <>
            <div className="form-group">
              <label htmlFor="network">Network</label>
              <select
                id="network"
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                required
              >
                <option value="">Select a network</option>
                <option value="mtn">MTN</option>
                <option value="telecel">Telecel</option>
                <option value="at">AT</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="ghanaCardNumber">Ghana Card Number</label>
              <input
                type="text"
                id="ghanaCardNumber"
                value={ghanaCardNumber}
                onChange={(e) => setGhanaCardNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="momoAccountName">Name on MOMO Account</label>
              <input
                type="text"
                id="momoAccountName"
                value={momoAccountName}
                onChange={(e) => setMomoAccountName(e.target.value)}
                required
              />
            </div>
          </>
        )}

        {channel === 'bank_account' && (
          <>
            <div className="form-group">
              <label htmlFor="bank">Bank</label>
              <select
                id="bank"
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                required
              >
                <option value="">Select a bank</option>
                <option value="ghana_commercial_bank">Ghana Commercial Bank</option>
                <option value="ecobank">Ecobank</option>
                <option value="stanbic_bank">Stanbic Bank</option>
                <option value="zenith_bank">Zenith Bank</option>
                <option value="access_bank">Access Bank</option>
                <option value="fidelity_bank">Fidelity Bank</option>
                <option value="cal_bank">CAL Bank</option>
                <option value="uba">United Bank for Africa (UBA)</option>
                <option value="societe_generale">Société Générale Ghana</option>
                <option value="standard_chartered">Standard Chartered Bank</option>
                {/* Add more Ghanaian banks as needed */}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="bankBranch">Bank Branch</label>
              <input
                type="text"
                id="bankBranch"
                value={bankBranch}
                onChange={(e) => setBankBranch(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="accountNumber">Account Number</label>
              <input
                type="text"
                id="accountNumber"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="accountName">Account Name</label>
              <input
                type="text"
                id="accountName"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="ghanaCardNumber">Ghana Card Number</label>
              <input
                type="text"
                id="ghanaCardNumber"
                value={ghanaCardNumber}
                onChange={(e) => setGhanaCardNumber(e.target.value)}
                required
              />
            </div>
          </>
        )}

        <button type="submit" className="submit-button">
          Add Payment Method
        </button>
      </form>
    </div>
  );
};

export default AddPaymentMethod;

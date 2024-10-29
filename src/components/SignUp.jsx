import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';
import logo from '../assets/icons/nylogo.png';
import googlelogo from '../assets/icons/ggole.png';
import mobilelogo from '../assets/icons/mobilebutton.png';
import { Snackbar, Alert, LinearProgress } from '@mui/material';
import PhoneSignUp from './PhoneSignUp';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [fieldErrors, setFieldErrors] = useState({
    fullName: false, 
    email: false,
    password: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    lowercase: false,
    uppercase: false,
    number: false,
    symbol: false,
    length: false,
  });
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPhoneSignUp, setShowPhoneSignUp] = useState(false);

  useEffect(() => {
    validatePassword(formData.password);
  }, [formData.password]);

  const validatePassword = (password) => {
    setPasswordStrength({
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      length: password.length >= 8,
    });
  };

  const getPasswordStrength = () => {
    const metRequirements = Object.values(passwordStrength).filter(Boolean).length;
    return (metRequirements / 5) * 100;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setFieldErrors(prevState => ({
      ...prevState,
      [name]: false
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value.trim() === '') {
      setFieldErrors(prevState => ({
        ...prevState,
        [name]: true
      }));
    }
    if (name === 'password') {
      setIsPasswordFocused(false);
    }
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    if (name === 'password') {
      setIsPasswordFocused(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if all fields are filled
    const newFieldErrors = Object.keys(formData).reduce((acc, key) => {
      acc[key] = formData[key].trim() === '';
      return acc;
    }, {});
    setFieldErrors(newFieldErrors);

    if (Object.values(newFieldErrors).some(Boolean)) {
      return; // Don't submit if there are errors
    }

    if (!Object.values(passwordStrength).every(Boolean)) {
      setError('Please meet all password requirements');
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api-server.krontiva.africa/api:BnSaGAXN/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: formData.fullName,
          Email: formData.email,
          Password: String(formData.password),
          role: 'Admin',
        }),
      });

      if (response.ok) {
        setOpenSnackbar(true);
        console.log('User registered successfully');
        setFormData({ fullName: '', email: '', password: '' });
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500); // 1.5 seconds delay to show the success message
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to register user');
      }
    } catch (error) {
      setError('Error during registration. Please try again.');
      console.error('Error during registration:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handlePhoneSignUp = () => {
    setShowPhoneSignUp(true);
  };

  const handleBackToSignUp = () => {
    setShowPhoneSignUp(false);
  };

  if (showPhoneSignUp) {
    return <PhoneSignUp onBack={handleBackToSignUp} />;
  }

  return (
    <div className="signup-container">
      <div className="signup-form">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Get Started</h2>
        <p>Revolutionize your voting experience today.</p>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} noValidate>
          <div className={`form-group ${fieldErrors.fullName ? 'error' : ''}`}>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your name"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              required
            />
          </div>
          <div className={`form-group ${fieldErrors.email ? 'error' : ''}`}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              required
            />
          </div>
          <div className={`form-group ${fieldErrors.password ? 'error' : ''}`}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              required
            />
            {isPasswordFocused && (
              <>
                <LinearProgress 
                  variant="determinate" 
                  value={getPasswordStrength()} 
                  className="password-strength-meter"
                />
                <div className="password-requirements">
                  <p>Password must contain:</p>
                  <ul>
                    <li className={passwordStrength.lowercase ? 'met' : ''}>
                      {passwordStrength.lowercase ? '✓' : '✗'} Lowercase
                    </li>
                    <li className={passwordStrength.uppercase ? 'met' : ''}>
                      {passwordStrength.uppercase ? '✓' : '✗'} Uppercase
                    </li>
                    <li className={passwordStrength.number ? 'met' : ''}>
                      {passwordStrength.number ? '✓' : '✗'} Number
                    </li>
                    <li className={passwordStrength.symbol ? 'met' : ''}>
                      {passwordStrength.symbol ? '✓' : '✗'} Symbol
                    </li>
                    <li className={passwordStrength.length ? 'met' : ''}>
                      {passwordStrength.length ? '✓' : '✗'} 8+ Chars
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
          <button type="submit" className="register-btn" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
          <button type="button" className="google-btn">
            <img src={googlelogo} alt="Google" /> Continue with Google
          </button>
          <button type="button" className="phone-btn" onClick={handlePhoneSignUp}>
            <img src={mobilelogo} alt="Phone" /> Continue with Phone Number
          </button>
        </form>
        <p className="terms">
          By signing up, you agree to our <Link to="/terms">Terms of service</Link> & <Link to="/privacy">Privacy Policy</Link>
        </p>
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          className="custom-snackbar"
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            Registration successful!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default SignUp;
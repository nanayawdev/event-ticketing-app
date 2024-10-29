import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Ensure you have the correct path
import tickrflyyLogo from '../../assets/icons/nylogo.png'; // Adjust the path as needed

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <img src={tickrflyyLogo} alt="Logo" />
                </Link>
                <ul className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/events">Events</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/pricing">Pricing</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/clientguide">Client Guide</Link></li>
                </ul>
                <div className={`navbar-buttons ${isMenuOpen ? 'open' : ''}`}>
                    <Link to="/login" className="navbar-btn login-btn">Login</Link>
                    <Link to="/signup" className="navbar-btn signup-btn">Sign Up</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

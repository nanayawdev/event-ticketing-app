import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './DashboardNavbar.css';
import { HiOutlineSquaresPlus, HiOutlineFolderPlus, HiOutlineQueueList, HiOutlineRectangleGroup, HiOutlineArrowTrendingUp, HiOutlineTicket, HiOutlineBanknotes, HiOutlineCog6Tooth, HiOutlineFingerPrint, HiOutlinePower } from 'react-icons/hi2';

import logoImage from '../assets/icons/visaxl.png';
import LogoutModal from './LogoutModal'; // Import the LogoutModal component

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    // Implement logout logic here
    setIsLogoutModalOpen(false);
    navigate('/');
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      <nav className="dashboard-sidenav">
        <div className="logo">
          <img src={logoImage} alt="Tickrfly" />
        </div>
        <ul className="nav-links">
          <li><NavLink to="/dashboard" end><HiOutlineSquaresPlus /> <span>Overview</span></NavLink></li>
          <li><NavLink to="/dashboard/create-event"><HiOutlineFolderPlus /> <span>Create Event</span></NavLink></li>
          <li><NavLink to="/dashboard/manage-events"><HiOutlineQueueList /> <span>Manage Events</span></NavLink></li>
          <li><NavLink to="/dashboard/attendees"><HiOutlineRectangleGroup /> <span>Attendees</span></NavLink></li>
          <li><NavLink to="/dashboard/analytics"><HiOutlineArrowTrendingUp /> <span>Analytics</span></NavLink></li>
          <li><NavLink to="/dashboard/tickets"><HiOutlineTicket /> <span>Tickets</span></NavLink></li>
          <li><NavLink to="/dashboard/settlements"><HiOutlineBanknotes /> <span>Settlements</span></NavLink></li>
          <li><NavLink to="/dashboard/settings"><HiOutlineCog6Tooth /> <span>Settings</span></NavLink></li>
          <li><NavLink to="/dashboard/profile"><HiOutlineFingerPrint /> <span>Profile</span></NavLink></li>
        </ul>
        <div className="logout-container">
          <button className="logout-btn" onClick={handleLogoutClick}><HiOutlinePower /> <span>Logout</span></button>
        </div>
      </nav>

      <LogoutModal 
        isOpen={isLogoutModalOpen}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};

export default DashboardNavbar;

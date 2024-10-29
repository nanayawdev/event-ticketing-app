import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiMiniArchiveBox, HiMiniPlusCircle, HiMiniUser, HiMiniCog, HiMiniTrash, HiMiniUserCircle, HiMiniUserGroup } from 'react-icons/hi2';
import './TopNavbar.css';
import logoImage from '../../assets/images/amakyedede.jpeg';
import LogoutModal from '../LogoutModal/LogoutModal';

const TopNavbar = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [eventCount, setEventCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEventCount();
  }, []);

  const fetchEventCount = async () => {
    try {
      const response = await fetch('https://api-server.krontiva.africa/api:BnSaGAXN/Get_All_Event');
      const data = await response.json();
      // Set the count to the total number of items in the response
      setEventCount(data.length);
    } catch (error) {
      console.error('Error fetching event count:', error);
    }
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    // Implement logout logic here
    console.log('User confirmed logout');
    setIsLogoutModalOpen(false);
  };

  const handleAddEvent = () => {
    navigate('/dashboard/create-event');
  };

  return (
    <>
      <nav className="top-navbar">
        <div className="navbar-left">
          {/* Left section is now empty */}
        </div>
        <div className="navbar-center">
          {/* Center section is now empty */}
        </div>
        <div className="navbar-right">
          <button className="new-event-btn" onClick={handleAddEvent}>
            <HiMiniPlusCircle size={20} />
            <span>Add Event</span>
          </button>
          <button className="icon-btn">
            <HiMiniArchiveBox size={20} />
            <span className="badge">{eventCount}</span>
          </button>
          <div className="user-avatar-container">
            <div className="user-avatar">
              <img src={logoImage} alt="User Avatar" />
            </div>
            <div className="dropdown-menu">
              <ul>
                <li><HiMiniUserCircle /> Edit Profile</li>
                <li><HiMiniUser /> Account</li>
                <li><HiMiniUserGroup /> Invite friends</li>
                <li><HiMiniCog /> Customize</li>
                <li onClick={handleLogout}><HiMiniTrash /> Logout</li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <LogoutModal 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
};

export default TopNavbar;

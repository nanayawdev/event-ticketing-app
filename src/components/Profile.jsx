import React from 'react';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import './Profile.css';
import logoImage from '../assets/images/amakyedede.jpeg';
const Profile = () => {
  const profile = {
    name: "Nana Yaw Israel",
    title: "Product Designer",
    location: "Krontiva Africa",
    avatar: logoImage, // Replace with actual path
    firstName: "Nana Yaw",
    lastName: "Israel",
    email: "nanayaw@krontiva.africa",
    phone: "(233) 599-326-736",
    bio: "We host and manage events of all kinds",
    country: "Ghana",
    cityState: "Accra",
    postalCode: "00233",
    evbrand: "Krontiva Events"
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      
      <div className="profile-header">
        <img src={profile.avatar} alt={profile.name} className="profile-avatar" />
        <div className="profile-info">
          <h2>{profile.name}</h2>
          <p>{profile.title}</p>
          <p>{profile.location}</p>
        </div>
      </div>

      <section className="profile-section">
        <h3>Personal information</h3>
        <div className="info-grid">
          <div className="info-item">
            <label>First Name</label>
            <p>{profile.firstName}</p>
          </div>
          <div className="info-item">
            <label>Last Name</label>
            <p>{profile.lastName}</p>
          </div>
          <div className="info-item">
            <label>Email address</label>
            <p>{profile.email}</p>
          </div>
          <div className="info-item">
            <label>Phone</label>
            <p>{profile.phone}</p>
          </div>
        </div>
        <div className="info-item full-width">
          <label>Bio</label>
          <p>{profile.bio}</p>
        </div>
      </section>

      <section className="profile-section">
        <h3>Address</h3>
        <div className="info-grid">
          <div className="info-item">
            <label>Country</label>
            <p>{profile.country}</p>
          </div>
          <div className="info-item">
            <label>City / State</label>
            <p>{profile.cityState}</p>
          </div>
          <div className="info-item">
            <label>Postal Code</label>
            <p>{profile.postalCode}</p>
          </div>
          <div className="info-item">
            <label>Event Brand</label>
            <p>{profile.evbrand}</p>
          </div>
        </div>
      </section>

      <div className="edit-button-container">
        <button className="edit-button">
          <HiOutlinePencilSquare /> Edit
        </button>
      </div>
    </div>
  );
};

export default Profile;

import React, { useState } from 'react';
import './EditProfile.css';

const EditProfile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    about: '',
    website: '',
    username: ''
  });
  const [photo, setPhoto] = useState('/path/to/default/avatar.jpg');

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated profile to your backend
    console.log('Updated profile:', profile);
    console.log('New photo:', photo);
  };

  return (
    <div className="edit-profile-container">
      <h1>Edit profile</h1>
      <p className="privacy-notice">
        Keep your personal details private. Information you add here is visible to anyone who can view your profile.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="photo-section">
          <label>Photo</label>
          <div className="photo-container">
            <img src={photo} alt="Profile" className="profile-photo" />
            <input
              type="file"
              id="photo-upload"
              onChange={handlePhotoChange}
              accept="image/*"
              style={{display: 'none'}}
            />
            <label htmlFor="photo-upload" className="change-photo-btn">Change</label>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last name</label>
            <input className='edit-profile-input'
              type="text"
              id="lastName"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="about">About</label>
          <textarea className='edit-profile-input'
            id="about"
            name="about"
            value={profile.about}
            onChange={handleChange}
            placeholder="Tell your story"
          />
        </div>
        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input className='edit-profile-input'
            type="url"
            id="website"
            name="website"
            value={profile.website}
            onChange={handleChange}
            placeholder="Add a link to drive traffic to your site"
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={profile.username}
            onChange={handleChange}
          />
          <p className="username-notice">www.pinterest.com/{profile.username}</p>
        </div>
        <button type="submit" className="save-button">Save</button>
      </form>
    </div>
  );
};

export default EditProfile;

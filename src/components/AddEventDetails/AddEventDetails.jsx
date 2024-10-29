import React, { useState, useEffect } from 'react';
import './AddEventDetails.css';

const AddEventDetails = () => {
  const [eventDetails, setEventDetails] = useState({
    name: '',
    category: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    description: '',
    currency: 'GHS',
    isHidden: 'No',
    requirePassword: 'No',
    unlockPassword: '',
    artwork: null,
  });

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api-server.krontiva.africa/api:4S2X7JDM/event_category');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched data:', data); // Debug log
      
      // Extract unique categories from the data
      const uniqueCategories = [...new Set(data.map(item => item.Event_Category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to load categories. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventDetails(prevState => ({
        ...prevState,
        artwork: file
      }));
    }
  };

  const handleUpload = () => {
    // Trigger the hidden file input
    document.getElementById('artworkInput').click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Event details submitted:', eventDetails);
    // You would typically send the file to your server here
    // For example:
    // const formData = new FormData();
    // formData.append('artwork', eventDetails.artwork);
    // fetch('your-upload-url', { method: 'POST', body: formData });
  };

  return (
    <div className="add-event-details">
      <h2>Basic details about your event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={eventDetails.name}
            onChange={handleInputChange}
            placeholder="Event title here"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          {isLoading ? (
            <p>Loading categories...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <select
              id="category"
              name="category"
              value={eventDetails.category}
              onChange={handleInputChange}
            >
              <option value="">Choose</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startDate">Start date *</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={eventDetails.startDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="startTime">Start time *</label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={eventDetails.startTime}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End date *</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={eventDetails.endDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endTime">End time *</label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={eventDetails.endTime}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          {/* You may want to replace this with a rich text editor component */}
          <textarea
            id="description"
            name="description"
            value={eventDetails.description}
            onChange={handleInputChange}
            rows="5"
          ></textarea>
        </div>

        <div className="form-group">
          <input
            type="file"
            id="artworkInput"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <button type="button" className="upload-btn" onClick={handleUpload}>
            {eventDetails.artwork ? 'CHANGE EVENT ARTWORK' : 'UPLOAD EVENT ARTWORK'}
          </button>
          {eventDetails.artwork && (
            <p className="file-name">{eventDetails.artwork.name}</p>
          )}
        </div>

        <div className="advanced-settings">
          <h3>Advance Settings</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="currency">Currency</label>
              <select
                id="currency"
                name="currency"
                value={eventDetails.currency}
                onChange={handleInputChange}
              >
                <option value="GHS">GHS</option>
                {/* Add more currency options here */}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="isHidden">Hidden Event?</label>
              <select
                id="isHidden"
                name="isHidden"
                value={eventDetails.isHidden}
                onChange={handleInputChange}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="requirePassword">Require Password</label>
              <select
                id="requirePassword"
                name="requirePassword"
                value={eventDetails.requirePassword}
                onChange={handleInputChange}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="unlockPassword">Unlock Password</label>
              <input
                type="password"
                id="unlockPassword"
                name="unlockPassword"
                value={eventDetails.unlockPassword}
                onChange={handleInputChange}
                placeholder="Password"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <span className="not-saved">NOT SAVED YET</span>
          <button type="button" className="cancel-btn">Cancel</button>
          <button type="submit" className="submit-btn">VENUE DETAILS</button>
        </div>
      </form>
    </div>
  );
};

export default AddEventDetails;

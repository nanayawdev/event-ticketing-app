import React from 'react';
import './UpcomingEvents.css';

const UpcomingEvents = ({ searchQuery, setSearchQuery, activeTab, setActiveTab }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    // The search is now handled automatically by the filteredEvents in App.jsx
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="event-search">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-container">
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search for events"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="find-events-button">
            FIND EVENTS
          </button>
          <div className="view-tabs">
            <button
              type="button"
              className={`tab ${activeTab === 'list' ? 'active' : ''}`}
              onClick={() => setActiveTab('list')}
            >
              List
            </button>
            <button
              type="button"
              className={`tab ${activeTab === 'month' ? 'active' : ''}`}
              onClick={() => setActiveTab('month')}
            >
              Month
            </button>
            <button
              type="button"
              className={`tab ${activeTab === 'day' ? 'active' : ''}`}
              onClick={() => setActiveTab('day')}
            >
              Day
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpcomingEvents;

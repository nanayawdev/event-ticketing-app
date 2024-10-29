import React, { useState, useEffect } from 'react';
import UpcomingEvents from './UpcomingEvents';
import EventCardGrid from './EventCardGrid';

export default function EventPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('list');

  useEffect(() => {
    fetchEvents();
  }, []);

  const generateRandomUSSD = () => {
    const prefix = '*713*';
    const middlePart = Math.floor(Math.random() * 90 + 10);
    const suffix = Math.floor(Math.random() * 900 + 100);
    return `${prefix}${middlePart}*${suffix}#`;
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch('https://api-server.krontiva.africa/api:4S2X7JDM/event_card');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (Array.isArray(data)) {
        const eventsWithUSSD = data.map(event => ({
          ...event,
          ussd: generateRandomUSSD()
        }));
        setEvents(eventsWithUSSD);
      } else {
        throw new Error('Data is not in the expected format');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError(`Error fetching events: ${error.message}. Please check your network connection and try again.`);
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event => 
    event.Event_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.Location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (event.Price && event.Price.toString().includes(searchQuery))
  );

  return (
    <div className="event-page">
      <UpcomingEvents 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <EventCardGrid 
        events={filteredEvents}
        loading={loading}
        error={error}
      />
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import './EventCategoryTags.css';

const EventCategoryTags = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('https://api-server.krontiva.africa/api:4S2X7JDM/event_category');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEvents(data); // Assuming the data is an array of event objects
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents(); // Fetch events when the component mounts
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="event-category-tags">
            {events.map((event, index) => (
                <div key={index} className="tag">
                    {event.Event_Category}
                </div>
            ))}
        </div>
    );
};

export default EventCategoryTags;

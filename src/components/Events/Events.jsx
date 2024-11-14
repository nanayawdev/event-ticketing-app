import React from 'react';
import EventListing from '../../components/EventListing/EventListing';
import EventListingAlt from '../../components/EventListingAlt/EventListingAlt';
import EventListingGrid from '../../components/EventListingGrid/EventListingGrid';
const Events = () => {
  return (
    <main className="min-h-screen bg-gray-50 pt-16 dark:bg-gray-900">
      <div className="container mx-auto">
        <EventListingAlt />
        <EventListingGrid />
        <EventListing />
      </div>
    </main>
  );
};

export default Events; 
import React from 'react';
import EventListingAlt from '../../components/EventListingAlt/EventListingAlt';
import EventListingGrid from '../../components/EventListingGrid/EventListingGrid';
const Events = () => {
  return (
    <main className="min-h-screen bg-white pt-16 dark:bg-gray-900">
      <div className="container mx-auto">
        <EventListingAlt />
        <EventListingGrid />
      </div>
    </main>
  );
};

export default Events; 
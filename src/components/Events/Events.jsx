import React from 'react';
import EventListing from '../../components/EventListing/EventListing';
import EventListingAlt from '../../components/EventListingAlt/EventListingAlt';
import EventListingGrid from '../../components/EventListingGrid/EventListingGrid';
import EventListingCards from '../../components/EventListingCards/EventListingCards';
import AllEventsGrid from '../../components/AllEventsGrid/AllEventsGrid';

const Events = () => {
  return (
    <main className="min-h-screen bg-white pt-16">
      <div className="container mx-auto">
        <EventListing />
        <EventListingAlt />
        <EventListingGrid />
        <EventListingCards />
        <AllEventsGrid />
      </div>
    </main>
  );
};

export default Events; 
import React from 'react';
import OrganizerProfileCard from '../OrganizerProfileCard/OrganizerProfileCard';

export default function ProfileCardGrid() {
  const profiles = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
  ];

  return (
    <section className="w-full py-12 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-[1400px]">
        {/* Heading Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Meet Our Event Organizers
          </h2>
          <p className="text-lg text-muted-foreground max-w-[800px]">
            Discover the talented professionals behind our successful events. Each organizer brings unique expertise and creativity to create unforgettable experiences.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-4 sm:gap-x-3 sm:gap-y-5 md:gap-x-4 md:gap-y-6 justify-items-center">
          {profiles.map((profile) => (
            <div key={profile.id} className="col-span-1 w-full max-w-[320px]">
              <OrganizerProfileCard />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
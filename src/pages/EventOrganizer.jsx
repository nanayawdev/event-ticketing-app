import React from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import OrganizerFeatures from '../components/OrganizerFeatures/OrganizerFeatures';
import OrganizerFeatures2 from '../components/OrganizerFeatures2/OrganizerFeatures2';

export default function EventOrganizer() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <OrganizerFeatures />
      <OrganizerFeatures2 />
    </div>
  );
} 
import React from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import OrganizerFeatures from '../components/OrganizerFeatures/OrganizerFeatures';
import OrganizerFeatures2 from '../components/OrganizerFeatures2/OrganizerFeatures2';
import OrganizerFeatures3 from '../components/OrganizerFeatures3/OrganizerFeatures3';
import Footer from '../components/Footer/Footer';
export default function EventOrganizer() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <OrganizerFeatures />
      <OrganizerFeatures2 />
      <OrganizerFeatures3 />
      <Footer />
    </div>
  );
} 
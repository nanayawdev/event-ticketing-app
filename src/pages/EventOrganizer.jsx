import React from 'react';
import OrganizerFeatures from '../components/OrganizerFeatures/OrganizerFeatures';
import OrganizerFeatures2 from '../components/OrganizerFeatures2/OrganizerFeatures2';
import OrganizerFeatures3 from '../components/OrganizerFeatures3/OrganizerFeatures3';
export default function EventOrganizer() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <OrganizerFeatures />
      <OrganizerFeatures2 />
      <OrganizerFeatures3 />
    </div>
  );
} 
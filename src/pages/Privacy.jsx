import React, { useState, useEffect } from 'react';
import { Shield, Lock, Share, Bell, Settings } from 'lucide-react';

const Privacy = () => {
  const [activeSection, setActiveSection] = useState('collection');

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex max-w-[1400px] mx-auto px-6 lg:px-8 py-12 pt-32 relative gap-8">
      {/* Sidebar Table of Contents */}
      <aside className="hidden lg:block w-72 sticky top-24 h-fit">
        <nav className="space-y-3">
          {[
            { id: 'collection', title: 'Information Collection', icon: Shield },
            { id: 'usage', title: 'Information Usage', icon: Lock },
            { id: 'sharing', title: 'Information Sharing', icon: Share },
            { id: 'notifications', title: 'Communication Preferences', icon: Bell },
            { id: 'settings', title: 'Privacy Settings', icon: Settings }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block text-[14px] w-full text-left py-1 transition-colors duration-200 ${
                activeSection === item.id 
                ? 'text-sea-green-600 font-medium' 
                : 'text-gray-600 hover:text-gray-900 hover:underline'
              }`}
            >
              {item.title}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <h1 className="text-5xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="space-y-12">
          <section id="collection" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-6 w-6" /> Information Collection
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Personal Information</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] text-gray-600 font-semibold">We collect:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px]">
                  <li>Name and contact information</li>
                  <li>Payment and billing details</li>
                  <li>Account credentials</li>
                  <li>Profile preferences</li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">Usage Information</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px]">
                  <li>Device and browser information</li>
                  <li>IP address and location data</li>
                  <li>Usage patterns and preferences</li>
                  <li>Interaction with our services</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="usage" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Lock className="h-6 w-6" /> Information Usage
            </h2>
            <p className="text-gray-600">
              We use the information we collect to provide, maintain, and improve our services, 
              to communicate with you, and to comply with legal obligations.
            </p>
          </section>

          <section id="sharing" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Share className="h-6 w-6" /> Information Sharing
            </h2>
            <p className="text-gray-600">
              We do not sell or rent your personal information to third parties. We may share your 
              information with service providers who assist us in operating our platform.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
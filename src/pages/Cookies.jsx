import React, { useState, useEffect } from 'react';
import { Cookie, Settings, List, Cog, RefreshCw } from 'lucide-react';

const Cookies = () => {
  const [activeSection, setActiveSection] = useState('what');

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
            { id: 'what', title: 'What Are Cookies', icon: Cookie },
            { id: 'types', title: 'Types of Cookies', icon: List },
            { id: 'usage', title: 'How We Use Cookies', icon: Cog },
            { id: 'manage', title: 'Managing Cookies', icon: Settings },
            { id: 'updates', title: 'Policy Updates', icon: RefreshCw }
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
        <h1 className="text-5xl font-bold mb-8">Cookie Policy</h1>
        
        <div className="space-y-12">
          <section id="what" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Cookie className="h-6 w-6" /> What Are Cookies
            </h2>
            <p className="text-gray-600 mb-4">
              Cookies are small text files that are placed on your device (computer, tablet, or mobile phone) 
              when you visit our website. They help us provide you with a better experience and understand how 
              you use our site. These files contain information about your browsing preferences and other data 
              that helps us optimize your experience.
            </p>
          </section>

          <section id="types" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <List className="h-6 w-6" /> Types of Cookies
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Essential Cookies</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] text-gray-600 font-semibold">Core Functionality:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px]">
                  <li>Authentication and login sessions</li>
                  <li>Shopping cart management</li>
                  <li>Security features</li>
                  <li>Basic site functionality</li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">Analytics Cookies</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px]">
                  <li>User behavior tracking</li>
                  <li>Performance monitoring</li>
                  <li>Site optimization data</li>
                  <li>Usage statistics</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="usage" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Cog className="h-6 w-6" /> How We Use Cookies
            </h2>
            <p className="text-gray-600 mb-4">
              We use cookies for several purposes, including:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Keeping you signed in to your account</li>
              <li>Remembering your preferences and settings</li>
              <li>Understanding how you use our platform to improve our services</li>
              <li>Ensuring the security of your account and transactions</li>
              <li>Providing analytics data to help us optimize our content and user experience</li>
            </ul>
          </section>

          <section id="manage" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Settings className="h-6 w-6" /> Managing Cookies
            </h2>
            <p className="text-gray-600 mb-4">
              You can control and manage cookies in your browser settings. Most web browsers allow you to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>View your cookie settings</li>
              <li>Accept or block cookies</li>
              <li>Delete existing cookies</li>
              <li>Set preferences for certain websites</li>
            </ul>
            <p className="text-gray-600 mt-4">
              Please note that removing or blocking cookies may impact your user experience on our website. 
              Some features may not function properly without essential cookies.
            </p>
          </section>

          <section id="updates" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <RefreshCw className="h-6 w-6" /> Policy Updates
            </h2>
            <p className="text-gray-600">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for 
              operational, legal, or regulatory reasons. We encourage you to periodically review this page 
              for the latest information on our cookie practices.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Cookies; 
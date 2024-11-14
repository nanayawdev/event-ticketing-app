import React, { useState, useEffect } from 'react';
import { Shield, Lock, Share, Bell, Settings, Eye, Key, Clock, AlertCircle } from 'lucide-react';

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
            { id: 'settings', title: 'Privacy Settings', icon: Settings },
            { id: 'security', title: 'Data Security', icon: Key },
            { id: 'retention', title: 'Data Retention', icon: Clock },
            { id: 'rights', title: 'Your Rights', icon: Eye },
            { id: 'updates', title: 'Policy Updates', icon: AlertCircle }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block text-[14px] w-full text-left py-1 transition-colors duration-200 ${
                activeSection === item.id 
                ? 'text-primary-500 dark:text-primary-400 font-medium' 
                : 'text-gray-600 dark:text-gray-50 hover:text-gray-900 dark:hover:text-gray-50'
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
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Name and contact information</li>
                  <li>Payment and billing details</li>
                  <li>Account credentials</li>
                  <li>Profile preferences</li>
                  <li>Demographic information</li>
                  <li>Event preferences and history</li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">Technical Information</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Device and browser information</li>
                  <li>IP address and location data</li>
                  <li>Usage patterns and preferences</li>
                  <li>Interaction with our services</li>
                  <li>Access times and dates</li>
                  <li>Platform performance data</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="usage" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Lock className="h-6 w-6" /> Information Usage
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Service Provision</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Processing ticket purchases and payments</li>
                  <li>Account management and authentication</li>
                  <li>Customer support and communication</li>
                  <li>Event recommendations and personalization</li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">Platform Improvement</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Analytics and performance monitoring</li>
                  <li>User experience optimization</li>
                  <li>Feature development and testing</li>
                  <li>Security and fraud prevention</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="sharing" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Share className="h-6 w-6" /> Information Sharing
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Third-Party Services</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Payment processors and financial institutions</li>
                  <li>Analytics and monitoring services</li>
                  <li>Customer support platforms</li>
                  <li>Marketing and advertising partners</li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">Legal Requirements</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Compliance with legal obligations</li>
                  <li>Law enforcement requests</li>
                  <li>Protection of legal rights</li>
                  <li>Emergency situations</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="notifications" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Bell className="h-6 w-6" /> Communication Preferences
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Email Communications</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Event updates and notifications</li>
                  <li>Marketing communications</li>
                  <li>Service announcements</li>
                  <li>Newsletter subscriptions</li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">Preference Management</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Communication frequency settings</li>
                  <li>Subscription management</li>
                  <li>Notification preferences</li>
                  <li>Opt-out options</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="security" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Key className="h-6 w-6" /> Data Security
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Security Measures</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Encryption protocols</li>
                  <li>Access controls</li>
                  <li>Regular security audits</li>
                  <li>Employee training</li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">Breach Response</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Incident detection and response</li>
                  <li>User notification procedures</li>
                  <li>Remediation measures</li>
                  <li>Regulatory compliance</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="retention" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-6 w-6" /> Data Retention
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Retention Periods</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Account information retention</li>
                  <li>Transaction history storage</li>
                  <li>Communication records</li>
                  <li>Legal compliance periods</li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">Data Deletion</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Account deletion process</li>
                  <li>Data removal procedures</li>
                  <li>Backup retention policies</li>
                  <li>Archive management</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="rights" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Eye className="h-6 w-6" /> Your Rights
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">User Rights</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Access to personal data</li>
                  <li>Data correction and updates</li>
                  <li>Data portability options</li>
                  <li>Right to be forgotten</li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">Exercise Your Rights</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Request procedures</li>
                  <li>Verification process</li>
                  <li>Response timelines</li>
                  <li>Appeal process</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="updates" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="h-6 w-6" /> Policy Updates
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Change Process</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Policy revision procedures</li>
                  <li>Notification of changes</li>
                  <li>User consent requirements</li>
                  <li>Implementation timeline</li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">Version History</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Previous policy versions</li>
                  <li>Change documentation</li>
                  <li>Effective dates</li>
                  <li>Archive access</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
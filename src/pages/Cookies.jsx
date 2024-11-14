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
        <h1 className="text-5xl font-bold mb-8">Cookie Policy</h1>
        
        <div className="space-y-12">
          {/* Section 1: What Are Cookies */}
          <section id="what" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Cookie className="h-6 w-6" /> What Are Cookies
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Definition & Purpose</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] leading-relaxed">
                  Cookies are small text files that are placed on your device when you visit our website. 
                  They serve various purposes and help us provide you with a better, more personalized experience.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Store user preferences and settings</li>
                  <li>Enable core website functionality</li>
                  <li>Help with website security</li>
                  <li>Analyze website performance</li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">How They Work</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] leading-relaxed">
                  When you visit our website, cookies may be:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Created and stored on your device</li>
                  <li>Read by our servers when you return</li>
                  <li>Updated to reflect your latest interactions</li>
                  <li>Expired and automatically deleted after a set period</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: Types of Cookies */}
          <section id="types" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <List className="h-6 w-6" /> Types of Cookies
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Essential Cookies</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] leading-relaxed">
                  These cookies are necessary for the website to function properly and cannot be switched off.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Authentication and login sessions
                    <span className="block text-sm ml-2 text-gray-500">Keeps you logged in while browsing</span>
                  </li>
                  <li>Shopping cart management
                    <span className="block text-sm ml-2 text-gray-500">Remembers items in your cart</span>
                  </li>
                  <li>Security features
                    <span className="block text-sm ml-2 text-gray-500">Protects against unauthorized access</span>
                  </li>
                  <li>Basic site functionality
                    <span className="block text-sm ml-2 text-gray-500">Enables core features to work properly</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">Performance Cookies</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] leading-relaxed">
                  These cookies help us understand how visitors interact with our website.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Analytics and statistics
                    <span className="block text-sm ml-2 text-gray-500">Tracks website usage patterns</span>
                  </li>
                  <li>Error monitoring
                    <span className="block text-sm ml-2 text-gray-500">Helps identify and fix issues</span>
                  </li>
                  <li>Load balancing
                    <span className="block text-sm ml-2 text-gray-500">Ensures optimal website performance</span>
                  </li>
                  <li>Performance metrics
                    <span className="block text-sm ml-2 text-gray-500">Measures page load times and response rates</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">Functionality Cookies</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] leading-relaxed">
                  These cookies enable personalized features and preferences.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Language preferences
                    <span className="block text-sm ml-2 text-gray-500">Remembers your preferred language</span>
                  </li>
                  <li>Theme settings
                    <span className="block text-sm ml-2 text-gray-500">Saves your dark/light mode preference</span>
                  </li>
                  <li>Location customization
                    <span className="block text-sm ml-2 text-gray-500">Shows relevant local content</span>
                  </li>
                  <li>User preferences
                    <span className="block text-sm ml-2 text-gray-500">Stores your customized settings</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">Marketing Cookies</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] leading-relaxed">
                  These cookies track your online activity to help advertisers deliver more relevant advertising.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Advertising tracking
                    <span className="block text-sm ml-2 text-gray-500">Helps show relevant ads based on your interests</span>
                  </li>
                  <li>Campaign effectiveness
                    <span className="block text-sm ml-2 text-gray-500">Measures marketing campaign performance</span>
                  </li>
                  <li>Cross-site tracking
                    <span className="block text-sm ml-2 text-gray-500">Tracks visits across different websites</span>
                  </li>
                  <li>Ad personalization
                    <span className="block text-sm ml-2 text-gray-500">Customizes advertisements to your preferences</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: How We Use Cookies */}
          <section id="usage" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Cog className="h-6 w-6" /> How We Use Cookies
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Core Functionality</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] leading-relaxed">
                  Essential uses that enable basic website features and security:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>User authentication
                    <span className="block text-sm ml-2 text-gray-500">Maintaining secure login sessions across pages</span>
                  </li>
                  <li>Shopping cart functionality
                    <span className="block text-sm ml-2 text-gray-500">Preserving items during browsing sessions</span>
                  </li>
                  <li>Form submissions
                    <span className="block text-sm ml-2 text-gray-500">Preventing duplicate form submissions</span>
                  </li>
                  <li>Session management
                    <span className="block text-sm ml-2 text-gray-500">Maintaining user state across page visits</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">User Experience Enhancement</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] leading-relaxed">
                  Features that improve your browsing experience:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Personalization settings
                    <span className="block text-sm ml-2 text-gray-500">Remembering your preferences and customizations</span>
                  </li>
                  <li>Content recommendations
                    <span className="block text-sm ml-2 text-gray-500">Suggesting relevant events based on your interests</span>
                  </li>
                  <li>Location services
                    <span className="block text-sm ml-2 text-gray-500">Showing events and content from your area</span>
                  </li>
                  <li>Performance optimization
                    <span className="block text-sm ml-2 text-gray-500">Loading frequently accessed content faster</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">Analytics and Improvement</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] leading-relaxed">
                  Data collection for website improvement:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Usage statistics
                    <span className="block text-sm ml-2 text-gray-500">Understanding how users interact with our site</span>
                  </li>
                  <li>Performance monitoring
                    <span className="block text-sm ml-2 text-gray-500">Identifying and resolving technical issues</span>
                  </li>
                  <li>Feature adoption
                    <span className="block text-sm ml-2 text-gray-500">Tracking which features are most useful</span>
                  </li>
                  <li>User feedback
                    <span className="block text-sm ml-2 text-gray-500">Collecting insights for improvements</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">Marketing and Advertising</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] leading-relaxed">
                  Advertising-related cookie usage:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Ad targeting
                    <span className="block text-sm ml-2 text-gray-500">Displaying relevant advertisements based on interests</span>
                  </li>
                  <li>Campaign tracking
                    <span className="block text-sm ml-2 text-gray-500">Measuring advertising effectiveness</span>
                  </li>
                  <li>Conversion analysis
                    <span className="block text-sm ml-2 text-gray-500">Understanding how users respond to ads</span>
                  </li>
                  <li>Retargeting
                    <span className="block text-sm ml-2 text-gray-500">Showing ads based on previous interactions</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: Managing Cookies */}
          <section id="manage" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Settings className="h-6 w-6" /> Managing Cookies
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Browser Settings</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] leading-relaxed">
                  You can control cookies through your browser settings:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Cookie blocking
                    <span className="block text-sm ml-2 text-gray-500">Configure your browser to reject all or some cookies</span>
                  </li>
                  <li>Private browsing
                    <span className="block text-sm ml-2 text-gray-500">Use incognito mode to browse without storing cookies</span>
                  </li>
                  <li>Cookie deletion
                    <span className="block text-sm ml-2 text-gray-500">Clear existing cookies from your browser</span>
                  </li>
                  <li>Selective acceptance
                    <span className="block text-sm ml-2 text-gray-500">Choose which types of cookies to accept</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">Platform Controls</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] leading-relaxed">
                  Our website provides these cookie management options:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Cookie preferences center
                    <span className="block text-sm ml-2 text-gray-500">Customize your cookie settings on our platform</span>
                  </li>
                  <li>Category selection
                    <span className="block text-sm ml-2 text-gray-500">Choose which categories of cookies to enable</span>
                  </li>
                  <li>Preference updates
                    <span className="block text-sm ml-2 text-gray-500">Change your cookie settings at any time</span>
                  </li>
                  <li>Consent withdrawal
                    <span className="block text-sm ml-2 text-gray-500">Revoke previously given cookie consent</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">Impact of Disabling Cookies</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] leading-relaxed">
                  Be aware that disabling cookies may affect your experience:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Essential features
                    <span className="block text-sm ml-2 text-gray-500">Some website functions may not work properly</span>
                  </li>
                  <li>User preferences
                    <span className="block text-sm ml-2 text-gray-500">Your settings won't be remembered between visits</span>
                  </li>
                  <li>Personalization
                    <span className="block text-sm ml-2 text-gray-500">Content won't be tailored to your interests</span>
                  </li>
                  <li>Account features
                    <span className="block text-sm ml-2 text-gray-500">Some account-related functions may be limited</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">Third-Party Tools</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] leading-relaxed">
                  Additional tools for managing your privacy:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Privacy browsers
                    <span className="block text-sm ml-2 text-gray-500">Browsers designed with enhanced privacy features</span>
                  </li>
                  <li>Cookie blockers
                    <span className="block text-sm ml-2 text-gray-500">Browser extensions that manage cookie behavior</span>
                  </li>
                  <li>Privacy extensions
                    <span className="block text-sm ml-2 text-gray-500">Tools for enhanced privacy control</span>
                  </li>
                  <li>Tracking protection
                    <span className="block text-sm ml-2 text-gray-500">Tools to prevent cross-site tracking</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5: Policy Updates */}
          <section id="updates" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <RefreshCw className="h-6 w-6" /> Policy Updates
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Update Process</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] leading-relaxed">
                  How we handle changes to our cookie policy:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Regular review process
                    <span className="block text-sm ml-2 text-gray-500 dark:text-gray-400">We review and update our policy periodically</span>
                  </li>
                  <li>Change documentation
                    <span className="block text-sm ml-2 text-gray-500 dark:text-gray-400">All changes are logged and documented</span>
                  </li>
                  <li>Version control
                    <span className="block text-sm ml-2 text-gray-500 dark:text-gray-400">Each update is assigned a new version number</span>
                  </li>
                  <li>Compliance checks
                    <span className="block text-sm ml-2 text-gray-500">Updates are reviewed for regulatory compliance</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">Notification Methods</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] leading-relaxed">
                  How we inform you about policy changes:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Email notifications
                    <span className="block text-sm ml-2 text-gray-500">Important updates sent directly to users</span>
                  </li>
                  <li>Website announcements
                    <span className="block text-sm ml-2 text-gray-500">Changes highlighted on our platform</span>
                  </li>
                  <li>Cookie banner updates
                    <span className="block text-sm ml-2 text-gray-500">Revised consent requests when necessary</span>
                  </li>
                  <li>In-app notifications
                    <span className="block text-sm ml-2 text-gray-500">Updates shown in user dashboard</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">User Rights</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] leading-relaxed">
                  Your options regarding policy changes:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Review changes
                    <span className="block text-sm ml-2 text-gray-500">Access to detailed change summaries</span>
                  </li>
                  <li>Update preferences
                    <span className="block text-sm ml-2 text-gray-500">Adjust settings based on new policies</span>
                  </li>
                  <li>Withdraw consent
                    <span className="block text-sm ml-2 text-gray-500">Option to opt-out of non-essential cookies</span>
                  </li>
                  <li>Contact support
                    <span className="block text-sm ml-2 text-gray-500">Get help understanding policy changes</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">Historical Versions</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] leading-relaxed">
                  Access to previous policy versions:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Archive access
                    <span className="block text-sm ml-2 text-gray-500">View previous versions of our cookie policy</span>
                  </li>
                  <li>Change history
                    <span className="block text-sm ml-2 text-gray-500">Track modifications over time</span>
                  </li>
                  <li>Effective dates
                    <span className="block text-sm ml-2 text-gray-500">When each version was active</span>
                  </li>
                  <li>Comparison tools
                    <span className="block text-sm ml-2 text-gray-500">See differences between versions</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Cookies; 
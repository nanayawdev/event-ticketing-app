import React from 'react';

const Cookies = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-12 pt-32">
      <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">1. What Are Cookies</h2>
          <p className="text-gray-600 mb-4">
            Cookies are small text files that are placed on your device (computer, tablet, or mobile phone) 
            when you visit our website. They help us provide you with a better experience and understand how 
            you use our site. These files contain information about your browsing preferences and other data 
            that helps us optimize your experience.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">2. Types of Cookies We Use</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Essential Cookies</h3>
              <p className="text-gray-600">
                These cookies are necessary for the website to function properly. They enable core functionality 
                such as user authentication, session management, and security features. You cannot opt out of 
                these cookies as they are essential for the platform to work.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Analytics Cookies</h3>
              <p className="text-gray-600">
                We use analytics cookies to understand how visitors interact with our website. This helps us 
                improve our services and user experience. These cookies collect information about visitor numbers, 
                pages visited, and how users navigate the site.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Preference Cookies</h3>
              <p className="text-gray-600">
                These cookies remember your settings and preferences, such as language and region choices, 
                to provide a more personalized experience. They also help maintain your session state while 
                using our application.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">3. How We Use Cookies</h2>
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

        <section>
          <h2 className="text-xl font-semibold mb-4">4. Managing Cookies</h2>
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

        <section>
          <h2 className="text-xl font-semibold mb-4">5. Updates to This Policy</h2>
          <p className="text-gray-600">
            We may update this Cookie Policy from time to time to reflect changes in our practices or for 
            operational, legal, or regulatory reasons. We encourage you to periodically review this page 
            for the latest information on our cookie practices.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Cookies; 
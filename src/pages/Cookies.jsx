import React from 'react';

const Cookies = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">1. What Are Cookies</h2>
          <p className="text-gray-600">
            Cookies are small text files that are placed on your device when you visit our website. 
            They help us provide you with a better experience and understand how you use our site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">2. How We Use Cookies</h2>
          <p className="text-gray-600">
            We use cookies to remember your preferences, understand how you interact with our website, 
            and improve our services based on this information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">3. Managing Cookies</h2>
          <p className="text-gray-600">
            You can control and manage cookies in your browser settings. Please note that removing or 
            blocking cookies may impact your user experience on our website.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Cookies; 
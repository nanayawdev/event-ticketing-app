import React from 'react';

const Terms = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-600">
            By accessing and using Tickrfly's services, you agree to be bound by these Terms of Service 
            and all applicable laws and regulations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">2. Use License</h2>
          <p className="text-gray-600">
            Permission is granted to temporarily access and use our services for personal, 
            non-commercial purposes, subject to these terms and conditions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">3. Service Modifications</h2>
          <p className="text-gray-600">
            We reserve the right to modify or discontinue our service at any time without notice. 
            We shall not be liable to you or any third party for any modification, suspension, or discontinuance.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms; 
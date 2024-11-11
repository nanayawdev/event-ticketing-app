import React from 'react';

const Privacy = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-12 pt-32">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="text-gray-600">
            We collect information that you provide directly to us, including your name, email address, 
            and any other information you choose to provide when using our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-600">
            We use the information we collect to provide, maintain, and improve our services, 
            to communicate with you, and to comply with legal obligations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">3. Information Sharing</h2>
          <p className="text-gray-600">
            We do not sell or rent your personal information to third parties. We may share your 
            information with service providers who assist us in operating our platform.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy; 
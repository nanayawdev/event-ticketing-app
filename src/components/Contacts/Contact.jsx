import React from 'react';
import ContactOptions from '../ContactOptions/ContactOptions';
import FAQ from '../FAQ/FAQ';
import Footer from '../Footer/Footer';
const Contact = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-24">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  How Can We Help?
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Having issues with ticket purchases? Need help with event access? Questions about refunds or transfers? Our support team is here to ensure your event experience is smooth and enjoyable.
                </p>
              </div>

              {/* Right Column */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  We're Here For You
                </h2>
                <p className="text-gray-600 mb-6">
                  Whether you're an event-goer or an organizer, we aim to respond to all inquiries within 24 hours. For urgent ticket issues, especially on event days, we provide priority support.
                </p>
                
                <p className="text-gray-600">
                  Check our{' '}
                  <a href="#" className="text-sea-green-500 hover:text-sea-green-600 underline">
                    Event Status Page
                  </a>
                  {' '}for real-time updates on upcoming events and any last-minute changes.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <ContactOptions />
          </div>

          <FAQ />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;

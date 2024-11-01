import React from 'react';
import ContactOptions from '../ContactOptions/ContactOptions';
import FAQ from '../FAQ/FAQ';
import Footer from '../Footer/Footer';
const Contact = () => {
  return (
    <>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 pt-24">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Contact Us
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Got a licensing, billing or technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.
                </p>
              </div>

              {/* Right Column */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  We're here to help you out
                </h2>
                <p className="text-gray-600 mb-6">
                  If you have any questions, just reach out to us and we'll respond as soon as we can. Please provide as much information as possible.
                </p>
                
                <p className="text-gray-600">
                  For any issues with Tickrfly, you can also check our{' '}
                  <a href="#" className="text-sea-green-500 hover:text-sea-green-600 underline">
                    status
                  </a>
                  {' '}at any time and sign-up to our updates.
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

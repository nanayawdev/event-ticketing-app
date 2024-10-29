import React, { useState } from 'react';
import jkstudio from '../../assets/images/jkstudio.jpeg';
import jkstudio2 from '../../assets/images/jkstudiios2.jpeg';
import jkstudio3 from '../../assets/images/jkstudiios3.jpeg';
import photoshoot from '../../assets/images/photoshoot.jpeg';
import photoshoot2 from '../../assets/images/photoshoot2.jpeg';
import photoshoot3 from '../../assets/images/photoshoot3.jpeg';

const EventFeatures = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const images = [jkstudio, jkstudio2, jkstudio3, photoshoot, photoshoot2, photoshoot3];

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const faqData = [
    { question: "Seamless User Experience", answer: "Our platform is designed with both event organizers and attendees in mind. Organizers benefit from a user-friendly interface that simplifies tasks like creating events, managing tickets, and tracking sales. Attendees enjoy a smooth, intuitive purchasing experience, reducing friction and increasing conversion rates." },
    { question: "Robust Features and Functionality", answer: "Our platform offers a comprehensive suite of features to meet the diverse needs of event organizers. From ticket types and pricing options to advanced reporting and analytics, we provide the tools necessary to streamline event management and optimize ticket sales." },
    { question: "Scalability and Growth", answer: "Whether you're planning a small meetup or a large-scale conference, our platform scales effortlessly. Our system is designed to grow with your event, providing the flexibility and scalability needed to handle any size event with ease." },
    { question: "Global Payment Processing", answer: "Our platform supports a wide range of payment methods and currencies, enabling you to reach a global audience and facilitate ticket sales from anywhere in the world. With secure and efficient payment processing, you can increase your revenue potential and expand your event reach." },
    { question: "Comprehensive Support", answer: "Our team is dedicated to providing top-notch support. Whether you're a first-time event organizer or a seasoned pro, we're here to help. Our support team is available 24/7 to assist with any issues or questions you may have." },
    { question: "Cost-Effective", answer: "We believe that event management should be accessible to everyone. Our platform offers competitive pricing, with no hidden fees or commissions. You can focus on your event and let us handle the rest." },
  ];

  return (
    <div className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          {/* Image Section */}
          <div className="relative lg:col-span-5 lg:row-span-2">
            <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-2xl">
              <img 
                src={openQuestion !== null ? images[openQuestion % images.length] : jkstudio} 
                alt="Event feature illustration"
                className="object-cover object-center w-full h-full transition-all duration-500 ease-in-out"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="mt-10 lg:col-span-7 lg:mt-0 lg:pl-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Event Organizers Choose<br className="hidden sm:inline" /> and Trust Our Solution
            </h2>
            
            {/* FAQ Section */}
            <div className="mt-10 space-y-4">
              {faqData.map((item, index) => (
                <div key={index} className="border-b border-gray-200 last:border-0">
                  <button 
                    className="flex w-full items-center justify-between py-4 text-left hover:text-indigo-600 transition-colors"
                    onClick={() => toggleQuestion(index)}
                  >
                    <span className="text-lg font-medium text-gray-900 hover:text-indigo-600">
                      {item.question}
                    </span>
                    <span className={`ml-6 flex-shrink-0 transition-transform duration-200 ${openQuestion === index ? 'rotate-180' : ''}`}>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  
                  {openQuestion === index && (
                    <div className="pb-4 pr-6">
                      <p className="text-base text-gray-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventFeatures;
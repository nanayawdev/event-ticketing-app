import React, { useState } from 'react';
import './EventFeatures.css';
import jkstudio from '../assets/images/jkstudio.jpeg';
import jkstudio2 from '../assets/images/jkstudiios2.jpeg';
import jkstudio3 from '../assets/images/jkstudiios3.jpeg';
import photoshoot from '../assets/images/photoshoot.jpeg';
import photoshoot2 from '../assets/images/photoshoot2.jpeg';
import photoshoot3 from '../assets/images/photoshoot3.jpeg';

const EventFeatures = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  // Array of images
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
    <div className="event-features">
      <div className="event-features-image">
        <img 
          src={openQuestion !== null ? images[openQuestion % images.length] : jkstudio} 
          alt="Event feature illustration" 
        />
      </div>
      <div className="event-features-content">
        <h2 className="event-features-title">
          Why Event Organizers Choose<br /> and Trust Our Solution
        </h2>
        <div className="event-features-faq">
          {faqData.map((item, index) => (
            <div key={index} className="faq-item">
              <button 
                className="faq-question" 
                onClick={() => toggleQuestion(index)}
              >
                {item.question}
                <span className={`arrow ${openQuestion === index ? 'open' : ''}`}>
                  {openQuestion === index ? '-' : '+'}
                </span>
              </button>
              {openQuestion === index && (
                <div className="faq-answer">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventFeatures;
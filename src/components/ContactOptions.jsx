import React from 'react';
import './ContactOptions.css';
import { HiOutlineChatBubbleLeftRight, HiOutlineChatBubbleBottomCenterText, HiOutlinePhone, HiOutlineMap } from 'react-icons/hi2';
const ContactOptions = () => {
  const options = [
    {
      icon: <HiOutlineChatBubbleLeftRight />,
      title: 'Chat to sales',
      description: 'Speak to our friendly team.',
      action: 'sales@untitledul.com',
    },
    {
      icon: <HiOutlineChatBubbleBottomCenterText />,
      title: 'Chat to support',
      description: 'We are here to help.',
      action: 'support@untitledul.com',
    },
    {
      icon: <HiOutlineMap />,
      title: 'Visit us',
      description: 'Visit our office HQ.',
      action: 'View on Google Maps',
    },
    {
      icon: <HiOutlinePhone />,
      title: 'Call us',
      description: 'Mon-Fri from 8am to 5pm.',
      action: '+1(555) 000-0000',
    },
  ];

  return (
    <div className="contact-options-container">
      {options.map((option, index) => (
        <div key={index} className="contact-option">
          <div className="contact-option-icon">{option.icon}</div>
          <h3 className="contact-option-title">{option.title}</h3>
          <p className="contact-option-description">{option.description}</p>
          <a href="#" className="contact-option-action">{option.action}</a>
        </div>
      ))}
    </div>
  );
};

export default ContactOptions;

import React, { useState } from 'react';
import './FAQ.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  );
};

const FAQ = () => {
  const faqData = [
    {
      question: "Is there a free trial available?",
      answer: "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible."
    },
    { question: "Can I change my plan later?", answer: "Yes, you can change your plan at any time." },
    { question: "What is your cancellation policy?", answer: "You can cancel your subscription at any time. There are no cancellation fees." },
    { question: "Can other info be added to an invoice?", answer: "Yes, you can add additional information to your invoices." },
    { question: "How does billing work?", answer: "We offer monthly and annual billing options. You'll be billed at the start of each billing cycle." },
    { question: "How do I change my account email?", answer: "You can change your account email in your account settings." },
  ];

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently asked questions</h2>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQ;


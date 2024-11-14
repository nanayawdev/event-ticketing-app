import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CreditCard, 
  Ticket, 
  RefreshCcw, 
  Users, 
  Rotate3D, 
  AlertCircle, 
  Smartphone, 
  Shield, 
  ExternalLink, 
  Clock, 
  Printer, 
  UserPlus, 
  WifiOff 
} from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      icon: <CreditCard className="w-6 h-6 text-primary-500" />,
      question: "How do I purchase tickets?",
      answer: "Simply select your desired event, choose the number of tickets, and proceed to checkout. We accept various payment methods including mobile money, credit cards, and bank transfers."
    },
    {
      icon: <Ticket className="w-6 h-6 text-primary-500" />,
      question: "How do I receive my tickets?",
      answer: "After purchase, your e-tickets will be sent to your email immediately. You can also access them anytime through your account dashboard."
    },
    {
      icon: <RefreshCcw className="w-6 h-6 text-primary-500" />,
      question: "What's your refund policy?",
      answer: "Refunds are available up to 48 hours before the event starts. After that, tickets are non-refundable but can be transferred to another person."
    },
    {
      icon: <Users className="w-6 h-6 text-primary-500" />,
      question: "Can I buy tickets for a group?",
      answer: "Yes! You can purchase multiple tickets in a single transaction. For large group bookings (10+ tickets), contact us for potential group discounts."
    },
    {
      icon: <Rotate3D className="w-6 h-6 text-primary-500" />,
      question: "Can I transfer my ticket?",
      answer: "Yes, tickets are transferable through our platform. Simply go to your tickets in the dashboard and use the 'Transfer Ticket' option."
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-primary-500" />,
      question: "What if an event is cancelled?",
      answer: "If an event is cancelled by the organizer, you will automatically receive a full refund within 5-7 business days. We'll notify you via email."
    },
    {
      icon: <Smartphone className="w-6 h-6 text-primary-500" />,
      question: "Is there a mobile app?",
      answer: "Yes, our mobile app is available for both iOS and Android devices. Download it to manage tickets and get real-time updates."
    },
    {
      icon: <Shield className="w-6 h-6 text-primary-500" />,
      question: "How do you prevent ticket fraud?",
      answer: "Each ticket has a unique QR code that's scanned at entry. We use blockchain technology to ensure ticket authenticity."
    },
    {
      icon: <Clock className="w-6 h-6 text-primary-500" />,
      question: "When do tickets go on sale?",
      answer: "Ticket sale dates vary by event. Follow events to get notified when tickets become available for your favorite events."
    },
    {
      icon: <Printer className="w-6 h-6 text-primary-500" />,
      question: "Do I need to print my ticket?",
      answer: "No, you can show your digital ticket on your phone. The QR code will be scanned directly from your screen at entry."
    },
    {
      icon: <UserPlus className="w-6 h-6 text-primary-500" />,
      question: "Can I resell my tickets?",
      answer: "Ticket resale is only allowed through our official marketplace to ensure security and prevent fraud."
    },
    {
      icon: <WifiOff className="w-6 h-6 text-primary-500" />,
      question: "What if I lose internet at the venue?",
      answer: "Download your tickets in advance for offline access. Screenshots of QR codes are also accepted at most venues."
    }
  ];

  return (
    <div className="py-16 sm:py-24 dark:bg-gray-900">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
            Frequently Asked Questions
          </h2>
          <Link 
            to="/help" 
            className="inline-flex items-center px-3 py-1.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 dark:text-gray-50"
          >
            Help Center
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <p className="text-base text-gray-600 mb-10">
          Quick answers to common questions about tickets and events.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="flex gap-4 p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <div className="flex-shrink-0 h-fit mt-1 bg-primary-50/10 dark:bg-gray-700/50 p-2 rounded-full">
                {faq.icon}
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-50 mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
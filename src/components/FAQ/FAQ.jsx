import React from 'react';
import { Link } from 'react-router-dom';
import { 
  SmilePlus, 
  MessageSquare, 
  CreditCard, 
  RefreshCcw, 
  FileText, 
  User, 
  Mail, 
  GraduationCap,
  ExternalLink 
} from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      icon: <SmilePlus className="w-5 h-5 text-gray-600" />,
      question: "Is there a free trial available?",
      answer: "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free 30-minute onboarding call to get you up and running."
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-gray-600" />,
      question: "What is your cancellation policy?",
      answer: "We understand that things change. You can cancel your plan at any time and we'll refund you the difference already paid."
    },
    {
      icon: <CreditCard className="w-5 h-5 text-gray-600" />,
      question: "How does billing work?",
      answer: "Plans are per workspace, not per account. You can upgrade one workspace, and still have any number of free workspaces."
    },
    {
      icon: <RefreshCcw className="w-5 h-5 text-gray-600" />,
      question: "How does support work?",
      answer: "If you're having trouble with Untitled UI, we're here to try and help via hello@untitledui.com. We're a small team, but will get back to soon."
    },
    {
      icon: <FileText className="w-5 h-5 text-gray-600" />,
      question: "Can I change my plan later?",
      answer: "Of course you can! Our pricing scales with your company. Chat to our friendly team to find a solution that works for you as you grow."
    },
    {
      icon: <User className="w-5 h-5 text-gray-600" />,
      question: "Can other info be added to an invoice?",
      answer: "At the moment, the only way to add additional information to invoices is to add the information to the workspace's name manually."
    },
    {
      icon: <Mail className="w-5 h-5 text-gray-600" />,
      question: "How do I change my account email?",
      answer: "You can change the email address associated with your account by going to untitled.com/account from a laptop or desktop."
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-gray-600" />,
      question: "Do you provide tutorials?",
      answer: "Not yet, but we're working on it! In the meantime, we've done our best to make it intuitive and we're building our documentation page."
    }
  ];

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Frequently Asked Questions
          </h2>
          <Link 
            to="/documentation" 
            className="inline-flex items-center px-3 py-1.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Documentation
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <p className="text-base text-gray-600 mb-10">
          Quick answers to questions you may have. Can't find what you're looking for? Check out our{' '}
          <Link to="/documentation" className="text-gray-900 underline">
            full documentation
          </Link>
          .
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          {faqs.map((faq, index) => (
            <div key={index} className="flex gap-x-4 w-[704px] pr-4">
              <div className="flex-shrink-0">
                {faq.icon}
              </div>
              <div className="flex-1 pr-2">
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  {faq.question}
                </h3>
                <p className="text-sm text-gray-600 leading-5">
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
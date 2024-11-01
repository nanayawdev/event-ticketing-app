import React from 'react';
import { 
  CalendarDays, 
  Users, 
  Ticket, 
  QrCode,
  BarChart,
  CreditCard,
  MessageSquare,
  Share2,
  Megaphone,
  Globe,
  ShieldCheck,
  Smartphone
} from 'lucide-react';

const WhatWeDo = () => {
  const offerings = {
    organizers: {
      title: "For Event Organizers",
      description: "Powerful tools to create, manage, and grow your events",
      features: [
        {
          icon: <CalendarDays className="w-6 h-6 text-sea-green-500" />,
          title: "Event Management",
          description: "Easy-to-use dashboard to create and manage events, track sales, and handle attendee communications."
        },
        {
          icon: <BarChart className="w-6 h-6 text-sea-green-500" />,
          title: "Analytics & Insights",
          description: "Real-time data on ticket sales, attendance, and revenue. Make informed decisions with detailed reports."
        },
        {
          icon: <QrCode className="w-6 h-6 text-sea-green-500" />,
          title: "Check-in Tools",
          description: "Streamlined entry management with QR code scanning and real-time attendance tracking."
        },
        {
          icon: <CreditCard className="w-6 h-6 text-sea-green-500" />,
          title: "Secure Payments",
          description: "Accept multiple payment methods with secure processing and automated payouts."
        }
      ]
    },
    creators: {
      title: "For Content Creators",
      description: "Monetize your audience and create unforgettable experiences",
      features: [
        {
          icon: <Megaphone className="w-6 h-6 text-sea-green-500" />,
          title: "Promotion Tools",
          description: "Built-in marketing features to reach your audience and boost ticket sales."
        },
        {
          icon: <Share2 className="w-6 h-6 text-sea-green-500" />,
          title: "Social Integration",
          description: "Seamlessly share events across social platforms and track engagement."
        },
        {
          icon: <MessageSquare className="w-6 h-6 text-sea-green-500" />,
          title: "Community Engagement",
          description: "Tools to interact with attendees before, during, and after events."
        },
        {
          icon: <Globe className="w-6 h-6 text-sea-green-500" />,
          title: "Global Reach",
          description: "Host virtual or hybrid events and reach audiences worldwide."
        }
      ]
    },
    attendees: {
      title: "For Event Attendees",
      description: "Discover and enjoy events with peace of mind",
      features: [
        {
          icon: <Ticket className="w-6 h-6 text-sea-green-500" />,
          title: "Easy Booking",
          description: "Simple ticket purchasing with multiple payment options and instant delivery."
        },
        {
          icon: <Smartphone className="w-6 h-6 text-sea-green-500" />,
          title: "Mobile Access",
          description: "Access tickets and event information on the go with our mobile app."
        },
        {
          icon: <ShieldCheck className="w-6 h-6 text-sea-green-500" />,
          title: "Secure Tickets",
          description: "Guaranteed authentic tickets with our secure verification system."
        },
        {
          icon: <Users className="w-6 h-6 text-sea-green-500" />,
          title: "Group Bookings",
          description: "Easily coordinate group attendance with special group booking features."
        }
      ]
    }
  };

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
          What We Do
        </h2>

        {Object.values(offerings).map((section, index) => (
          <div key={index} className="mb-20 last:mb-0">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {section.title}
              </h3>
              <p className="text-lg text-gray-600">
                {section.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {section.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-sea-green-50 rounded-full">
                    {feature.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatWeDo; 
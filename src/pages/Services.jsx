import React from 'react';
import { Ticket, ClipboardList, Megaphone, Shield } from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: "Event Ticketing",
      description: "Easy-to-use platform for buying and selling event tickets.",
      icon: <Ticket className="w-8 h-8" />
    },
    {
      title: "Event Management",
      description: "Comprehensive tools for organizers to plan and manage events.",
      icon: <ClipboardList className="w-8 h-8" />
    },
    {
      title: "Marketing Support",
      description: "Promote your event to our wide network of attendees.",
      icon: <Megaphone className="w-8 h-8" />
    },
    {
      title: "Event Insurance",
      description: "Pioneering insurance coverage for event attendees.",
      icon: <Shield className="w-8 h-8" />
    }
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Krontiva offers a range of services to make your event planning and attendance seamless.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
          >
            <div className="flex justify-center mb-4 text-primary">
              {service.icon}
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h2>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;

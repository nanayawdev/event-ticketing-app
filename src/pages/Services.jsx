import React from 'react';
import { Ticket, ClipboardList, Megaphone, Shield, Calendar, Users, BarChart3, Camera, Headphones, Map, Palette, Wifi } from 'lucide-react';
import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    {
      title: "Event Ticketing",
      description: "Streamline your ticket sales with our state-of-the-art digital ticketing platform. We handle everything from QR-coded e-tickets to real-time inventory management.",
      icon: <Ticket className="w-10 h-10" />,
      features: [
        "Secure blockchain-powered payments",
        "Dynamic QR code mobile tickets",
        "Express checkout with saved preferences",
        "Flexible pricing tiers and packages",
        "Automated refund processing"
      ],
      ctaText: "Start Selling Tickets"
    },
    {
      title: "Event Management",
      description: "Take control of your events with our comprehensive management suite. From venue selection to day-of coordination, we provide the tools you need for flawless execution.",
      icon: <ClipboardList className="w-10 h-10" />,
      features: [
        "Real-time analytics and reporting",
        "Advanced attendee management system",
        "Interactive schedule builder",
        "Staff and volunteer coordination",
        "Vendor and supplier portal"
      ],
      ctaText: "Manage Your Event"
    },
    {
      title: "Marketing Support",
      description: "Amplify your event's reach with our integrated marketing solutions. Leverage our network of partners and automated tools to boost ticket sales and engagement.",
      icon: <Megaphone className="w-10 h-10" />,
      features: [
        "Multi-channel social media campaigns",
        "Targeted email marketing automation",
        "Custom landing page builder",
        "Influencer partnership network",
        "Performance tracking analytics"
      ],
      ctaText: "Boost Your Reach"
    },
    {
      title: "Event Insurance",
      description: "Protect your investment with our comprehensive insurance coverage. We offer tailored protection plans for both organizers and attendees, ensuring peace of mind.",
      icon: <Shield className="w-10 h-10" />,
      features: [
        "Full event cancellation coverage",
        "Comprehensive liability protection",
        "Weather-related contingency plans",
        "Equipment and venue insurance",
        "Medical emergency coverage"
      ],
      ctaText: "Get Protected"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 max-w-4xl mx-auto"
      >
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Comprehensive Event Solutions
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          Krontiva offers end-to-end event management solutions that transform your vision into unforgettable experiences.
          From ticketing to marketing, we've got everything covered.
        </p>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          Trusted by over 10,000+ event organizers worldwide, powering events of all sizes.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-xl 
                     transition-all duration-300 border border-gray-100 dark:border-gray-700 
                     group cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 dark:bg-primary/10 
                          rounded-full -translate-x-20 -translate-y-20" />
            <div className="relative">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-primary/10 dark:bg-primary/20 rounded-xl 
                              group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                  <div className="text-primary">
                    {service.icon}
                  </div>
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                {service.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {service.description}
              </p>
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Key Features:
                </h3>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-500 dark:text-gray-400 
                                           group-hover:text-gray-700 dark:group-hover:text-gray-200 
                                           transition-colors">
                      <svg className="w-5 h-5 text-primary mr-2 flex-shrink-0" 
                           fill="none" 
                           stroke="currentColor" 
                           viewBox="0 0 24 24">
                        <path strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth="2" 
                              d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button className="w-full py-3 px-4 bg-primary text-white rounded-lg 
                               hover:bg-primary/90 dark:hover:bg-primary/80
                               transition-colors duration-300 text-sm font-medium">
                {service.ctaText}
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-32 max-w-7xl mx-auto px-4"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Extended Service Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover our comprehensive suite of additional services designed to make your event extraordinary
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {/* Featured Card */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="col-span-2 row-span-2 p-8 bg-primary/10 dark:bg-primary/20 rounded-3xl 
                     hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 
                          group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <Calendar className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Advanced Scheduling
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our AI-powered scheduling system optimizes your event timeline, coordinates with vendors, 
                and automatically adjusts for dependencies and constraints.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700 dark:text-gray-200">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2" />
                  Smart conflict resolution
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-200">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2" />
                  Multi-timezone support
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-200">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2" />
                  Real-time updates
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Regular Cards */}
          {[
            {
              icon: <Users className="w-6 h-6" />,
              title: "Attendee Networking",
              description: "Built-in social features for attendee connection"
            },
            {
              icon: <BarChart3 className="w-6 h-6" />,
              title: "Analytics Dashboard",
              description: "Real-time event performance metrics"
            },
            {
              icon: <Camera className="w-6 h-6" />,
              title: "Event Photography",
              description: "Professional photo & video services"
            },
            {
              icon: <Headphones className="w-6 h-6" />,
              title: "24/7 Support",
              description: "Round-the-clock technical assistance"
            },
            {
              icon: <Map className="w-6 h-6" />,
              title: "Venue Mapping",
              description: "Interactive floor plans & navigation"
            },
            {
              icon: <Palette className="w-6 h-6" />,
              title: "Brand Integration",
              description: "Custom branding & design services"
            },
            {
              icon: <Wifi className="w-6 h-6" />,
              title: "Tech Infrastructure",
              description: "Complete event connectivity solutions"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-white dark:bg-gray-800 rounded-3xl hover:shadow-xl 
                       transition-all duration-300 border border-gray-100 dark:border-gray-700 
                       group cursor-pointer"
            >
              <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-xl w-fit 
                            group-hover:bg-primary/20 dark:group-hover:bg-primary/30 
                            transition-colors mb-4">
                <div className="text-primary">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </section>
  );
};

export default Services;

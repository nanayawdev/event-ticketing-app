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

        {/* Featured Service */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20" />
            <div className="relative grid md:grid-cols-2 gap-8 p-12">
              <div className="space-y-6">
                <div className="inline-block p-3 bg-primary/10 dark:bg-primary/20 rounded-2xl">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Advanced Event Planning
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  Our AI-powered planning system streamlines your event organization with intelligent 
                  scheduling, automated vendor coordination, and real-time adjustments.
                </p>
                <div className="flex flex-wrap gap-4">
                  {['Smart Timeline', 'Vendor Portal', 'Resource Management'].map((tag, index) => (
                    <span key={index} className="px-4 py-2 bg-primary/5 dark:bg-primary/10 
                                                rounded-full text-primary text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 h-fit">
                {[
                  { label: 'Events Planned', value: '10K+' },
                  { label: 'Success Rate', value: '99.9%' },
                  { label: 'Team Members', value: '500+' },
                  { label: 'Countries', value: '50+' }
                ].map((stat, index) => (
                  <div key={index} className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-6 
                                            backdrop-blur-sm">
                    <p className="text-3xl font-bold text-primary mb-2">{stat.value}</p>
                    <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Users className="w-6 h-6" />,
              title: "Attendee Networking",
              description: "Foster meaningful connections between event participants through our AI-powered networking platform.",
              features: ["Smart Matching", "Virtual Cards", "Meeting Scheduler"]
            },
            {
              icon: <BarChart3 className="w-6 h-6" />,
              title: "Analytics Dashboard",
              description: "Make data-driven decisions with our comprehensive analytics and reporting tools.",
              features: ["Real-time Metrics", "Custom Reports", "Predictive Analysis"]
            },
            {
              icon: <Camera className="w-6 h-6" />,
              title: "Event Capture",
              description: "Professional photography and videography services to document your event's success.",
              features: ["Live Streaming", "Highlight Reels", "Photo Gallery"]
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group hover:shadow-lg transition-all duration-300 rounded-2xl 
                         bg-white dark:bg-gray-800 p-8 border border-gray-100 
                         dark:border-gray-700"
            >
              <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-xl w-fit mb-6 
                            group-hover:bg-primary/20 dark:group-hover:bg-primary/30 
                            transition-colors">
                <div className="text-primary">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature, idx) => (
                  <span key={idx} className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-700 
                                           rounded-full text-gray-600 dark:text-gray-300">
                    {feature}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </section>
  );
};

export default Services;

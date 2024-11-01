import React from 'react';
import { 
  Heart, 
  Users, 
  Target, 
  Sparkles,
  Globe
} from 'lucide-react';

const OurStory = () => {
  const values = [
    {
      icon: <Heart className="w-6 h-6 text-sea-green-500" />,
      title: "Passion for Events",
      description: "We believe in the power of live experiences to connect people and create lasting memories."
    },
    {
      icon: <Users className="w-6 h-6 text-sea-green-500" />,
      title: "Community First",
      description: "Our platform is built on trust, transparency, and the needs of our diverse community."
    },
    {
      icon: <Target className="w-6 h-6 text-sea-green-500" />,
      title: "Innovation Driven",
      description: "We continuously evolve our platform to meet the changing needs of the event industry."
    },
    {
      icon: <Globe className="w-6 h-6 text-sea-green-500" />,
      title: "Local Impact",
      description: "We're committed to helping African events and creators reach global audiences."
    }
  ];

  return (
    <div className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Story Section */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Our Story
          </h2>
          <div className="space-y-6 text-lg text-gray-600">
            <p>
              Tickrfly was born from a simple observation: Africa's vibrant event scene needed a platform that truly understood its unique challenges and opportunities. In 2023, a group of passionate event enthusiasts and tech innovators came together with a shared vision - to revolutionize how events are created, discovered, and experienced across Africa.
            </p>
            <p>
              We witnessed firsthand the struggles of event organizers managing tickets through spreadsheets, content creators unable to monetize their audiences effectively, and attendees facing uncertainty about ticket authenticity. We knew there had to be a better way.
            </p>
            <p>
              Starting in Ghana, we built Tickrfly not just as a ticketing platform, but as a comprehensive event ecosystem. We focused on solving real problems: making mobile payments seamless, ensuring tickets work offline, and building tools that make sense for local event organizers.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center justify-center md:justify-start">
              <Sparkles className="w-6 h-6 text-sea-green-500 mr-2" />
              Our Mission
            </h3>
            <p className="text-lg text-gray-600">
              To empower African event creators and organizers with world-class tools while making it easier for people to discover and attend amazing events. We're building bridges between events, creators, and attendees, fostering a vibrant event ecosystem that celebrates African creativity and culture.
            </p>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center justify-center md:justify-start">
              <Target className="w-6 h-6 text-sea-green-500 mr-2" />
              Our Vision
            </h3>
            <p className="text-lg text-gray-600">
              To become Africa's leading event technology platform, connecting millions of people to unforgettable experiences while helping event creators and organizers turn their passion into thriving businesses. We envision a future where any event, big or small, can reach its perfect audience.
            </p>
          </div>
        </div>

        {/* Our Values */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-12">
            Our Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="mb-4 p-3 bg-white rounded-full border border-sea-green-200">
                  {value.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {value.title}
                </h4>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Statement */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-600">
            Today, Tickrfly is more than just a ticketing platform - we're a community of event lovers, creators, and organizers working together to bring amazing experiences to life. Whether you're organizing your first event or your hundredth, attending a local meetup or a major festival, we're here to make it happen.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurStory; 
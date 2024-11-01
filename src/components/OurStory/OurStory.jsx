import React from 'react';
import { Box, Typography } from '@mui/material';

const AboutTickrfly = () => {
  return (
    <Box className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Box>
        <Typography variant="h4" gutterBottom>
          Our Story
        </Typography>
        <Typography>
          Tickrfly was born from a simple observation: Africa's vibrant event scene needed a platform that truly understood its unique challenges and opportunities. In 2023, a group of passionate event enthusiasts and tech innovators came together with a shared vision - to revolutionize how events are created, discovered, and experienced across Africa.
        </Typography>
        <Typography>
          We witnessed firsthand the struggles of event organizers managing tickets through spreadsheets, content creators unable to monetize their audiences effectively, and attendees facing uncertainty about ticket authenticity. We knew there had to be a better way.
        </Typography>
        <Typography>
          Starting in Ghana, we built Tickrfly not just as a ticketing platform, but as a comprehensive event ecosystem. We focused on solving real problems: making mobile payments seamless, ensuring tickets work offline, and building tools that make sense for local event organizers.
        </Typography>
      </Box>
      <Box>
        <Typography variant="h4" gutterBottom>
          Our Mission
        </Typography>
        <Typography>
          To empower African event creators and organizers with world-class tools while making it easier for people to discover and attend amazing events. We're building bridges between events, creators, and attendees, fostering a vibrant event ecosystem that celebrates African creativity and culture.
        </Typography>
      </Box>
      <Box>
        <Typography variant="h4" gutterBottom>
          Our Vision
        </Typography>
        <Typography>
          To become Africa's leading event technology platform, connecting millions of people to unforgettable experiences while helping event creators and organizers turn their passion into thriving businesses. We envision a future where any event, big or small, can reach its perfect audience.
        </Typography>
      </Box>
      <Box>
        <Typography variant="h4" gutterBottom>
          Our Values
        </Typography>
        <Box className="space-y-2">
          <Box>
            <Typography variant="h5" className="font-medium">
              Passion for Events
            </Typography>
            <Typography>
              We believe in the power of live experiences to connect people and create lasting memories.
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5" className="font-medium">
              Community First
            </Typography>
            <Typography>
              Our platform is built on trust, transparency, and the needs of our diverse community.
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5" className="font-medium">
              Innovation Driven
            </Typography>
            <Typography>
              We continuously evolve our platform to meet the changing needs of the event industry.
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5" className="font-medium">
              Local Impact
            </Typography>
            <Typography>
              We're committed to helping African events and creators reach global audiences.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutTickrfly;
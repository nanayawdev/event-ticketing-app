import React from 'react'
import CoreValues from '../CoreValues/CoreValues'
import Mission from '../Mission/Mission'

export default function Component() {
  return (
    <div className="flex flex-col w-full pt-16">
      {/* Story Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto text-left">
            <h2 className="text-5xl font-semibold mb-8">Our Story</h2>
            <p className="text-lg leading-relaxed text-gray-600 mx-auto max-w-7xl">
            Tickrfly was born from a simple observation: Africa's vibrant event scene needed a platform that truly understood its unique challenges and opportunities. In 2023, a group of passionate event enthusiasts and tech innovators came together with a shared vision - to revolutionize how events are created, discovered, and experienced across Africa.
We witnessed firsthand the struggles of event organizers managing tickets through spreadsheets, content creators unable to monetize their audiences effectively, and attendees facing uncertainty about ticket authenticity. We knew there had to be a better way.

Starting in Ghana, we built Tickrfly not just as a ticketing platform, but as a comprehensive event ecosystem. We focused on solving real problems: making mobile payments seamless, ensuring tickets work offline, and building tools that make sense for local event organizers.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <CoreValues />
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <Mission />
        </div>
      </div>
    </div>
  )
}
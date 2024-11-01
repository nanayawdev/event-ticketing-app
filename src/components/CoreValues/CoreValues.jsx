import React from 'react'

export default function Component() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <div className="space-y-2 mb-12">
        <span className="text-sm font-medium text-gray-600">Our Values</span>
        <h2 className="text-5xl font-bold text-gray-900">Our Core Values</h2>
      </div>

      <div className="space-y-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-2">
            <span className="text-sm font-medium text-gray-600">Here at Tickrfly</span>
            <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
            <p className="text-gray-600">
              To revolutionize Africa's event industry by providing cutting-edge ticketing solutions and event management tools. We're committed to empowering event creators with the technology they need while making it effortless for attendees to discover and participate in memorable experiences.
            </p>
          </div>
          <div className="relative h-64 lg:h-80">
            <img
              src="/placeholder.svg?height=300&width=400"
              alt="Event management dashboard"
              className="rounded-lg w-full h-full object-cover shadow-md"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-2">
            <span className="text-sm font-medium text-gray-600">Here at Tickrfly</span>
            <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
            <p className="text-gray-600">
              To be the heartbeat of Africa's event ecosystem, where every creator can seamlessly bring their event ideas to life, and every attendee can easily discover experiences that resonate with them. We envision a future where technology breaks down barriers and makes events more accessible to all.
            </p>
          </div>
          <div className="relative h-64 lg:h-80">
            <img
              src="/placeholder.svg?height=300&width=400"
              alt="People enjoying an event"
              className="rounded-lg w-full h-full object-cover shadow-md"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-2">
            <span className="text-sm font-medium text-gray-600">Innovation & Trust</span>
            <h3 className="text-2xl font-bold text-gray-900">Our Commitment</h3>
            <p className="text-gray-600">
              We're dedicated to continuous innovation in event technology while maintaining the highest standards of security and reliability. From seamless payment processing to fraud prevention, we ensure both organizers and attendees can focus on what matters most - creating and enjoying great events.
            </p>
          </div>
          <div className="relative h-64 lg:h-80">
            <img
              src="/placeholder.svg?height=300&width=400"
              alt="Secure technology illustration"
              className="rounded-lg w-full h-full object-cover shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
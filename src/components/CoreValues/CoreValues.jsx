import React from 'react'
import tickrflyheroimg from '../../assets/images/tickrflyatjoemettle4.jpg'
import tickrflyeventimg from '../../assets/images/tickrflyatjoemettle2.jpg'
import tickrflyevent from '../../assets/images/tickrflyatjoemettle3.jpg'
export default function Component() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <div className="space-y-2 mb-12">
        <span className="text-sm font-medium text-gray-50">Our Values</span>
        <h2 className="text-5xl font-bold text-gray-50">Our Core Values</h2>
      </div>

      <div className="space-y-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-2">
            <span className="text-sm font-medium text-sea-green-200 border border-sea-green-200 rounded-full px-4 py-1 inline-block">
              Here at Tickrfly
            </span>
            <h3 className="text-4xl font-bold text-sea-green-200">Our Mission</h3>
            <p className="text-gray-50">
              To revolutionize Africa's event industry by providing cutting-edge ticketing solutions and event management tools. We're committed to empowering event creators with the technology they need while making it effortless for attendees to discover and participate in memorable experiences.
            </p>
          </div>
          <div className="relative h-64 lg:h-80">
            <img
              src={tickrflyheroimg}
              alt="Event management dashboard"
              className="rounded-lg w-full h-full object-cover shadow-md"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-2">
            <span className="text-sm font-medium text-sea-green-200 border border-sea-green-200 rounded-full px-4 py-1 inline-block">
              Here at Tickrfly
            </span>
            <h3 className="text-4xl font-bold text-sea-green-200">Our Vision</h3>
            <p className="text-gray-50">
              To be the heartbeat of Africa's event ecosystem, where every creator can seamlessly bring their event ideas to life, and every attendee can easily discover experiences that resonate with them. We envision a future where technology breaks down barriers and makes events more accessible to all.
            </p>
          </div>
          <div className="relative h-64 lg:h-80">
            <img
              src={tickrflyevent}
              alt="People enjoying an event"
              className="rounded-lg w-full h-full object-cover shadow-md"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-2">
            <span className="text-sm font-medium text-sea-green-200 border border-sea-green-200 rounded-full px-4 py-1 inline-block">
              Innovation & Trust
            </span>
            <h3 className="text-4xl font-bold text-sea-green-200">Our Commitment</h3>
            <p className="text-gray-50">
              We're dedicated to continuous innovation in event technology while maintaining the highest standards of security and reliability. From seamless payment processing to fraud prevention, we ensure both organizers and attendees can focus on what matters most - creating and enjoying great events.
            </p>
          </div>
          <div className="relative h-64 lg:h-80">
            <img
              src={tickrflyeventimg}
              alt="Secure technology illustration"
              className="rounded-lg w-full h-full object-cover shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
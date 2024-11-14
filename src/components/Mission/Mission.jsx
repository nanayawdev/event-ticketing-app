import React from 'react'
import tickrflyevent from '../../assets/images/tickrflyatjoemettle.jpg'
export default function Mission() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900">
            Transforming Event Experiences Across Africa
          </h2>
          <p className="text-lg text-gray-600">
            We're revolutionizing how events are discovered, organized, and experienced through innovative ticketing solutions and local expertise.
          </p>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2 text-gray-900">Empowering Event Creators</h3>
                <p className="text-gray-600">
                  From seamless ticket management to real-time analytics, we provide organizers with the tools they need to create successful events.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2 text-gray-900">Secure & Simple Ticketing</h3>
                <p className="text-gray-600">
                  Our platform offers hassle-free ticket purchasing with multiple payment options and fraud protection for peace of mind.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2 text-gray-900">Event Discovery Made Easy</h3>
                <p className="text-gray-600">
                  Helping attendees discover and access amazing events through personalized recommendations and an intuitive search experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-full">
          <img
            src={tickrflyevent}
            alt="Event ticketing platform interface"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  )
}
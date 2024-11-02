import React from 'react'
import tickrflyheroimg from '../../assets/images/tickrflyatjoemettle.jpg'
export default function HeroAlt() {
  return (
    <section className="pt-16">
      <div className="relative h-[830px] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={tickrflyheroimg}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Content Container */}
        <div className="relative z-20 flex items-end h-full pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-xl bg-white/95 backdrop-blur-sm rounded-lg p-8 md:p-12">
              <span className="text-sm font-medium text-gray-600 border border-gray-300 rounded-md px-4 py-1">
                It's Tickrfly
              </span>
              <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                Revolutionizing Event Experiences
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Discover, create, and experience amazing events across Africa with our innovative ticketing platform
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-md text-white">
                  Create Event
                </button>
                <button className="border border-gray-300 px-4 py-2 rounded-md">
                  Browse Events
                </button>
                <button className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-4 py-2 rounded-md">
                  Hosting an Event?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 
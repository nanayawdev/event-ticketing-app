import React from 'react'
import tickrflyheroimg from '../../assets/images/tickrflyatjoemettle.jpg'
export default function HeroAlt() {
  return (
    <section className="pt-8 sm:pt-12 md:pt-16">
      <div className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[870px] w-full overflow-hidden">
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
        <div className="relative z-20 flex items-end h-full pb-8 sm:pb-12 md:pb-16">
          <div className="container mx-auto px-4 pt-8 sm:pt-12 md:pt-16">
            <div className="max-w-[90%] sm:max-w-[80%] md:max-w-xl bg-white dark:bg-gray-900 backdrop-blur-sm rounded-lg p-6 sm:p-8 md:p-12">
              <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-md px-3 sm:px-4 py-1">
                It's Tickrfly
              </span>
              <h1 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                Revolutionizing Event Experiences
              </h1>
              <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-600">
                Discover, create, and experience amazing events across Africa with our innovative ticketing platform
              </p>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <button className="w-full sm:w-auto bg-gray-900 dark:bg-gray-200 text-gray-100 dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 px-4 py-2 rounded-md text-sm sm:text-base">
                  Create Event
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 
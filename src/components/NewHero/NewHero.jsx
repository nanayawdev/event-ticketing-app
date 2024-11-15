import { ChevronRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NewHero() {
    return (
      <section className="dark:bg-gray-900 py-12 sm:py-16 md:py-24 mt-8 sm:mt-12 md:mt-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 lg:gap-40 items-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
              We are{" "}
              <span className="text-primary-500">redefining the process</span>
              {" "}of how creators and organisers host events
            </h2>
            <div className="space-y-6 md:space-y-8">
              <p className="text-gray-600 text-base sm:text-lg">
                Our advanced event and ticketing platform, is designed not just for easy management of event ticket sales but also for massive returns for creators and organisers.
              </p>
              <Link to="/event-organizer" className="inline-flex items-center bg-gray-800 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-md hover:bg-gray-700 transition-colors text-sm sm:text-base">
                Learn more <ChevronRightIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2" />
              </Link>
            </div>
          </div>
  
          <div className="border-t border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
              <div className="pt-8 sm:pt-12 px-4 sm:px-8">
                <div className="text-base sm:text-lg font-medium mb-2">Creators and Organisers on the platform</div>
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">25</div>
                <div className="text-xs sm:text-sm text-gray-600">Over the years, 12m+ users have trusted our solution for their event ticketing needs.</div>
              </div>
              
              <div className="pt-8 sm:pt-12 px-4 sm:px-8">
                <div className="text-base sm:text-lg font-medium mb-2">Returns made for trusting our solution.</div>
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">1,288</div>
                <div className="text-xs sm:text-sm text-gray-600">Our customers have made over $8.9m+ in total revenue with our system.</div>
              </div>
              
              <div className="pt-8 sm:pt-12 px-4 sm:px-8">
                <div className="text-base sm:text-lg font-medium mb-2">Events ticket sales and more over the years</div>
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">589+</div>
                <div className="text-xs sm:text-sm text-gray-600">Ticket sales over 49m+ transactions has been made on our platform this year.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
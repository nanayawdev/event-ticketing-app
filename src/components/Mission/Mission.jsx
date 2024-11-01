import React from 'react'

export default function Component() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900">
            Making cities for people, not cars
          </h2>
          <p className="text-lg text-gray-600">
            By sharing our knowledge of the industry and real-time data we're helping to improve our cities.
          </p>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2 text-gray-900">Sharing best practices</h3>
                <p className="text-gray-600">
                  We're able to provide insights that help local authorities make their cities more connected and liveable.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2 text-gray-900">One app, many ways to move</h3>
                <p className="text-gray-600">
                  With multiple transport services inside a single app, getting around safely, in a more sustainable way, has never been easier.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2 text-gray-900">Less is more</h3>
                <p className="text-gray-600">
                  Shared transport can transform our cities by lowering emissions, reducing congestion, and the demand for parking spaces.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-full">
          <img
            src="/placeholder.svg?height=600&width=800"
            alt="Modern city street with pedestrians and cyclists"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  )
}
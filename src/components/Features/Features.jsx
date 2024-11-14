import React from 'react';
import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Seamless Event Experiences',
    description:
      'Powering seamless event experiences for thousands of creators, online and offline, since 2013',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Customized Solutions',
    description:
      'Tailored solutions to meet your unique event needs',
    icon: LockClosedIcon,
  },
  {
    name: 'Simple Queues',
    description:
      'Simple queues for smooth ticketing and registration processes',
    icon: ArrowPathIcon,
  },
  {
    name: 'Advanced Security',
    description:
      'Advanced security features to protect your event data',
    icon: FingerPrintIcon,
  },
]

export default function Features() {
  return (
    <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="inline-block text-base font-normal leading-7 text-primary-600 dark:text-primary-400 border border-primary-600 dark:border-primary-400 rounded-md px-4 py-1">
            Event simplified
          </h2>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Everything you need to host a successful event
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 mx-auto max-w-xl">
            Powering seamless event experiences for thousands of creators, online and offline, since 2013
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-normal leading-7 text-gray-900 dark:text-gray-50">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-md bg-primary-600 dark:bg-primary-400">
                    <feature.icon aria-hidden="true" className="h-6 w-6 text-white dark:text-gray-50" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

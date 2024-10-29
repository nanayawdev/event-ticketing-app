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

const stats = [
  { id: 1, name: 'events hosted in the last 3 months', value: '44 thousand' },
  { id: 2, name: 'creators using our services', value: '10 thousand' },
  { id: 3, name: 'countries supported', value: '20' },
];

export default function Example() {
  return (
    <>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="inline-block text-base font-semibold leading-7 text-indigo-600 border border-indigo-600 rounded-full px-4 py-1">
              Deploy faster
            </h2>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Everything you need to host a successful event
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 mx-auto max-w-xl">
            Powering seamless event experiences for thousands of creators, online and offline, since 2013
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="h-px bg-gray-200"></div>
      </div>

      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-24 sm:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base/7 text-gray-100">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="h-px bg-gray-200"></div>
      </div>

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <h2 className="text-center text-lg/8 font-semibold text-gray-900">
            Trusted by the world's most innovative teams
          </h2>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <img
              alt="Transistor"
              src="https://tailwindui.com/plus/img/logos/158x48/transistor-logo-gray-900.svg"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />
            <img
              alt="Reform"
              src="https://tailwindui.com/plus/img/logos/158x48/reform-logo-gray-900.svg"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />
            <img
              alt="Tuple"
              src="https://tailwindui.com/plus/img/logos/158x48/tuple-logo-gray-900.svg"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />
            <img
              alt="SavvyCal"
              src="https://tailwindui.com/plus/img/logos/158x48/savvycal-logo-gray-900.svg"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
            />
            <img
              alt="Statamic"
              src="https://tailwindui.com/plus/img/logos/158x48/statamic-logo-gray-900.svg"
              width={158}
              height={48}
              className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
            />
          </div>
        </div>
      </div>
    </>
  )
}

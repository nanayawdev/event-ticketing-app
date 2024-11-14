import { ChartLine, Key, QrCode } from 'lucide-react'

const features = [
  {
    name: 'Real-time Analytics',
    description:
      'Track ticket sales, attendance rates, and revenue in real-time. Make data-driven decisions to optimize your event success.',
    icon: ChartLine,
  },
  {
    name: 'Secure Payments',
    description: 'Built-in payment processing with bank-level security. Support multiple payment methods and currencies for your attendees.',
    icon: Key,
  },
  {
    name: 'Automated Check-in',
    description: 'Streamline your event entry with QR code scanning, digital tickets, and instant attendee verification.',
    icon: QrCode,
  },
]

export default function OrganizerFeatures2() {
  return (
    <div className="max-w-7xl mx-auto overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-primary-400">Event Management Made Simple</h2>
              <p className="max-w-xl mt-2 text-pretty text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl">
                Everything you need to run successful events
              </p>
              <p className="max-w-xl mt-6 text-lg/8 text-gray-600 dark:text-gray-300">
                From ticket sales to check-in, we provide all the tools you need to manage your events efficiently. 
                Focus on creating amazing experiences while we handle the technical details.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 dark:text-gray-400 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900 dark:text-gray-50">
                      <feature.icon aria-hidden="true" className="absolute left-1 top-1 h-6 w-6 text-primary-400" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            alt="Product screenshot"
            src="https://tailwindui.com/plus/img/component-images/dark-project-app-screenshot.png"
            width={2432}
            height={1442}
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  )
}

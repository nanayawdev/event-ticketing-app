import joemettle from '../../assets/clients/joemettleministries.png'
import maverickcity from '../../assets/clients/maverickcity.webp'
import tbc from '../../assets/clients/tbc.png'
import ipc from '../../assets/clients/ipc.png'
import grassag from '../../assets/clients/grassag.jpg'
import echo from '../../assets/clients/echo-logo.png'
import tidalrave from '../../assets/clients/tidalrave.png'
import sc from '../../assets/clients/sc.png'
import beyondthereturn from '../../assets/clients/beyondthereturn.png'
import gcb from '../../assets/clients/gcb.png'
export default function Example() {
  return (
    <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-3xl font-semibold text-gray-900 dark:text-gray-100">
          Trusted brands we've worked with
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          <img
            alt="Joe Mettle Ministries"
            src={maverickcity}
            width={158}
            height={48}
            className="max-h-12 w-full object-contain"
          />
          <img
            alt="Maverick City Music"
            src={joemettle}
            width={158}
            height={48}
            className="max-h-12 w-full object-contain"
          />
          <img
            alt="Trinity Baptist Church"
            src={tbc}
            width={158}
            height={48}
            className="max-h-12 w-full object-contain"
          />
          <img
            alt="International Palace Church"
            src={ipc}
            width={158}
            height={48}
            className="max-h-12 w-full object-contain"
          />
          <img
            alt="Grassag"
            src={grassag}
            width={158}
            height={48}
            className="max-h-12 w-full object-contain"
          />
          <img
            alt="Echo"
            src={echo}
            width={158}
            height={48}
            className="max-h-12 w-full object-contain"
          />
          <img
            alt="Tidal Rave"
            src={tidalrave}
            width={158}
            height={48}
            className="max-h-12 w-full object-contain"
          />
          <img
            alt="Standard Chartered Bank"
            src={sc}
            width={158}
            height={48}
            className="max-h-12 w-full object-contain"
          />
          <img
            alt="GCB Bank"
            src={gcb}
            width={158}
            height={48}
            className="max-h-12 w-full object-contain"
          />
          <img
            alt="Beyond The Return"
            src={beyondthereturn}
            width={158}
            height={48}
            className="max-h-12 w-full object-contain"
          />
        </div>
        <div className="mx-auto mt-16 flex justify-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            2500+ clients have used our app to manage their events.{' '}
            <a href="#" className="font-semibold text-primary-400 dark:text-primary-400 hover:text-primary-500">
              Read our customer stories{' →'}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

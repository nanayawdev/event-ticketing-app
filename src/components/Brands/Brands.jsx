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
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-3xl font-semibold text-gray-900">
          Trusted brands we've worked with
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <img
            alt="Joe Mettle Ministries"
            src={maverickcity}
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          />
          <img
            alt="Maverick City Music"
            src={joemettle}
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          />
          <img
            alt="Trinity Baptist Church"
            src={tbc}
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          />
          <img
            alt="International Palace Church"
            src={ipc}
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
          />
          <img
            alt="Grassag"
            src={grassag}
            width={158}
            height={48}
            className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
          />
          <img
            alt="Echo"
            src={echo}
            width={158}
            height={48}
            className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
          />
          <img
            alt="Tidal Rave"
            src={tidalrave}
            width={158}
            height={48}
            className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
          />
          <img
            alt="Standard Chartered Bank"
            src={sc}
            width={158}
            height={48}
            className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
          />
          <img
            alt="GCB Bank"
            src={gcb}
            width={158}
            height={48}
            className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
          />
          <img
            alt="Beyond The Return"
            src={beyondthereturn}
            width={158}
            height={48}
            className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
          />
        </div>
        <div className="mx-auto mt-16 flex justify-center">
          <p className="text-sm text-gray-600">
            2500+ clients have used our app to manage their events.{' '}
            <a href="#" className="font-semibold text-sea-green-400 hover:text-sea-green-500">
              Read our customer stories{' →'}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

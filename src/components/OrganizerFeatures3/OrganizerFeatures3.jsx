import tickrlyacc from '../../assets/images/tickrflyatjoemettle.jpg';

export default function OrganizerFeatures3() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative h-[500px] rounded-2xl overflow-hidden">
          <img
            src={tickrlyacc}
            alt="Event management dashboard"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-base/7 font-semibold tracking-wide text-muted-foreground text-sea-green-400">Event Analytics</h2>
            <h3 className="text-4xl sm:text-5xl font-bold mt-2">
              Data-Driven Event Success
            </h3>
          </div>
          
          <p className="max-w-xl text-lg text-muted-foreground">
            Make informed decisions with our comprehensive analytics dashboard. Track ticket sales, monitor attendance patterns, and understand your audience demographics in real-time. Our detailed reporting helps you optimize pricing strategies and marketing campaigns for maximum impact.
          </p>
          
          <p className="max-w-xl text-lg text-muted-foreground">
            From heat maps showing peak selling times to demographic breakdowns of your attendees, our analytics tools give you the insights needed to grow your events and increase revenue. Perfect for both single events and multi-venue festival series.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <button className="px-6 py-3 bg-primary-400 text-white font-semibold rounded-lg hover:bg-primary-500 transition-colors">
              View Analytics
            </button>
            <button className="px-6 py-3 underline text-gray-950 dark:text-gray-50 font-semibold rounded-lg hover:bg-primary-50 transition-colors">
              Start Tracking
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 
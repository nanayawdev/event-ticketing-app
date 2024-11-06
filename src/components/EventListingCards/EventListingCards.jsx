import { Button } from "@/components/ui/button"
import { Ticket } from "lucide-react"

export default function EventListingCard({ 
  day = "20",
  month = "Jun",
  year = "2026",
  image = "/placeholder.svg",
  title = "Navigating the creative process",
  location = "New York",
  startDate = "Jun 20, 2026 8:00 am",
  endDate = "Sep 10, 2027 5:00 pm",
  price = "254.00"
} = {}) {
  return (
    <div className="w-full max-w-4xl bg-background">
      <div className="flex gap-6 p-6">
        {/* Date Column */}
        <div className="flex flex-col items-center min-w-[80px]">
          <span className="text-5xl font-bold">{day}</span>
          <span className="text-sm text-muted-foreground">
            {month}, {year}
          </span>
        </div>

        {/* Vertical Divider */}
        <div className="h-full w-px bg-border"></div>

        {/* Image */}
        <div className="relative h-24 w-40 overflow-hidden rounded-md">
          <img
            src={image}
            alt="Event thumbnail"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Vertical Divider - Added after image */}
        <div className="h-full w-px bg-border"></div>

        {/* Content */}
        <div className="flex flex-1 flex-col">
          {/* Event Details */}
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-semibold">{title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{location}</span>
              <span className="text-xs">•</span>
              <time dateTime={new Date(startDate).toISOString()}>
                {startDate}
              </time>
              <span>-</span>
              <time dateTime={new Date(endDate).toISOString()}>
                {endDate}
              </time>
            </div>
          </div>
        </div>

        {/* Price and Button Column */}
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <Ticket className="h-6 w-6" />
            <span className="text-xl font-semibold">${price}</span>
          </div>
          <Button>Book Now</Button>
        </div>
      </div>

      {/* Horizontal Divider */}
      <div className="h-px w-full bg-border"></div>
    </div>
  )
}
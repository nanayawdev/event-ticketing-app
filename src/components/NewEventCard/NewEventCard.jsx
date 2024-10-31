import React from 'react'

const Icon = ({ children }) => (
  <span className="inline-block w-4 h-4 mr-1">{children}</span>
)

const Badge = ({ children, variant }) => {
  const baseClasses = "inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold"
  const variantClasses = {
    primary: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    outline: "border border-gray-300 text-gray-600"
  }
  return (
    <span className={`${baseClasses} ${variantClasses[variant] || variantClasses.primary}`}>
      {children}
    </span>
  )
}

export default function EventCard({ 
  image = "/placeholder.svg?height=200&width=300",
  name = "Event Name",
  location = "Event Location",
  date = new Date(),
  price = "$0",
  category = "General",
}) {
  const calculateDaysUntilEvent = () => {
    const today = new Date()
    const eventDate = new Date(date)
    const timeDiff = eventDate.getTime() - today.getTime()
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
    return daysDiff > 0 ? daysDiff : 0
  }

  const daysUntilEvent = calculateDaysUntilEvent()

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-lg shadow-lg bg-white">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">{name}</h2>
        <div className="flex items-center text-gray-600 mb-2">
          <Icon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </Icon>
          <span>{location}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-4">
          <Icon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </Icon>
          <span>{date.toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">{price}</span>
          <Badge variant="secondary">
            <Icon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </Icon>
            {category}
          </Badge>
        </div>
      </div>
      <div className="bg-gray-100 px-4 py-2">
        <Badge variant="outline" className="w-full flex justify-center py-1">
          {daysUntilEvent} days until event
        </Badge>
      </div>
    </div>
  )
}
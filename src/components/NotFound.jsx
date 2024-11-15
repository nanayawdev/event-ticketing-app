import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { TbNewsOff } from 'react-icons/tb'

export default function NotFound({ 
  title = "Page Not Found",
  description = "Oops! We couldn't find the page you're looking for.",
  subDescription = "The page might have been removed, renamed, or is temporarily unavailable.",
  buttonText = "Back to Home",
  buttonLink = "/",
  buttonIcon = null
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4">
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <TbNewsOff className="w-64 h-64" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 relative z-10">
            {title}
          </h2>
        </div>
        
        <div className="max-w-md space-y-2">
          <p className="text-xl text-gray-600">
            {description}
          </p>
          <p className="text-gray-500">
            {subDescription}
          </p>
        </div>

        <div className="pt-6">
          <Button variant="default" asChild>
            <Link to={buttonLink} className="flex items-center gap-2">
              {buttonIcon}
              {buttonText}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 
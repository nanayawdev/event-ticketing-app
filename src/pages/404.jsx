import React from 'react'
import NotFound from '@/components/NotFound'
import { Home } from 'lucide-react'

export default function Page404() {
  return (
    <NotFound 
      title="404 - Page Not Found"
      description="Oops! You've ventured into unknown territory."
      subDescription="The page you're looking for doesn't exist or has been moved."
      buttonText="Back to Home"
      buttonLink="/"
      buttonIcon={<Home className="w-4 h-4" />}
    />
  )
} 
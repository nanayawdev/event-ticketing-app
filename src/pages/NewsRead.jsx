import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { useParams } from 'react-router-dom' // Add this import
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Twitter, Facebook, Linkedin } from 'lucide-react'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { toast } from "sonner" // Add this import
import { Link } from 'react-router-dom'
import { Newspaper } from 'lucide-react' // Add this import for the icon
import NotFound from '@/components/NotFound' // Add this import

export default function NewsRead() {
  // Get the ID from URL parameters instead of props
  const { id } = useParams()
  const [blogData, setBlogData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBlogData = async () => {
      if (!id) {
        toast.error("No article ID provided")
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(`https://api-server.krontiva.africa/api:BnSaGAXN/event_news_table/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch blog data')
        }
        const data = await response.json()
        setBlogData(data)
      } catch (err) {
        toast.error("Unable to load article at this time", {
          description: navigator.onLine 
            ? "Please try again later" 
            : "Please check your internet connection",
          duration: 3000,
          id: 'blog-fetch-error',
        })
        console.error('Blog fetch error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogData()
  }, [id]) // Update dependency to id

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    )
  }

  if (!blogData) {
    return (
      <NotFound 
        title="Article Not Found"
        description="Oops! We couldn't find the article you're looking for."
        subDescription="The article might have been removed, renamed, or is temporarily unavailable."
        buttonText="Back to News"
        buttonLink="/news"
        buttonIcon={<Newspaper className="w-4 h-4" />}
      />
    )
  }

  const { newsTitle, newsImage, publishedDate, newsBody } = blogData
  const shareUrl = encodeURIComponent(window.location.href)
  const shareText = encodeURIComponent(newsTitle)

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{newsTitle}</h1>
        <div className="flex items-center justify-between flex-wrap gap-4 text-muted-foreground mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              <time dateTime={publishedDate}>
                {format(new Date(publishedDate), 'MMMM d, yyyy')}
              </time>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
                <Facebook className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
        {newsImage && (
          <img
            src={newsImage}
            alt={newsTitle}
            className="w-full h-[400px] object-cover rounded-lg mb-8"
          />
        )}
      </header>
      <div className="prose prose-lg max-w-none">
        {newsBody.split('\n\n').map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))}
      </div>
    </article>
  )
}
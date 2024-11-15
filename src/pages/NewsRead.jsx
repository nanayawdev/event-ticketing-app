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
import NotFound from '../components/NotFound/NotFound' // Add this import
import { useNews } from '../hooks/useNews';
import MostRead from '../components/MostRead/MostRead'

export default function NewsRead() {
  const { id } = useParams();
  const { news: blogData, loading: isLoading } = useNews(id);

  if (isLoading) {
    return (
      <>
        <MostRead />
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <LoadingSpinner />
        </div>
      </>
    )
  }

  if (!blogData) {
    return (
      <>
        <MostRead />
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <NotFound 
            title="Article Not Found"
            description="Oops! We couldn't find the article you're looking for."
            subDescription="The article might have been removed, renamed, or is temporarily unavailable."
            buttonText="Back to News"
            buttonLink="/news"
            buttonIcon={<Newspaper className="w-4 h-4" />}
          />
        </div>
      </>
    )
  }

  const { newsTitle, newsImage, publishedDate, newsBody } = blogData
  const shareUrl = encodeURIComponent(window.location.href)
  const shareText = encodeURIComponent(newsTitle)

  return (
    <>
      <MostRead />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{newsTitle}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-muted-foreground mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <time dateTime={publishedDate} className="text-sm sm:text-base">
                  {format(new Date(publishedDate), 'MMMM d, yyyy')}
                </time>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" asChild>
                <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Share on Twitter">
                  <Twitter className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Share on Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Share on LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
          {newsImage && (
            <img
              src={newsImage}
              alt={newsTitle}
              className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover rounded-lg mb-6 sm:mb-8"
            />
          )}
        </header>
        <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
          {newsBody.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-sm sm:text-base">{paragraph}</p>
          ))}
        </div>
      </article>
    </>
  )
}
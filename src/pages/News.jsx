import React from 'react'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import NewsGrid from '../components/NewsGrid/NewsGrid'
import { useNews } from '../hooks/useNews';

export default function News() {
  const { news: newsData, loading: isLoading } = useNews();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] w-full">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Latest News</h1>
        <NewsGrid news={newsData} />
      </div>
    </div>
  )
}

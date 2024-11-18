import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import { ArrowRight } from 'lucide-react';
import { useNews } from '../../hooks/useNews';
import { Skeleton } from '../ui/skeleton';

const NewsCardSkeleton = () => (
  <div className="w-full">
    <div className="overflow-hidden max-w-sm group">
      <div className="relative flex flex-col h-full bg-black/5 dark:bg-white/5 rounded-lg">
        <Skeleton className="h-64 w-full" /> {/* Image skeleton */}
        <div className="p-6">
          <Skeleton className="h-6 w-3/4 mb-4" /> {/* Title skeleton */}
          <Skeleton className="h-4 w-24" /> {/* "READ MORE" skeleton */}
        </div>
      </div>
    </div>
  </div>
);

const NewsGrid = () => {
  const { news, loading, error } = useNews();

  if (loading) {
    return (
      <div className="w-full bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-4 mb-16 max-w-[1300px]">
          {/* Header Section Skeleton */}
          <div className="flex items-center gap-4 mb-8 px-1">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-8 w-24" />
          </div>

          {/* News Cards Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-4 sm:gap-x-3 sm:gap-y-5 md:gap-x-4 md:gap-y-6">
            {[...Array(6)].map((_, index) => (
              <NewsCardSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error loading news: {error}</div>;
  }

  return (
    <div className="w-full bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-4 mb-16 max-w-[1300px]">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8 px-1">
          <h2 className="text-2xl font-bold">News & Updates</h2>
          <button className="flex items-center gap-2 text-primary-500 dark:text-primary-100 px-4 py-2 hover:bg-primary-100 dark:hover:bg-primary-200 transition-colors">
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-4 sm:gap-x-3 sm:gap-y-5 md:gap-x-4 md:gap-y-6">
          {news.map((newsItem) => (
            <div 
              key={newsItem.event_news_table_id || newsItem.id || `news-${newsItem.newsTitle}`} 
              className="w-full"
            >
              <NewsCard
                event_news_table_id={newsItem.event_news_table_id}
                title={newsItem.newsTitle}
                imageUrl={newsItem.newsImage?.url}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsGrid; 
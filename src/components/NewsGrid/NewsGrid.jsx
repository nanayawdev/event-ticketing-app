import React, { useEffect, useState } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import { ArrowRight } from 'lucide-react';
import { useNews } from '../../hooks/useNews';
import { LoadingSpinner } from '../ui/LoadingSpinner';

const NewsGrid = () => {
  const { news, loading, error } = useNews();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error loading news: {error}</div>;
  }

  const formattedNewsItems = news.map(item => ({
    event_news_table_id: item.event_news_table_id,
    title: item.newsTitle,
    imageUrl: item.newsImage,
  }));

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
          {formattedNewsItems.map((newsItem) => (
            <div key={newsItem.event_news_table_id || `news-${newsItem.title}`} className="w-full">
              <NewsCard
                event_news_table_id={newsItem.event_news_table_id}
                title={newsItem.title}
                imageUrl={newsItem.imageUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsGrid; 
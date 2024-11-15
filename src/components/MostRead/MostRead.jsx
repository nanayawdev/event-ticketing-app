import React from 'react';
import { useNews } from '../../hooks/useNews';
import { Link } from 'react-router-dom';
import { Skeleton } from '../ui/skeleton';

const MostRead = () => {
  const { news, loading, error } = useNews();

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 py-4 sm:py-5 lg:py-6 mt-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5 lg:px-6">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-4 sm:gap-y-5 lg:gap-y-6">
            {[...Array(8)].map((_, index) => (
              <div 
                key={index}
                className={`relative flex items-start ${
                  index > 0 && index % 4 !== 0 ? 'lg:pl-6' : ''
                } ${
                  index > 0 && index % 2 !== 0 ? 'sm:pl-6' : ''
                }`}
              >
                <Skeleton className="w-6 h-6 mr-2" />
                <Skeleton className="h-4 flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-900 py-4 sm:py-5 lg:py-6 mt-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5 lg:px-6">
          <h2 className="text-black dark:text-white text-xl sm:text-2xl lg:text-[28px] font-bold mb-4 sm:mb-5 lg:mb-6">
            MOST READ
          </h2>
          <p className="text-red-500">Error loading news: {error}</p>
        </div>
      </div>
    );
  }

  // Take only the first 8 news items
  const mostReadNews = news.slice(0, 8);

  return (
    <div className="bg-white dark:bg-gray-900 py-4 sm:py-5 lg:py-6 mt-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 lg:px-6">
        <h2 className="text-black dark:text-white text-xl sm:text-2xl lg:text-[28px] font-bold mb-4 sm:mb-5 lg:mb-6">
          MOST READ
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-4 sm:gap-y-5 lg:gap-y-6">
          {mostReadNews.map((item, index) => (
            <div 
              key={item.event_news_table_id} 
              className={`relative flex items-start ${
                index > 0 && index % 4 !== 0 ? 'lg:pl-6 before:lg:absolute before:lg:left-0 before:lg:top-0 before:lg:h-full before:lg:w-[1px] before:lg:bg-gray-600' : ''
              } ${
                index > 0 && index % 2 !== 0 ? 'sm:pl-6 before:sm:absolute before:sm:left-0 before:sm:top-0 before:sm:h-full before:sm:w-[1px] before:sm:bg-gray-600 lg:before:hidden' : ''
              }`}
            >
              <span className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl lg:text-2xl font-bold w-6 sm:w-7 lg:w-8">
                {index + 1}
              </span>
              <Link 
                to={`/news/${item.event_news_table_id}`}
                className="text-gray-900 dark:text-white hover:text-primary-500 text-sm sm:text-base leading-tight flex-1 min-w-0 pr-4"
              >
                {item.newsTitle}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MostRead; 
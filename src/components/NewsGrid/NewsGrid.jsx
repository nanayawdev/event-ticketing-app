import React, { useEffect, useState } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import { ArrowRight } from 'lucide-react';

const NewsGrid = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api-server.krontiva.africa/api:BnSaGAXN/event_news_table')
      .then(response => response.json())
      .then(data => {
        console.log('API Response:', data); // Let's see the data structure
        if (Array.isArray(data)) {
          const formattedNewsItems = data.map(item => ({
            id: item.event_news_table_id,
            title: item.newsTitle,
            imageUrl: item.newsImage,
          }));
          setNewsItems(formattedNewsItems);
        } else {
          setError('Data is not in expected format');
        }
      })
      .catch(error => {
        console.error('Error fetching news data:', error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error loading news: {error}</div>;
  }

  return (
    <div className="w-full bg-white">
      <div className="container mx-auto px-4 py-4 mb-16 max-w-[1300px]">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8 px-1">
          <h2 className="text-5xl font-bold">News & Updates</h2>
          <button className="flex items-center gap-2 text-sea-green-400 px-4 py-2 hover:bg-sea-green-50 transition-colors">
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-4 sm:gap-x-3 sm:gap-y-5 md:gap-x-4 md:gap-y-6">
          {newsItems.length > 0 ? (
            newsItems.map((newsItem) => (
              <div key={newsItem.id} className="w-full">
                <NewsCard
                  id={newsItem.id}
                  title={newsItem.title}
                  imageUrl={newsItem.imageUrl}
                />
              </div>
            ))
          ) : (
            <div>Loading news items...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsGrid; 
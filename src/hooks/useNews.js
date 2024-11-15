import { useState, useEffect } from 'react';

export const useNews = (newsId = null) => {
  const [news, setNews] = useState(newsId ? null : []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const baseUrl = 'https://api-server.krontiva.africa/api:BnSaGAXN/event_news_table';
        const url = newsId ? `${baseUrl}/${newsId}` : baseUrl;
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        
        const data = await response.json();
        setNews(data);
      } catch (err) {
        setError(err.message);
        console.error('News fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [newsId]);

  return { news, loading, error };
}; 
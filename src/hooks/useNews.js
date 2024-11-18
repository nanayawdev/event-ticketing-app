import { useState, useEffect } from 'react';
import { newsService } from '../services/api';
import { handleApiError } from '../utils/errorHandler';

export const useNews = (newsId = null) => {
  const [news, setNews] = useState(newsId ? null : []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data } = newsId 
          ? await newsService.getNewsById(newsId)
          : await newsService.getAllNews();
        
        if (newsId) {
          setNews(Array.isArray(data) ? data[0] : data);
        } else {
          setNews(Array.isArray(data) ? data : [data]);
        }
      } catch (err) {
        const errorDetails = handleApiError(err);
        setError(errorDetails.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [newsId]);

  return { news, loading, error };
}; 
import { useEffect } from 'react';
import { eventService } from '../services/api';

const ApiTest = () => {
  useEffect(() => {
    const testApi = async () => {
      try {
        console.log('Testing API connection...');
        const response = await eventService.getAllEvents();
        console.log('API Test Success:', response.data);
      } catch (error) {
        console.error('API Test Error:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            baseURL: error.config?.baseURL,
          }
        });
      }
    };

    testApi();
  }, []);

  return null;
};

export default ApiTest; 
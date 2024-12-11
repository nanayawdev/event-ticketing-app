import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

// Log configuration once at startup
console.log('API Configuration:', {
  baseURL: `${BASE_URL}/${API_PATH}`,
});

const api = axios.create({
  baseURL: `${BASE_URL}/${API_PATH}`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Clean up the request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('Request Config:', {
      url: config.url,
      baseURL: config.baseURL,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Clean up the response interceptor
api.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ ${response.config.method.toUpperCase()} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(`❌ ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
        status: error.response?.status,
        message: error.message,
      });
    }
    return Promise.reject(error);
  }
);

export const eventService = {
  getAllEvents: () => api.get('/Get_All_Event'),
  getEventById: (eventId) => api.get(`/Get_All_Event/${eventId}`),
  getTicketsByEventId: (eventId) => api.get(`/ticket_table/${eventId}`),
};

export const newsService = {
  getAllNews: () => api.get('/event_news_table'),
  getNewsById: (newsId) => api.get(`/event_news_table/${newsId}`),
};

export const ticketService = {
  getAllTickets: () => api.get('/ticket_table'),
};

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
}; 
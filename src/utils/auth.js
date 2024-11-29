import axios from 'axios';

const API_BASE_URL = 'https://api-server.krontiva.africa/api:BnSaGAXN';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL
});

// Add request interceptor to add auth headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['X-Xano-Authorization'] = token;
    config.headers['X-Xano-Authorization-Only'] = 'true';
  }
  return config;
});

export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  ME: '/auth/me'
};

export const checkAuthAndGetProfile = async () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('No auth token found');
  }

  try {
    const response = await api.get(AUTH_ENDPOINTS.ME);
    return response.data;
  } catch (error) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    throw error;
  }
};

export default api; 
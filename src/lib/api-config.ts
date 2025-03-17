import axios from 'axios';

// Create a configured axios instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Content-Type': 'application/json',
  }
});

// Add a timestamp to GET requests to bypass cache
apiClient.interceptors.request.use(config => {
  if (config.method?.toLowerCase() === 'get') {
    config.params = {
      ...config.params,
      _t: new Date().getTime()
    };
  }
  return config;
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;

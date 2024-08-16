import axios from 'axios';
import axiosRetry from 'axios-retry';

// Function to create an Axios instance with a dynamic base URL
export const createApiClient = (baseURL) => {
  const apiClient = axios.create({
    baseURL: baseURL || process.env.REACT_APP_API_BASE_URL || 'https://your-secure-api.com',
    timeout: 10000, // 10 seconds timeout
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Configure retry behavior
  axiosRetry(apiClient, {
    retries: 3, // Number of retries
    retryDelay: (retryCount) => retryCount * 1000, // Delay between retries
    retryCondition: (error) => {
      return axiosRetry.isNetworkOrIdempotentRequestError(error) ||
             (error.response && error.response.status >= 500);
    },
  });

  // Request Interceptor
  apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log('Request:', config);
      return config;
    },
    (error) => {
      console.error('Request Error:', error);
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  apiClient.interceptors.response.use(
    (response) => {
      console.log('Response:', response);
      return response;
    },
    (error) => {
      console.error('Response Error:', error);
      return Promise.reject(error);
    }
  );

  return apiClient;
};

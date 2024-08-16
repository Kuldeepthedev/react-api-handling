import axios from 'axios';
import axiosRetry from 'axios-retry';

/**
 * Function to create an Axios instance with a dynamic base URL.
 * Optionally includes an Authorization header if an authToken is provided.
 *
 * @param {string} baseURL - The base URL for the API.
 * @param {string} [authToken] - Optional authentication token.
 * @returns {AxiosInstance} - Configured Axios instance.
 */
export const createApiClient = (baseURL, authToken = null) => {
  const apiClient = axios.create({
    baseURL: baseURL,
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
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      } else {
        // Optional: Handle cases where no auth token is provided
        // config.headers.Authorization = undefined; // Ensure it's not set if not provided
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

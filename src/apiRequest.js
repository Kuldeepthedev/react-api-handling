import { createApiClient } from './apiClient';

/**
 * Makes an API request using the provided method, endpoint, data, headers, and params.
 *
 * @param {string} method - The HTTP method to use for the request.
 * @param {string} endpoint - The URL endpoint to send the request to.
 * @param {Object} [data={}] - The data to send with the request.
 * @param {Object} [headers={}] - The headers to send with the request.
 * @param {Object} [params={}] - The query parameters to send with the request.
 * @param {string} [apiUrl=''] - The base API URL.
 * @return {Promise<Object>} - A Promise that resolves to an object with the response data and error.
 */
export const apiRequest = async (method, endpoint, data = {}, headers = {}, params = {}, apiUrl = '') => {
  try {
    const apiClient = createApiClient(apiUrl); // Create apiClient with dynamic base URL
    const response = await apiClient({
      method,
      url: endpoint, // Endpoint is relative to baseURL
      data,
      headers,
      params,
    });
    return { data: response.data, error: null };
  } catch (error) {
    const errorData = error.response ? error.response.data : error.message;
    console.error('API Request Error:', errorData);
    return { data: null, error: errorData };
  }
};

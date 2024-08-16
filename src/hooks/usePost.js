import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '../apiRequest.js';

/**
 * Custom hook for performing POST requests with advanced features.
 *
 * @param {string} apiUrlWithEndpoint - The full URL for the API including the endpoint.
 * @param {Object} [headers={}] - Optional headers.
 * @param {string|null} [queryKey=null] - Optional query key to invalidate upon success.
 * @param {Object} [cacheOptions={}] - Custom cache and stale time options.
 * @param {Object} [interceptors={}] - Request and response interceptors.
 * @param {Object} [retryOptions={}] - Custom retry and backoff strategies.
 * @param {function} [optimisticUpdate] - Function for optimistic updates.
 * @returns {Object} - The mutation result object with enhanced features.
 */
export const usePost = (
  apiUrlWithEndpoint,
  headers = {},
  queryKey = null,
  cacheOptions = {},
  interceptors = {},
  retryOptions = {},
  optimisticUpdate = null
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (data) => {
      let request = apiRequest('POST', apiUrlWithEndpoint, data, headers);
      if (interceptors.request) {
        request = interceptors.request(request);
      }
      const response = await request;
      if (interceptors.response) {
        return interceptors.response(response);
      }
      return response;
    },
    {
      onSuccess: (data) => {
        if (queryKey) {
          queryClient.invalidateQueries(queryKey);
        }
        if (optimisticUpdate) {
          optimisticUpdate(data);
        }
      },
      onError: (error) => {
        console.error('Post Request Error:', error);
      },
      retry: retryOptions.retryCount ?? 3, // Default retry count
      retryDelay: retryOptions.retryDelay ?? 1000, // Default retry delay
      onMutate: () => {
        // Optionally, handle optimistic updates before the request completes
        if (optimisticUpdate) {
          optimisticUpdate();
        }
      }
    }
  );

  return {
    submitData: mutation.mutate,
    error: mutation.error,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
  };
};

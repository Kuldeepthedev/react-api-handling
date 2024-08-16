import { useQuery, useInfiniteQuery, useQueries } from 'react-query';
import { apiRequest } from '../apiRequest.js';

/**
 * Custom hook for performing GET requests with advanced features.
 *
 * @param {string|string[]} apiUrlsWithEndpoints - The full URL(s) for the API including the endpoint(s).
 * @param {Object} [params={}] - Optional query parameters.
 * @param {Object} [headers={}] - Optional headers.
 * @param {Object} [queryOptions={}] - Optional configuration for the query.
 * @param {Object} [paginationOptions={}] - Optional pagination or infinite query options.
 * @param {Object} [cacheOptions={}] - Custom cache and stale time options.
 * @param {Object} [interceptors={}] - Request and response interceptors.
 * @param {function} [transformData] - Function to transform or normalize the fetched data.
 * @param {Object} [retryOptions={}] - Custom retry and backoff strategies.
 * @returns {Object} - The query result object with enhanced features.
 */
export const useGet = (
  apiUrlsWithEndpoints,
  params = {},
  headers = {},
  queryOptions = {},
  paginationOptions = {},
  cacheOptions = {},
  interceptors = {},
  transformData = (data) => data,
  retryOptions = {}
) => {
  const isMultiple = Array.isArray(apiUrlsWithEndpoints);

  // Function to handle data fetching with interceptors and transformation
  const fetchData = async (url, params) => {
    let request = apiRequest('GET', url, {}, headers, params);
    if (interceptors.request) {
      request = interceptors.request(request);
    }
    const response = await request;
    if (interceptors.response) {
      return interceptors.response(response);
    }
    return transformData(response);
  };

  if (isMultiple) {
    // Handle multiple URLs with batching
    const queryResult = useQueries(
      apiUrlsWithEndpoints.map((url) => ({
        queryKey: [url, params],
        queryFn: () => fetchData(url, params),
        ...queryOptions,
        cacheTime: cacheOptions.cacheTime,
        staleTime: cacheOptions.staleTime,
        retry: retryOptions.retryCount,
        retryDelay: retryOptions.retryDelay,
      }))
    );

    return {
      fetchData: () => queryResult.map(result => result.refetch()),
      error: queryResult.find(result => result.isError)?.error,
      isLoading: queryResult.some(result => result.isLoading),
      isSuccess: queryResult.every(result => result.isSuccess),
      data: queryResult.map(result => result.data),
    };
  }

  // Handle single URL
  const queryResult = useQuery(
    [apiUrlsWithEndpoints, params],
    () => fetchData(apiUrlsWithEndpoints, params),
    {
      ...queryOptions,
      cacheTime: cacheOptions.cacheTime,
      staleTime: cacheOptions.staleTime,
      retry: retryOptions.retryCount,
      retryDelay: retryOptions.retryDelay,
    }
  );

  if (paginationOptions.isInfinite) {
    const infiniteQueryResult = useInfiniteQuery(
      [apiUrlsWithEndpoints, params],
      ({ pageParam = 1 }) => fetchData(apiUrlsWithEndpoints, { ...params, page: pageParam }),
      {
        ...queryOptions,
        ...paginationOptions,
        getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
        cacheTime: cacheOptions.cacheTime,
        staleTime: cacheOptions.staleTime,
        retry: retryOptions.retryCount,
        retryDelay: retryOptions.retryDelay,
      }
    );

    return {
      fetchData: infiniteQueryResult.refetch,
      error: infiniteQueryResult.error,
      isLoading: infiniteQueryResult.isLoading,
      isSuccess: infiniteQueryResult.isSuccess,
      data: infiniteQueryResult.data,
    };
  }

  return {
    fetchData: queryResult.refetch,
    error: queryResult.error,
    isLoading: queryResult.isLoading,
    isSuccess: queryResult.isSuccess,
    data: queryResult.data,
  };
};
